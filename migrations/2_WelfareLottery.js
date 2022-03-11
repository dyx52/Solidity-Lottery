var WelfareLottery = artifacts.require("./WelfareLottery.sol");

module.exports = function(deployer) {
    deployer.deploy(WelfareLottery);
};
