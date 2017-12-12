import {AppService} from '../../../../../services/app.service';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'ih-website-aboutus',
    templateUrl: 'aboutus.component.html'
})
export class WebsiteAboutusComponent implements OnInit {

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
    public appService: AppService,
  ) {
  }

  ngOnInit(): void {
    this.router.navigate(['', {outlets: this.outlet}], {skipLocationChange: true});
  }
}
