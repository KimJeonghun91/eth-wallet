const router = require('express').Router();
const wallet = require('./wallet');
const web3Middleware = require('../../my_modules/web3/web3')
const keyMiddleware = require('../../my_modules/getPK')
const web3ProviderMiddleware = require('../../my_modules/web3/web3Provider')

router.post('/newMnemonic',wallet.newMnemonic)

router.post('/newWallet',wallet.newWallet)

router.use('/getBalance',web3ProviderMiddleware)
router.post('/getBalance',wallet.getBalance)

router.use('/getPK',keyMiddleware);
router.post('/getPK',wallet.getPK)

router.use('/sendEth',web3ProviderMiddleware)
router.post('/sendEth',wallet.sendEth)

router.use('/getBalanceToken',web3ProviderMiddleware);
router.post('/getBalanceToken',wallet.getBalanceToken)

router.use('/sendToken',web3ProviderMiddleware);
router.post('/sendToken',wallet.sendToken)


// router.post('/getAbi',wallet.getAbi)

module.exports = router