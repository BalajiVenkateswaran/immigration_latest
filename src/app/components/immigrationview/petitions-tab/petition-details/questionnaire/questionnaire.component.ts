import {AppService} from '../../../../../services/app.service';
import {ConfirmComponent} from '../../../../confirmbox/confirm.component';
import {Component, OnInit} from '@angular/core';
import {QuestionnaireService} from "./questionnaire.service";
import {FormGroup, FormControl} from "@angular/forms";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {IMyOptions, IMyDateModel, IMyDate} from 'mydatepicker';
import {BootstrapModalModule} from 'ng2-bootstrap-modal';
import {DialogService, DialogComponent} from "ng2-bootstrap-modal";
import {SendToClientQuestionnaire} from './SendToClientQuestionnaire';


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
  public addQuestionnaireClient: FormGroup; // our model driven form
  public submitted: boolean; // keep track on whether form is submitted
  private checking: boolean = true;

  public showAddQuestionnairepopup: boolean;
  public getQuestionnaireData: boolean = true;
  public newQuestionnaireitem: any = {};
  public questionnaireEmployee: any = {};

  public showAddEmpQuespopup: boolean;
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

  private empQuestionnaire;
  private selectedForm: string;
  rowToBeAdded = false;
  private empRowToBeAdded = false;
  private rowEdit: boolean[] = [];
  private isEditQuestionnaire: boolean[] = [];
  private isEditEmpQuestionnaire: boolean[] = [];
  private rowEditEmp: boolean[] = [];
  private checkboxDisable: boolean = false;
  questionnaireList = [];
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
  public officerData;
  public formattedData = [];
  public checkedSubscription;
  public checked = false;
  public questionnireChecked;
  public questionnaireName;
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
    this.settings = {
      'columnsettings': [

        {
          headerName: "Form Name",
          field: "formName"
        },
        {
          headerName: "Checkbox",
          headerToolTip: "Checkbox",
          cellRendererFramework: SendToClientQuestionnaire

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

          headerName: "Status Date",
          field: "employerStatusDate"
        }
      ]
    }
    this.checkedSubscription = SendToClientQuestionnaire.onItemChecked.subscribe(res => {
      if (res) {
        if (res.hasOwnProperty('flag')) {
          this.checked = true;

        }
        else {
          this.checked = false;
        }
      }
    })
  }
  deleteConfirm(questions) {
    this.delmessage = questions.data.questionnaireName;
    this.dialogService.addDialog(ConfirmComponent, {
      title: 'Confirmation',
      message: 'Are you sure you want to Delete ' + this.delmessage + '?'
    })
      .subscribe((isConfirmed) => {

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
  getFormName(formId: string) {
    for (let form of this.formsList) {
      if (form.applicationFormsId === formId) {
        return form.formName;
      }
    }
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
          this.questionnaireList.map(item => {
            return item.checked = false;
          })

          this.sendQuestionnaire = true;
          this.data = this.formattedData;
          this.officerData = this.formattedData;
        });
      }


    });
  }
  objectMapper(data) {
    for (var i = 0; i < data.length; i++) {
      var x = this.getFormName(data[i].formId);
      data[i]['formName'] = x;
      data[i]['questionnairePetitionType'] = this.appService.petitionType + "  " + data[i]['formName'];
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
    if (newQuestionnaireitem.data.itemChecked) {
      this.sentQuestionnaireClient.push(newQuestionnaireitem.data);
    }
    else {
      this.sentQuestionnaireClient.splice(this.sentQuestionnaireClient.indexOf(newQuestionnaireitem.data, 1));
    }

    if (this.sentQuestionnaireClient.length == 0) {
      this.sendQuestionnaire = true;
    }
    if (!this.checked) {
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
        this.checked = false;
      });
    }
    else {
      for (let i = 0; i < this.sentQuestionnaireClient.length; i++) {
        if (this.sentQuestionnaireClient[i]['itemChecked'] == true) {
          this.sendQuestionnaire = false;
        }
        else {
          this.sendQuestionnaire = true;
        }

      }
      this.checked = false;

    }
  }

  deleteQuestionnaire(questions) {
    console.log(questions.data.questionnaireId);
    this.questionnaireService.deleteQuestionnaire(questions.data.questionnaireId).subscribe(
      res => {
        console.log(res);
        if (res['statusCode'] == 'SUCCESS') {
          this.getquesnreData();
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
    if (questionnaireEmployee.data['sentToClient'] == 'Yes') {
      questionnaireEmployee.data['sentToClient'] = true;
    }
    else {
      questionnaireEmployee.data['sentToClient'] = false;
    }
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
    this.appService.questionnaireEmployee = this.questionnaireEmployee;
    this.result = true;
    this.close();
  }
  empcancel() {
    this.result = false;
    this.close();
  }
  deleteEmpQuestionnaire(questions) {
    var questionaireName = questions.data.questionnaireName;
    var questionaireId = questions.data.questionnaireId;
    this.dialogService.addDialog(ConfirmComponent, {
      title: 'Confirmation',
      message: 'Are you sure you want to Delete ' + questionaireName + '?'
    })
      .subscribe((isConfirmed) => {
        if (isConfirmed) {
          this.questionnaireService.deleteQuestionnaire(questionaireId).subscribe(
            res => {
              console.log(res);
              if (res['statusCode'] == 'SUCCESS') {
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
          this.ngOnInit();
        }
      });
    console.log(this.sentQuestionnaireClient);
  }
  onItemChanged(event) {
    let value: string = event.target.value;
    let formId = value.split(":").toString().trim().split(",")[1];
    let formName = this.getFormName(formId.trim());
    this.newQuestionnaireitem.questionnaireName = this.appService.petitionType + " " + formName;
  }

}
