import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {clientviewpetition} from "../../models/clientviewpetitions";
import {FormGroup, FormControl} from "@angular/forms";
import {AppService} from "../../services/app.service";
import { Ng2SmartTableModule, ServerDataSource  } from 'ng2-smart-table';
import {User} from "../../models/user";
import {clientviewPetitionsService} from "./clientview-petitions.service";
import { LocalDataSource } from 'ng2-smart-table';

@Component({
    selector: 'app-petitions-clientview.component',
    templateUrl: './clientview-petitions.component.html',
    styleUrls: ['./clientview-petitions.component.sass']
})

export class petitionsclientviewComponent implements OnInit {
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
    public addPetition: FormGroup;
    private user: User;
    settings = {
        actions:{
        add: false,
        edit: false,
        delete: false
    },
        columns: {
            petitionName: {
                title: 'Petition Name'
            },
            petitionType: {
                title: 'Petition Type'
            },
            organization: {
                title: 'Organization'
            },
            status: {
                title: 'Status'
            },
            petitionStage: {
                title: 'Stage'
            },
            startDate: {
                title: 'Start Date'
            },
            lastUpdated: {
                title: 'Last Updated'
            },
            recieptNumber: {
                title: 'Reciept Number'
            },
            shippingCarrier: {
                title: 'Shipping Carrier'
            },
            trackingNumber: {
                title: 'Tracking Number'
            }
        },
        pager: {
            display: true,
            perPage: 10
        }
    };

    source: LocalDataSource = new LocalDataSource();

    constructor(private router: Router, private appService: AppService, private clientviewpetitionsService: clientviewPetitionsService) {

        if (this.appService.user) {
            this.user = this.appService.user;
        }
    }

    ngOnInit() {
        this.clientviewpetitionsService.getPetitions(this.appService.user.userId)
            .subscribe((res) => {
                this.source.load(res['petitions']);
                console.log(this.source);
            });

      this.appService.showSideBarMenu(null, "clientview-petitions");
      this.router.navigate(['', { outlets: this.outlet }], { skipLocationChange: true });
    }


}
