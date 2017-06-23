
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {User} from "../models/user";

@Injectable()
export class AppService {

    private _menuSlider: boolean;
    private _sideBarMenu: string;
    private _documentSideMenu;
    private _orgNamesMenu;
    private _getorgmenu;
    private getorgmenu;
    public docsidemenu;
    public orgnamemenu;
    private _user: User;
    public _currentPage: string;
    public _applicationViewMode: string;
    private _accountId: string;
    private _orgId: string;
    private _clientId: string;
    private _petitionId: string;
    private _isBurgerMenuVisible: boolean;
    private _dependents: any[] = [];
    private _dependentsClient: any[] = [];
    private _clientViewDependents: any[] = [];
    private _selectedOrgClienttId: string;
    private _petitionDetails: string;
    private _firstName: string;
    private _lastName: string;
    private _questionnaireName: any[] = [];
    private _clientFirstName: string;
    private _clientlastName: string;
    public QuestionnaireName: string;
    public formname: string;
    private _petitionfirstName: string;
    private _petitionlastName: string;
    private _formId: string;
    private _formList: any[] = [];
    public _questionarydependent: any[] = [];
    private _questionaryName:string;
    private _currentTab: string;
    private _currentSBLink: string;
    public addDependents: any = {};
    public newclitem: any = {};
    public clientdep: boolean = false;
    public immidep: boolean = false;
    public clntqstn: boolean = false;
    public immiqstn: boolean = false;
    public orgClientId;
    public addNewDocExp: any = {};
    public _subtypes: any[] = [];

    public neworgitem: any = {};
    public newQuestionnaireitem: any = {};
    public newpetitionitem: any = {};
    public newvisaitem: any = {};
    public addArrDeparture: any = {};
    public addUsers: any = {};
    public addAdress: any = {};
    public addClientNewDocExp: any = {};
    public addNewVisa: any = {};

    constructor(private _router: Router) { }

    allsubtypesarray(allSubTypes) {
        this._subtypes = allSubTypes;
    }

    get subtypesarray() {
        return this._subtypes;
    }

    destroy() {
        this._menuSlider=null;
        this._sideBarMenu=null;
        this._documentSideMenu = null;
        this._orgNamesMenu = null;
        this._getorgmenu = null;
        this.getorgmenu = null;
        this.docsidemenu = null;
        this.orgnamemenu = null;
        this._user = null;
        this._currentPage = null;
        this._applicationViewMode = null;
        this._accountId = null;
        this._orgId = null;
        this._clientId = null;
        this._petitionId = null;
        this._isBurgerMenuVisible = null;
        this._dependents = [];
        this._dependentsClient = [];
        this._clientViewDependents = [];
        this._selectedOrgClienttId = null;
        this._petitionDetails = null;
        this._firstName = null;
        this._lastName = null;
        this._questionnaireName = [];
        this._clientFirstName = null;
        this._clientlastName = null;

        this._petitionfirstName = null;
        this._petitionlastName = null;
        this._formId = null;
        this._formList = [];
        this._questionarydependent = [];
        this._questionaryName = null;
        this._currentTab = null;
        this._currentSBLink = null;
        this.clientdep = false;
        this.immidep = false;
        this.clntqstn = false;
        this.immiqstn = false;
        this.orgClientId = null;
    }
    public moveToPageWithParams(pageLink, params) {
        if (pageLink != this._currentPage) {
            this._currentPage = "";
        }
        this._currentPage = pageLink;
        this._router.navigate([pageLink, params], { skipLocationChange: true });
        this.updatePageLinkFlags(pageLink);
    }

    public moveToPage(pageLink) {

        if (pageLink != this._currentPage) {
            this._currentPage = "";
        }
        this._currentPage = pageLink;
        this._router.navigate([pageLink], { skipLocationChange: true });
        this.updatePageLinkFlags(pageLink);
    }

    private updatePageLinkFlags(pageLink){
      if (pageLink == "clientview-dependents") {
          if (this.clientdep == true) {
              this.clientdep = false;
              return;
          }
          if (this.clientdep == false) {
              this.clientdep = true;
              return;
          }
      }
      if (pageLink == "immigrationview-dependents") {
          if (this.immidep == true) {
              this.immidep = false;
              return;
          }
          if (this.immidep == false) {
              this.immidep = true;
              return;
          }
      }
      if (pageLink == "clientview-Questionnaries") {
          if (this.clntqstn == true) {
              this.clntqstn = false;
              return;
          }
          if (this.clntqstn == false) {
              this.clntqstn = true;
              return;
          }
      }
      if (pageLink == "immigrationview-questionnaire") {
          if (this.immiqstn == true) {
              this.immiqstn = false;
              return;
          }
          if (this.immiqstn == false) {
              this.immiqstn = true;
              return;
          }
      }
    }

