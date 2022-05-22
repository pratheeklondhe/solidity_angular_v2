import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import factory from "../../campaignFactory";
import web3 from "../../web3";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  campaigns = [];
  accounts = [];

  constructor(private router: Router, private messageService: MessageService) {}

  async ngOnInit() {
    try {
      this.accounts = await web3.eth.requestAccounts();
      console.log(this.accounts);
      window["accounts"] = this.accounts;
      this.getDeployedCampaigns();
    } catch (e) {
      this.messageService.add({
        severity: "error",
        summary: "Failed to get Accounts"
      });
    }
  }

  async getDeployedCampaigns() {
    try {
      this.campaigns = await factory.methods.getDeployedCampaigns().call({});
    } catch (e) {
      this.messageService.add({
        severity: "error",
        summary: "Failed to get Campaign"
      });
    }
  }

  async createCampaign() {
    try {
      await factory.methods.createCampaign(1).send({
        from: this.accounts[0],
        gas: "10000000"
      });

      this.getDeployedCampaigns();
    } catch (e) {
      this.messageService.add({
        severity: "error",
        summary: "Failed to create Campaign"
      });
    }
  }

  viewCampaign(campaign: string) {
    this.router.navigate(["/camp", campaign]);
  }
}
