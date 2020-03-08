

var lightwallet = require("../../my_modules/eth-lightwallet");
var fs = require('fs')
var util = require('util');
var readFile = util.promisify(fs.readFile)

var Web3 = require('web3')
var HookedWeb3Provider = require('hooked-web3-provider')


exports.newMnemonic = async (req, res) => {
    var mnemonic;
    try {
        mnemonic = lightwallet.keystore.generateRandomSeed();
        res.json({ mnemonic })
    } catch (err) {
        console.log(err)
    }
}

exports.newWallet = async (req, res) => {

    var password = req.body.password
    var mnemonic = req.body.mnemonic;
    try {
        lightwallet.keystore.createVault(
            {
                password: password,
                seedPhrase: mnemonic,
                hdPathString: "m/0'/0'/0'"
            },
            function (err, ks) {
                ks.keyFromPassword(password, function (err, pwDerivedKey) {
                    ks.generateNewAddress(pwDerivedKey, 1);

                    var address = (ks.getAddresses()).toString();
                    var keystore = ks.serialize();

                    fs.writeFile('wallet.json', keystore, function (err, data) {
                        if (err)
                            res.json({ code: 999, message: "실패" })
                        else
                            res.json({ code: 1, message: "성공" })
                    })
                });
            }
        );
    } catch (exception) {
        console.log("NewWallet ==>>>> " + exception);
    }
}

exports.getBalance = async (req, res) => {

    var web3 = req.web3
    var eth= 0;

    await web3.eth.getBalance((req.address.toString()), async (err, data) => {
        if (err) console.log(err);

        eth = data.toString()
    
      });
      res.json({code:1,eth:eth})

}