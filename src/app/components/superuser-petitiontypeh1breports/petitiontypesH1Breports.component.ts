import {Component, OnInit} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {User} from "../../models/user";
import {AppService} from "../../services/app.service";
import {RestService} from "../../services/rest.service";
import {superuserH1Breportsservice} from "./petitiontypesH1Breports.service";
import {ReportsCommonService} from "../superuserview/reports-tab/common/reports-common.service";


@Component({
    selector: 'app-petitiontypes-types',
    templateUrl: './petitiontypesH1Breports.component.html',
    styleUrls: ['./petitiontypesH1Breports.component.sass']
})

export class superuserH1Breportscomponent implements OnInit {
    public pieChartLabels: string[] = [];
    public pieChartData: number[] = [];
    public pieChartType: string = 'pie';
    public orgsList: any = {};
    public orgsNames: any = [];
    public count: any = [];
    public subTypes: any = [];
    public selectedaccountId: string;
    ngOnInit() {
        this.selectedaccountId = this.ReportscommonService.totalAccounts[0].accountId;
        this.getreports();
      
    }
    changeaccount(value) {
        this.selectedaccountId = value;
        this.getreports();
    }
    getreports() {
        this.superUserH1Breportsservice.getpetitonTypesreports(this.selectedaccountId, "14a8e52f-2f5a-11e7-bf66-0aac8eb8f426")
            .subscribe((res) => {
                console.log(res);
                if (res['orgs']) {
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
                }
            });
    }
    constructor(public appService: AppService, private superUserH1Breportsservice: superuserH1Breportsservice,
        public ReportscommonService: ReportsCommonService) { }
    public chartClicked(e: any): void {
        console.log(e);
    }

    public chartHovered(e: any): void {
        console.log(e);
    }
}