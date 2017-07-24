import {Component, OnInit} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {User} from "../../models/user";
import {AppService} from "../../services/app.service";
import {RestService} from "../../services/rest.service";
import {petitionstypesreportsservice} from "./petitiontypereports.service";


@Component({
    selector: 'app-petitiontypes-report',
    templateUrl: './petitiontypereports.component.html',
    styleUrls: ['./petitiontypereports.component.sass']
})

export class petitionstypesreportscomponent implements OnInit {
    public pieChartLabels: string[] = [];
    public pieChartData: number[] = [];
    public pieChartType: string = 'pie';
    public orgsList: any = {};
    public orgsNames: any = [];
    public count: any = [];
    public subTypes: any=[];
    ngOnInit() {
        this.petitionsTypesreportsservice.getpetitonTypesreports(this.appService.user.accountId,"14a8e52f-2f5a-11e7-bf66-0aac8eb8f426")
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