import { Component, OnInit } from '@angular/core';
import Chart from 'chartjs';
import { ChartsModule } from 'ng2-charts/ng2-charts';

@Component({
  selector: 'app-immigration-view-reports',
  templateUrl: './immigration-view-reports.component.html',
  styleUrls: ['./immigration-view-reports.component.sass']
})
export class ImmigrationViewReportsComponent implements OnInit {
  ////////////Bar Chart Stuff///////////
  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels:string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;

  public barChartData:any[] = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Visa Approvals'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Visa Deniels'}
  ];

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

  public randomize():void {

    // Only Change 3 values
    let data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40];
    let clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = data;
    this.barChartData = clone;
  }

// Doughnut
  public doughnutChartLabels:string[] = ['H1B Immigration Approvals', 'B1 Visa Approvals', 'L1 Visa Approvals'];
  public doughnutChartData:number[] = [350, 450, 100];
  public doughnutChartType:string = 'doughnut';

  // Pie
  public pieChartLabels:string[] = ['H1B Immigration Approvals', 'B1 Visa Approvals', 'L1 Visa Approvals'];
  public pieChartData:number[] = [300, 500, 100];
  public pieChartType:string = 'pie';

// PolarArea
  public polarAreaChartLabels:string[] = ['H1B Immigration Approvals', 'B1 Visa Approvals', 'L1 Visa Approvals', 'Visa Approvals', 'Visa Deniels'];
  public polarAreaChartData:number[] = [300, 500, 100, 40, 120];
  public polarAreaLegend:boolean = true;

  public polarAreaChartType:string = 'polarArea';

   mode: 'external'
  constructor() { }

  ngOnInit() {
  }

}


