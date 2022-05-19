import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router, Params } from "@angular/router";
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

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe((params: Params) => {
      this.id = params.id;
    });
    this.campaignContract = this.getCampaignAsContract(
      this.id,
      require("../../builds/Campaign.json")
    );
  }

  async ngOnInit() {
    // [
    //   this.minAmnt,
    //   this.managerAddr,
    //   this.contributorsCount,
    //   this.balance,
    //   this.requestsCount
    // ]
    this.campaignDetails = await this.campaignContract.methods
      .getCampaignDetails()
      .call({
        from: window["accounts"][0]
      });

    console.log(this.campaignDetails[1]);
  }

  backToHomePage() {
    this.id = null;
    this.router.navigate(["/"]);
  }

  getCampaignAsContract(addr: string, campaign: any): any {
    return new web3.eth.Contract(campaign.abi, addr);
  }
}
