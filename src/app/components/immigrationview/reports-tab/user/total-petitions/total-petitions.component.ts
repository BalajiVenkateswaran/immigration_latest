import { AppService } from '../../../../../services/app.service';
import { UserTotalPetitionService } from './total-petitions.service';
import {Component, OnInit} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HeaderService} from "../../../../common/header/header.service";

@Component({
  selector: 'app-usertotalpetitions',
  templateUrl: './total-petitions.component.html',
  styleUrls: ['./total-petitions.component.sass'],
  providers: [UserTotalPetitionService]
})

export class UserTotalPetitionsComponent implements OnInit {
  public data: any = [];
  public Year: any = [];
  public orgsList: any = {};
  public orgsNames: any = [];
  public yearMonth: any = [];
  public yearMntName: any = [];
  public fullName: any = [];
  public fullname: any = [];
  public finalLbl: any = [];
  constructor(public appService: AppService, private userTotalpetitionservice: UserTotalPetitionService, public headerService: HeaderService) {
  }
  ngOnInit() {

    this.userTotalpetitionservice.getuserstotpetitions(this.headerService.user.accountId)
      .subscribe((res) => {
        console.log(res);
        this.orgsList = res['orgs'];
        for (var item in this.orgsList) {
          this.data = [];
          this.yearMonth = [];
          this.finalLbl = [];
          this.fullName = [];
          this.orgsNames.push(item);
          for (var i = 0; i < this.orgsList[item].length; i++) {
            this.data.push(this.orgsList[item][i]['count']);
            this.Year = [this.orgsList[item][i]['year'], this.orgsList[item][i]['month']];
            this.yearMonth.push(this.Year.join('-'));
            this.fullname = [this.orgsList[item][i]['firstName'], this.orgsList[item][i]['lastName']];
            this.fullName.push(this.fullname.join(' '));
            this.yearMntName = [this.yearMonth[i], this.fullName[i]];
            this.finalLbl.push(this.yearMntName.join(','));
          }
          this.barChartLabels[item] = this.finalLbl;
          this.barChartData[item] = [{data: this.data, label: 'Clients Created'}];
        }
      });
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
