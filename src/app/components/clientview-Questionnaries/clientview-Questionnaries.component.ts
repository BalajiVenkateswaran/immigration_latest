import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {clientviewQuestionnaire} from "../../models/clientviewQuestionnaries";
import {FormGroup, FormControl} from "@angular/forms";
import {AppService} from "../../services/app.service";
import { Ng2SmartTableModule, ServerDataSource  } from 'ng2-smart-table';
import {ClientQuestionnaireService} from './clientview-Questionnaries.service';
import {User} from "../../models/user";
@Component({
    selector: 'app-petitions-Questionnaires.component',
    templateUrl: './clientview-Questionnaries.component.html',
    styleUrls: ['./clientview-Questionnaries.component.sass']
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
    public addclientviewQuestionnaire: FormGroup;
    public submitted: boolean; // keep track on whether form is submitted
    private message: string;
    questionnaireClientViewList: any[] = [];
    private formsList: any[] = [];

    constructor(private router: Router, public appService: AppService, private clientQuestionnaireSerivce: ClientQuestionnaireService) {

        this.addclientviewQuestionnaire = new FormGroup({
            FormName: new FormControl(''),
            QuestionnaireName: new FormControl(''),
            Organization: new FormControl(''),
            Status: new FormControl(''),
            StatusDate: new FormControl(''),
            View: new FormControl('')
        });
    }

    ngOnInit() {
        this.appService.showSideBarMenu("clientview-Questionnaire", "clientview-Questionnaries");
        this.clientQuestionnaireSerivce.getQuestionnaireForClient(this.appService.clientId).subscribe(
            (res) => {
                if (res['statusCode'] == 'SUCCESS') {
                    this.questionnaireClientViewList = res['questionnaires']['content'];
                    this.appService.dependentsname = this.questionnaireClientViewList;
                    console.log(this.questionnaireClientViewList);

                }
            }

        );
        }
        getFormName(formId: string) {
            for (let form of this.formsList) {
                if (form.applicationFormsId === formId) {
                    return form.formName;
                }
            }
        }

    }
