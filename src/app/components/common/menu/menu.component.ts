import { AppService } from '../../../services/app.service';
import { Component, OnInit, DoCheck } from '@angular/core';
import { MenuService } from "./menu.service";
import { QuestionnaireCommonService } from '../../immigrationview/petitions-tab/petition-details/questionnaires/common/questionnaire-common.service';
import { Subscription } from 'rxjs/Subscription';


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
    submenuclick(menu) {
        this.immiQstnre = false;
        this.immipetitiondoc = false;
        this.immidependents = false;
        this.manageUser = false;
        this.immipetitionreports = false;
        this.immicilentreports = false;
        this.immiuserreports = false;
        this.clientdependents = false;
        this.clientQuest = false;
        this.quespdfPages = false;
        this.superuserpetitions = false;
        this.superuserclientreports = false;
        this.superuserpetitins = false;
        this.superuserstats = false;
        this.superuserpayments = false;
        if (menu == "immiQstnre") {
            this.immiQstnre = true;
        }
        if (menu == "immipetitiondoc") {
            this.immipetitiondoc = true;
        }
        if (menu == "immidependents") {
            this.immidependents = true;
        }
        if (menu == "manageUser") {
            this.manageUser = true;
        }
        if (menu == "immipetitionreports") {
            this.immipetitionreports = true;
        }
        if (menu == "immicilentreports") {
            this.immicilentreports = true;
        }
        if (menu == "clientdependents") {
            this.clientdependents = true;
        }
        if (menu == "clientQuest") {
            this.clientQuest = true;
        }
        if (menu == "superuserpetitions") {
            this.superuserpetitions = true;
        }
        if (menu == "superuserclientreports") {
            this.superuserclientreports = true;
        }
        if (menu == "superuserpetitins") {
            this.superuserpetitins = true;
        }
      
    }
    checkForCurrentSBLink(sblink) {
        return this.appservice.currentSBLink == sblink;
    }
    highlightSBLink(sblink) {
        this.appservice.currentSBLink = sblink;
    }
}
