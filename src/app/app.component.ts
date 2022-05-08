import { Component } from "@angular/core";
import CampaignFactoryInstance from "../campaignFactory";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "CodeSandbox";

  xyz() {
    console.log(Object.keys(CampaignFactoryInstance));
  }
}
