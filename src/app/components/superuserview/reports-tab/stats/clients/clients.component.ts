import {AppService} from '../../../../../services/app.service';
import {ReportsCommonService} from '../../common/reports-common.service';
import {Component, OnInit} from '@angular/core';


@Component({
    selector: 'app-orgreports',
    templateUrl: './clients.component.html',
    styleUrls: ['./clients.component.sass']
})

export class SuperUserStatsClientsReportsComponent implements OnInit {
    public data: any = [];


    constructor(public appService: AppService, public reportsCommonService: ReportsCommonService) { }


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
