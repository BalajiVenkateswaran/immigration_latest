import { Component, OnInit } from '@angular/core';
import { questionnaireclient } from "../../models/questionnaireclient";
import { QuestionnaireService } from "./questionnaire.service";
import { questionnaireEmp } from "../../models/questionnaireEmp";
import { FormGroup, FormControl } from "@angular/forms";
import { User } from "../../models/user";
import { ImmigrationViewPetitionInformation } from "../../models/ImmigrationViewPetitionInformation";
import { AppService } from "../../services/app.service";
import { Ng2SmartTableModule, LocalDataSource, ServerDataSource } from 'ng2-smart-table';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { IMyOptions, IMyDateModel, IMyDate } from 'mydatepicker';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { ConfirmComponent } from '../confirmbox/confirm.component';
import { DialogService, DialogComponent } from "ng2-bootstrap-modal";



export interface ConfirmModel {
    title: string;
    message: string;
    showAddQuestionnairepopup: boolean;
    getQuestionnaireData: boolean;
    newQuestionnaireitem: Object;
    addquspopup: boolean;
    editquspopup: boolean;
    questionnaireName: string;
    clientStatus: string;
    questionnaireEmployee: Object;
    showAddEmpQuespopup: boolean;

}

@Component({
    selector: 'app-questionnaire',
    templateUrl: './questionnaire.component.html',
    styleUrls: ['./questionnaire.component.sass'],
    styles: [`
        .typeahead-input,
        .typeahead-typeahead{
            width: 250px;
            padding: 8px;
            border-radius: 5px;
        }
    `]
})
export class ImmigrationviewQuestionnaireComponent extends DialogComponent<ConfirmModel, boolean> implements OnInit {
    //1st table of quotionaries
    sfmQuestionnaire: boolean = false;
    confirmResult: boolean = null;
    private message: string;
    private user: User;
    public addQuestionnaireClient: FormGroup; // our model driven form
    public submitted: boolean; // keep track on whether form is submitted
    private checking: boolean = true;

    public showAddQuestionnairepopup: boolean;
    public getQuestionnaireData: boolean = true;
    public newQuestionnaireitem: any = {};
    public questionnaireEmployee: any = {};

    public showAddEmpQuespopup: boolean;
    private petitionInformation: ImmigrationViewPetitionInformation = new ImmigrationViewPetitionInformation();
    private myDatePickerOptions: IMyOptions = {
        // other options...
        dateFormat: 'mm-dd-yyyy',
        showClearDateBtn: false,
    };
    onDateChanged(event: IMyDateModel) {
    }
    private statusDate: string;
    private statusDateEmp: string;
    public addQuestionnaireEmployer: FormGroup; // our model driven form
    private listLength;
    private formsList = [];

    private questionnaireEmployerList: questionnaireEmp[];
    private empQuestionnaire;
    private selectedForm: string;
    source: LocalDataSource = new LocalDataSource();
    rowToBeAdded = false;
    private empRowToBeAdded = false;
    private rowEdit: boolean[] = [];
    private isEditQuestionnaire: boolean[] = [];
    private isEditEmpQuestionnaire: boolean[] = [];
    private rowEditEmp: boolean[] = [];
    private checkboxDisable: boolean = false;
    questionnaireList=[];
    private questionnaire = {};
    private questionnaireClient = {};
    private questionnaireId;
    private beforeCancel;
    private empBeforeCancel;
    sendQuestionnaire: boolean = true;
    private clientCheck: boolean[] = [];
    private sentQuestionnaireClient = [];
    public delmessage;
    public editFlag: boolean = true;
    public beforeEdit: any;
    public settings;
    public data;
    public settings1;
    public data1;
    public formattedData = [];
    private status = [
        {
            "id": "0",
            "clientStatus": "Open"
        },
        {
            "id": "1",
            "clientStatus": "Completed"
        }
    ];
    private employerStatus = [
        {
            "id": "0",
            "employerStatus": "Open"
        },
        {
            "id": "1",
            "employerStatus": "Accepted"
        }
    ];


