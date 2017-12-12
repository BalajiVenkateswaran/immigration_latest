import {AppService} from '../../../../../services/app.service';
import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'ih-website-faqs',
    templateUrl: 'faqs.component.html'
})
export class WebsiteFaqComponent implements OnInit {

  private outlet: any = {
    breadcrumbs: null,
    header: null,
    message: null,
    carousel: null,
    menu: null,
    footer: null
  };

  constructor(public appService: AppService) {
  }

  ngOnInit(): void {
  }

}
