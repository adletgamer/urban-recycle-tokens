// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20; // Cambiar a versión estable

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./UrbanCoin.sol";
import "./WasteNFT.sol";

/**
 * @title RecycleManager
 * @dev Sistema central de gestión de reciclaje con optimizaciones de gas y seguridad
 * @notice Orquesta el mint de tokens UrbanCoin y certificados WasteNFT
 */
contract RecycleManager is Ownable, ReentrancyGuard {
    // ========== CONSTANTS ==========
    bytes32 private constant PLASTIC = keccak256("PLASTIC");
    bytes32 private constant PAPER = keccak256("PAPER");
    bytes32 private constant GLASS = keccak256("GLASS");
    bytes32 private constant METAL = keccak256("METAL");
    
    bytes32 private constant MIRAFLORES = keccak256("MIRAFLORES");
    bytes32 private constant SAN_ISIDRO = keccak256("SAN_ISIDRO");
    bytes32 private constant VILLA_MARIA = keccak256("VILLA_MARIA");
    bytes32 private constant COMAS = keccak256("COMAS");
    
    // ========== STATE VARIABLES ==========
    UrbanCoin public urbanCoin;
    WasteNFT public wasteNFT;
    
    // Precios en tokens por kg (más eficiente que wei)
    uint256 public pricePerKgPlastic = 10;  // 10 tokens/kg
    uint256 public pricePerKgPaper = 8;     // 8 tokens/kg
    uint256 public pricePerKgGlass = 5;     // 5 tokens/kg
    uint256 public pricePerKgMetal = 15;    // 15 tokens/kg
    
    // Multiplicadores por distrito (percentage points)
    mapping(bytes32 => uint256) public districtMultiplier;
    
    // Direcciones autorizadas (backend/oracles)
    mapping(address => bool) public authorizedCallers;
    
    // Estadísticas
    uint256 public totalRecyclingEvents;
    uint256 public totalWeightRecycled; // en gramos
    mapping(bytes32 => uint256) public materialTotals; // Total por material
    
    // ========== EVENTS ==========
    event RecyclingRecorded(
        address indexed citizen,
        uint256 indexed nftId,
        uint256 weight,
        string materialType,
        string district,
        string qualityGrade,
        uint256 tokensMinted,
        string ipfsHash
    );
    
    event AuthorizedCallerAdded(address indexed caller);
    event AuthorizedCallerRemoved(address indexed caller);
    event PriceUpdated(string materialType, uint256 newPrice);
    event DistrictMultiplierUpdated(string district, uint256 newMultiplier);
    event EmergencyWithdraw(address indexed to, uint256 amount);
    
    // ========== MODIFIERS ==========
    modifier onlyAuthorized() {
        require(
            authorizedCallers[msg.sender] || msg.sender == owner(),
            "RecycleManager: Not authorized"
        );
        _;
    }
    
    modifier validAddress(address addr) {
        require(addr != address(0), "RecycleManager: Zero address");
        _;
    }
    
    // ========== CONSTRUCTOR ==========
    constructor(address _urbanCoin, address _wasteNFT) 
        Ownable(msg.sender) 
    {
        require(_urbanCoin != address(0), "UrbanCoin address required");
        require(_wasteNFT != address(0), "WasteNFT address required");
        
        urbanCoin = UrbanCoin(_urbanCoin);
        wasteNFT = WasteNFT(_wasteNFT);
        
        // Inicializar multiplicadores (usando bytes32 para eficiencia)
        districtMultiplier[MIRAFLORES] = 120;  // +20%
        districtMultiplier[SAN_ISIDRO] = 100;  // Base
        districtMultiplier[VILLA_MARIA] = 130; // +30%
        districtMultiplier[COMAS] = 150;       // +50%
        
        // Owner autorizado por defecto
        authorizedCallers[msg.sender] = true;
    }
    
    // ========== CORE FUNCTIONS ==========
    /**
     * @dev Registrar reciclaje con metadata IPFS
     * @param citizen Dirección del ciudadano
     * @param weight Peso en gramos
     * @param materialType Tipo de material
     * @param district Distrito de Lima
     * @param qualityGrade Calidad A/B/C
     * @param ipfsHash Hash IPFS del metadata
     * @return nftId ID del NFT generado
     * @return tokensMinted Tokens otorgados
     */
    function recordRecycling(
        address citizen,
        uint256 weight,
        string calldata materialType,
        string calldata district,
        string calldata qualityGrade,
        string calldata ipfsHash
    ) 
        external 
        onlyAuthorized 
        validAddress(citizen)
        nonReentrant
        returns (uint256 nftId, uint256 tokensMinted)
    {
        require(weight > 0, "RecycleManager: Weight must be positive");
        require(bytes(ipfsHash).length > 0, "RecycleManager: IPFS hash required");
        
        // Calcular tokens
        bytes32 materialHash = keccak256(abi.encodePacked(materialType));
        bytes32 districtHash = keccak256(abi.encodePacked(district));
        
        uint256 baseTokens = calculateBaseTokens(weight, materialHash);
        uint256 multiplier = getDistrictMultiplier(districtHash);
        
        tokensMinted = (baseTokens * multiplier) / 100;
        
        // Mintear tokens UrbanCoin
        urbanCoin.mint(citizen, tokensMinted, materialType);
        
        // Mintear certificado WasteNFT con IPFS
        nftId = wasteNFT.mintCertificate(
            citizen,
            weight,
            materialType,
            district,
            qualityGrade,
            ipfsHash
        );
        
        // Actualizar estadísticas
        totalRecyclingEvents++;
        totalWeightRecycled += weight;
        materialTotals[materialHash] += weight;
        
        // Emitir evento con todos los datos
        emit RecyclingRecorded(
            citizen,
            nftId,
            weight,
            materialType,
            district,
            qualityGrade,
            tokensMinted,
            ipfsHash
        );
        
        return (nftId, tokensMinted);
    }
    
    /**
     * @dev Batch processing para múltiples reciclajes
     */
    function recordBatchRecycling(
        address[] calldata citizens,
        uint256[] calldata weights,
        string[] calldata materialTypes,
        string[] calldata districts,
        string[] calldata qualityGrades,
        string[] calldata ipfsHashes
    ) 
        external 
        onlyAuthorized 
        nonReentrant
        returns (uint256[] memory nftIds, uint256 totalTokens)
    {
        require(citizens.length > 0, "RecycleManager: Empty batch");
        require(citizens.length == weights.length, "RecycleManager: Length mismatch");
        
        nftIds = new uint256[](citizens.length);
        totalTokens = 0;
        
        for (uint256 i = 0; i < citizens.length; i++) {
            (uint256 nftId, uint256 tokens) = recordRecycling(
                citizens[i],
                weights[i],
                materialTypes[i],
                districts[i],
                qualityGrades[i],
                ipfsHashes[i]
            );
            
            nftIds[i] = nftId;
            totalTokens += tokens;
        }
        
        return (nftIds, totalTokens);
    }
    
    // ========== CALCULATION FUNCTIONS ==========
    function calculateBaseTokens(uint256 weight, bytes32 materialHash) 
        public 
        view 
        returns (uint256) 
    {
        uint256 pricePerKg;
        
        if (materialHash == PLASTIC) {
            pricePerKg = pricePerKgPlastic;
        } else if (materialHash == PAPER) {
            pricePerKg = pricePerKgPaper;
        } else if (materialHash == GLASS) {
            pricePerKg = pricePerKgGlass;
        } else if (materialHash == METAL) {
            pricePerKg = pricePerKgMetal;
        } else {
            revert("RecycleManager: Invalid material type");
        }
        
        // weight en gramos, dividir por 1000 para kg
        return (weight * pricePerKg) / 1000;
    }
    
    function getDistrictMultiplier(bytes32 districtHash) 
        public 
        view 
        returns (uint256) 
    {
        uint256 multiplier = districtMultiplier[districtHash];
        return multiplier == 0 ? 100 : multiplier;
    }
    
    // ========== ADMIN FUNCTIONS ==========
    function addAuthorizedCaller(address caller) 
        external 
        onlyOwner 
        validAddress(caller)
    {
        require(!authorizedCallers[caller], "Already authorized");
        authorizedCallers[caller] = true;
        emit AuthorizedCallerAdded(caller);
    }
    
    function removeAuthorizedCaller(address caller) external onlyOwner {
        require(authorizedCallers[caller], "Not authorized");
        authorizedCallers[caller] = false;
        emit AuthorizedCallerRemoved(caller);
    }
    
    function updatePrice(string calldata materialType, uint256 newPrice) 
        external 
        onlyOwner 
    {
        require(newPrice > 0, "Price must be positive");
        bytes32 materialHash = keccak256(abi.encodePacked(materialType));
        
        if (materialHash == PLASTIC) {
            pricePerKgPlastic = newPrice;
        } else if (materialHash == PAPER) {
            pricePerKgPaper = newPrice;
        } else if (materialHash == GLASS) {
            pricePerKgGlass = newPrice;
        } else if (materialHash == METAL) {
            pricePerKgMetal = newPrice;
        } else {
            revert("Invalid material type");
        }
        
        emit PriceUpdated(materialType, newPrice);
    }
    
    function updateDistrictMultiplier(string calldata district, uint256 newMultiplier) 
        external 
        onlyOwner 
    {
        require(newMultiplier > 0, "Multiplier must be positive");
        bytes32 districtHash = keccak256(abi.encodePacked(district));
        districtMultiplier[districtHash] = newMultiplier;
        emit DistrictMultiplierUpdated(district, newMultiplier);
    }
    
    // ========== VIEW FUNCTIONS ==========
    function getMaterialPrice(string calldata materialType) 
        external 
        view 
        returns (uint256) 
    {
        bytes32 materialHash = keccak256(abi.encodePacked(materialType));
        
        if (materialHash == PLASTIC) {
            return pricePerKgPlastic;
        } else if (materialHash == PAPER) {
            return pricePerKgPaper;
        } else if (materialHash == GLASS) {
            return pricePerKgGlass;
        } else if (materialHash == METAL) {
            return pricePerKgMetal;
        }
        
        return 0;
    }
    
    function getMaterialTotal(string calldata materialType) 
        external 
        view 
        returns (uint256) 
    {
        bytes32 materialHash = keccak256(abi.encodePacked(materialType));
        return materialTotals[materialHash];
    }
    
    function getStats() 
        external 
        view 
        returns (
            uint256 events,
            uint256 totalWeight,
            uint256 plasticTotal,
            uint256 paperTotal,
            uint256 glassTotal,
            uint256 metalTotal
        ) 
    {
        return (
            totalRecyclingEvents,
            totalWeightRecycled,
            materialTotals[PLASTIC],
            materialTotals[PAPER],
            materialTotals[GLASS],
            materialTotals[METAL]
        );
    }
    
    function isCallerAuthorized(address caller) external view returns (bool) {
        return authorizedCallers[caller];
    }
    
    // ========== EMERGENCY FUNCTIONS ==========
    /**
     * @dev Retirar ETH enviado por error
     */
    function emergencyWithdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No ETH to withdraw");
        
        (bool success, ) = owner().call{value: balance}("");
        require(success, "Withdraw failed");
        
        emit EmergencyWithdraw(owner(), balance);
    }
    
    /**
     * @dev Retirar tokens ERC20 enviados por error
     */
    function recoverERC20(address tokenAddress, uint256 amount) external onlyOwner {
        IERC20(tokenAddress).transfer(owner(), amount);
    }
    
    // ========== FALLBACK FUNCTIONS ==========
    receive() external payable {}
    
    // ========== INTERFACE DEFINITIONS ==========
    interface IERC20 {
        function transfer(address to, uint256 amount) external returns (bool);
    }
}
