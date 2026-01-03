// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20; 

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

/**
 * @title WasteNFT
 * @dev NFT ERC-721 con metadata off-chain optimizada para certificados de reciclaje
 * @notice Certificado de trazabilidad "WasteCertificate" (WASTE) para UrbanRecycle Lima
 */
contract WasteNFT is ERC721, ERC721Enumerable, ERC721URIStorage, Ownable {
    // ========== STATE VARIABLES ==========
    uint256 private _nextTokenId;
    address public recycleManager;
    bool private _recycleManagerSet;
    
    // Estructura con datos esenciales on-chain
    struct CertificateData {
        uint256 weight;           // Peso en gramos
        string materialType;      // PLASTIC, PAPER, GLASS, METAL
        string district;          // Distrito de Lima
        uint256 timestamp;        // Block timestamp
        address citizen;         // Owner del NFT
        string qualityGrade;     // A, B, C
    }
    
    mapping(uint256 => CertificateData) private _certificates;
    mapping(address => uint256[]) private _citizenCertificates;
    
    // ========== EVENTS ==========
    event CertificateMinted(
        uint256 indexed tokenId,
        address indexed citizen,
        uint256 weight,
        string materialType,
        string district,
        string qualityGrade,
        string tokenURI
    );
    
    event RecycleManagerUpdated(address indexed manager);
    event BaseURIUpdated(string newBaseURI);
    
    // ========== CONSTRUCTOR ==========
    constructor() ERC721("WasteCertificate", "WASTE") Ownable(msg.sender) {
        _nextTokenId = 1; // Empezar en 1, 0 es reservado
        _recycleManagerSet = false;
    }
    
    // ========== MODIFIERS ==========
    modifier onlyRecycleManager() {
        require(msg.sender == recycleManager, "WasteNFT: Only RecycleManager");
        _;
    }
    
    modifier validAddress(address addr) {
        require(addr != address(0), "WasteNFT: Zero address");
        _;
    }
    
    // ========== MINT FUNCTIONS ==========
    /**
     * @dev Mint de certificado con metadata off-chain optimizada
     * @param citizen Ciudadano que recibe el NFT
     * @param weight Peso en gramos
     * @param materialType Tipo de material
     * @param district Distrito de Lima
     * @param qualityGrade Grado de calidad
     * @param tokenURI URI de metadata (IPFS hash)
     * @return tokenId del NFT creado
     */
    function mintCertificate(
        address citizen,
        uint256 weight,
        string calldata materialType,
        string calldata district,
        string calldata qualityGrade,
        string calldata tokenURI
    ) external onlyRecycleManager validAddress(citizen) returns (uint256) {
        require(weight > 0, "WasteNFT: Invalid weight");
        require(bytes(materialType).length > 0, "WasteNFT: Material required");
        require(bytes(tokenURI).length > 0, "WasteNFT: TokenURI required");
        
        uint256 tokenId = _nextTokenId;
        _nextTokenId++;
        
        // Almacenar datos on-chain
        _certificates[tokenId] = CertificateData({
            weight: weight,
            materialType: materialType,
            district: district,
            timestamp: block.timestamp,
            citizen: citizen,
            qualityGrade: qualityGrade
        });
        
        // Trackeo por ciudadano
        _citizenCertificates[citizen].push(tokenId);
        
        // Mint NFT con metadata off-chain
        _safeMint(citizen, tokenId);
        _setTokenURI(tokenId, tokenURI);
        
        emit CertificateMinted(
            tokenId,
            citizen,
            weight,
            materialType,
            district,
            qualityGrade,
            tokenURI
        );
        
        return tokenId;
    }
    
    /**
     * @dev Mint batch para múltiples reciclajes
     * @param citizens Array de direcciones
     * @param weights Array de pesos
     * @param materialTypes Array de materiales
     * @param districts Array de distritos
     * @param qualityGrades Array de calidades
     * @param tokenURIs Array de URIs
     * @return tokenIds Array de IDs creados
     */
    function mintBatchCertificates(
        address[] calldata citizens,
        uint256[] calldata weights,
        string[] calldata materialTypes,
        string[] calldata districts,
        string[] calldata qualityGrades,
        string[] calldata tokenURIs
    ) external onlyRecycleManager returns (uint256[] memory) {
        require(citizens.length > 0, "WasteNFT: Empty batch");
        require(citizens.length == weights.length, "WasteNFT: Length mismatch");
        
        uint256[] memory tokenIds = new uint256[](citizens.length);
        
        for (uint256 i = 0; i < citizens.length; i++) {
            tokenIds[i] = mintCertificate(
                citizens[i],
                weights[i],
                materialTypes[i],
                districts[i],
                qualityGrades[i],
                tokenURIs[i]
            );
        }
        
        return tokenIds;
    }
    
    // ========== ADMIN FUNCTIONS ==========
    function setRecycleManager(address manager) 
        external 
        onlyOwner 
        validAddress(manager) 
    {
        require(!_recycleManagerSet, "WasteNFT: Already set");
        recycleManager = manager;
        _recycleManagerSet = true;
        emit RecycleManagerUpdated(manager);
    }
    
    function updateRecycleManager(address newManager) 
        external 
        onlyOwner 
        validAddress(newManager) 
    {
        recycleManager = newManager;
        emit RecycleManagerUpdated(newManager);
    }
    
    // ========== VIEW FUNCTIONS ==========
    function getCertificateData(uint256 tokenId)
        external
        view
        returns (
            uint256 weight,
            string memory materialType,
            string memory district,
            uint256 timestamp,
            address citizen,
            string memory qualityGrade
        )
    {
        require(_exists(tokenId), "WasteNFT: Nonexistent token");
        CertificateData memory data = _certificates[tokenId];
        return (
            data.weight,
            data.materialType,
            data.district,
            data.timestamp,
            data.citizen,
            data.qualityGrade
        );
    }
    
    function getCitizenCertificates(address citizen)
        external
        view
        returns (uint256[] memory)
    {
        return _citizenCertificates[citizen];
    }
    
    function getCertificateCount() external view returns (uint256) {
        return _nextTokenId - 1;
    }
    
    function exists(uint256 tokenId) external view returns (bool) {
        return _exists(tokenId);
    }
    
    // ========== OVERRIDES ==========
    function _update(
        address to,
        uint256 tokenId,
        address auth
    ) internal override(ERC721, ERC721Enumerable) returns (address) {
        return super._update(to, tokenId, auth);
    }
    
    function _increaseBalance(
        address account, 
        uint128 value
    ) internal override(ERC721, ERC721Enumerable) {
        super._increaseBalance(account, value);
    }
    
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
    
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
    
    // ========== INTERNAL FUNCTIONS ==========
    function _exists(uint256 tokenId) internal view returns (bool) {
        return _ownerOf(tokenId) != address(0);
    }
    
    // ========== EMERGENCY FUNCTIONS ==========
    /**
     * @dev Recuperar tokens enviados por error (solo owner)
     */
    function recoverERC20(address tokenAddress, uint256 amount) external onlyOwner {
        IERC20(tokenAddress).transfer(owner(), amount);
    }
    
    function recoverERC721(address tokenAddress, uint256 tokenId) external onlyOwner {
        IERC721(tokenAddress).transferFrom(address(this), owner(), tokenId);
    }
}
