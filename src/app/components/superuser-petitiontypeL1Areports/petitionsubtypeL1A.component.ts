import {Component, OnInit} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {User} from "../../models/user";
import {AppService} from "../../services/app.service";
import {RestService} from "../../services/rest.service";
import {superuserL1Areportsservice} from "./petitionsubtypeL1A.service";
import {ReportsCommonService} from "../superuserview/reports-tab/common/reports-common.service";


@Component({
    selector: 'app-petitiontypes-typesL1A',
    templateUrl: './petitionsubtypeL1A.component.html',
    styleUrls: ['./petitionsubtypeL1A.component.sass']
})

export class superuserL1Areportscomponent implements OnInit {
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
        this.superUserL1Areportsservice.getpetitonTypesreports(this.selectedaccountId, "228fd16f-d366-11e6-b7ec-34e6d7382ca1")
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
    constructor(public appService: AppService, private superUserL1Areportsservice: superuserL1Areportsservice,
        public ReportscommonService: ReportsCommonService) { }
    public chartClicked(e: any): void {
        console.log(e);
    }

    public chartHovered(e: any): void {
        console.log(e);
    }
}