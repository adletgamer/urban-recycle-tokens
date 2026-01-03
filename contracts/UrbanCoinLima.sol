// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// Contrato adaptado a realidad limeña
contract UrbanCoinLima is ERC20, Ownable {
    // Valores basados en mercado real de Lima
    uint256 public constant plasticPrice = 0.5 ether; // S/ 0.50 por kg
    uint256 public constant paperPrice = 0.3 ether;   // S/ 0.30 por kg
    uint256 public constant glassPrice = 0.2 ether;   // S/ 0.20 por kg
    uint256 public constant metalPrice = 1.0 ether;   // S/ 1.00 por kg
    
    // Tipos de materiales
    enum MaterialType {
        PLASTIC,
        PAPER,
        GLASS,
        METAL
    }

    // Distritos de Lima con diferentes incentivos
    enum District {
        MIRAFLORES,    // Alto incentivo
        SAN_ISIDRO,    // Medio incentivo  
        VILLA_MARIA,   // Alto incentivo + bono social
        COMAS          // Bono de crecimiento
    }
    
    // Multiplicadores por distrito
    mapping(District => uint256) public districtMultipliers;
    
    constructor() ERC20("UrbanCoinLima", "UCL") Ownable(msg.sender) {
        districtMultipliers[District.MIRAFLORES] = 120; // +20%
        districtMultipliers[District.SAN_ISIDRO] = 100; // Base
        districtMultipliers[District.VILLA_MARIA] = 130; // +30%
        districtMultipliers[District.COMAS] = 150; // +50% bono crecimiento
    }
    
    function calculateReward(
        uint256 weight,
        MaterialType material,
        District district
    ) public view returns (uint256) {
        uint256 basePrice;
        
        if (material == MaterialType.PLASTIC) basePrice = plasticPrice;
        else if (material == MaterialType.PAPER) basePrice = paperPrice;
        else if (material == MaterialType.GLASS) basePrice = glassPrice;
        else if (material == MaterialType.METAL) basePrice = metalPrice;
        
        uint256 reward = weight * basePrice;
        uint256 multiplier = districtMultipliers[district];
        
        return reward * multiplier / 100;
    }

    function mintReward(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}
