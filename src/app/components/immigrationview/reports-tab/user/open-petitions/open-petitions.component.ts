import {UsersOpenPetitionService} from './open-petitions.service';
import {Component, OnInit} from '@angular/core';
import {HeaderService} from "../../../../common/header/header.service";
import {AppService} from "../../../../../services/app.service";

@Component({
    selector: 'app-useropenpetitons',
    templateUrl: './open-petitions.component.html',
    styleUrls: ['./open-petitions.component.sass'],
  providers: [UsersOpenPetitionService]
})
export class UserOpenPetitionComponent implements OnInit {
    public pieChartLabels: string[] = [];
    public pieChartData: number[] = [];
    public pieChartType: string = 'pie';
    public orgsList: any = [];
    public orgsNames: any = [];
    public count: any = [];
    public username: any = [];
    public fullMonth: any = [];
    constructor(public headerService: HeaderService, public appService: AppService, private usersOpenpetitionservice: UsersOpenPetitionService) { }

    ngOnInit() {
        this.usersOpenpetitionservice.getuseropenpetitions(this.headerService.user.accountId)
            .subscribe((res) => {
                console.log(res);
                this.orgsList = res['orgs'];
                for (var item in this.orgsList) {
                    this.count = [];
                    this.fullMonth = [];
                    this.orgsNames.push(item);
                    for (var i = 0; i < this.orgsList[item].length; i++) {
                        this.count.push(this.orgsList[item][i]['count']);
                        this.username = [this.orgsList[item][i]['firstName'], this.orgsList[item][i]['lastName']];
                        this.fullMonth.push(this.username.join(' '));
                    }
                    this.pieChartLabels[item] = this.fullMonth;
                    this.pieChartData[item] = this.count;
                }
            });
    }
    public chartClicked(e: any): void {
        console.log(e);
    }

    public chartHovered(e: any): void {
        console.log(e);
    }
}
