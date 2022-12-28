import web3 from "./web3";
import Wallet from "./build/Wallet.json";

export default (address) => {
  const contract = new web3.eth.Contract(JSON.parse(Wallet.interface, address));
  contract.options.address = address;
  return contract;
};
