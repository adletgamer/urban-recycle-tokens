// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./UrbanCoin.sol";
import "./WasteNFT.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract RecycleManager is Ownable {
    UrbanCoin public urbanCoin;
    WasteNFT public wasteNFT;
    
    // Precios por kg en wei (1 MATIC = 1e18 wei)
    uint256 public pricePerKgPlastic = 0.5 * 1e18; // 0.5 MATIC por kg
    uint256 public pricePerKgPaper = 0.3 * 1e18;
    uint256 public pricePerKgGlass = 0.2 * 1e18;
    uint256 public pricePerKgMetal = 1.0 * 1e18;
    
    // Multiplicadores por distrito (percentage)
    mapping(string => uint256) public districtMultiplier;
    
    // Eventos para tracking
    event RecyclingRecorded(
        address indexed citizen,
        uint256 weight,
        string materialType,
        string district,
        uint256 tokensMinted,
        uint256 nftId
    );
    
    constructor(address _urbanCoin, address _wasteNFT) Ownable(msg.sender) {
        urbanCoin = UrbanCoin(_urbanCoin);
        wasteNFT = WasteNFT(_wasteNFT);
        
        // Inicializar multiplicadores
        districtMultiplier["MIRAFLORES"] = 120; // +20%
        districtMultiplier["SAN_ISIDRO"] = 100; // Base
        districtMultiplier["VILLA_MARIA"] = 130; // +30% bono social
        districtMultiplier["COMAS"] = 150; // +50% bono crecimiento
    }
    
    // Función principal: registrar reciclaje
    function recordRecycling(
        address citizen,
        uint256 weight, // en gramos
        string memory materialType,
        string memory district,
        string memory qualityGrade
    ) external {
        // Solo direcciones autorizadas pueden llamar (backend)
        require(isAuthorized(msg.sender), "Not authorized");
        
        // Calcular recompensa
        uint256 baseTokens = calculateBaseTokens(weight, materialType);
        uint256 multiplier = districtMultiplier[district];
        if (multiplier == 0) multiplier = 100;
        
        uint256 finalTokens = (baseTokens * multiplier) / 100;
        
        // Mint tokens al ciudadano
        urbanCoin.mint(citizen, finalTokens, materialType);
        
        // Mint NFT de trazabilidad
        uint256 nftId = wasteNFT.mintWasteCertificate(
            citizen,
            weight,
            materialType,
            district,
            qualityGrade
        );
        
        emit RecyclingRecorded(
            citizen,
            weight,
            materialType,
            district,
            finalTokens,
            nftId
        );
    }
    
    function calculateBaseTokens(uint256 weight, string memory materialType) 
        public 
        view 
        returns (uint256) 
    {
        // Convertir gramos a kg
        uint256 weightKg = weight / 1000;
        
        if (keccak256(bytes(materialType)) == keccak256(bytes("PLASTIC"))) {
            return weightKg * 10; // 10 tokens por kg de plástico
        } else if (keccak256(bytes(materialType)) == keccak256(bytes("PAPER"))) {
            return weightKg * 8; // 8 tokens por kg de papel
        } else if (keccak256(bytes(materialType)) == keccak256(bytes("GLASS"))) {
            return weightKg * 5; // 5 tokens por kg de vidrio
        } else if (keccak256(bytes(materialType)) == keccak256(bytes("METAL"))) {
            return weightKg * 15; // 15 tokens por kg de metal
        }
        
        return weightKg * 5; // Default
    }
    
    // Lista de direcciones autorizadas (backend servers)
    mapping(address => bool) private authorizedCallers;
    
    function addAuthorizedCaller(address caller) external onlyOwner {
        authorizedCallers[caller] = true;
    }
    
    function removeAuthorizedCaller(address caller) external onlyOwner {
        authorizedCallers[caller] = false;
    }
    
    function isAuthorized(address caller) public view returns (bool) {
        return authorizedCallers[caller] || caller == owner();
    }
}
