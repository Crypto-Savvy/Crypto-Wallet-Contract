const dotenv = require("dotenv").config();
import Web3 from "web3";

let web3;

const url = process.env.URL;
if (typeof window !== "undefined" && typeof window.web3 !== "undefined") {
  //in browser & has metamask
  web3 = new Web3(window.web3.currentProvider);
} else {
  // not on browser or no metamask
  const provider = new Web3.providers.HttpProvider(url);
  web3 = new Web3(provider);
}

export default web3;
