import {Component, OnInit} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {User} from "../../models/user";
import {AppService} from "../../services/app.service";
import {RestService} from "../../services/rest.service";
import {clientscreatedreportsservice} from "./clients-createdreports.service";


@Component({
    selector: 'app-clientcreated-report',
    templateUrl: './clients-createdreports.component.html',
    styleUrls: ['./clients-createdreports.component.sass']
})

export class clientscreatedreportscomponent implements OnInit {
    public data: any=[];
    public Year: any = [];
    public orgsList: any = {};
    public orgsNames: any = [];

    ngOnInit() {

        this.clientsCreatedreportsservice.getClientCreationreports(this.appService.user.accountId)
            .subscribe((res) => {
                this.orgsList = res['orgs'];
                for (var item in this.orgsList) {
                    this.data = [];
                    this.Year = [];
                    this.orgsNames.push(item);
                    for (var i = 0; i < this.orgsList[item].length; i++) {
                        this.data.push(this.orgsList[item][i]['count']);
                        this.Year.push(this.orgsList[item][i]['year']);
                    }
                    this.barChartLabels[item] = this.Year;
                    this.barChartData[item] = [{ data: this.data, label: 'Clients Created' }];
                }
            });
    }
    constructor(public appService: AppService, private clientsCreatedreportsservice: clientscreatedreportsservice) { }
    public barChartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: true
    };
    public barChartLabels: number[] = [];
    public barChartType: string = 'bar';
    public barChartLegend: boolean = true;
    // events
    public chartClicked(e: any): void {
        console.log(e);
    }

    public chartHovered(e: any): void {
        console.log(e);
    }

    public barChartData: any[] = [];
}