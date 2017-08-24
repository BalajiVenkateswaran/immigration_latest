import { AppService } from '../../../services/app.service';
import {Component, OnInit, DoCheck} from '@angular/core';
import {MenuService} from "./menu.service";
import {QuestionnaireCommonService} from '../../immigrationview/petitions-tab/petition-details/questionnaires/common/questionnaire-common.service';

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
    private quespdfPages;
    private immidependents;
    private clientQuest;
    private immiQstnre;
    private manageuser;
    private immipetitionreports: boolean=true;
    private immicilentreports;
    private immiuserreports;
    public superuserstats: boolean = true;
    public superuserpayments: boolean;
    public superuserpetitions: boolean;
    public superuserclientreports: boolean;
    public superuserpetitins: boolean;
  constructor(private menuService: MenuService, private appservice: AppService,
    public questionnaireCommonService : QuestionnaireCommonService) {
      this.sideBarMenu = appservice.sideBarMenu;
    }
  clientDocClick() {
      this.clientdoctrue = !this.clientdoctrue;
  }
  immiPetDoc() {
      this.immipetitiondoc = !this.immipetitiondoc;
  }
    showquespdfpages() {
        this.quespdfPages = !this.quespdfPages;
    }
  petrportsclick() {
      this.immipetitionreports = !this.immipetitionreports;
  }
  clinetreportsclick() {
      this.immicilentreports = !this.immicilentreports;
  }
  userpetiitonsclick() {
      this.immiuserreports = !this.immiuserreports;
  }
  superuserstatsclick() {
      this.superuserstats = !this.superuserstats;
  }
  superuserpaymentsclick() {
      this.superuserpayments = !this.superuserpayments;
  }
  superuserpetionsclick() {
      this.superuserpetitions = !this.superuserpetitions;
  }
  superuserclientreportsclick() {
      this.superuserclientreports = !this.superuserclientreports;
  }
  superuserpetitonreport() {
      this.superuserpetitins = !this.superuserpetitins;
  }
  ngOnInit(): void {
      this.sideBarMenu = this.appservice.sideBarMenu;
      this.clientdoctrue = false;
      this.clientdep = false;
      this.immipetitiondoc = false;
      this.quespdfPages = false;
  }
  ngDoCheck(){
      this.sideBarMenu = this.appservice.sideBarMenu;
      this.docsideBarMenu = this.appservice.docsideBarMenu;
      this.clientdependents = this.appservice.clientdep;
      this.immidependents = this.appservice.immidep;
      this.clientQuest = this.appservice.clntqstn;
      this.immiQstnre = this.appservice.immiqstn;
  }
  checkForCurrentSBLink(sblink) {
      return this.appservice.currentSBLink == sblink;
  }
  highlightSBLink(sblink) {
      this.appservice.currentSBLink = sblink;
  }
}
