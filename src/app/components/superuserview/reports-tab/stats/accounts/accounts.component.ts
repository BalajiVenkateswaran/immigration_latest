import { AppService } from '../../../../../services/app.service';
import { statsaccountsservice } from './accounts.service';
import {Component, OnInit} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-statsaccountsreports',
    templateUrl: './accounts.component.html',
    styleUrls: ['./accounts.component.sass']
})

export class statsaccountscomponent implements OnInit {
  
    ngOnInit() {
        this.appService.showSideBarMenu("superuser-reports", "superuser-statsaccounts");
    }
    constructor(public appService: AppService, private statsAccountsservice: statsaccountsservice) {
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