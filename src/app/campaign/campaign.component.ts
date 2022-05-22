import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router, Params } from "@angular/router";
import { MessageService } from "primeng/api";
import web3 from "../../web3";

@Component({
  selector: "app-campaign",
  templateUrl: "./campaign.component.html",
  styleUrls: ["./campaign.component.css"]
})
export class CampaignComponent implements OnInit {
  id;
  campaignDetails;
  campaignContract: any;
  minAmnt;
  managerAddr;
  contributorsCount;
  balance;
  requestsCount;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService
  ) {
    this.route.params.subscribe((params: Params) => {
      this.id = params.id;
    });
    this.campaignContract = this.getCampaignAsContract(
      this.id,
      require("../../builds/Campaign.json")
    );
  }

  async ngOnInit() {
    this.campaignDetails = await this.campaignContract.methods
      .getCampaignDetails()
      .call({
        from: window["accounts"][0]
      });

    console.log(this.campaignDetails);
  }

  backToHomePage() {
    this.id = null;
    this.router.navigate(["/"]);
  }

  getCampaignAsContract(addr: string, campaign: any): any {
    return new web3.eth.Contract(campaign.abi, addr);
  }

  async addContributor(amnt: number) {
    try {
      await this.campaignContract.methods.addContributors().send({
        from: window["accounts"][1],
        value: amnt,
        gas: "10000000"
      });

      this.messageService.add({
        severity: "success",
        summary: "Added as a contributor"
      });
    } catch (e) {
      this.messageService.add({
        severity: "error",
        summary: "Failed to add as contributor"
      });
    } finally {
      this.ngOnInit();
    }
  }
}
