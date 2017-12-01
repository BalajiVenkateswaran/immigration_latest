import {AppService} from '../../../../../services/app.service';
import {ClientStatusReportsService} from './status.service';
import {Component, OnInit} from '@angular/core';
import {HeaderService} from '../../../../common/header/header.service';


@Component({
  selector: 'app-petitiontags-report',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.sass'],
  providers: [ClientStatusReportsService]
})

export class ClientStatusReportsComponent implements OnInit {
    public orgsList: any = {};
    public orgsNames: any = [];
    public open: any = [];
    public closed: any = [];
  constructor(public appService: AppService, private clientStatusreportsservice: ClientStatusReportsService, public headerService: HeaderService) {}
  ngOnInit() {
    this.clientStatusreportsservice.getclientstatusreports(this.headerService.user.accountId)
      .subscribe((res) => {
        console.log(res);
        this.barChartData = [];
        this.orgsList = res['orgs'];
        for (let item in this.orgsList) {
            this.barChartLabels.push(item);
            for (let i = 0; i < this.orgsList[item].length; i++) {
                if (this.orgsList[item].length == '2') {
                    if (this.orgsList[item][i].status == 'Active') {
                        this.open.push(this.orgsList[item][i]['count']);
                    }
                    if (this.orgsList[item][i].status == 'Inactive') {
                        this.closed.push(this.orgsList[item][i]['count']);
                    }
                } else {
                    if (this.orgsList[item][i].status == 'Active') {
                        this.open.push(this.orgsList[item][i]['count']);
                    } else {
                        this.open.push(0);
                    }
                    if (this.orgsList[item][i].status == 'Inactive') {
                        this.closed.push(this.orgsList[item][i]['count']);
                    } else {
                        this.closed.push(0);
                    }
                }

            }

        }
        this.barChartData.push({ data: this.open, label: 'Active Clients' }, { data: this.closed, label: 'InActive Clients' });
        });
  }
  public barChartOptions: any = {
      scaleShowVerticalLines: false,
      responsive: true,
      scales: {
          xAxes: [{
              stacked: true,
          }],
          yAxes: [{
              stacked: true,
          }]
      }
  };
  public barChartLabels = [];
  public barChartLegend = true;
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
  public barChartData: any[] = [{ data: [], label: '' }, { data: [], label: '' }];

}
