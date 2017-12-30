import {Component, OnInit} from '@angular/core';
import {HeaderService} from '../../../../common/header/header.service';

@Component({
    selector: 'app-statsaccountsreports',
    templateUrl: './accounts.component.html',
    styleUrls: ['./accounts.component.sass']
})

export class StatsAccountsComponent implements OnInit {

  constructor(public headerService: HeaderService) {
  }
  ngOnInit() {
        this.headerService.showSideBarMenu('superuser-reports', 'superuserview/reports/stats/accounts');
    }
    public barChartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: true
    };
    public barChartLabels: number[] = [];
    public barChartType = 'bar';
    public barChartLegend = true;
    // events
    public chartClicked(e: any): void {
        console.log(e);
    }

    public chartHovered(e: any): void {
        console.log(e);
    }

    public barChartData: any[] = [];
}
