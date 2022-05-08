import { Component } from "@angular/core";
import factory from "../campaignFactory";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "CodeSandbox";

  async xyz() {
    const campaigns = await factory.methods.getDeployedCampaigns().call({});
    console.log(factory, campaigns);
  }
}
