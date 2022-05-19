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
    this.accounts = await web3.eth.requestAccounts();
    console.log(this.accounts);
    this.getDeployedCampaigns();
  }

  async getDeployedCampaigns() {
    this.campaigns = await factory.methods.getDeployedCampaigns().call({});
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

  viewCampaign() {
    this.router.navigate(["/camp"]);
  }
}
