const Web3 = require("web3");
const ganache = require("ganache-cli");
const assert = require("assert");
const compiledWallet = require("../ethereum/build/Wallet.json");

const provider = ganache.provider();
const web3 = new Web3(provider);

let accounts;
let walletAddress;
let wallet;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  wallet = await new web3.eth.Contract(JSON.parse(compiledWallet))
    .deploy({ data: compiledWallet.evm.bytecode })
    .send({ from: accounts[0], gas: "1000000" });
});

describe("Wallet", () => {
  it("deploys a wallet", () => {
    assert.ok(wallet.options.address);
  });
});
