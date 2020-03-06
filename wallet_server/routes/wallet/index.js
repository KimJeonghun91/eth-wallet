const router = require('express').Router();
const wallet = require('./wallet');

router.post('/newMnemonic',wallet.newMnemonic)

router.post('/newWallet',wallet.newWallet)

module.exports = router