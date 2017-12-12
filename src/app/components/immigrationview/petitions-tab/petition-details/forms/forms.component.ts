import {Component, OnInit} from '@angular/core';
import {DialogComponent, DialogService} from 'ng2-bootstrap-modal';
import * as FileSaver from 'file-saver';

import {AppService} from '../../../../../services/app.service';
import {FormsService} from './forms.service';
import {GenerateFormButton} from './GenerateFormButton';
import {DownloadButton} from './DownloadButton';
import {HeaderService} from '../../../../common/header/header.service';
import {SmartTableFrameworkComponent} from '../../../../framework/smarttable/smarttable.component';
import {InformationDialogComponent} from '../../../../framework/popup/information/information.component';
import {MatDialog} from '@angular/material';

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
    selector: 'app-petition-details-forms',
    templateUrl: './forms.component.html',
    styleUrls: ['./forms.component.scss'],
    providers: [FormsService],
  entryComponents: [SmartTableFrameworkComponent, DownloadButton, GenerateFormButton]
})
export class FormsComponent extends DialogComponent<ConfirmModel, boolean> implements OnInit {
    public data;
    public settings;
    private beforeCancelForm;
    public beforeEdit: any;
    private message: string;
    public editForms: boolean;
    public generateFormsPopup: boolean;
    formsData: any = [];
    private rowEdit: boolean[] = [];
    private isEditForms: boolean[] = [];
    public formsList: any = {};
    public getForms = true;
    public editFlag = true;
    public generateFormData: any = {};
    public errorMessage= false;
    constructor(private formsService: FormsService, public appService: AppService, public dialogService: DialogService, public dialog: MatDialog, public headerService: HeaderService) {
        super(dialogService);
        this.settings = {
            'isAddButtonEnable': false,
            'pagination': false,
            'isDeleteEnable': false,
            'rowHeight': 60,
            'context': {
                'componentParent': this
            },
            'columnsettings': [
                {
                    headerName: 'Form Name',
                    field: 'formName'
                },
                {
                    headerName: 'Questionnaire Name',
                    field: 'questionnaireName'
                },
                {
                    headerName: 'Generate Form',
                    cellRendererFramework: GenerateFormButton
                },
                {
                    headerName: 'Save Form As',
                    field: 'fileName'
                },
                {
                    headerName: 'Generated Date',
                    field: 'fileCreationDate'
                },
                {
                    headerName: 'Download Form',
                    cellRendererFramework: DownloadButton
                }
            ]
        }

    }
    ngOnInit() {
        this.getFormsData()

    }
    highlightSBLink(link) {
        this.appService.currentSBLink = link;
    }
    getFormsData() {
        this.formsService.getForms(this.appService.petitionId).subscribe(
            (res) => {
                if (res['statusCode'] === 'SUCCESS') {
                    this.formsData = res['forms'];
                    this.data = res['forms'];
                }
                for (let i = 0; i < this.formsData.length; i++) {
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

    }
    editFormsData(event) {
        if (event.colDef.headerName != 'Generate Form' && event.colDef.headerName != 'Download Form') {
            this.editFlag = true;
            if (this.editFlag) {
                this.beforeEdit = (<any>Object).assign({}, event.data);
            }

            this.dialogService.addDialog(FormsComponent, {
                getForms: false,
                editForms: true,
                generateFormsPopup: false,
                title: 'Edit Forms',
                formsList: this.editFlag ? this.beforeEdit : this.formsList
            }).subscribe((isConfirmed) => {
                if (isConfirmed) {
                    let url = '/file/rename';
                    let data = {
                        'accountId': this.headerService.user.accountId,
                        'fileId': event.data.fileId,
                        'fileName': this.beforeEdit.fileName
                    };
                    this.formsService.renameFile(url, data).subscribe((res) => {
                        if (res['statusCode'] == 'SUCCESS') {
                            this.getFormsData();
                        }


                    });
                } else {
                    this.editFlag = false;
                }

            });
        }


    }
    onGenerateFormClick(event) {
        let questionnaireId = event.data.questionnaireId;
        this.generateFormData.formName = event.data.questionnaireName + '_' + event.data.formName;
        this.dialogService.addDialog(FormsComponent, {
            getForms: false,
            editForms: false,
            generateFormsPopup: true,
            title: 'Form Name',
            generateFormData: this.generateFormData

        }).subscribe((isConfirmed) => {

            if (isConfirmed) {
                this.dialog.open(InformationDialogComponent,
                  {
                    data: {
                      title: 'Please Wait...',
                      message: 'This may take sometime'
                    }
                });
                this.formsService.generateForms(questionnaireId, this.headerService.user.accountId, event.data).subscribe(
                    res => {
                        if (res['statusCode'] === 'FAILURE') {
                            this.errorMessage = true;
                        } else {
                           this.getFormsData();
                           this.dialogService.removeAll();
                        }
                    }

                );
            }

        })

    }
    onGenerateFormDownloadClick(event) {
          if (event.data.fileId) {
            let fileName = event.data.fileName;
            this.formsService.downloadFile(event.data.fileId, this.headerService.selectedOrg['orgId']).subscribe(data => this.downloadFiles(data, fileName),
            error => console.log('Error Downloading....'),
            () => console.log('OK'));
        }
    }
    downloadFiles(data: any, fileName) {
        let blob = new Blob([data], {
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
