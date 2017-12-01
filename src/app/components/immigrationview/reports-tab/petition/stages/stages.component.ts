﻿import {PetitionStagesReportsService} from './stages.service';
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
    public pieChartType: string = 'pie';
    public orgsList: any = {};
    public orgsNames: any = [];
    public count: any = [];
    public stages: any = [];
    public petitionstageTypes: any = [];
    public selectedsubtype: string;
  public selectedsubtypeId: any;
    public petitionsubtypechange: any;
    constructor(public headerService: HeaderService, private petitionStagesreportsservice: PetitionStagesReportsService, private immigrationViewPetitionsService: ManageAccountPetitionStagesService) { }

  ngOnInit() {
      this.immigrationViewPetitionsService.getPetitionTypes().subscribe(
          res => {
              console.log(res);
              this.petitionstageTypes = res['petitionTypes'];
            this.selectedsubtype = "H1B";
            this.selectedsubtypeId = this.petitionstageTypes[0].petitionTypeId;

          });
        this.petitionStagesreportsservice.getpetitonStagereports(this.headerService.user.accountId)
            .subscribe((res) => {
                console.log(res);
                this.orgsList = res['orgs'];
                for (var item in this.orgsList) {
                    this.count = [];
                    this.stages = [];
                    this.orgsNames.push(item);
                    for (var i = 0; i < this.orgsList[item].length; i++) {
                        this.count.push(this.orgsList[item][i]['count']);
                        this.stages.push(this.orgsList[item][i]['stage']);
                    }
                    this.pieChartData[item] = this.count;
                    this.pieChartLabels[item] = this.stages;
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
