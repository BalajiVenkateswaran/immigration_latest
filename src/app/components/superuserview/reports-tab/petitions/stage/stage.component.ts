import {AppService} from '../../../../../services/app.service';
import {ReportsCommonService} from '../../common/reports-common.service';
import {Component, OnInit} from '@angular/core';
import {SuperUserPetitionStagesReportsService} from './stage.service';

@Component({
    selector: 'app-petitionstages',
    templateUrl: './stage.component.html',
    styleUrls: ['./stage.component.sass'],
  providers: [SuperUserPetitionStagesReportsService]
})

export class SuperUserPetitionStageReportsComponent implements OnInit {
    public pieChartLabels: string[] = [];
    public pieChartData: number[] = [];
    public pieChartType = 'pie';
    public orgsList: any = {};
    public orgsNames: any = [];
  selectedaccountId;
  public petitionstageTypes: any = [];
  public selectedPetitionType: string;
  public selectedPetitionTypeId: string;

    constructor(public appService: AppService, private superUserPetitionStagesReportsService: SuperUserPetitionStagesReportsService,
        public reportsCommonService: ReportsCommonService) { }
    ngOnInit() {
        this.selectedaccountId = this.reportsCommonService.totalAccounts[0].accountId;
      this.superUserPetitionStagesReportsService.getPetitionTypes().subscribe(
        res => {
          this.petitionstageTypes = res['petitionTypes'];
          this.selectedPetitionType = this.petitionstageTypes[0].petitiontype;
          this.selectedPetitionTypeId = this.petitionstageTypes[0].petitionTypeId;
          this.getreports();
        });
    }
    changeaccount(value) {
        this.selectedaccountId = value;
        this.getreports();
    }
    getreports() {
        this.superUserPetitionStagesReportsService.getpetitonStagereports(this.selectedaccountId, this.selectedPetitionTypeId)
            .subscribe((res) => {
              let pieChartLabels = [];
              this.pieChartData = [];
              this.orgsNames = [];
              if (res['orgs']) {
                this.orgsList = res['orgs'];
                for (let item in this.orgsList) {
                  let data = [];
                  let stages = [];
                  this.orgsNames.push(item);
                    for (let i = 0; i < this.orgsList[item].length; i++) {
                        data.push(this.orgsList[item][i]['count']);
                        stages.push(this.orgsList[item][i]['stage']);
                    }
                    this.pieChartData[item] = data;
                    pieChartLabels[item] = stages;
                }
                setTimeout(() => {this.pieChartLabels = pieChartLabels});
              }
            });
    }
  petitionsubtypechange() {
    for (let i = 0; i < this.petitionstageTypes.length; i++) {
      if (this.selectedPetitionType === this.petitionstageTypes[i].petitiontype) {
        this.selectedPetitionTypeId = this.petitionstageTypes[i].petitionTypeId;
      }
    }
    this.getreports();
  }
    public chartClicked(e: any): void {
        console.log(e);
    }

    public chartHovered(e: any): void {
        console.log(e);
    }
}
