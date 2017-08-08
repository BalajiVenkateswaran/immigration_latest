import {Component, OnInit} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {User} from "../../models/user";
import {AppService} from "../../services/app.service";
import {RestService} from "../../services/rest.service";
import {superpetitionsstatusreportsservice} from "./superpetitionstatusreports.service";


@Component({
    selector: 'app-superpetitionstatusreports',
    templateUrl: './superpetitionstatusreports.component.html',
    styleUrls: ['./superpetitionstatusreports.component.sass']
})

export class superpetitionsstatusreportscomponent implements OnInit {

    public pieChartLabels: string[] = ['Opened Petitons', 'Closed Petitions'];
    public pieChartData: number[] = [0, 0];
    public pieChartType: string = 'pie';
    //public orgsList: any = {};
    //public orgsNames: any = [];
    //public closed: any;
    //public opened: any;
    ngOnInit() {
        this.superPetitionsstatusreportsservice.getpetitonstatusreports(this.appService.user.accountId)
            .subscribe((res) => {
               // this.orgsList = res['orgs'];
                //for (var item in this.orgsList) {
                //    this.orgsNames.push(item);
                //    if (res['orgs'][item][0] != undefined) {
                //        if (res['orgs'][item][0].status == "Open") {
                //            this.opened = res['orgs'][item][0].count;
                //        }
                //        if (res['orgs'][item][0].status == "Close") {
                //            this.closed = res['orgs'][item][0].count;
                //        }
                //    }
                //    else {
                //        this.opened = 0;
                //        this.closed = 0;
                //    }
                //    if (res['orgs'][item][1] != undefined) {
                //        if (res['orgs'][item][1].status == "Open") {
                //            this.opened = res['orgs'][item][1].count;
                //        }
                //        if (res['orgs'][item][1].status == "Close") {
                //            this.closed = res['orgs'][item][1].count;
                //        }
                //    }
                //    else {
                //        this.closed = 0;
                //    }
                //    this.pieChartData[item] = [this.opened, this.closed];
                //}
            });
    }
    // events
    public chartClicked(e: any): void {
        console.log(e);
    }

    public chartHovered(e: any): void {
        console.log(e);
    }
    constructor(public appService: AppService, private superPetitionsstatusreportsservice: superpetitionsstatusreportsservice) { }


}