﻿import { AppService } from '../../../../../services/app.service';
import { petitionstypesreportsservice } from './type.service';
import {Component, OnInit} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-petitiontypes-report',
    templateUrl: './type.component.html',
    styleUrls: ['./type.component.sass']
})

export class petitionstypesreportscomponent implements OnInit {
    public pieChartLabels: string[] = [];
    public pieChartData: number[] = [];
    public pieChartType: string = 'pie';
    public orgsList: any = {};
    public orgsNames: any = [];
    public count: any = [];
    public subTypes: any = [];
    public selectedsubtype: any;
    public selectedsubtypeId: any;
    ngOnInit() {
 
    }
    petitionsubtypechange() {
        for (var i = 0; i < this.appService.petitionstageTypes.length; i++) {
            if (this.selectedsubtype == this.appService.petitionstageTypes[i].petitiontype) {
                this.selectedsubtypeId = this.appService.petitionstageTypes[i].petitionTypeId;
            }
        }
        this.petitionsTypesreportsservice.getpetitonTypesreports(this.appService.user.accountId, this.selectedsubtypeId)
            .subscribe((res) => {
                console.log(res);
              
                this.orgsList = res['orgs'];
             
                for (var item in this.orgsList) {
                    this.count = [];
                    this.subTypes = [];
                    this.orgsNames.push(item);
                    for (var i = 0; i < this.orgsList[item].length; i++) {
                        this.count.push(this.orgsList[item][i]['count']);
                        this.subTypes.push(this.orgsList[item][i]['subType']);
                    }
                    this.pieChartLabels[item] = this.subTypes;
                    this.pieChartData[item] = this.count;
                 
                }
                
            });
    }
    constructor(public appService: AppService, private petitionsTypesreportsservice: petitionstypesreportsservice) { }
    public chartClicked(e: any): void {
        console.log(e);
    }

    public chartHovered(e: any): void {
        console.log(e);
    }
}