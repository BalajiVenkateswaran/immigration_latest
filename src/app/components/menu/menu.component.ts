import {Component, OnInit, DoCheck} from '@angular/core';
import {AppService} from "../../services/app.service";
import {MenuService} from "./menu.service";
@Component({
  selector: 'menu',
  viewProviders:[MenuService],
  templateUrl: 'menu.component.html'
})
export class MenuComponent implements OnInit {

    sideBarMenu: string;
    private docsideBarMenu: any;
    private orgNames: any;
    private clientdoctrue: any;
    private clientdep: any;
    private clientdependents;
    private immipetitiondoc;
    private immidependents;
    private clientQuest;
    private immiQstnre;
    private manageuser;
  constructor(private menuService: MenuService, private appservice: AppService) {
      this.sideBarMenu = appservice.sideBarMenu;
    }
  clientDocClick() {
      if (this.clientdoctrue == true) {
          this.clientdoctrue = false;
          return;
      }
      if (this.clientdoctrue == false) {
          this.clientdoctrue = true;
          return;
      }
  }
  immiPetDoc() {
      if (this.immipetitiondoc == true) {
          this.immipetitiondoc = false;
          return;
      }
      if (this.immipetitiondoc == false) {
          this.immipetitiondoc = true;
          return;
      }
  }
  ngOnInit(): void {
      this.sideBarMenu = this.appservice.sideBarMenu;
      this.clientdoctrue = false;
      this.clientdep = false;
      this.immipetitiondoc = false;
  }
  ngDoCheck(){
      this.sideBarMenu = this.appservice.sideBarMenu;
      this.docsideBarMenu = this.appservice.docsideBarMenu;
      this.clientdependents = this.appservice.clientdep;
      this.immidependents = this.appservice.immidep;
      this.clientQuest = this.appservice.clntqstn;
      this.immiQstnre = this.appservice.immiqstn;
      this.manageuser=this.appservice.manageUser
  }
  checkForCurrentSBLink(sblink) {
      return this.appservice.currentSBLink == sblink;
  }
  highlightSBLink(sblink) {
      this.appservice.currentSBLink = sblink;
  }
}
