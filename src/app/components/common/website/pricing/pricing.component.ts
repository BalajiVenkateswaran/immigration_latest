import {AppService} from '../../../../services/app.service';
import {HeaderService} from '../../header/header.service';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormGroup} from '@angular/forms';
import {DialogComponent, DialogService} from 'ng2-bootstrap-modal';
import {ManageAccountUserService} from '../../../immigrationview/manage-account-tab/user/user.service';

export interface ConfirmModel {
  title: string;
  message: string;
  getloginpage: boolean;
  selectrole: boolean;
  loginPopupForm: boolean;
  userRoles: any;
}
@Component({
    selector: 'Pricing',
    templateUrl: 'pricing.component.html'
})
export class webPricingComponent extends DialogComponent<ConfirmModel, boolean> implements OnInit {

  private outlet: any = {
    breadcrumbs: null,
    header: null,
    message: null,
    carousel: null,
    menu: null,
    footer: null
  };
  public login: FormGroup; // our model driven form
  public submitted: boolean; // keep track on whether form is submitted
  message: string;
  forgotPwd;
  private frgtEmail;
  public getloginpage: boolean = true;
  public selectrole: boolean;
  public loginPopupForm: boolean;
  public userRoles: any = [];
  public forgotpwdsubmit: boolean = true;
  constructor(
    private router: Router,
    private appService: AppService,
    public dialogService: DialogService,
    private headerService: HeaderService,
    private manageAccountUserService: ManageAccountUserService
  ) {
    super(dialogService);
  }
  frgtPwd(isValid) {
    this.forgotPwd = false;
  }

  ngOnInit(): void {
    this.router.navigate(['', {outlets: this.outlet}], {skipLocationChange: true});
    this.appService.currentPage = 'login';
    this.forgotPwd = true;
  }


}
