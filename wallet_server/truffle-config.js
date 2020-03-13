require('dotenv').config();

const PrivateKeyProvider = require('truffle-privatekey-provider')

const privatekey = "896186511e5bce55322be0d630c783d27e7baf6a0a8abb83b72d5c6937d1842b"
module.exports = {
  networks: {
    ropsten: {
      from: "0x1fb05d9972c52e9513daa5a1bff0ae26da40206c",
      provider: () =>
        new PrivateKeyProvider(
          privatekey.toString(),
          "https://ropsten.infura.io/v3/ea99edfbfe4943cd83c853f68d27ce89"),
      network_id: 3,
      gas: 5000000
    }
  }
};