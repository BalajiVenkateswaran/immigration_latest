import { LocalDataSource } from 'ng2-smart-table';
import { Ng2SmartTableModule,ViewCell  } from 'ng2-smart-table';
import { Component, OnInit,Input, Output, EventEmitter} from '@angular/core';
import {AppService} from "../../services/app.service";
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { ConfirmComponent } from '../confirmbox/confirm.component';
import { DialogService, DialogComponent } from "ng2-bootstrap-modal";
import {ProductCatalogProductService} from './superuserview-productcatalog.service';
export interface ConfirmModel {
    title: string;
    message: string;
    getData: boolean;
    addPopup: boolean;
    viewPopup:boolean;
    product:Object;
    addProduct: Object;

}
@Component({
  selector: 'app-superuserview-productcatalog',
  templateUrl: './superuserview-productcatalog.component.html',
  styleUrls: ['./superuserview-productcatalog.component.sass']
})
export class SuperuserviewProductcatalogComponent extends DialogComponent<ConfirmModel, boolean> implements OnInit {
    public addPopup;
    public products:any;
    public addProduct:any={};
    private rowEdit: boolean[] = [];
    public rowData:any;
    public viewDetailsSection:boolean=false;
    public getData:boolean=true;
    public viewPopup:boolean;
    public product:any={};
    public isEditProducts:boolean=true;
    public editFlag: boolean = true;
    public beforeEdit: any;
    //public isEdit:boolean=true;

