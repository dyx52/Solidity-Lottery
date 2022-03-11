const path = require("path");

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    develop: {
      port: 8545
    },
    ganacheNet: {
      host: 'https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
      port: 7545,
      network_id: "*"
    }
  },
  compilers: {
    solc: {
      version: "0.8.0",     // solidity 版本指定
    }
  },
};
