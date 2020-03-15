var lightwallet = require("../../my_modules/eth-lightwallet");

var fs = require('fs')

exports.newMnemonic = async (req, res) => {
    var mnemonic;
    try {
        mnemonic = lightwallet.keystore.generateRandomSeed();
        res.json({ mnemonic })
    } catch (err) {
        console.log(err)
    }
}

exports.getPK = async (req, res) => {
    await console.log(req.pk)
    res.send(req.pk)
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

    var web3 = req.web3;
    var eth = 0;
    var address = req.address

    await web3.eth.getBalance(address.toString(), async (err, data) => {
        if (err) console.log(err);
        eth = data.toString()
    });
    res.json({ code: 1, eth: eth })

}

// exports.sendEth = async (req, res) => {

//     var web3 = req.web3;
//     var fromAddress = req.address;
//     var toAddress = req.body.toAddress
//     var gasPrice = req.gasPrice;
//     var value = req.body.value;

//     web3.eth.sendTransaction({
//         from: fromAddress.toString(),
//         to: toAddress.toString(),
//         value: value,
//         gasPrice: gasPrice,
//         gas: 21000
//     }, function (err, txhash) {
//         console.log(txhash)
//         res.json({ code: 1, txhash })
//     });

// }

exports.sendEth = async (req, res) => {

    var gasPrice = req.gas

    await req.eth.sendTransaction({
        from: "0x1fb05d9972c52e9513daa5a1bff0ae26da40206c",
        to: "0xEC4188020fF2683F983CCce94a7F197D98336727",
        gas: 50000,
        gasPrice: gasPrice * 1.5,
        data: "0x",
        value: 100000000000000,
    }, function (err, tx) {
        if (err)
            console.log(err)
        res.json({ code: 1, tx: tx })
    })

}

exports.getAbi = async (req, res) => {
    const contract = JSON.parse(fs.readFileSync('build/contracts/CustomToken.json', 'utf8'))
    console.log(JSON.stringify(contract.abi))
    res.send(JSON.stringify(contract.abi))
}

