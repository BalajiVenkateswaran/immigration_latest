import { AppService } from '../../../../../services/app.service';
import { ReportsCommonService } from '../../common/reports-common.service';
import { SuperUserH1BReportsService } from './petitiontypesH1B.service';
import {Component, OnInit} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ManageAccountPetitionStagesService} from '../../../../immigrationview/manage-account-tab/petitiontypestages/petitiontypestages.service';


@Component({
    selector: 'app-petitiontypes-types',
    templateUrl: './petitiontypesH1B.component.html',
    styleUrls: ['./petitiontypesH1B.component.sass'],
  providers: [ManageAccountPetitionStagesService, SuperUserH1BReportsService]
})

export class SuperUserH1BReportsComponent implements OnInit {
    public pieChartLabels: string[] = [];
    public pieChartData: number[] = [];
    public pieChartType: string = 'pie';
    public orgsList: any = {};
    public orgsNames: any = [];
    public count: any = [];
    public subTypes: any = [];
    public selectedaccountId: string;
    public petitionstageTypes: any = [];
    public selectedPetitionType;
    public selectedPetitionTypeId;
  constructor(public appService: AppService, private superUserH1Breportsservice: SuperUserH1BReportsService,
      public reportsCommonService: ReportsCommonService, private immigrationViewPetitionsService: ManageAccountPetitionStagesService) { }
  ngOnInit() {
      this.immigrationViewPetitionsService.getPetitionTypes().subscribe(
          res => {
              console.log(res);
              this.petitionstageTypes = res['petitionTypes'];
              if (this.petitionstageTypes[0]) {
                this.selectedPetitionType = this.petitionstageTypes[0].petitiontype;
                this.selectedPetitionTypeId = this.petitionstageTypes[0].petitionTypeId;
                this.getreports();
              }
          });
        this.selectedaccountId = this.reportsCommonService.totalAccounts[0].accountId;
        this.getreports();

    }
  changeaccount(value) {
        this.selectedaccountId = value;
        this.selectedPetitionType = this.petitionstageTypes[0].petitiontype;
        this.selectedPetitionTypeId = this.petitionstageTypes[0].petitionTypeId;
        this.getreports();
    }
  getreports() {
        this.superUserH1Breportsservice.getpetitonTypesreports(this.selectedaccountId, this.selectedPetitionTypeId)
            .subscribe((res) => {
              this.orgsNames = [];
              this.pieChartData = [];
              let pieChartLabels = [];
              if (res['orgs']) {
                    this.orgsList = res['orgs'];
                    for (let item in this.orgsList) {
                        let data = [];
                        let types = [];
                        this.orgsNames.push(item);
                        for (let i = 0; i < this.orgsList[item].length; i++) {
                            data.push(this.orgsList[item][i]['count']);
                            types.push(this.orgsList[item][i]['subType']);
                        }
                        pieChartLabels[item] = types;
                        this.pieChartData[item] = data;
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
