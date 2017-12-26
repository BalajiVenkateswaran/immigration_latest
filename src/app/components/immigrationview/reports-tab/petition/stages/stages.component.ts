import {PetitionStagesReportsService} from './stages.service';
import {Component, OnInit} from '@angular/core';
import {HeaderService} from '../../../../common/header/header.service';
import {ManageAccountPetitionStagesService} from '../../../manage-account-tab/petitiontypestages/petitiontypestages.service';


@Component({
    selector: 'app-petitionsages-report',
    templateUrl: './stages.component.html',
    styleUrls: ['./stages.component.sass'],
  providers: [ManageAccountPetitionStagesService, PetitionStagesReportsService]
})

export class PetitionStagesReportsComponent implements OnInit {
    public pieChartLabels: string[] = [];
    public pieChartData: number[] = [];
    public pieChartType = 'pie';
    public orgsList: any = {};
    public orgsNames: any = [];
    public petitionstageTypes: any = [];
    public selectedPetitionType: string;
    public selectedPetitionTypeId: any;
    constructor(public headerService: HeaderService, private petitionStagesreportsservice: PetitionStagesReportsService, private immigrationViewPetitionsService: ManageAccountPetitionStagesService) { }

  ngOnInit() {
    this.immigrationViewPetitionsService.getPetitionTypes().subscribe(
        res => {
          this.petitionstageTypes = res['petitionTypes'];
          this.selectedPetitionType = this.petitionstageTypes[0].petitiontype;
          this.selectedPetitionTypeId = this.petitionstageTypes[0].petitionTypeId;
          this.getPetitionStages();
        });

  }
  petitionsubtypechange() {
    for (let i = 0; i < this.petitionstageTypes.length; i++) {
      if (this.selectedPetitionType === this.petitionstageTypes[i].petitiontype) {
        this.selectedPetitionTypeId = this.petitionstageTypes[i].petitionTypeId;
      }
    }
    this.getPetitionStages();
  }
  getPetitionStages() {
    this.petitionStagesreportsservice.getpetitonStagereports(this.headerService.user.accountId, this.selectedPetitionTypeId)
      .subscribe((res) => {
        this.orgsList = res['orgs'];
        this.orgsNames = [];
        let pieChartLabels = [];
        this.pieChartData = [];
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
      });
  }

  public chartClicked(e: any): void {
      console.log(e);
  }

  public chartHovered(e: any): void {
      console.log(e);
  }
}
