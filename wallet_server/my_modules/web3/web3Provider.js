var lightwallet = require("../eth-lightwallet");
const SignerProvider = require('ethjs-provider-signer')
const sign = require('ethjs-signer').sign;
const Eth = require('ethjs-query');

var fs = require('fs')
var util = require('util');
var readFile = util.promisify(fs.readFile)

const web3 = async (req, res, next) => {
    try {
        var wallet = await readFile("wallet.json")
        var keystore = await lightwallet.keystore.deserialize(wallet);

        var address = keystore.getAddresses()
        var privateKey;

        //private key 추출하기
        await keystore.keyFromPassword("123", (err, data) => {
            var key = keystore.exportPrivateKey(address.toString(), data)
            privateKey = '0x' + key
        })

        const provider = new SignerProvider('https://ropsten.infura.io/v3/ea99edfbfe4943cd83c853f68d27ce89', {
            signTransaction: (rawTx, cb) => cb(null, sign(rawTx, privateKey.toString())),
            accounts: (cb) => cb(null, [address.toString()]),
        });

        const eth = await new Eth(provider)
        req.eth = eth
        await eth.gasPrice(function (err, gas) {
            if (err) {
                console.log(err)
                res.json({ code: 999, err: "가스비 정보 조회 실패" })
            }
            console.log("####GASPRICE ::: ", gas.toString())
            req.gas = gas.toString()
            next()

        })


    } catch (err) {
        console.log(err)
    }
}

module.exports = web3