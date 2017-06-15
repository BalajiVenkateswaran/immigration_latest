import {Component, OnInit} from '@angular/core';
import {ManageAccountUserService} from "./manageaccount-user.service";
import {User} from "../../models/user";
import {FormGroup, FormControl} from "@angular/forms";
//import {Http} from "@angular/http";
import {AppService} from "../../services/app.service";
import { Ng2SmartTableModule, LocalDataSource, ServerDataSource  } from 'ng2-smart-table';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { ConfirmComponent } from '../confirmbox/confirm.component';
import { DialogService } from "ng2-bootstrap-modal";

@Component({
  selector: 'app-manageaccount-user',
  templateUrl: './manageaccount-user.component.html',
  styleUrls: ['./manageaccount-user.component.sass']
  //template: '<ng2-smart-table [settings]="settings"></ng2-smart-table>'
})


export class ManageAccountUserComponent implements OnInit {

  private manageaccountuserList: User[] = [];
  public addUser: FormGroup; // our model driven form
  public submitted: boolean; // keep track on whether form is submitted
  private message: string;
  private user: User;
  private roles: any = {
  "IMMIGRATION OFFICER" : "501f6e87-cd6e-11e6-a939-34e6d7382cac",
  "IMMIGRATION MANAGER" : "a724fdd7-cd6e-11e6-a939-34e6d7382cac"
  };
  //roles : LocalDataSource = new LocalDataSource();




  settings = {
      add: {
          addButtonContent: '<i class="fa fa-plus-circle" aria-hidden="true"></i>',
          createButtonContent: '<i class="fa fa-check" aria-hidden="true"></i>',
          cancelButtonContent: '<i class="fa fa-times" aria-hidden="true"></i>',
          confirmCreate: true
      },
      edit: {
          editButtonContent: '<i class="fa fa-pencil" aria-hidden="true"></i>',
          saveButtonContent: '<i class="fa fa-check" aria-hidden="true"></i>',
          cancelButtonContent: '<i class="fa fa-times" aria-hidden="true"></i>',
          confirmSave: true
      },
      delete: {
          deleteButtonContent: '<i class="fa fa-trash" aria-hidden="true"></i>',
          confirmDelete: true
      },
      columns: {
          firstName: {
              title: 'First Name'
          },
          lastName: {
              title: 'Last Name'
          },
          emailId: {
              title: 'Email'
          },
          roleName: {
              title: 'Role',
              editor: {
                  type: 'list',
                  config: {
                      list: [
                        {
                          value: "IMMIGRATION OFFICER",
                          title: "IMMIGRATION OFFICER"
                        },
                        {
                          value: "IMMIGRATION MANAGER",
                          title: "IMMIGRATION MANAGER"
                        }
                      ]
                  }
                  }
              }

      },
      pager: {
          display: true,
          perPage: 10
      }
      };

  source: LocalDataSource = new LocalDataSource();

  constructor(private manageAccountUserService: ManageAccountUserService,
      private appService: AppService, private dialogService: DialogService) {

    this.addUser = new FormGroup({
      accountId: new FormControl(''),
      emailId: new FormControl(''),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      roleId: new FormControl(''),
      title: new FormControl('')

      });

    if (this.appService.user) {
        this.user = this.appService.user;

    }

  }

  ngOnInit() {
    this.appService.showSideBarMenu("manageaccount", "manageaccount-user");
    this.manageAccountUserService.getUsers(this.appService.user.accountId)
        .subscribe((res) => {
            for(var user of res['users']){
              user['roleName'] = user['role'];
            }
            this.source.load(res['users']);
        });
    //this.roles = new ServerDataSource(this.http, { endPoint: 'http://ec2-34-192-10-166.compute-1.amazonaws.com:8080/immigrationPortal/user/roles', dataKey: 'users' });
  }


  onCreateConfirm(event) : void {
    console.log("User table onCreateConfirm event: %o",event.newData);
    event.newData['role'] = this.roles[event.newData['roleName']];
    event.newData['accountId'] = this.appService.user.accountId;
    this.manageAccountUserService.saveNewUser(event.newData).subscribe((res) => {
         this.message = res['statusCode'];
         event.newData['userId'] = res['userId'];
         if (this.message == "SUCCESS") {
             event.confirm.resolve(event.newData);
         } else {
             this.dialogService.addDialog(ConfirmComponent, {
                 title: 'Error..!',
                 message: 'Unable to Add User..!'
             });
             event.confirm.reject();
         }
    });
  }

  onEditConfirm(event) : void {
      console.log("User table onEditConfirm event: %o",event.newData);
      event.newData['role'] = this.roles[event.newData['roleName']];
      this.manageAccountUserService.updateUser(event.newData).subscribe((res) => {
            this.message = res['statusCode'];
            if(this.message === "SUCCESS"){
              event.confirm.resolve(event.newData);
            } else {
                this.dialogService.addDialog(ConfirmComponent, {
                    title: 'Error..!',
                    message: 'Unable to Edit User..!'
                });
              event.confirm.resolve(event.data);
            }
      });
    }

  onDeleteConfirm(event) : void {
      this.dialogService.addDialog(ConfirmComponent, {
          title: 'Confirmation',
          message: 'Are you sure you want to Delete '+event.data['emailId']+'?'
      })
          .subscribe((isConfirmed) => {
              if (isConfirmed) {
                  this.manageAccountUserService.deleteUser(event.data['userId'], this.appService.user.accountId).subscribe((res) => {
                      this.message = res['statusCode'];
                      if (this.message == 'SUCCESS') {
                          event.confirm.resolve();
                      } else {
                          event.confirm.reject();
                      }
                  });
              }
          });
    }

}
