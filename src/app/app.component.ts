import { Component } from "@angular/core";
import factory from "../campaignFactory";
import web3 from "../web3";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "CodeSandbox";
  campaigns = [];
  accounts = [];

  async ngOnInit() {
    this.accounts = await web3.eth.requestAccounts();
    console.log(this.accounts);
  }

  async getDeployedCampaigns() {
    this.campaigns = await factory.methods.getDeployedCampaigns().call({});
    console.log(this.campaigns);
  }

  async createCampaign() {
    await factory.methods.createCampaign(1).send({
      from: this.accounts[0],
      gas: "10000000"
    });

    this.getDeployedCampaigns();
  }
}
