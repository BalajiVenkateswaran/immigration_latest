import { AppService } from '../../../../../services/app.service';
import { petitionstagsreportsservice } from './tags.service';
import {Component, OnInit} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-petitiontags-report',
    templateUrl: './tags.component.html',
    styleUrls: ['./tags.component.sass']
})

export class petitionstagsreportscomponent implements OnInit {
    public pieChartLabels: string[] = [];
    public pieChartData: number[] = [];
    public pieChartType: string = 'pie';
    public orgsList: any = {};
    public orgsNames: any = [];
    public count: any = [];
    public tags: any = [];
    ngOnInit() {
        this.petitionStagsreportsservice.getpetitonTagsreports(this.appService.user.accountId)
            .subscribe((res) => {
                console.log(res);
                this.orgsList = res['orgs'];
                for (var item in this.orgsList) {
                    this.count = [];
                    this.tags = [];
                    this.orgsNames.push(item);
                    for (var i = 0; i < this.orgsList[item].length; i++) {
                        this.count.push(this.orgsList[item][i]['count']);
                        this.tags.push(this.orgsList[item][i]['tag']);
                    }
                    this.pieChartLabels[item] = this.tags;
                    this.pieChartData[item] = this.count;
                }
            });
    }

    constructor(public appService: AppService, private petitionStagsreportsservice: petitionstagsreportsservice) { }
    public chartClicked(e: any): void {
        console.log(e);
    }

    public chartHovered(e: any): void {
        console.log(e);
    }
}