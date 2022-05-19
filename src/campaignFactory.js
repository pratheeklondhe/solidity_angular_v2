import web3 from "./web3";
import * as CampaignFactory from "./builds/CampaignFactory.json";

const CampaignFactoryInstance = new web3.eth.Contract(
  CampaignFactory.abi,
  "0x980036445bcBa412D8B3E8FcfA91CA92D43C24AD"
);

//  "0x68F4D7e49595Aa7B66CdA8ce9b32D8e6FF362207"
// "0xf859bAA034739C74b7cbd6eDAe74DB078aCeCBF4"

export default CampaignFactoryInstance;
