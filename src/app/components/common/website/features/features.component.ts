import {User} from '../../../../models/user';
import {AppService} from '../../../../services/app.service';
import {ConfirmComponent} from '../../../framework/confirmbox/confirm.component';
import {HeaderService} from '../../header/header.service';
import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormGroup, FormControl} from "@angular/forms";
import {loginService} from "../login/login.service";
import {webFeaturesService} from "./features.service";
import {DialogService, DialogComponent} from "ng2-bootstrap-modal";
import {ManageAccountUserService} from "../../../immigrationview/manage-account-tab/user/user.service";

export interface ConfirmModel {
  title: string;
  message: string;
  getloginpage: boolean;
  selectrole: boolean;
  loginPopupForm: boolean;
  userRoles: any;
}
@Component({
    selector: 'Features',
    templateUrl: 'features.component.html'
})
export class webFeaturesComponent extends DialogComponent<ConfirmModel, boolean> implements OnInit {

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
  //Build number format: yy.mm.2 digit build number
  public static uiBuildNumber : string = "17.09.05";
  constructor(
    private router: Router,
    private appService: AppService,
    private loginservice: loginService,
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
