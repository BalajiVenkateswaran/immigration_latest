import {PetitionTypeReportService} from './type.service';
import {Component, OnInit} from '@angular/core';
import {ManageAccountPetitionStagesService} from '../../../manage-account-tab/petitiontypestages/petitiontypestages.service';
import {HeaderService} from '../../../../common/header/header.service';

@Component({
    selector: 'app-petitiontypes-report',
    templateUrl: './type.component.html',
    styleUrls: ['./type.component.sass'],
  providers: [ManageAccountPetitionStagesService, PetitionTypeReportService]
})

export class PetitionTypeReportComponent implements OnInit {
    public pieChartLabels: string[] = [];
    public pieChartData: number[] = [];
    public pieChartType = 'pie';
    public orgsList: any = {};
    public orgsNames: any = [];
    public selectedsubtype: any;
    public selectedsubtypeId: any;
    public petitionstageTypes: any = [];
  constructor(public headerService: HeaderService, private petitionsTypesreportsservice: PetitionTypeReportService,
              private immigrationViewPetitionsService: ManageAccountPetitionStagesService) { }
  ngOnInit() {
        this.immigrationViewPetitionsService.getPetitionTypes().subscribe(
            res => {
                console.log(res);
                this.petitionstageTypes = res['petitionTypes'];
                if (this.petitionstageTypes[0]) {
                  this.selectedsubtype = this.petitionstageTypes[0].petitiontype;
                  this.selectedsubtypeId = this.petitionstageTypes[0].petitionTypeId;
                  this.getpetitiontypereports();
                }
            });

    }
  getpetitiontypereports() {
        this.petitionsTypesreportsservice.getpetitonTypesreports(this.headerService.user.accountId, this.selectedsubtypeId)
            .subscribe((res) => {
                console.log(res);
                this.orgsNames = [];
                this.pieChartData = [];
                let pieChartLabels = [];
                this.orgsList = res['orgs'];

                for (let item in this.orgsList) {
                    let data = [];
                    let subTypes = [];
                    this.orgsNames.push(item);
                    for (let i = 0; i < this.orgsList[item].length; i++) {
                        data.push(this.orgsList[item][i]['count']);
                        subTypes.push(this.orgsList[item][i]['subType']);
                    }
                    pieChartLabels[item] = subTypes;
                    this.pieChartData[item] = data;
                }

                setTimeout(() => {this.pieChartLabels = pieChartLabels});
            });

    }
  petitionsubtypechange() {
        for (let i = 0; i < this.petitionstageTypes.length; i++) {
            if (this.selectedsubtype === this.petitionstageTypes[i].petitiontype) {
                this.selectedsubtypeId = this.petitionstageTypes[i].petitionTypeId;
            }
        }
        this.getpetitiontypereports();
  }
  public chartClicked(e: any): void {
      console.log(e);
  }

  public chartHovered(e: any): void {
      console.log(e);
  }
}
