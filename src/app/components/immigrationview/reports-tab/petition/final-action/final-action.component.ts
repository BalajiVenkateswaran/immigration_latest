import {PetitionFinalActionService} from './final-action.service';
import {Component, OnInit} from '@angular/core';
import {HeaderService} from '../../../../common/header/header.service';

@Component({
    selector: 'app-petitionfinalaction',
    templateUrl: './final-action.component.html',
    styleUrls: ['./final-action.component.sass'],
  providers: [PetitionFinalActionService]
})

export class PetitionFinalActionComponent implements OnInit {
    public pieChartLabels: string[] = [];
    public pieChartData: number[] = [];
    public pieChartType = 'pie';
    public orgsList: any = [];
    public orgsNames: any = [];
    public count: any = [];
    public status: any = [];
    ngOnInit() {
        this.petitionFinalactionservice.getfinalstatus(this.headerService.user.accountId)
            .subscribe((res) => {
                console.log(res);
                this.orgsList = res['orgs'];
                for (let item in this.orgsList) {
                    this.count = [];
                    this.status = [];
                    this.orgsNames.push(item);
                    for (let i = 0; i < this.orgsList[item].length; i++) {
                        this.count.push(this.orgsList[item][i]['count']);
                        if (this.orgsList[item][i]['status'] == null) {
                            this.orgsList[item][i]['status'] = 'empty';
                        }
                        this.status.push(this.orgsList[item][i]['status'])
                    }
                    this.pieChartLabels[item] = this.status;
                    this.pieChartData[item] = this.count;
                }
            });
    }

    constructor(public headerService: HeaderService, private petitionFinalactionservice: PetitionFinalActionService) { }
    public chartClicked(e: any): void {
        console.log(e);
    }

    public chartHovered(e: any): void {
        console.log(e);
    }
}
