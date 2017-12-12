
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../models/user';
import {ApplicationViews} from '../components/common/constants/applicationviews.constants';

@Injectable()
export class AppService {
  /**
   * New variables
   */
  // Application section flags
  private _showHeader = true;
  private _headerPage: string;
  private _showFooter = true;
  private _showMenu = true;
  private _expandMenu = true;


  /**
   * Old variables that need refactoring
   */
    private _menuSlider: boolean;
    private _documentSideMenu;
    public docsidemenu;
    public orgnamemenu;
    public _currentPage: string;
    public _applicationViewMode: ApplicationViews;
    private _accountId: string;
    private _clientId: string;
    private _petitionId: string;
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
    private _questionaryName: string;
    private _currentSBLink: string;
    public addDependents: any = {};
    public newclitem: any = {};
    public orgClientId;
    public addNewDocExp: any = {};
    public questionnaireEmployee: any = {};
    public newi797item: any = {};
    public newArvdInfoitem: any = {};
    public cvpmore: any = {};
    public newCVdependentitem: any = {};
    public neworgitem: any = {};
    public newQuestionnaireitem: any = {};
    public newpetitionitem: any = {};
    public newvisaitem: any = {};
    public addArrDeparture: any = {};
    public addUsers: any = {};
    public addAdress: any = {};
    public addClientNewDocExp: any = {};
    public formListData: any= {};
    public addNewVisa: any = {};
    public addNewI797: any = {};
    public rolemultiple: boolean;
    public usersList: any;
    public petitionType: string;
    public userroleList: any = [];
    public petitionstageTypes: any = [];
    public userLoginHistoryId: string;
    constructor(private _router: Router) { }


  get showHeader(): boolean {
    return this._showHeader;
  }

  set showHeader(value: boolean) {
    this._showHeader = value;
  }

  get headerPage(): string {
    return this._headerPage;
  }

  set headerPage(value: string) {
    this._headerPage = value;
  }

  get showFooter(): boolean {
    return this._showFooter;
  }

  set showFooter(value: boolean) {
    this._showFooter = value;
  }

  get showMenu(): boolean {
    return this._showMenu;
  }

  set showMenu(value: boolean) {
    this._showMenu = value;
  }

  get expandMenu(): boolean {
    return this._expandMenu;
  }

  set expandMenu(value: boolean) {
    this._expandMenu = value;
  }

    destroy(isLogout: boolean) {
        this._menuSlider = null;
        this._documentSideMenu = null;
        this.docsidemenu = null;
        this.orgnamemenu = null;
        this._currentPage = null;
        this._applicationViewMode = null;
        this._accountId = null;
        this._clientId = null;
        this._petitionId = null;
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
        this._currentSBLink = null;
        this.orgClientId = null;
        if (isLogout) {
          this.userroleList = null;
        }
    }


    public moveToPageWithParams(pageLink, params) {
        if (pageLink !== this._currentPage) {
            this._currentPage = '';
        }
        this._currentPage = pageLink;
        this._router.navigate([pageLink, params], { skipLocationChange: true });
    }

    public moveToPage(pageLink) {
        if (pageLink !== this._currentPage) {
            this._currentPage = '';
        }
        this._currentPage = pageLink;
        this._router.navigate([pageLink], { skipLocationChange: true });
    }

    public moveToQuestionnaire(questionnaireData) {
        this.QuestionnaireName = questionnaireData.questionnaireName;
        let selectedFormName;
        for (let i = 0; i < this._formList.length; i++) {
            if (questionnaireData.formId === this._formList[i].applicationFormsId) {
                selectedFormName = this._formList[i].formName;
                this.formname = selectedFormName;
            }
        }
        if (this._applicationViewMode === ApplicationViews.CLIENT_VIEW) {
            selectedFormName = questionnaireData.formName;
        }

        let pageName = '';
        if (selectedFormName === 'I-129') {
            if (this._applicationViewMode === ApplicationViews.IMMIGRATION_VIEW) {
                pageName = 'questionnaire-i129';
            } else {
               pageName = 'questionnaire-i129clientView';
            }
        } else if (selectedFormName === 'I-129 DC') {
              if (this._applicationViewMode === ApplicationViews.IMMIGRATION_VIEW) {
                 pageName = 'questionnaire-i129dc';
              }
        } else {
            if (this._applicationViewMode === ApplicationViews.IMMIGRATION_VIEW) {
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
    get applicationViewMode(): ApplicationViews {
        return this._applicationViewMode;
    }

    set applicationViewMode(applicationViewMode: ApplicationViews) {
        this._applicationViewMode = applicationViewMode;
    }

    public isImmigrationView(): boolean {
      return this._applicationViewMode === ApplicationViews.IMMIGRATION_VIEW;
    }

    public isClientView(): boolean {
      return this._applicationViewMode === ApplicationViews.CLIENT_VIEW;
    }

    public isSuperUserView(): boolean {
      return this._applicationViewMode === ApplicationViews.SUPER_USER_VIEW;
    }

    get menuSlider(): boolean {
        return this._menuSlider;
    }

    set menuSlider(value: boolean) {
        this._menuSlider = value;
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

    get currentSBLink() {
        return this._currentSBLink;
    }
    set currentSBLink(currentSBLink: string) {
        this._currentSBLink = currentSBLink;
    }
}
