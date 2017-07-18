import {Component, OnInit} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {User} from "../../models/user";
import {AppService} from "../../services/app.service";
import {RestService} from "../../services/rest.service";
import {petitionsstatusreportsservice} from "./petitions-statusreports.service";


@Component({
    selector: 'app-petitionstatus-report',
    templateUrl: './petitions-statusreports.component.html',
    styleUrls: ['./petitions-statusreports.component.sass']
})

export class petitionsstatusreportscomponent implements OnInit {
  
    public pieChartLabels: string[] = ['Closed Petitons', 'Opened Petitions'];
    public pieChartData: number[] = [1,4];
    public pieChartType: string = 'pie';
    ngOnInit() {
        this.appService.showSideBarMenu("immiview-reports", "immiview-petitionreports");
        this.petitionsStatusreportsservice.getpetitonstatusreports(this.appService.user.accountId)
            .subscribe((res) => {
                        
            });
    }
    // events
    public chartClicked(e: any): void {
        console.log(e);
    }

    public chartHovered(e: any): void {
        console.log(e);
    }
    constructor(public appService: AppService, private petitionsStatusreportsservice:petitionsstatusreportsservice) { }

 
}