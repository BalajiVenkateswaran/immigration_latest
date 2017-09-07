import { AppService } from '../../../services/app.service';
import { Component, OnInit, DoCheck } from '@angular/core';
import { MenuService } from "./menu.service";
import { QuestionnaireCommonService } from '../../immigrationview/petitions-tab/petition-details/questionnaires/common/questionnaire-common.service';

@Component({
    selector: 'menu',
    viewProviders: [MenuService],
    templateUrl: 'menu.component.html'
})
export class MenuComponent implements OnInit {
    userDetailsClicked: boolean;

    sideBarMenu: string;
    private docsideBarMenu: any;
    private orgNames: any;
    public clientdependents: boolean;
    public immipetitiondoc: boolean;
    public quespdfPages: boolean;
    public immidependents;
    public clientQuest: boolean;
    public manageUser: boolean;
    private immipetitionreports: boolean = true;
    private immicilentreports;
    private immiuserreports;
    public superuserstats: boolean = true;
    public superuserpayments: boolean;
    public superuserpetitions: boolean;
    public superuserclientreports: boolean;
    public superuserpetitins: boolean;
    public immiQstnre: boolean;
    constructor(private menuService: MenuService, private appservice: AppService,
        public questionnaireCommonService: QuestionnaireCommonService) {
        this.sideBarMenu = appservice.sideBarMenu;
    }
    ngOnInit(): void {
        this.sideBarMenu = this.appservice.sideBarMenu;
    }
    ngDoCheck() {
        this.sideBarMenu = this.appservice.sideBarMenu;
        this.docsideBarMenu = this.appservice.docsideBarMenu;
        if(this.manageUser && this.appservice.currentSBLink != "User"){
            this.manageUser = false;
        }
        if(this.userDetailsClicked){
            this.manageUser = true;
        }
    }
    //immigration sidebar 
    immiQstnreclick() {
        this.immiQstnre = !this.immiQstnre;
        this.immipetitiondoc = false;
    }
    immiPetDoc() {
        this.immipetitiondoc = !this.immipetitiondoc;
        this.immiQstnre = false;
    }
    immidependentsclick() {
        this.immidependents = !this.immidependents;
    }
    manageacntuserclick() {
          this.manageUser = !this.manageUser;
          this.userDetailsClicked=false;

    }
    userDetailsClick(){
        this.userDetailsClicked = true;
    }
    petrportsclick() {
        this.immipetitionreports = !this.immipetitionreports;
        this.immicilentreports = false;
        this.immiuserreports = false;
    }
    clinetreportsclick() {
        this.immicilentreports = !this.immicilentreports;
        this.immiuserreports = false;
        this.immipetitionreports = false;
    }
    userpetiitonsclick() {
        this.immiuserreports = !this.immiuserreports;
        this.immipetitionreports = false;
        this.immicilentreports = false;
    }
    //clientview sidebar
    clientDepClick() {
        this.clientdependents = !this.clientdependents;
    }
    clientquestionaireclick() {
        this.clientQuest = !this.clientQuest;
    }
    //super user sidebar
    showquespdfpages() {
        this.quespdfPages = !this.quespdfPages;
    }
    superuserpetionsclick() {
        this.superuserpetitions = !this.superuserpetitions;
        this.superuserclientreports = false;
        this.superuserpetitins = false;
    }
    superuserclientreportsclick() {
        this.superuserclientreports = !this.superuserclientreports;
        this.superuserpetitions = false;
        this.superuserpetitins = false;
    }
    superuserpetitonreport() {
        this.superuserpetitins = !this.superuserpetitins;
        this.superuserclientreports = false;
        this.superuserpetitions = false;
    }
    superuserstatsclick() {
        this.superuserstats = !this.superuserstats;
    }
    superuserpaymentsclick() {
        this.superuserpayments = !this.superuserpayments;
    }
    checkForCurrentSBLink(sblink) {
        return this.appservice.currentSBLink == sblink;
    }
    highlightSBLink(sblink) {
        this.appservice.currentSBLink = sblink;
    }
}
