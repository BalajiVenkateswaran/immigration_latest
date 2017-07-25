import { Component, OnInit } from '@angular/core';
import { FormsService } from "./forms.service";
import { form } from "../../models/form";
import { FormGroup, FormControl } from "@angular/forms";
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { LocalDataSource } from 'ng2-smart-table';
import { User } from "../../models/user";
import { AppService } from "../../services/app.service";
import { GenerateFormButton } from './GenerateFormButton';
import { DownloadButton } from './DownloadButton';
import { DialogService, DialogComponent } from "ng2-bootstrap-modal";
export interface ConfirmModel {
    title: string;
    message: string;
    getForms: boolean;
    editForms: boolean;
    formsList: Object;
}
@Component({
    selector: 'app-forms',
    templateUrl: './forms.component.html',
    styleUrls: ['./forms.component.sass']
})
export class ImmigrationviewFormsComponent extends DialogComponent<ConfirmModel, boolean> implements OnInit {
    private user: User;
    public addForm: FormGroup; // our model driven form
    public submitted: boolean; // keep track on whether form is submitted
    private message: string;
    formsData: any = [];
    private rowEdit: boolean[] = [];
    private isEditForms: boolean[] = [];
    private form: any = {};
    private beforeCancelForm;
    public settings;
    public data;
    public generateSubscription;
    public downloadSubscription;
    public formsList: any = {};
    public getForms: boolean = true;
    public editFlag: boolean = true;
    public beforeEdit: any;
    public checked: boolean = false;
    public downloadFlag:boolean=false;
    public editForms:boolean;
    constructor(private formsService: FormsService, public appService: AppService, public dialogService: DialogService) {
        super(dialogService); if (this.appService.user) {
            this.user = this.appService.user;
        }
        if (this.appService.user) {
            this.user = this.appService.user;
        }
        this.settings = {
            'isAddButtonEnable': false,
            'pagination': false,
            'isDeleteEnable': false,
            'rowHeight':45,
            'columnsettings': [

                {
                    headerName: "Form Name",
                    field: "formName"
                },
                {

                    headerName: "Questionnaire Name",
                    field: "questionnaireName",
                },
                {

                    headerName: "Save Form As",
                    field: "formName"
                },
                {

                    headerName: "Generate Form",
                    cellRendererFramework: GenerateFormButton,
                },
                {

                    headerName: "Generated Date",
                    field: "fileCreationDate"
                },
                {

                    headerName: "Download Form",
                    cellRendererFramework: DownloadButton,
                }
            ]
        }
        this.generateSubscription = GenerateFormButton.onGenerateClick.subscribe(res => {
            if (res) {
                console.log("Generate Clicked");
                if (res.hasOwnProperty('generateFlag')) {
                    this.checked = true;
                }
                else {
                    this.checked = false;
                }
            }
        })
        this.downloadSubscription = DownloadButton.onDownloadClick.subscribe(res => {
            if (res) {
                console.log("Download Clicked");
                if (res.hasOwnProperty('downloadFlag')) {
                    this.checked = true;
                    this.downloadFlag=true;
                    
                }
                else {
                    this.checked = false;
                }
                
            }
        })
    }
    highlightSBLink(link) {
        this.appService.currentSBLink = link;
    }
    ngOnInit() {
        this.getFormsData()

    }
    getFormsData() {
        this.formsService.getForms(this.appService.petitionId).subscribe(
            (res) => {
                if (res['statusCode'] == "SUCCESS") {
                    this.formsData = res['forms'];
                    this.data = res['forms'];
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
        this.formsService.generateForms(questionnaireId, 'a2604ec8-e0f2-11e5-a291-34e6d7382cac', data).subscribe(
            res => {
                console.log(res);
            }
        );
    }
    editFormsData(event) {
        if (!this.checked) {
            this.editFlag = true;
            if (this.editFlag) {
                this.beforeEdit = (<any>Object).assign({}, event.data);
            }

            this.dialogService.addDialog(ImmigrationviewFormsComponent, {
                getForms: false,
                editForms: true,
                title: 'Edit Forms',
                formsList: this.editFlag ? this.beforeEdit : this.formsList
            }).subscribe((isConfirmed) => {
                if (isConfirmed) {
                    this.formsService.getForms(this.appService.formListData).subscribe((res) => {
                        if (res['statusCode'] == 'SUCCESS') {
                            this.getFormsData();
                        }

                    });
                } else {
                    this.editFlag = false;
                }
                 this.checked = false;
            });
        }
        else if(this.checked && this.downloadFlag){
            this.generateForm(event.data);
            this.checked=false;
        }
        else{
            this.generateForm(event.data);
            this.checked=false;
        }

    }
    docExpSave() {
        this.appService.formListData = this.formsList;
        /*  if (this.addNewDocExp['status'] == '' || null || undefined) {
              this.addNewDocExp['status'] == "Active";
          }
          this.addNewDocExp['clientId'] = this.appService.clientId;
          this.addNewDocExp['validFrom'] = this.addNewDocExp['validFrom']['formatted'];
          this.addNewDocExp['validTo'] = this.addNewDocExp['validTo']['formatted'];
          this.appService.addNewDocExp = this.addNewDocExp;*/
        this.result = true;
        this.close();
    }
    cancel() {
        this.result = false;
        this.close();
    }
}
