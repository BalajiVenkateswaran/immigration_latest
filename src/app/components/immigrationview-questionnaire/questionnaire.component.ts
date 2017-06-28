import { Component, OnInit } from '@angular/core';
import {questionnaireclient} from "../../models/questionnaireclient";
import {QuestionnaireService} from "./questionnaire.service";
import {questionnaireEmp} from "../../models/questionnaireEmp";
import {FormGroup, FormControl} from "@angular/forms";
import {User} from "../../models/user";
import {ImmigrationViewPetitionInformation} from "../../models/ImmigrationViewPetitionInformation";
import {AppService} from "../../services/app.service";
import { Ng2SmartTableModule, LocalDataSource, ServerDataSource  } from 'ng2-smart-table';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import {IMyOptions, IMyDateModel, IMyDate} from 'mydatepicker';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { ConfirmComponent } from '../confirmbox/confirm.component';
import { DialogService, DialogComponent} from "ng2-bootstrap-modal";



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
    confirmResult: boolean = null;
    private message: string;
    private user: User;
    public addQuestionnaireClient: FormGroup; // our model driven form
    public submitted: boolean; // keep track on whether form is submitted
    private checking: boolean = true;

    public showAddQuestionnairepopup: boolean;
    public getQuestionnaireData: boolean = true;
    public newQuestionnaireitem: any = {};

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
    private data;
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
    questionnaireList: any;
    private questionnaire = {};
    private questionnaireClient = {};
    private questionnaireId;
    private beforeCancel;
    private empBeforeCancel;
    sendQuestionnaire: boolean = true;
    private clientCheck: boolean[]=[];
    private sentQuestionnaireClient=[];
    public delmessage;
    public editFlag: boolean = true;
    public beforeEdit: any;
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
        }


        deleteConfirm(i, questions) {
            this.delmessage = questions.questionnaireName;
        this.dialogService.addDialog(ConfirmComponent, {
            title: 'Confirmation',
            message: 'Are you sure you want to Delete ' + this.delmessage + '?'
        })
            .subscribe((isConfirmed) => {
                //Get dialog result
                //this.confirmResult = isConfirmed;
                if (isConfirmed) {
                    this.deleteQuestionnaire(i, questions);
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
        this.questionnaireList = '';
        this.questionnaireService.getQuestionnaireForms(this.appService.petitionId).subscribe((res) => {
            if (res['statusCode'] == 'SUCCESS') {
                this.formsList = res['applicationForms'];
                this.appService.formList = res['applicationForms'];

                this.questionnaireService.getQuestionnaires(this.appService.petitionId).subscribe((res) => {
                    if (res['statusCode'] == 'SUCCESS') {
                        this.questionnaireList = res['questionnaires']['content'];
                        this.appService.questionnaireName = res['questionnaires']['content'];
                        for (var i = 0; i < this.questionnaireList.length; i++) {
                            this.rowEdit[i] = true;
                            this.isEditQuestionnaire[i] = true;
                            this.rowEditEmp[i] = true;
                            this.isEditEmpQuestionnaire[i] = true;
                            this.clientCheck[i] = false;
                            this.appService.formId = this.questionnaireList[i].formId;
                            this.questionnaireList.map(function (item) {
                                item.clientCheck = false;
                            });
                        }
                    }
                });
            }
        });
    }
    questionnaireSave() {
        this.newQuestionnaireitem['petitionId'] = this.appService.petitionId;
        this.appService.newQuestionnaireitem = this.newQuestionnaireitem;
        this.result = true;
        this.close();
    }
    cancel() {
        this.result = false;
        this.close();
    }

    enableOrDisableCheckBox(questionnaire: any){
      var formName = this.getFormName(questionnaire['formId']);
      var formNameBasedCheck = true;
      if(this.checkboxDisable){
        formNameBasedCheck = false;
      } else if(formName == "I-129 DC"){
        formNameBasedCheck = false;
      }
      return formNameBasedCheck;
    }

    getFormName(formId: string){
      for(let form of this.formsList){
        if(form.applicationFormsId === formId){
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
    editQuestionnaire(i, newQuestionnaireitem) {
        //this.beforeCancel = (<any>Object).assign({}, questions);
        //this.checkboxDisable = true;
        //this.statusDate = questions.statusDate;
        //this.rowEdit[i] = !this.rowEdit[i];
        //this.isEditQuestionnaire[i] = !this.isEditQuestionnaire[i];

        this.editFlag = true;
        if (this.editFlag) {
            this.beforeEdit = (<any>Object).assign({}, newQuestionnaireitem);
        }

        this.dialogService.addDialog(ImmigrationviewQuestionnaireComponent, {
            showAddQuestionnairepopup: true,
            getQuestionnaireData: false,
            addquspopup: false,
            editquspopup: true,
            title: 'Edit Questionnaire',
            newQuestionnaireitem: this.editFlag ? this.beforeEdit : this.newQuestionnaireitem,
            //newQuestionnaireitem: questions.questionnaireName,
            //clientStatus: questions.clientStatus,

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
    deleteQuestionnaire(i, questions) {
        this.rowEdit[i] = true;
        console.log(questions.questionnaireId);
        this.questionnaireService.deleteQuestionnaire(questions.questionnaireId).subscribe(
            res => {
                console.log(res);
                if(res['statusCode'] == 'SUCCESS'){
                    this.questionnaireList.splice(i,1);
                    //this.appService.questionnaireName.splice(i,1);
                }
            }
        );
    }
    saveQuestionnaire(i, questions) {
        this.checkboxDisable = false;
        this.questionnaireService.saveNewQuestionnaireClient(questions)
          .subscribe((res) => {
            if(res['statusCode'] == 'SUCCESS'){
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
    editEmpQuestionnaire(i, question) {
        this.empBeforeCancel = (<any>Object).assign({}, question);
        this.rowEditEmp[i] = !this.rowEditEmp[i];
        this.isEditEmpQuestionnaire[i] = !this.isEditEmpQuestionnaire[i];
    }
    saveEmpQuestionnaire(i, question) {

        this.questionnaireService.saveNewQuestionnaireClient(question)
          .subscribe((res) => {
            if(res['statusCode'] == 'SUCCESS'){
              this.questionnaireList[i] = res['questionnaire'];
              this.isEditEmpQuestionnaire[i] = !this.isEditEmpQuestionnaire[i];
              this.rowEditEmp[i] = true;
            }
          });
    }

    cancelEmpQuestionnaire(i, question) {
        this.questionnaireList[i] = this.empBeforeCancel;
        this.rowEditEmp[i] = !this.rowEditEmp[i];
        this.isEditEmpQuestionnaire[i] = !this.isEditEmpQuestionnaire[i];
    }

    deleteEmpQuestionnaire(i, questions) {
        var questionaireName = questions.questionnaireName;
        var questionaireId = questions.questionnaireId;
        this.dialogService.addDialog(ConfirmComponent, {
            title: 'Confirmation',
            message: 'Are you sure you want to Delete ' + questionaireName+'?'
        })
            .subscribe((isConfirmed) => {
                //Get dialog result
                //this.confirmResult = isConfirmed;
                if (isConfirmed) {
                    this.questionnaireService.deleteQuestionnaire(questionaireId).subscribe(
            res => {
                console.log(res);
                if(res['statusCode'] == 'SUCCESS'){
                    this.questionnaireList.splice(i,1);
                    this.appService.questionnaireName.splice(i,1);
                }
            }
        );
                }
            });
    }
    sendQuestionnaireClient() {
        var questionnaries = [];
        for(var questionnaire of this.sentQuestionnaireClient){
          questionnaries.push(questionnaire['questionnaireId']);
        }
        var req = {
          questionnaireIds : questionnaries
        };

        this.questionnaireService.sentQuestionnaireEmailToClient(req)
          .subscribe((res) => {
            if(res['statusCode'] == 'SUCCESS'){
              //reset client Check
              this.ngOnInit();
              this.sendQuestionnaire = true;
            }
          });
        console.log(this.sentQuestionnaireClient);
    }
    questionnaireChecked(i, questionnaire) {
        if (questionnaire.clientCheck){
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
