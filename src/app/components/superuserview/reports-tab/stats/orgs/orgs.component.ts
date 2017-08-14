import { AppService } from '../../../../../services/app.service';
import { ReportsCommonService } from '../../common/reports-common.service';
import { SuperUserstatorgsReportsService } from './orgs.service';
import { Component, OnInit } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@Component({
    selector: 'app-orgreports',
    templateUrl: './orgs.component.html',
    styleUrls: ['./orgs.component.sass']
})

export class superuserstatsotgsReportsComponent implements OnInit {
    public data: any = [];


    constructor(public appService: AppService, private SuperuserstatorgsReportsService: SuperUserstatorgsReportsService,
        public reportsCommonService: ReportsCommonService) { }


    ngOnInit() {
    }

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