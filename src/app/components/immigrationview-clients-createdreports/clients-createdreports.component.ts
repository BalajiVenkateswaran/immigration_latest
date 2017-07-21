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
    ngOnInit() {

        this.clientsCreatedreportsservice.getClientCreationreports(this.appService.user.accountId)
            .subscribe((res) => {
                var asdf = res;
            });
    }
    constructor(public appService: AppService, private clientsCreatedreportsservice: clientscreatedreportsservice) { }
    public barChartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: true
    };
    public barChartLabels: string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
    public barChartType: string = 'bar';
    public barChartLegend: boolean = true;

    public barChartData: any[] = [
        { data: [65, 59, 80, 81, 56, 55, 40], label: 'Visa Approvals' },
        { data: [28, 48, 40, 19, 86, 27, 90], label: 'Visa Deniels' }
    ];
}