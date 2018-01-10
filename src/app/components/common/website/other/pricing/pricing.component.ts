import {AppService} from '../../../../../services/app.service';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'ih-pricing',
  templateUrl: 'pricing.component.html',
  styleUrls: ['pricing.component.scss']
})
export class WebsitePricingComponent implements OnInit {

  private outlet: any = {
    breadcrumbs: null,
    header: null,
    message: null,
    carousel: null,
    menu: null,
    footer: null
  };
  constructor(
    private router: Router,
    public appService: AppService
  ) {
  }
  ngOnInit(): void {
    this.router.navigate(['', {outlets: this.outlet}], {skipLocationChange: true});
  }


}
