pragma solidity ^0.5.0;

import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol";
import "../node_modules/@openzeppelin/contracts/ownership/Ownable.sol";

contract BasicToken is ERC20,ERC20Detailed,Ownable{
 
  constructor(string memory name,string memory symbol,uint8 decimals,uint256 initialSupply) 
    public ERC20Detailed(name,symbol,decimals){
    _mint(owner(), initialSupply*(10**uint256(decimals)));
  }
}
