const BasicTokenAbi = require('../../build/contracts/BasicToken.json')

exports.getBalanceToken = async (req, res) => {
    const web3 = req.web3

    var minojsInstance = await new web3.eth.Contract(
        BasicTokenAbi.abi,
        "0xc8419bd91851426cc52a0cebacd23e6b8ca97dfb"
    )
    minojsInstance.methods.balanceOf("0x1fb05d9972c52e9513daa5a1bff0ae26da40206c").call().then(data => {
        console.log(data)
        res.send(data)

    })

}


exports.sendToken = async (req, res) => {
    const web3 = req.web3

    var minojsInstance = new web3.eth.Contract(
        BasicTokenAbi.abi,
        "0xc8419bd91851426cc52a0cebacd23e6b8ca97dfb"
    )

    var gasPrice = req.gas

    minojsInstance.methods.transfer("0x44c1777E162EC4a4b3b38861Fd7e01B45E1233cE", parseInt(1000000000)).send(
        { from: "0x1fb05d9972c52e9513daa5a1bff0ae26da40206c", gasPrice: gasPrice*1.5, gas: 100000 },
        function (err, txhash) {
            try {
              console.log(txhash)
              res.send(txhash)
            } catch (err) {
                console.log("Send Token Error ==>>>>" + err.toString());
                res.json({ code: 310, err: err.toString() });
            }
        }
    );
}