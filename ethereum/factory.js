const dotenv = require("dotenv").config();
import web3 from "./web3";
import CampaignFactory from "./build/WalletFactory.json";
const contractAddress = process.env.CONTRACT_ADDRESS;

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface, contractAddress)
);
instance.options.address = contractAddress;

export default instance;
