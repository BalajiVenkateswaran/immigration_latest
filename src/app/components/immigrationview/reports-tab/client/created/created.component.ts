import { AppService } from '../../../../../services/app.service';
import { clientscreatedreportsservice } from './created.service';
import {Component, OnInit} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HeaderService} from "../../../../common/header/header.service";

@Component({
  selector: 'app-clientcreated-report',
  templateUrl: './created.component.html',
  styleUrls: ['./created.component.sass']
})

export class clientscreatedreportscomponent implements OnInit {
  public data: any = [];
  public Year: any = [];
  public orgsList: any = {};
  public orgsNames: any = [];
  public yearMonth: any = [];

  constructor(public headerService: HeaderService, private clientsCreatedreportsservice: clientscreatedreportsservice) {}
  ngOnInit() {

    this.clientsCreatedreportsservice.getClientCreationreports(this.headerService.user.accountId)
      .subscribe((res) => {
        this.orgsList = res['orgs'];
        for (var item in this.orgsList) {
          this.data = [];
          this.yearMonth = [];
          this.orgsNames.push(item);
          for (var i = 0; i < this.orgsList[item].length; i++) {
            this.data.push(this.orgsList[item][i]['count']);
            this.Year = [this.orgsList[item][i]['year'], this.orgsList[item][i]['month']];
            this.yearMonth.push(this.Year.join('-'));
          }
          this.barChartLabels[item] = this.yearMonth;
          this.barChartData[item] = [{data: this.data, label: 'Clients Created'}];
        }
      });
  }
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true,
                userCallback: function (label, index, labels) {
                    if (Math.floor(label) === label) {
                        return label;
                    }

                },
            }
        }]
    }
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
