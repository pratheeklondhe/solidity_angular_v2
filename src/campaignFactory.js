import web3 from "./web3";
import * as CampaignFactory from "./builds/CampaignFactory.json";

const CampaignFactoryInstance = new web3.eth.Contract(
  CampaignFactory.abi,
  "0x68F4D7e49595Aa7B66CdA8ce9b32D8e6FF362207"
);

console.log("fdsfdsfds", CampaignFactoryInstance);

export default CampaignFactoryInstance;
