// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract UrbanCoin is ERC20, Ownable {
    // Mapeo de direcciones autorizadas para mintear
    mapping(address => bool) public minters;
    
    // Evento para tracking
    event TokensMinted(address indexed to, uint256 amount, string materialType);
    
    constructor() ERC20("UrbanCoin Lima", "URBL") Ownable(msg.sender) {
        // Mint inicial para tesorería municipal
        _mint(msg.sender, 1000000 * 10**decimals()); // 1 millón tokens
    }
    
    // Solo el owner o minters autorizados pueden mint
    function mint(address to, uint256 amount, string memory materialType) 
        external 
        onlyMinter 
    {
        _mint(to, amount);
        emit TokensMinted(to, amount, materialType);
    }
    
    // Autorizar nuevas direcciones para mintear
    function addMinter(address minter) external onlyOwner {
        minters[minter] = true;
    }
    
    modifier onlyMinter() {
        require(minters[msg.sender] || msg.sender == owner(), "Not authorized");
        _;
    }
    
    // Función para quemar tokens (al canjear)
    function burn(uint256 amount) external {
        _burn(msg.sender, amount);
    }
}
