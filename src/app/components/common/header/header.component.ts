import {User} from '../../../models/user';
import {AppService} from '../../../services/app.service';
import {ConfirmorgComponent} from '../../framework/confirmbox/confirmorg.component';
import {AfterViewChecked, Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {DialogComponent, DialogService} from 'ng2-bootstrap-modal';
import {HeaderService} from './header.service';
import {HeaderComponentService} from './header.component.service';
import {ApplicationRoles} from '../constants/applicationroles.constants';
import {DEFAULT_INTERRUPTSOURCES, Idle} from '@ng-idle/core';
import {ConfirmationDialogComponent} from '../../framework/popup/confirmation/confirmation.component';
import {MatDialog} from '@angular/material';


export interface ConfirmModel {
    title: string;
    message: string;
    header: boolean;
    usageSummaryPopup: boolean;
}
@Component({
    selector: 'immp-header',
    templateUrl: './header.component.html',
})
export class HeaderComponent extends DialogComponent<ConfirmModel, boolean> implements OnInit, AfterViewChecked {
  public applicationRoles = ApplicationRoles;
  private Immigrant;
  private orgNamevisible;
  private editorg;
  private tab;
  private i;
  public user: User;
  usageSummery = false;
  public orgnames: any = {};
  public header= true;
  public usageSummaryPopup= false;
  @ViewChild('orgSelect') vc;

  public ngAfterViewChecked(): void {
    if (this.vc !== undefined) {
      this.vc.nativeElement.focus();
    }
  }

  highlightTab(tab) {
      this.headerService.currentTab = tab;
  }
  highlightSBLink(sblink) {
      this.appService.currentSBLink = sblink;
  }
  checkForCurrentTab(tab) {
    return this.headerService.currentTab === tab;
  }
  constructor(private router: Router, public appService: AppService, public dialogService: DialogService, public dialog: MatDialog,
              public headerService: HeaderService, public headerComponentService: HeaderComponentService, private idle: Idle) {
    super(dialogService);
    // code for no activity for 20 mins

    idle.setIdle(5);
    idle.setTimeout(1200);
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    idle.onTimeout.subscribe(() => {
      console.log('Timeout');
      this.headerService.logOut();
    });
    idle.watch();

    // code for no activity for 20 mins ends
  }

  ngOnInit() {
    if (this.headerService.user != null) {
      this.user = this.headerService.user;
    }
    let moveToPage = this.headerService.getLandingPagePath(this.user.roleName)
    this.headerComponentService.onHeaderPageLoad(moveToPage);
    this.highlightTab(moveToPage);



  }

  editorgname() {
      this.dialogService.addDialog(ConfirmorgComponent, {
          title: 'Confirmation',
          message: '' + this.headerService.organizations + ''
      });
      this.editorg = true;
      if (this.vc !== undefined) {
         this.vc.nativeElement.focus();
      }
  }

  onFocusOut() {
    this.editorg = false;
  }
  public slideMenu() {
    this.appService.menuSlider = (this.appService.menuSlider) ? false : true;
  }

  logOut() {
    this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'Are you sure you want to Logout ?'
      }
    }).afterClosed().subscribe((isConfirmed) => {
      if (isConfirmed) {
        this.headerService.logOut();
      }
    });

  }
  onUsageSummaryClick() {
      this.usageSummery = true;

    this.headerComponentService.getUsageSummaryDetails(this.user.accountId).subscribe(
      res => {
          this.headerComponentService.usageSummaryDetails = res;
      }
      )
  }
  onUsageSummaryClose() {
      this.usageSummery = false;
  }
  onLogoClick() {
    let moveToPage = this.headerService.getLandingPagePath(this.headerService.user.roleName);
    this.appService.moveToPage(moveToPage);
    this.highlightTab(moveToPage);
  }

  public getImmigrationViewClientsTabPath() {
    return 'immigrationview/tab/clients';
  }

  getRoleName() {
    if (this.user.roleName === ApplicationRoles.CLIENT) {
      return  'Benificiary';
    } else if (this.user.roleName === ApplicationRoles.IMMIGRATION_MANAGER) {
      return 'Immigration Admin';
    } else {
      return this.user.roleName;
    }
  }

}