 /*   settings = {
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
            name: {
                title: 'Name'
            },
            code: {
                title: 'Code'
            },
            maxUsers: {
                title: 'Max Users'
            },
            maxClients: {
                title: 'Max Clients/Month'
            },
            maxPetitions: {
                title: 'Max Petitions/Month'
            },
            maxStorage: {
                title: 'Max S3 Storage '
            },
            cost:{
              title:'Cost'
            },
            status:{
              title:'Status'
            },
            createdOn :{
              title:'Created On '
            },
            Button:{
                title:'Button',
                type:'html',
                valuePrepareFunction:(cell,row)=>{
                return `<button (myfunction)="">View</button>`
                }
            },

        },
        pager: {
            display: true,
            perPage: 10
        }
    };
    public products:any={};

  constructor(public appService:AppService) {
    this.products=[
      {
        "name":"One",
        "code":"XCV",
        "maxUsers":'20',
        "maxClients":'25',
        "maxPetitions":'30',
        "maxStorage":"20GB",
        "cost":"10",
        "status":'active',
        "createdOn":"06-29-2017"
      },
      {
        "name":"Immigration",
        "code":"XCV",
        "maxUsers":'10',
        "maxClients":'35',
        "maxPetitions":'30',
        "maxStorage":"20GB",
        "cost":"410",
        "status":'active',
        "createdOn":"06-29-2017"

      },
      {
        "name":"Immigration Plus",
        "code":"XCV",
        "maxUsers":'120',
        "maxClients":'125',
        "maxPetitions":'30',
        "maxStorage":"20GB",
        "cost":"120",
        "status":'active',
        "createdOn":"06-29-2017"
      }
    ];
  }
  source: LocalDataSource = new LocalDataSource();
  ngOnInit() {
    this.appService.showSideBarMenu("superuserview-product", "superuserview-productcatalog");
    this.source.load(this.products);
  }
  onCreateConfirm(event): void {
      //console.log("User table onCreateConfirm event: %o", event.newData);
      //event.newData['role'] = this.roles[event.newData['roleName']];
      //event.newData['accountId'] = this.appService.user.accountId;
      //this.manageAccountUserService.saveNewUser(event.newData).subscribe((res) => {
      //    this.message = res['statusCode'];
      //    event.newData['userId'] = res['userId'];
      //    if (this.message == "SUCCESS") {
      //        event.confirm.resolve(event.newData);
      //    } else {
      //        this.dialogService.addDialog(ConfirmComponent, {
      //            title: 'Error..!',
      //            message: 'Unable to Add User..!'
      //        });
      //        event.confirm.reject();
      //    }
      //});
  }

  onEditConfirm(event): void {
      //console.log("User table onEditConfirm event: %o",event.newData);
      //event.newData['role'] = this.roles[event.newData['roleName']];
      //this.manageAccountUserService.updateUser(event.newData).subscribe((res) => {
      //      this.message = res['statusCode'];
      //      if(this.message === "SUCCESS"){
      //        event.confirm.resolve(event.newData);
      //      } else {
      //          this.dialogService.addDialog(ConfirmComponent, {
      //              title: 'Error..!',
      //              message: 'Unable to Edit User..!'
      //          });
      //        event.confirm.resolve(event.data);
      //      }
      //});
      //this.editFlag = true;
      //if (this.editFlag) {
      //    this.beforeEdit = (<any>Object).assign({}, event.data);
      //}
      //this.dialogService.addDialog(ManageAccountUserComponent, {
      //    adduser: true,
      //    getUsers: false,
      //    title: 'Edit User',
      //    addUsers: this.editFlag ? this.beforeEdit : this.addUsers,


      //}).subscribe((isConfirmed) => {
      //    if (isConfirmed) {
      //        this.manageAccountUserService.updateUser(this.appService.addUsers).subscribe((res) => {
      //            if (res['statusCode'] == 'SUCCESS') {
      //                this.getManageUsers();
      //            }
      //        });
      //    }
      //    else {
      //        this.editFlag = false;
      //    }
      //});
  }

  onDeleteConfirm(event): void {
      //this.dialogService.addDialog(ConfirmComponent, {
      //    title: 'Confirmation',
      //    message: 'Are you sure you want to Delete ' + event.data['emailId'] + '?'
      //})
      //    .subscribe((isConfirmed) => {
      //        if (isConfirmed) {
      //            this.manageAccountUserService.deleteUser(event.data['userId'], this.appService.user.accountId).subscribe((res) => {
      //                //this.message = res['statusCode'];
      //                //if (this.message == 'SUCCESS') {
      //                //    event.confirm.resolve();
      //                //} else {
      //                //    event.confirm.reject();
      //                //}
      //                if (res['statusCode'] == 'SUCCESS') {
      //                    this.getManageUsers();
      //                }
      //            });
      //        }
      //    });
  }
  helloButton(){
      console.log("hello....");
  }*/
  ngOnInit(){
  
 
  }
  getProducts(){
        this.productCatalogProductService.getProductDetails().subscribe(
       res=>{
           if(res['statusCode']=='SUCCESS'){
               this.products=res['products'];
           }
       }
     )
  }
  constructor(public appService:AppService,public dialogService: DialogService,public productCatalogProductService:ProductCatalogProductService) {
    super(dialogService);
    this.appService.showSideBarMenu("superuserview-product", "superuserview-product");
    this.getProducts();
  }
  viewDetails(data){
      this.editFlag = true;
      if (this.editFlag) {
          this.beforeEdit = (<any>Object).assign({},data);
      }
      this.dialogService.addDialog(SuperuserviewProductcatalogComponent, {
            viewPopup: true,
            getData: false,
            addPopup:false,
            title: 'View Product Details',
            product:this.editFlag ? this.beforeEdit : data,


        }).subscribe((isConfirmed) => {
           if(isConfirmed){
                  this.productCatalogProductService.editProducts(this.appService.addUsers).subscribe((res) => {
                  if (res['statusCode'] == 'SUCCESS') {
                      this.getProducts();
                  }
              });
           }
           else{
               
               this.editFlag = false;  
           }
        });
  }
  highlightSBLink(link) {
      this.appService.currentSBLink = link;
  }
  addProducts(){
      this.dialogService.addDialog(SuperuserviewProductcatalogComponent, {
            addPopup: true,
            getData: false,
            viewPopup: false,
            title: 'Add New Product',
            addProduct:this.addProduct,
        }).subscribe((isConfirmed) => {
            if (isConfirmed) {
                this.productCatalogProductService.saveProductDetails(this.appService.addUsers).subscribe((res) => {
                    if (res['statusCode'] == 'SUCCESS') {
                        this.getProducts();
                    }
                });
            }
        });
  }
  saveProduct(){
       /* this.addUsers['accountId'] = this.appService.user.accountId;*/
        this.appService.addUsers = this.addProduct;
        this.result = true;
        this.close();
  }
  cancel(){
       this.result = false;
       this.close();
  }
   editProductInfo(){
    //this.beforeCancel = (<any>Object).assign({}, this.discount);
    this.isEditProducts = !this.isEditProducts;
  }
  cancelProductInfo(){
    //this.discount=this.beforeCancel;
    this.isEditProducts = !this.isEditProducts;
    this.result = false;
    this.close();
  }
  saveProductInfo(){
    this.isEditProducts = !this.isEditProducts;
    this.appService.addUsers = this.product;
    this.result = true;
    this.close();
  }
}

