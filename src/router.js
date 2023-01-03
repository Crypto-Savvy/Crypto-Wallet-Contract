const dotenv = require("dotenv").config()
const express = require("express")
const router = express.Router()
const ethers = require("ethers")

const password = process.env.ENCRYPT_PASSWORD

router.route("/generateWallet").get(async (req, res) => {
    try {
        const wallet = ethers.Wallet.createRandom()
        const words = wallet.mnemonic.phrase
        const node = ethers.utils.HDNode.fromMnemonic(words)
        let account = node.derivePath("m/44'/60'/0'/0/0")
        res.status(200).send({
            words: words,
            address: wallet.address,
            account: account.address,
        })
    } catch (error) {
        res.status(400).send(error)
    }
})

router.route("/generateAddress").post(async (req, res) => {
    try {
        const node = ethers.utils.HDNode.fromMnemonic(req.body.words)
        let index = req.body.address_index
        let hdNode = node.derivePath(`m/44'/60'/0'/0/` + index)

        console.log(index)
        let wallet = new ethers.Wallet(hdNode.privateKey)
        res.status(200).send({
            account: wallet.address,
        })
    } catch (error) {
        res.status(400).send(error)
    }
})

router.route("/restoreWallet").post(async (req, res) => {
    try {
        const wallet = ethers.Wallet.fromMnemonic(req.body.words)

        res.status(200).send({
            wallet: wallet,
        })
    } catch (error) {
        res.status(400).send(error)
    }
})

router.route("/restoreNode").post(async (req, res) => {
    try {
        const node = ethers.utils.HDNode.fromMnemonic(req.body.words)

        res.status(200).send({
            node: node,
        })
    } catch (error) {
        res.status(400).send(error)
    }
})

async function saveWalletAsJson(wallet, password) {
    return wallet.encrypt(password)
}

async function getWalletFromJson(json, password) {
    return ethers.Wallet.fromEncryptedJson(json, password)
}

module.exports = router
