import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CardModule } from "primeng/card";
import { ButtonModule } from "primeng/button";
import { MessageService } from "primeng/api";
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, CardModule, ButtonModule],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule {}