    constructor(private questionnaireService: QuestionnaireService, public appService: AppService, public dialogService: DialogService) {
        super(dialogService);
        if (this.appService.user) {
            this.user = appService.user;
        }
        this.settings = {
            'questionnaireTable':true,
            'columnsettings': [
                
                {
                    headerName: "Form Name",
                    field: "formName"
                },
                {

                    headerName: "Questionnaire Name",
                    field: "questionnaireName",
                    width: 250,
                },
                {

                    headerName: "Status",
                    field: "clientStatus"
                },
                {

                    headerName: "Sent To Client",
                    field: "sentToClient"
                },
                {

                    headerName: "Status Date",
                    field: "clientStatusDate"
                }
            ]
        }
          this.settings1 = {
            'columnsettings': [

                {
                    headerName: "Questionnaire Name",
                    field: "questionnaireName"
                },
                {

                    headerName: "Form Name",
                    field: "formName",
                    width: 250,
                },
                {

                    headerName: "Status",
                    field: "employerStatus"
                },
                {

                    headerName: "Sent To Client",
                    field: "sentToClient"
                },
                {

                    headerName: "Status Date",
                    field: "employerStatusDate"
                }
            ]
        }


    }


    deleteConfirm(questions) {
        this.delmessage = questions.data.questionnaireName;
        this.dialogService.addDialog(ConfirmComponent, {
            title: 'Confirmation',
            message: 'Are you sure you want to Delete ' + this.delmessage + '?'
        })
            .subscribe((isConfirmed) => {
                //Get dialog result
                //this.confirmResult = isConfirmed;
                if (isConfirmed) {
                    this.deleteQuestionnaire(questions);
                }
            });
    }
    highlightSBLink(link) {
        this.appService.currentSBLink = link;
    }
    ngOnInit() {
        this.getquesnreData();
    }


    addNewQuestionnaire() {
        this.dialogService.addDialog(ImmigrationviewQuestionnaireComponent, {
            showAddQuestionnairepopup: true,
            getQuestionnaireData: false,
            addquspopup: true,
            editquspopup: false,
            title: 'Add Questionnaire',
        }).subscribe((isConfirmed) => {
            if (isConfirmed) {
                this.questionnaireService.saveNewQuestionnaireClient(this.appService.newQuestionnaireitem).subscribe((res) => {
                    this.message = res['statusCode'];
                    if (this.message == 'SUCCESS') {
                        this.getquesnreData();
                    } else {
                        this.dialogService.addDialog(ConfirmComponent, {
                            title: 'Error..!',
                            message: 'Unable to Add Questionnaire.'
                        });
                    }

                });
            }
        });
    }
    getquesnreData() {
        //this.questionnaireList = '';
        this.questionnaireService.getQuestionnaireForms(this.appService.petitionId).subscribe((res) => {
            if (res['statusCode'] == 'SUCCESS') {
                this.formsList = res['applicationForms'];
                this.appService.formList = res['applicationForms'];

                this.questionnaireService.getQuestionnaires(this.appService.petitionId).subscribe((res) => {
                    if (res['statusCode'] == 'SUCCESS') {
                        this.questionnaireList = res['questionnaires']['content'];
                        this.appService.questionnaireName = res['questionnaires']['content'];
                        let that = this;
                        this.formattedData = this.objectMapper(this.questionnaireList);
                    }
                    this.data=this.formattedData;
                    this.data1=this.formattedData;
                });
            }
          

        });
    }
    objectMapper(data) {
        let formNames = this.formsList.map(function (item) {
            return item.formName;
        })
        for (var i = 0; i < data.length; i++) {
            data[i]['formName'] = formNames[i];
            if (data[i]['sentToClient'] == false) {
                data[i]['sentToClient'] = 'No';
            } else {
                data[i]['sentToClient'] = 'Yes';
            }
        }
        return data;
    }
    questionnaireSave() {
        this.newQuestionnaireitem['petitionId'] = this.appService.petitionId;

        if (this.newQuestionnaireitem['formId'] == '' || this.newQuestionnaireitem['formId'] == null || this.newQuestionnaireitem['formId'] == undefined || this.newQuestionnaireitem['questionnaireName'] == '' || this.newQuestionnaireitem['questionnaireName'] == null || this.newQuestionnaireitem['questionnaireName'] == undefined) {
            this.sfmQuestionnaire = true;
        } else {
            this.sfmQuestionnaire = false;
            this.appService.newQuestionnaireitem = this.newQuestionnaireitem;
            this.result = true;
            this.close();
        }


    }
    cancel() {
        this.result = false;
        this.close();
    }

