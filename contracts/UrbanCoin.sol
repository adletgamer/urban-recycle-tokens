// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;  // Cambiar a 0.8.20 que es más estable

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

/**
 * @title RecycleManager
 * @dev Contrato orquestador principal para UrbanRecycle Lima
 */
contract RecycleManager is Ownable {
    
    // ========== CONSTANTS ==========
    bytes32 public constant PLASTIC = keccak256("PLASTIC");
    bytes32 public constant PAPER = keccak256("PAPER");
    bytes32 public constant GLASS = keccak256("GLASS");
    bytes32 public constant METAL = keccak256("METAL");
    
    bytes32 public constant MIRAFLORES = keccak256("MIRAFLORES");
    bytes32 public constant SAN_ISIDRO = keccak256("SAN_ISIDRO");
    bytes32 public constant VILLA_MARIA = keccak256("VILLA_MARIA");
    bytes32 public constant COMAS = keccak256("COMAS");
    
    // ========== STATE VARIABLES ==========
    IERC20 public urbanCoin;
    address public wasteNFT;
    
    mapping(address => bool) public authorizedCallers;
    
    // Usar bytes32 para comparaciones eficientes
    mapping(bytes32 => uint256) public basePrices; // tokens por kg
    mapping(bytes32 => uint256) public districtMultipliers;
    
    // ========== EVENTS ==========
    event RecyclingRecorded(
        address indexed citizen,
        uint256 weight,
        string materialType,
        string district,
        uint256 tokensRewarded,
        uint256 timestamp
    );
    
    event AuthorizedCallerAdded(address indexed caller);
    event PriceUpdated(string materialType, uint256 newPrice);
    event MultiplierUpdated(string district, uint256 newMultiplier);
    
    // ========== CONSTRUCTOR ==========
    constructor(address _urbanCoin) Ownable(msg.sender) {
        require(_urbanCoin != address(0), "UrbanCoin address required");
        urbanCoin = IERC20(_urbanCoin);
        
        // Inicializar precios base (tokens por kg)
        basePrices[PLASTIC] = 10;   // 10 tokens/kg
        basePrices[PAPER] = 8;      // 8 tokens/kg
        basePrices[GLASS] = 5;      // 5 tokens/kg
        basePrices[METAL] = 15;     // 15 tokens/kg
        
        // Inicializar multiplicadores (porcentaje)
        districtMultipliers[MIRAFLORES] = 120;  // +20%
        districtMultipliers[SAN_ISIDRO] = 100;  // Base
        districtMultipliers[VILLA_MARIA] = 130; // +30%
        districtMultipliers[COMAS] = 150;       // +50%
        
        authorizedCallers[msg.sender] = true;
    }
    
    // ========== MODIFIERS ==========
    modifier onlyAuthorized() {
        require(authorizedCallers[msg.sender], "Not authorized");
        _;
    }
    
    modifier validAddress(address addr) {
        require(addr != address(0), "Zero address not allowed");
        _;
    }
    
    // ========== CORE FUNCTIONS ==========
    function recordRecycling(
        address citizen,
        uint256 weight, // en gramos
        string calldata materialType,
        string calldata district,
        string calldata qualityGrade
    ) external onlyAuthorized validAddress(citizen) returns (uint256 tokens) {
        require(weight > 0, "Weight must be positive");
        
        // Calcular tokens
        bytes32 materialHash = keccak256(abi.encodePacked(materialType));
        bytes32 districtHash = keccak256(abi.encodePacked(district));
        
        uint256 baseTokens = calculateBaseTokens(weight, materialHash);
        uint256 multiplier = getMultiplier(districtHash);
        
        tokens = (baseTokens * multiplier) / 100;
        
        // Emitir evento (simulamos el mint ya que UrbanCoin maneja eso)
        emit RecyclingRecorded(
            citizen,
            weight,
            materialType,
            district,
            tokens,
            block.timestamp
        );
        
        return tokens;
    }
    
    function calculateBaseTokens(uint256 weight, bytes32 materialHash) 
        public 
        view 
        returns (uint256) 
    {
        uint256 pricePerKg = basePrices[materialHash];
        require(pricePerKg > 0, "Invalid material type");
        
        // weight en gramos -> dividir por 1000 para kg
        return (weight * pricePerKg) / 1000;
    }
    
    function getMultiplier(bytes32 districtHash) public view returns (uint256) {
        uint256 multiplier = districtMultipliers[districtHash];
        return multiplier == 0 ? 100 : multiplier;
    }
    
    // ========== ADMIN FUNCTIONS ==========
    function addAuthorizedCaller(address caller) 
        external 
        onlyOwner 
        validAddress(caller) 
    {
        authorizedCallers[caller] = true;
        emit AuthorizedCallerAdded(caller);
    }
    
    function removeAuthorizedCaller(address caller) external onlyOwner {
        authorizedCallers[caller] = false;
    }
    
    function updatePrice(string calldata materialType, uint256 newPrice) 
        external 
        onlyOwner 
    {
        require(newPrice > 0, "Price must be positive");
        bytes32 materialHash = keccak256(abi.encodePacked(materialType));
        basePrices[materialHash] = newPrice;
        emit PriceUpdated(materialType, newPrice);
    }
    
    function updateMultiplier(string calldata district, uint256 newMultiplier) 
        external 
        onlyOwner 
    {
        require(newMultiplier > 0, "Multiplier must be positive");
        bytes32 districtHash = keccak256(abi.encodePacked(district));
        districtMultipliers[districtHash] = newMultiplier;
        emit MultiplierUpdated(district, newMultiplier);
    }
    
    function setWasteNFT(address _wasteNFT) 
        external 
        onlyOwner 
        validAddress(_wasteNFT) 
    {
        wasteNFT = _wasteNFT;
    }
    
    function setUrbanCoin(address _urbanCoin) 
        external 
        onlyOwner 
        validAddress(_urbanCoin) 
    {
        urbanCoin = IERC20(_urbanCoin);
    }
    
    // ========== VIEW FUNCTIONS ==========
    function getPrice(string calldata materialType) 
        external 
        view 
        returns (uint256) 
    {
        bytes32 materialHash = keccak256(abi.encodePacked(materialType));
        return basePrices[materialHash];
    }
    
    function isAuthorized(address caller) external view returns (bool) {
        return authorizedCallers[caller];
    }
    
    // Función para recibir MATIC (opcional)
    receive() external payable {}
}
