import Web3 from "web3";

const provider = new Web3.providers.HttpProvider(
  "https://rinkeby.infura.io/v3/0cf52fce48db492282b6d25ad739f828"
);

const web3 = window.web3
  ? new Web3(window.web3.currentProvider)
  : new Web3(provider);

export default web3;