    enableOrDisableCheckBox(questionnaire: any) {
        var formName = this.getFormName(questionnaire['formId']);
        var formNameBasedCheck = true;
        if (this.checkboxDisable) {
            formNameBasedCheck = false;
        } else if (formName == "I-129 DC") {
            formNameBasedCheck = false;
        }
        return formNameBasedCheck;
    }

    getFormName(formId: string) {
        for (let form of this.formsList) {
            if (form.applicationFormsId === formId) {
                return form.formName;
            }
        }
    }

    addQuestionnaire() {
        this.rowToBeAdded = true;
        this.questionnaire = {};
    }


    cancelQuestion() {
        this.questionnaire = {};
        this.rowToBeAdded = false;

    }
    formNameSelected(name) {
        this.selectedForm = name;

    }
    editQuestionnaire(newQuestionnaireitem) {
        if (newQuestionnaireitem.data['sentToClient'] == 'Yes') {
            newQuestionnaireitem.data['sentToClient'] = true;
        }
        else {
            newQuestionnaireitem.data['sentToClient'] = false;
        }
        this.editFlag = true;
        if (this.editFlag) {
            this.beforeEdit = (<any>Object).assign({}, newQuestionnaireitem.data);
        }

        this.dialogService.addDialog(ImmigrationviewQuestionnaireComponent, {
            showAddQuestionnairepopup: true,
            getQuestionnaireData: false,
            addquspopup: false,
            editquspopup: true,
            title: 'Edit Questionnaire',
            newQuestionnaireitem: this.editFlag ? this.beforeEdit : this.newQuestionnaireitem,
        }).subscribe((isConfirmed) => {
            if (isConfirmed) {
                this.questionnaireService.saveNewQuestionnaireClient(this.appService.newQuestionnaireitem).subscribe((res) => {
                    if (res['statusCode'] == 'SUCCESS') {
                        this.getquesnreData();
                    }

                });
            } else {
                this.editFlag = false;
            }
        });

    }
    deleteQuestionnaire(questions) {
        //this.rowEdit[i] = true;
        console.log(questions.data.questionnaireId);
        this.questionnaireService.deleteQuestionnaire(questions.data.questionnaireId).subscribe(
            res => {
                console.log(res);
                if (res['statusCode'] == 'SUCCESS') {
                    this.getquesnreData();
                    //this.questionnaireList.splice(,1);
                    //this.appService.questionnaireName.splice(i,1);
                }
            }
        );
    }
    saveQuestionnaire(i, questions) {
        this.checkboxDisable = false;
        this.questionnaireService.saveNewQuestionnaireClient(questions)
            .subscribe((res) => {
                if (res['statusCode'] == 'SUCCESS') {
                    this.questionnaireList[i] = res['questionnaire'];
                    this.isEditQuestionnaire[i] = !this.isEditQuestionnaire[i];
                    this.rowEdit[i] = true;
                } else {
                    this.dialogService.addDialog(ConfirmComponent, {
                        title: 'Error..!',
                        message: 'Unable to Edit Questionnaire..!'
                    });
                }
            });
    }
    cancelQuestionnaire(i, questions) {
        this.questionnaireList[i] = this.beforeCancel;
        this.checkboxDisable = false;
        this.rowEdit[i] = !this.rowEdit[i];
        this.isEditQuestionnaire[i] = !this.isEditQuestionnaire[i];
    }

