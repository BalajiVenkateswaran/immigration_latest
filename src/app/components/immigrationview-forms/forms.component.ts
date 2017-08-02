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
import { ConfirmComponent } from '../confirmbox/confirm.component';
import * as FileSaver from 'file-saver';
export interface ConfirmModel {
    title: string;
    message: string;
    getForms: boolean;
    editForms: boolean;
    generateFormsPopup: boolean;
    formsList: Object;
    generateFormData: Object;
}
@Component({
    selector: 'app-forms',
    templateUrl: './forms.component.html',
    styleUrls: ['./forms.component.scss']
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
    public downloadFlag: boolean = false;
    public generateFormFlag:boolean=false;
    public generateChecked:boolean=true;
    public generateChecked1:boolean=false;
    public editForms: boolean;
    public generateFormsPopup: boolean;
    public generateFormData: any = {};
    public errorMessage:boolean=false;
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
            'rowHeight': 45,
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

                    headerName: "Generate Form",
                    cellRendererFramework: GenerateFormButton,
                },
                {

                    headerName: "Save Form As",
                    field: "fileName"
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
                    this.generateChecked1=true;
                 
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
                    this.downloadFlag = true;
               this.generateChecked=true;
                  

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
        this.generateFormData.formName = forms.questionnaireName + "_" + forms.formName;
        this.dialogService.addDialog(ImmigrationviewFormsComponent, {
            getForms: false,
            editForms: false,
            generateFormsPopup: true,
            title: 'Form Name',
            generateFormData: this.generateFormData

        }).subscribe((isConfirmed) => {
            if (isConfirmed) {
                this.formsService.generateForms(questionnaireId,this.user.accountId, forms).subscribe(
                    res => {
                        if(res['statusCode']=='FAILURE'){
                            this.errorMessage=true;
                        }
                        else{
                            this.dialogService.addDialog(ConfirmComponent,{
                                title:'Please Wait...',
                                message:'Form Generation takes sometime',
                            }).subscribe(()=>{
                                this.getFormsData();
                            })
                        }
                         
                    }

                );
            }
            this.generateChecked1=false;
        })

    }
    editFormsData(event) {
        if(event.data.fileId ){
            this.generateChecked=false;
        }
        else{
            this.generateChecked=true;
        }
        if (!this.generateChecked && !this.downloadFlag) {
            this.editFlag = true;
            if (this.editFlag) {
                this.beforeEdit = (<any>Object).assign({}, event.data);
            }

            this.dialogService.addDialog(ImmigrationviewFormsComponent, {
                getForms: false,
                editForms: true,
                generateFormsPopup: false,
                title: 'Edit Forms',
                formsList: this.editFlag ? this.beforeEdit : this.formsList
            }).subscribe((isConfirmed) => {
                if (isConfirmed) {
                    let url = "/file/rename";
                    let data = {
                        "accountId": this.user.accountId,
                        "fileId": event.data.fileId,
                        "fileName": this.beforeEdit.fileName
                    };
                    this.formsService.renameFile(url,data).subscribe((res) => {
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
        if(this.downloadFlag){
            this.downloadForm(event.data);
        } 
        if(this.generateChecked1){
            this.generateForm(event.data);
        }  
       
    }
    downloadForm(formData) {
        if (formData.fileId) {
            let fileName=formData.fileName;
            this.formsService.downloadFile(formData.fileId).subscribe(data => this.downloadFiles(data,fileName)),
                error => console.log("Error Downloading....");
            () => console.log("OK");
             this.downloadFlag=false;
        }
    }
    downloadFiles(data: any, fileName) {
        var blob = new Blob([data], {
            type: 'application/pdf'
        });
        FileSaver.saveAs(blob, fileName);
       

    }
    fileNameSave() {
        this.appService.formListData = this.formsList;
        this.result = true;
        this.close();
    }
    cancel() {
        this.result = false;
        this.close();
    }
    generateFormSave() {
        this.result = true;
        this.close();
    }
    generateFormCancel() {
        this.result = false;
        this.close();
    }
}
