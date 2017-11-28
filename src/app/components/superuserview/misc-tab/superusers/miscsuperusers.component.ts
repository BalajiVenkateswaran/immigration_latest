import { AppService } from '../../../../services/app.service';
import { ConfirmComponent } from '../../../framework/confirmbox/confirm.component';
import {Component, OnInit} from '@angular/core';
import {MiscSuperUsersService} from './miscsuperusers.service';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { DialogService, DialogComponent } from 'ng2-bootstrap-modal';
export interface ConfirmModel {
    title: string;
    message: string;
    getsuperUsers: boolean;
    addsuperuser: boolean;
    addsuperUsers: Object;
}

@Component({
    selector: 'misc-superusers',
    templateUrl: './miscsuperusers.component.html',
})


export class miscsuperusersComponent extends DialogComponent<ConfirmModel, boolean> implements OnInit {
    public data;
    public settings;
    public getsuperUsers = true;
    public addsuperuser = false;
    public queryParameters;
    public addsuperUsers: any = {};
    public warningMessage: any;
    ngOnInit() {
    }
    constructor(private miscSuperusersservice: MiscSuperUsersService,
        private appService: AppService, public dialogService: DialogService) {
        super(dialogService);

        this.settings = {
            'columnsettings': [
                {
                    headerName: 'First Name',
                    field: 'firstName'
                },
                {
                    headerName: 'Last Name',
                    field: 'lastName'
                },
                {
                    headerName: 'Email',
                    field: 'email'
                },
                {
                    headerName: 'Phone',
                    field: 'phone'
                }
            ]
        }
    }
    addFunction() {
        this.dialogService.addDialog(miscsuperusersComponent, {
            addsuperuser: true,
            getsuperUsers: false,
            title: 'Add New Super User',
        }).subscribe((isConfirmed) => {
            if (isConfirmed) {


            }
        });
    }
    superuserSave(email) {
        if ((this.addsuperUsers['firstName'] === '' || this.addsuperUsers['firstName'] == null || this.addsuperUsers['firstName'] === undefined
            || this.addsuperUsers['lastName'] === '' || this.addsuperUsers['lastName'] == null || this.addsuperUsers['lastName'] === undefined
            || this.addsuperUsers['emailId'] === '' || this.addsuperUsers['emailId'] == null || this.addsuperUsers['emailId'] === undefined)) {
            this.warningMessage = true;

        } else if (email != null) {
            this.warningMessage = false;
        } else {
            this.warningMessage = false;
            this.miscSuperusersservice.saveNewsuperUser(this.addsuperUsers).subscribe((res) => {
                console.log(res);
            });
            this.result = true;
            this.close();
        }
    }
    cancel() {
            this.close();
    }

  dataWithParameters(queryData) {
    if (queryData) {
      this.queryParameters = queryData
    }
    this.miscSuperusersservice.getSuperUsers(queryData).subscribe((res) => {
      if (res['statusCode'] === 'SUCCESS') {
        this.data = res['superUsers'];
      }
    });
  }
}