    private moveToQuestionnaire(questionnaireData) {
        this.QuestionnaireName = questionnaireData.questionnaireName;
        for (var i = 0; i < this._formList.length; i++) {
            if (questionnaireData.formId == this._formList[i].applicationFormsId) {
                var selectedFormName = this._formList[i].formName;
                this.formname =selectedFormName;
            }
        }
        if (this._applicationViewMode == "Client"){
            var selectedFormName = questionnaireData.formName;
        }

        var pageName = "";
        if (selectedFormName == "I-129") {
            if(this._applicationViewMode == "Immigration"){
                pageName = 'questionnaire-i129';
            } else {
               pageName = 'questionnaire-i129clientView';
            }
        }
        else if (selectedFormName == "I-129 DC") {
              if(this._applicationViewMode == "Immigration"){
                 pageName = 'questionnaire-i129dc';
              }
        }
        else {
            if(this._applicationViewMode == "Immigration"){
                pageName = 'questionnaire-i129h';
            } else {
               pageName = 'questionnaire-i129hclientView';
            }
        }
        this._router.navigate([pageName, questionnaireData.questionnaireId], { skipLocationChange: true });
    }
    private finalList;
    get questionaryName(): string {
        return this._questionaryName;
    }
    set questionaryName(_questionaryName: string) {
        this._questionaryName = _questionaryName;
    }
    get dependentsname(): any[] {
        return this._questionarydependent;
    }
    set dependentsname(_questionarydependent: any[]) {
        this._questionarydependent = _questionarydependent;
    }
    get applicationViewMode(): string {
        return this._applicationViewMode;
    }

    set applicationViewMode(applicationViewMode: string) {
        this._applicationViewMode = applicationViewMode;
    }

    get menuSlider(): boolean {
        return this._menuSlider;
    }

    set menuSlider(value: boolean) {
        this._menuSlider = value;
    }

    get user(): User {
        return this._user;
    }

    set user(value: User) {
        this._user = value;
    }


    get petitDetails(): string {
        return this._petitionDetails;
    }


    get petitionDetails(): string {
        return this._petitionDetails;
    }

    set petitionDetails(value: string) {
        this._petitionDetails = value;
    }

    get firstName(): string {
        return this._firstName;
    }

    set firstName(value: string) {
        this._firstName = value;
    }
    get lastName(): string {
        return this._lastName;
    }

    set lastName(value: string) {
        this._lastName = value;
    }

    get clientfirstName(): string {
        return this._clientFirstName;
    }

    set clientfirstName(value: string) {
        this._clientFirstName = value;
    }


    get clientlastName(): string {
        return this._clientlastName;
    }

    set clientlastName(value: string) {
        this._clientlastName = value;
    }
    get currentPage(): string {
        return this._currentPage;
    }

    set currentPage(pageLink: string) {
        this._currentPage = pageLink;
    }

    get accountId(): string {
        return this._accountId;
    }

    set accountId(accountId: string) {
        this._accountId = accountId;
    }

    get orgId(): string {
        return this._orgId;
    }

    set orgId(orgId: string) {
        this._orgId = orgId;
    }

    get clientId(): string {
        return this._clientId;
    }

    set clientId(clientId: string) {
        this._clientId = clientId;
    }

    get petitionId(): string {
        return this._petitionId;
    }

    set petitionId(petitionId: string) {
        this._petitionId = petitionId;
    }
    public documentSideMenu(docsidemenu) {
        this._documentSideMenu = docsidemenu;
    }

    get docsideBarMenu(): any {
        return this._documentSideMenu;
    }
    public orgNamesMenu(orgnamemenu) {
        this._orgNamesMenu = orgnamemenu;
    }
    get orgNameMenu(): any {
        return this._orgNamesMenu;
    }
    public getorgName(getorgmenu) {
        this._getorgmenu = getorgmenu;
    }
    get getorgMenu(): any {
        return this._getorgmenu;
    }
    get sideBarMenu(): string {
        return this._sideBarMenu;
    }

    set sideBarMenu(sideBarMenu: string) {
        this._sideBarMenu = sideBarMenu;
    }
    get formList(): any[] {
        return this._formList;
    }
    set formList(_formList: any[]) {
        this._formList = _formList;
    }

    get dependents(): any[] {
        return this._dependents;
    }

    set dependents(_dependents: any[]) {
        this._dependents = _dependents;
    }
    get clientDependents(): any[] {
        return this._dependentsClient;
    }

    set clientDependents(_dependentsClient: any[]) {
        this._dependentsClient = _dependentsClient;
    }




    public showSideBarMenu(sideBarName, tab) {
        this._currentTab = tab;
        if (sideBarName == null || sideBarName == undefined) {
            this._sideBarMenu = null;
            this._menuSlider = true;
            this._isBurgerMenuVisible = false;
        } else {
            this._sideBarMenu = sideBarName;
            this._menuSlider = false;
            this._isBurgerMenuVisible = true;
        }
    }


    get isBurgerMenuVisible(): boolean {
        return this._isBurgerMenuVisible;
    }

    set isBurgerMenuVisible(isBurgerMenuVisible: boolean) {
        this._isBurgerMenuVisible = isBurgerMenuVisible;
    }

    get selectedOrgClienttId(): string {
        return this._selectedOrgClienttId;
    }

    set selectedOrgClienttId(selectedOrgClienttId: string) {
        this._selectedOrgClienttId = selectedOrgClienttId;
    }
    //Surya has written this
    get petitionfirstName(): string {
        return this._petitionfirstName;
    }

    set petitionfirstName(value: string) {
        this._petitionfirstName = value;
    }

    get petitionlastName(): string {
        return this._petitionlastName;
    }

    set petitionlastName(value: string) {
        this._petitionlastName = value;
    }
    get questionnaireName() {
        return this._questionnaireName;
    }
    set questionnaireName(questionnaireName: any[]) {
        this._questionnaireName = questionnaireName;
    }
    get formId() {
        return this._formId;
    }
    set formId(formId: string) {
        this._formId = formId;
    }
    get currentTab() {
        return this._currentTab;
    }
    set currentTab(currentTab: string) {
        this._currentTab = currentTab;
    }




    get currentSBLink() {
        return this._currentSBLink;
    }
    set currentSBLink(currentSBLink: string) {
        this._currentSBLink = currentSBLink;
    }


}
