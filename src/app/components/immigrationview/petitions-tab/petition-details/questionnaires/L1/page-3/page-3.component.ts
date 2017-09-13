import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-3',
  templateUrl: './page-3.component.html',
  styleUrls: ['./page-3.component.scss']
})
export class Page3Component implements OnInit {
  public questions: any = [];
  constructor() {
      this.questions = [
      {
        "id": "0",
        "display": "Yes",
        "value": "Y"
      },
      {
        "id": "1",
        "display": "No",
        "value": "N"
      },
    ];
   }

  ngOnInit() {
  }

}
