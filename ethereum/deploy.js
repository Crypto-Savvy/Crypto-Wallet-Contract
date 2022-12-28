const dotenv = require("dotenv").config();
const path = require("path");
const fs = require("fs");
const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const mnemonic = process.env.MNEMONIC;
const url = process.env.URL;
const compiledWallet = require("./build/Wallet.json");

const provider = new HDWalletProvider(mnemonic, url);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  const result = await new web3.eth.Contract(
    JSON.parse(compiledWallet.interface)
  )
    .deploy({ data: `0x${compiledWallet.bytecode}` })
    .send({ from: accounts[0] });

  console.log("Contract deployed to: ", result.options.address);
};
deploy();
