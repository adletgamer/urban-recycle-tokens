// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract WasteNFT is ERC721 {
    // Manual counter instead of deprecated Counters library
    uint256 private _nextTokenId = 1;
    
    struct WasteData {
        uint256 weight; // en gramos
        string materialType; // "PLASTIC", "PAPER", etc.
        string district; // "MIRAFLORES", "VILLA_MARIA"
        uint256 timestamp;
        address citizen;
        string qualityGrade; // "A", "B", "C"
    }
    
    mapping(uint256 => WasteData) public wasteData;
    
    // Variable para el contrato autorizado (RecycleManager)
    address public recycleManager;
    
    constructor() ERC721("WasteCertificate", "WASTE") {}
    
    function mintWasteCertificate(
        address citizen,
        uint256 weight,
        string memory materialType,
        string memory district,
        string memory qualityGrade
    ) external returns (uint256) {
        require(msg.sender == recycleManager, "Only RecycleManager can mint");
        
        uint256 newTokenId = _nextTokenId;
        _nextTokenId++;
        
        _mint(citizen, newTokenId);
        
        wasteData[newTokenId] = WasteData({
            weight: weight,
            materialType: materialType,
            district: district,
            timestamp: block.timestamp,
            citizen: citizen,
            qualityGrade: qualityGrade
        });
        
        return newTokenId;
    }
    
    function setRecycleManager(address _recycleManager) external {
        require(recycleManager == address(0), "Already set");
        recycleManager = _recycleManager;
    }
    
    // Function to get current token ID (useful for frontend)
    function getCurrentTokenId() external view returns (uint256) {
        return _nextTokenId - 1;
    }
}
