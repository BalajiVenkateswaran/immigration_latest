import { AppService } from '../../../../../services/app.service';
import { petitionstagsreportsservice } from './tags.service';
import {Component, OnInit} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HeaderService} from "../../../../common/header/header.service";

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
    public petitiontags: any = [];
  constructor(public headerService: HeaderService, private petitionStagsreportsservice: petitionstagsreportsservice) { }

  ngOnInit() {
      this.petitionStagsreportsservice.getpetitonstags(this.headerService.user.accountId)
          .subscribe((res) => {
              console.log(res);
              if (res['tags']) {
                  this.petitiontags=res['tags'];
              }
          });
        this.petitionStagsreportsservice.getpetitonTagsreports(this.headerService.user.accountId)
            .subscribe((res) => {
                console.log(res);
                this.orgsList = res['orgs'];
                for (var item in this.orgsList) {
                    this.count = [];
                    this.tags = [];
                    this.orgsNames.push(item);
                    for (var i = 0; i < this.orgsList[item].length; i++) {
                        this.count.push(this.orgsList[item][i]['count']);
                        if (this.orgsList[item][i]['tag'] == null) {
                            this.orgsList[item][i]['tag'] = "empty";
                        }
                        this.tags.push(this.orgsList[item][i]['tag']);
                    }
                    this.pieChartLabels[item] = this.tags;
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
