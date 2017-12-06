import {Component, OnInit} from '@angular/core';
import {DialogComponent, DialogService} from 'ng2-bootstrap-modal';

import {AppService} from '../../../../../services/app.service';
import {ConfirmComponent} from '../../../../framework/confirmbox/confirm.component';
import {QuestionnaireService} from './questionnaire.service';
import {SendToClientQuestionnaire} from './SendToClientQuestionnaire';
import {QuestionnaireCommonService} from '../questionnaires/common/questionnaire-common.service';
import {SmartTableFrameworkComponent} from '../../../../framework/smarttable/smarttable.component';
import {HeaderService} from '../../../../common/header/header.service';


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
  selector: 'ih-petition-details',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.sass'],
  styles: [`
        .typeahead-input,
        .typeahead-typeahead{
            width: 250px;
            padding: 8px;
            border-radius: 5px;
        }
    `],
  providers: [QuestionnaireService],
  entryComponents: [SmartTableFrameworkComponent, SendToClientQuestionnaire]
})
export class ImmigrationviewQuestionnaireComponent extends DialogComponent<ConfirmModel, boolean> implements OnInit {
  public data;
  public employerData;
  private message: string;
  public settings;
  public settings1;
  public delmessage;
  private questionnaireId;
  public questionnaireName;
  private selectedForm: string;
  public showAddEmpQuespopup: boolean;
  public showAddQuestionnairepopup: boolean;
  public beforeEdit: any;
  sfmQuestionnaire = false;
  sendQuestionnaire = true;
  public editFlag = true;
  public getQuestionnaireData = true;
  private formsList = [];
  questionnaireList = [];
  public formattedData = [];
  private sentQuestionnaireClient = [];
  private questionnaire = {};
  public newQuestionnaireitem: any = {};
  public questionnaireEmployee: any = {};
  private status = [
    {
      'id': '0',
      'clientStatus': 'Open'
    },
    {
      'id': '1',
      'clientStatus': 'Completed'
    }
  ];
  private employerStatus = [
    {
      'id': '0',
      'employerStatus': 'Open'
    },
    {
      'id': '1',
      'employerStatus': 'Accepted'
    }
  ];
  constructor(private questionnaireService: QuestionnaireService, public appService: AppService, public dialogService: DialogService, private headerService: HeaderService,
    private questionnaireCommonService: QuestionnaireCommonService) {
    super(dialogService);
    this.settings = {
      'context': {
        'componentParent': this
      },
      'columnsettings': [

        {
          headerName: 'Form Name',
          field: 'formName'
        },
        {
          headerName: 'Checkbox',
          headerToolTip: 'Checkbox',
          cellRendererFramework: SendToClientQuestionnaire

        },
        {

          headerName: 'Questionnaire Name',
          field: 'questionnaireName',
          width: 250,
        },
        {

          headerName: 'Status',
          field: 'clientStatus'
        },
        {

          headerName: 'Sent To Client',
          field: 'sentToClient'
        },
        {

          headerName: 'Status Date',
          field: 'clientStatusDate'
        }
      ]
    }
    this.settings1 = {
      'columnsettings': [

        {
          headerName: 'Questionnaire Name',
          field: 'questionnaireName'
        },
        {

          headerName: 'Form Name',
          field: 'formName',
          width: 250,
        },
        {

          headerName: 'Status',
          field: 'employerStatus'
        },
        {

          headerName: 'Status Date',
          field: 'employerStatusDate'
        }
      ]
    }
  }
  ngOnInit() {
    this.questionnaireCommonService.questionnaireList = null;
    this.getquesnreData();
  }
  highlightSBLink(link) {
    this.appService.currentSBLink = link;
  }
  getFormName(formId: string) {
    for (let form of this.formsList) {
      if (form.applicationFormsId === formId) {
        return form.formName;
      }
    }
  }
  formNameSelected(name) {
    this.selectedForm = name;

  }

  onItemChanged(event) {
    let value: string = event.target.value;
    let formId = value.split(':').toString().trim().split(',')[1];
    let formName = this.getFormName(formId.trim());
    this.newQuestionnaireitem.questionnaireName = this.appService.petitionType + ' ' + formName;
  }
  getquesnreData() {
    this.questionnaireService.getQuestionnaireForms(this.appService.petitionId).subscribe((res) => {
      if (res['statusCode'] === 'SUCCESS') {
        this.formsList = res['applicationForms'];
        this.appService.formList = res['applicationForms'];

        this.questionnaireService.getQuestionnaires(this.appService.petitionId).subscribe((res1) => {
          if (res1['statusCode'] === 'SUCCESS') {
            this.questionnaireList = res1['questionnaires']['content'];
            this.questionnaireCommonService.questionnaireList = res1['questionnaires']['content'];
            // this.appService.questionnaireName = res['questionnaires']['content'];
            let that = this;
            this.formattedData = this.objectMapper(this.questionnaireList);
          }
          this.questionnaireList.map(item => {
            return item.checked = false;
          })
          this.data = this.formattedData;
          this.employerData = this.formattedData;
        });
      }
    });
  }
  objectMapper(data) {
    for (let i = 0; i < data.length; i++) {
      data[i]['questionnairePetitionType'] = this.appService.petitionType + '  ' + data[i]['formName'];
      if (data[i]['sentToClient'] === false) {
        data[i]['sentToClient'] = 'No';
      } else {
        data[i]['sentToClient'] = 'Yes';
      }
    }
    return data;
  }

