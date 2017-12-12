import {AppService} from '../../../../services/app.service';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LoginPopupComponent} from '../loginpopup/loginpopup.component';
import {DialogService} from 'ng2-bootstrap-modal';

@Component({
  selector: 'ih-website-header',
  templateUrl: 'websiteheader.component.html'
})
export class WebsiteHeaderComponent implements OnInit {
  private outlet: any = {
    breadcrumbs: null,
    header: null,
    message: null,
    carousel: null,
    menu: null,
    footer: null
  };

  constructor(private router: Router, public appService: AppService, public dialogService: DialogService) {
  }

  ngOnInit(): void {
    this.appService.showMenu = false;
    this.appService.showHeader = false;
    this.appService.showFooter = false;
    this.appService.expandMenu = false;
    this.router.navigate(['', {outlets: this.outlet}], {skipLocationChange: true});
  }

  clicktogotop() {
      window.scrollTo(1000, 500);
  }

  onLoginClick() {
    let loginPopupComponent = this.dialogService.addDialog(LoginPopupComponent, {
      selectrole: false,
      getloginpage: false,
      loginPopupForm: true,
      title: 'Login',

    }).subscribe((isConfirmed) => {
      if (isConfirmed) {
        this.dialogService.removeAll();
      }
    });

    console.log('loginPopupComponent: %o', loginPopupComponent);
  }
}
