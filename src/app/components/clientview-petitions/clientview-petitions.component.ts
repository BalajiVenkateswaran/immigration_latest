import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {clientviewpetition} from "../../models/clientviewpetitions";
import {FormGroup, FormControl} from "@angular/forms";
import {AppService} from "../../services/app.service";
import { Ng2SmartTableModule, ServerDataSource  } from 'ng2-smart-table';
import {User} from "../../models/user";
import {clientviewPetitionsService} from "./clientview-petitions.service";
import { LocalDataSource } from 'ng2-smart-table';
import { ConfirmComponent } from '../confirmbox/confirm.component';
import { DialogService, DialogComponent} from "ng2-bootstrap-modal";

export interface ConfirmModel {
    title: string;
    message: string;
    showclientviewPetitionpopup: boolean;
    getClientviewPetitionData: boolean;
    cvpedit: Object;
}
@Component({
    selector: 'app-petitions-clientview.component',
    templateUrl: './clientview-petitions.component.html',
    styleUrls: ['./clientview-petitions.component.sass']
})

export class petitionsclientviewComponent extends DialogComponent<ConfirmModel, boolean> implements OnInit {
    private outlet: any = {
        breadcrumbs: null,
        header: 'header',
        message: null,
        carousel: null,
        menu: 'menu',
        footer: null
    };
    public addclientviewPetition: FormGroup;
    public submitted: boolean; // keep track on whether form is submitted
    private message: string;
    public clientviewpetitionList;
    public addPetition: FormGroup;
    private user: User;
    public editFlag: boolean = true;
    public beforeEdit: any;
    public cvpmore: any = {};
    public showclientviewPetitionpopup: boolean;
    public getClientviewPetitionData: boolean = true;
    private clientviewpetition = {};
    private cvpedit = {};
    constructor(private router: Router, private appService: AppService, private clientviewpetitionsService: clientviewPetitionsService, public dialogService: DialogService) {
        super(dialogService);
        if (this.appService.user) {
            this.user = this.appService.user;
        }
    }
    getclipetitionData() {
        this.clientviewpetitionsService.getPetitions(this.appService.user.userId)
            .subscribe((res) => {
                this.clientviewpetitionList = res['petitions'];
                console.log(this.clientviewpetitionList);
            });
    }
    ngOnInit() {
        this.getclipetitionData();

      this.appService.showSideBarMenu(null, "clientview-petitions");
      this.router.navigate(['', { outlets: this.outlet }], { skipLocationChange: true });
    }
    viewAllColumns(i, cvpmore) {
        this.cvpedit = i
        this.editFlag = true;
        if (this.editFlag) {
            this.beforeEdit = (<any>Object).assign({}, cvpmore);
        }

        this.dialogService.addDialog(petitionsclientviewComponent, {
            showclientviewPetitionpopup: true,
            getClientviewPetitionData: false,
            title: 'Petition Full Details',
            cvpedit: this.editFlag ? this.beforeEdit : this.cvpedit,
            
        }).subscribe((isConfirmed) => {
            if (isConfirmed) {
                this.clientviewpetitionsService.getPetitions(this.appService.cvpmore).subscribe((res) => {
                    if (res['statusCode'] == 'SUCCESS') {
                        this.getclipetitionData();
                    }

                });
            } 
        });

    }
    cancel() {
        this.result = false;
        this.close();
    }

}
