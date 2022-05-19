import { Component } from "@angular/core";
import factory from "../campaignFactory";
import web3 from "../web3";
import { MessageService } from "primeng/api";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "CodeSandbox";
  campaigns = [];
  accounts = [];

  constructor(private messageService: MessageService) {}

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
        severity: "success",
        summary: "Service Message",
        detail: "Via MessageService"
      });
    }
  }
}
