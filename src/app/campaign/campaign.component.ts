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
  campaignContract: any;

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
    const count = await this.campaignContract.methods.contributorsCount().call({
      from: window["accounts"][0]
    });

    const manager = await this.campaignContract.methods.manager().call({
      from: window["accounts"][0]
    });

    const isContributor = await this.campaignContract.methods
      .contributors(window["accounts"][0])
      .call({
        from: window["accounts"][0]
      });

    console.log(isContributor);
  }

  backToHomePage() {
    this.id = null;
    this.router.navigate(["/"]);
  }

  getCampaignAsContract(addr: string, campaign: any): any {
    return new web3.eth.Contract(campaign.abi, addr);
  }
}
