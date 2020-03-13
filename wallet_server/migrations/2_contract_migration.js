
const BasicToken = artifacts.require("./BasicToken.sol");

const _name = "minojsToken";
const _symbol = "mino";
const _decimals = 6;
const initialSupply = 10000;

module.exports = function (deployer) {
  deployer.deploy(BasicToken, _name, _symbol, _decimals, initialSupply);
};

