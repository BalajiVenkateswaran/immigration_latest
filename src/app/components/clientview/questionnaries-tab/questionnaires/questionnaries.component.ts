﻿import { AppService } from '../../../../services/app.service';
import { ClientQuestionnaireService } from './questionnaries.service';
import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormGroup, FormControl} from "@angular/forms";
import {QuestionnaireCommonService} from "../../../immigrationview/petitions-tab/petition-details/questionnaires/common/questionnaire-common.service";
@Component({
  selector: 'app-petitions-Questionnaires.component',
  templateUrl: './questionnaries.component.html',
  styleUrls: ['./questionnaries.component.sass']
})

export class clientviewQuestionnaireComponent implements OnInit {

  private outlet: any = {
    breadcrumbs: null,
    header: 'header',
    message: null,
    carousel: null,
    menu: 'menu',
    footer: null
  };
  public settings;
  public submitted: boolean; // keep track on whether form is submitted
  private message: string;
  questionnaireClientViewList: any[] = [];
  private formsList: any[] = [];

  constructor(private router: Router, public appService: AppService, private clientQuestionnaireSerivce: ClientQuestionnaireService,
    public questionnaireCommonService: QuestionnaireCommonService) {

    this.settings = {
      "isAddButtonEnable": false,
      "isDeleteEnable": false,
      'columnsettings': [
        {
          headerName: "Form Name",
          field: "formName"
        },
        {
          headerName: "Questionnaire Name",
          field: "questionnaireName"
        },
        {
          headerName: "Organization",
          field: "orgName"
        },
        {
          headerName: "Status",
          field: "clientStatus"
        },
        {
          headerName: "Status Date",
          field: "clientStatusDate"
        }
      ]
    }
  }

  ngOnInit() {
    this.appService.showSideBarMenu("clientview-Questionnaire", "clientview-Questionnaries");
    this.clientQuestionnaireSerivce.getQuestionnaireForClient(this.appService.clientId).subscribe(
      (res) => {
        if (res['statusCode'] == 'SUCCESS') {
          this.questionnaireCommonService.questionnaireList = res['questionnaires']['content'];
        }
      }

    );
  }
  editRecord(event) {
      this.questionnaireCommonService.moveToQuestionnaire(event.data);
    this.appService.currentSBLink = event.data.questionnaireName;
  }
  getFormName(formId: string) {
    for (let form of this.formsList) {
      if (form.applicationFormsId === formId) {
        return form.formName;
      }
    }
  }

}