  onAddQuestionnaireClick() {
    this.dialogService.addDialog(ImmigrationviewQuestionnaireComponent, {
      showAddQuestionnairepopup: true,
      getQuestionnaireData: false,
      addquspopup: true,
      editquspopup: false,
      title: 'Add Questionnaire',
    }).subscribe((isConfirmed) => {
      if (isConfirmed) {
        this.questionnaireService.saveNewQuestionnaireClient(this.appService.newQuestionnaireitem, this.headerService.user.userId).subscribe((res) => {
          this.message = res['statusCode'];
          if (this.message === 'SUCCESS') {
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

  // client questionnaire

  onEditQuestionnaireClick(newQuestionnaireitem) {
    if (newQuestionnaireitem.data['sentToClient'] === 'Yes') {
      newQuestionnaireitem.data['sentToClient'] = true;
    } else {
      newQuestionnaireitem.data['sentToClient'] = false;
    }
    this.editFlag = true;
    this.editFlag = true;
    if (newQuestionnaireitem.colDef.headerName !== 'Checkbox') {
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
          this.questionnaireService.saveNewQuestionnaireClient(this.appService.newQuestionnaireitem, this.headerService.user.userId).subscribe((res) => {
            if (res['statusCode'] === 'SUCCESS') {
              this.getquesnreData();
            }

          });
        } else {
          this.editFlag = false;
        }
      });
    }
  }
  onDeleteClientQuestionnaireClick(questions) {
    let questionaireName = questions.data.questionnaireName;
    let questionaireId = questions.data.questionnaireId;
    this.delmessage = questions.data.questionnaireName;
    this.dialogService.addDialog(ConfirmComponent, {
      title: 'Confirmation',
      message: 'Are you sure you want to Delete ' + this.delmessage + '?'
    })
      .subscribe((isConfirmed) => {

        if (isConfirmed) {
          this.questionnaireService.deleteQuestionnaire(questionaireId).subscribe(
            res => {
              if (res['statusCode'] === 'SUCCESS') {
                this.getquesnreData();
              }
            }
          );
        }
      });
  }


  onSaveQuestionnaireClick() {
    this.newQuestionnaireitem['petitionId'] = this.appService.petitionId;

    if (this.newQuestionnaireitem['formId'] === '' || this.newQuestionnaireitem['formId'] == null || this.newQuestionnaireitem['formId'] === undefined ||
      this.newQuestionnaireitem['questionnaireName'] === '' || this.newQuestionnaireitem['questionnaireName'] == null || this.newQuestionnaireitem['questionnaireName'] === undefined) {
      this.sfmQuestionnaire = true;
    } else {
      this.sfmQuestionnaire = false;
      this.appService.newQuestionnaireitem = this.newQuestionnaireitem;
      this.result = true;
      this.close();
    }


  }
  onCancelQuestionnaireClick() {
    this.result = false;
    this.close();
  }

  // end of client questionnaire

  // Employee Questionnaire
  onEditEmpQuestionnaireClick(questionnaireEmployee) {
    if (questionnaireEmployee.data['sentToClient'] === 'Yes') {
      questionnaireEmployee.data['sentToClient'] = true;
    } else {
      questionnaireEmployee.data['sentToClient'] = false;
    }
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
        this.questionnaireService.saveNewQuestionnaireClient(this.appService.questionnaireEmployee, this.headerService.user.userId).subscribe((res) => {
          if (res['statusCode'] === 'SUCCESS') {
            this.getquesnreData();
          }

        });
      } else {
        this.editFlag = false;


      }
    });
  }

  onSaveEmpQuestionniaredeleteQuestionnaire() {
    this.appService.questionnaireEmployee = this.questionnaireEmployee;
    this.result = true;
    this.close();
  }
  onCancelEmpQuestionnaireClick() {
    this.result = false;
    this.close();
  }
  onDeleteEmpQuestionniareClick(questions) {
    let questionaireName = questions.data.questionnaireName;
    let questionaireId = questions.data.questionnaireId;
    this.dialogService.addDialog(ConfirmComponent, {
      title: 'Confirmation',
      message: 'Are you sure you want to Delete ' + questionaireName + '?'
    })
      .subscribe((isConfirmed) => {
        if (isConfirmed) {
          this.questionnaireService.deleteQuestionnaire(questionaireId).subscribe(
            res => {
              if (res['statusCode'] === 'SUCCESS') {
                this.getquesnreData();
              }
            }
          );
        }
      });
  }

  // send questionnaire to client

  sendQuestionnaireClient() {
    let questionnaries = [];
    for (let questionnaire of this.sentQuestionnaireClient) {
      questionnaries.push(questionnaire['questionnaireId']);
    }
    let req = {
      questionnaireIds: questionnaries
    };

    this.questionnaireService.sentQuestionnaireEmailToClient(req)
      .subscribe((res) => {
        if (res['statusCode'] === 'SUCCESS') {
          this.ngOnInit();
        }
      });
  }



  onQuestionnaireChecked(event) {
    if (event.data.itemChecked) {
      this.sentQuestionnaireClient.push(event.data);
    } else {
      this.sentQuestionnaireClient.splice(this.sentQuestionnaireClient.indexOf(event.data, 1));
    }

    if (this.sentQuestionnaireClient.length === 0) {
      this.sendQuestionnaire = true;
    }
    for (let i = 0; i < this.sentQuestionnaireClient.length; i++) {
      if (this.sentQuestionnaireClient[i]['itemChecked'] === true) {
        this.sendQuestionnaire = false;
      } else {
        this.sendQuestionnaire = true;
      }

    }
  }

}
