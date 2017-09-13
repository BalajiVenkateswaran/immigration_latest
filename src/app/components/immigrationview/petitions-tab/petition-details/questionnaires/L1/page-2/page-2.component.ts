import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-2',
  templateUrl: './page-2.component.html',
  styleUrls: ['./page-2.component.scss']
})
export class Page2Component implements OnInit {
  public companyRelated: any = [];
  constructor() {
    this.companyRelated = [
      {
        "id": "0",
        "display": "Parent",
        "value": ""
      },
      {
        "id": "1",
        "display": "Branch",
        "value": ""
      },
       {
        "id": "2",
        "display": "Subsidiary",
        "value": ""
      },
       {
        "id": "3",
        "display": "Affiliate",
        "value": ""
      },
       {
        "id": "4",
        "display": "Joint Venture",
        "value": ""
      }
    ];
   }

  ngOnInit() {
  }

}
