import { AppService } from '../../../../../services/app.service';
import { petitionstypesreportsservice } from './type.service';
import {Component, OnInit} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ManageAccountPetitionStagesService} from '../../../manage-account-tab/petitiontypestages/petitiontypestages.service';
import {HeaderService} from "../../../../common/header/header.service";

@Component({
    selector: 'app-petitiontypes-report',
    templateUrl: './type.component.html',
    styleUrls: ['./type.component.sass']
})

export class petitionstypesreportscomponent implements OnInit {
    public pieChartLabels: string[] = [];
    public pieChartData: number[] = [];
    public pieChartType: string = 'pie';
    public orgsList: any = {};
    public orgsNames: any = [];
    public count: any = [];
    public subTypes: any = [];
    public selectedsubtype: any;
    public selectedsubtypeId: any;
    public petitionstageTypes: any = [];
  constructor(public headerService: HeaderService, private petitionsTypesreportsservice: petitionstypesreportsservice,
              private immigrationViewPetitionsService: ManageAccountPetitionStagesService) { }
  ngOnInit() {
        this.immigrationViewPetitionsService.getPetitionTypes().subscribe(
            res => {
                console.log(res);
                this.petitionstageTypes = res['petitionTypes'];
                this.selectedsubtype = "H1B";
                this.selectedsubtypeId = this.petitionstageTypes[0].petitionTypeId;
                this.getpetitiontypereports();
            });

    }
  getpetitiontypereports() {
        this.petitionsTypesreportsservice.getpetitonTypesreports(this.headerService.user.accountId, this.selectedsubtypeId)
            .subscribe((res) => {
                console.log(res);
                this.orgsNames = [];
                this.pieChartData = [];
                this.pieChartLabels = [];
                this.orgsList = res['orgs'];

                for (var item in this.orgsList) {
                    this.count = [];
                    this.subTypes = [];
                    this.orgsNames.push(item);
                    for (var i = 0; i < this.orgsList[item].length; i++) {
                        this.count.push(this.orgsList[item][i]['count']);
                        this.subTypes.push(this.orgsList[item][i]['subType']);
                    }
                    this.pieChartLabels[item] = this.subTypes;
                    this.pieChartData[item] = this.count;

                }

            });
    }
  petitionsubtypechange() {
        for (var i = 0; i < this.petitionstageTypes.length; i++) {
            if (this.selectedsubtype == this.petitionstageTypes[i].petitiontype) {
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