    //Employee Questionnaire
    editEmpQuestionnaire(questionnaireEmployee) {
        //this.empBeforeCancel = (<any>Object).assign({}, question);
        //this.rowEditEmp[i] = !this.rowEditEmp[i];
        //this.isEditEmpQuestionnaire[i] = !this.isEditEmpQuestionnaire[i];


        this.editFlag = true;
        if (this.editFlag) {
            this.beforeEdit = (<any>Object).assign({}, questionnaireEmployee.data);
        }
        this.dialogService.addDialog(ImmigrationviewQuestionnaireComponent, {
            showAddEmpQuespopup: true,
            getQuestionnaireData: false,
            addquspopup: false,
            editquspopup: true,
            title: 'Edit Questionnaire',
            questionnaireEmployee: this.editFlag ? this.beforeEdit : this.questionnaireEmployee,
            //employerStatus: questionnaireEmployee.employerStatus,

        }).subscribe((isConfirmed) => {
            if (isConfirmed) {
                this.questionnaireService.saveNewQuestionnaireClient(this.appService.questionnaireEmployee).subscribe((res) => {
                    if (res['statusCode'] == 'SUCCESS') {
                        this.getquesnreData();
                    }

                });
            } else {
                this.editFlag = false;
            }
        });


    }

    empquestionnaireSave() {
        //this.newQuestionnaireitem['petitionId'] = this.appService.petitionId;
        this.appService.questionnaireEmployee = this.questionnaireEmployee;
        this.result = true;
        this.close();
    }
    empcancel() {
        this.result = false;
        this.close();
    }
    /*saveEmpQuestionnaire(i, question) {
        this.questionnaireService.saveNewQuestionnaireClient(question)
            .subscribe((res) => {
                if (res['statusCode'] == 'SUCCESS') {
                    this.questionnaireList[i] = res['questionnaire'];
                    this.isEditEmpQuestionnaire[i] = !this.isEditEmpQuestionnaire[i];
                    this.rowEditEmp[i] = true;
                }
            });
    }*/

   /* cancelEmpQuestionnaire(i, question) {
        this.questionnaireList[i] = this.empBeforeCancel;
        this.rowEditEmp[i] = !this.rowEditEmp[i];
        this.isEditEmpQuestionnaire[i] = !this.isEditEmpQuestionnaire[i];
    }*/

    deleteEmpQuestionnaire(questions) {
        var questionaireName = questions.data.questionnaireName;
        var questionaireId = questions.data.questionnaireId;
        this.dialogService.addDialog(ConfirmComponent, {
            title: 'Confirmation',
            message: 'Are you sure you want to Delete ' + questionaireName + '?'
        })
            .subscribe((isConfirmed) => {
                //Get dialog result
                //this.confirmResult = isConfirmed;
                if (isConfirmed) {
                    this.questionnaireService.deleteQuestionnaire(questionaireId).subscribe(
                        res => {
                            console.log(res);
                            if (res['statusCode'] == 'SUCCESS') {
                                //this.questionnaireList.splice(i, 1);
                                //this.appService.questionnaireName.splice(i, 1);
                                this.getquesnreData();
                            }
                        }
                    );
                }
            });
    }
    sendQuestionnaireClient() {
        var questionnaries = [];
        for (var questionnaire of this.sentQuestionnaireClient) {
            questionnaries.push(questionnaire['questionnaireId']);
        }
        var req = {
            questionnaireIds: questionnaries
        };

        this.questionnaireService.sentQuestionnaireEmailToClient(req)
            .subscribe((res) => {
                if (res['statusCode'] == 'SUCCESS') {
                    //reset client Check
                    this.ngOnInit();
                    this.sendQuestionnaire = true;
                }
            });
        console.log(this.sentQuestionnaireClient);
    }
    questionnaireChecked(i, questionnaire) {
        if (questionnaire.clientCheck) {
            this.sendQuestionnaire = false;
        }
        var filterLength = this.questionnaireList.filter(function (obj) {
            return obj.clientCheck;
        }).length;
        this.sentQuestionnaireClient = this.questionnaireList.filter(function (obj) {
            return obj.clientCheck;
        });
        if (filterLength == 0) {
            this.sendQuestionnaire = true;
        }
        console.log(this.sentQuestionnaireClient);
    }
}
