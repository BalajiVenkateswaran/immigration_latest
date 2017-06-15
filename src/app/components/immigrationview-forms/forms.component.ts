import { Component, OnInit } from '@angular/core';
import {FormsService} from "./forms.service";
import {form} from "../../models/form";
import {FormGroup, FormControl} from "@angular/forms";
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { LocalDataSource } from 'ng2-smart-table';
import {User} from "../../models/user";
import {AppService} from "../../services/app.service";
@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.sass']
})
export class ImmigrationviewFormsComponent implements OnInit {
    private user: User;
    public addForm: FormGroup; // our model driven form
    public submitted: boolean; // keep track on whether form is submitted
    private message: string;
    formsData: any = [];
    private rowEdit: boolean[] = [];
    private isEditForms: boolean[] = [];
    private form: any = {};
    private beforeCancelForm;
    constructor(private formsService: FormsService, public appService: AppService) {
        if (this.appService.user) {
            this.user = this.appService.user;
        }
    }
    highlightSBLink(link) {
        this.appService.currentSBLink = link;
    }
    ngOnInit() {
        this.formsService.getForms(this.appService.petitionId).subscribe(
            (res) => {
                if (res['statusCode'] == "SUCCESS") {
                    this.formsData = res['forms'];
                }
                for (var i = 0; i < this.formsData.length; i++) {
                    this.rowEdit[i] = true;
                    this.isEditForms[i] = true;
                }
            }

        );

    }

    editForm(i, forms) {
        this.beforeCancelForm = (<any>Object).assign({}, forms);
        this.rowEdit[i] = !this.rowEdit[i];
        this.isEditForms[i] = !this.isEditForms[i];
    }
    cancelForm(i, forms) {
        this.formsData[i] = this.beforeCancelForm;
        this.rowEdit[i] = !this.rowEdit[i];
        this.isEditForms[i] = !this.isEditForms[i];
    }
    saveForm(i, forms) {
        this.rowEdit[i] = !this.rowEdit[i];
        this.isEditForms[i] = !this.isEditForms[i];
    }
    generateForm(forms) {
        var data;
        var questionnaireId = forms.questionnaireId;
        this.formsService.generateForms(questionnaireId, 'a2604ec8-e0f2-11e5-a291-34e6d7382cac' , data).subscribe(
            res => {
                console.log(res);
            }
        );
    }
}
