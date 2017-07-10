import { LocalDataSource } from 'ng2-smart-table';
import { Ng2SmartTableModule,ViewCell  } from 'ng2-smart-table';
import { Component, OnInit,Input, Output, EventEmitter} from '@angular/core';
import {AppService} from "../../services/app.service";
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { ConfirmComponent } from '../confirmbox/confirm.component';
import { DialogService, DialogComponent } from "ng2-bootstrap-modal";
import {ProductCatalogProductService} from './superuserview-productcatalog.service';
import {MenuComponent} from "../menu/menu.component";

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
    public warningMessage:boolean=false;
    //public isEdit:boolean=true;

    ngOnInit() {
      this.menuComponent.highlightSBLink('Products');
      this.appService.showSideBarMenu("superuserview-product", "ProductCatalog");
 
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
  constructor(public appService: AppService, public dialogService: DialogService, public productCatalogProductService: ProductCatalogProductService, private menuComponent: MenuComponent) {
    super(dialogService);
    
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
                        this.addProduct={};
                    }
                });
            }
            else{
                this.addProduct={};
            }
        });
  }
  saveProduct(){
       /* this.addUsers['accountId'] = this.appService.user.accountId;*/
        if (this.addProduct['name'] == '' || this.addProduct['name'] == null || this.addProduct['name'] == undefined || this.addProduct['code'] == '' || this.addProduct['code'] == null || this.addProduct['code'] == undefined || this.addProduct['cost'] == '' || this.addProduct['cost'] == null || this.addProduct['cost'] == undefined) {
          this.warningMessage=true;
        }
        else{
            this.warningMessage=false;
            this.appService.addUsers = this.addProduct;
            this.result = true;
            this.close();
        }
        
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
    //this.close();
  }
  saveProductInfo(){
    this.isEditProducts = !this.isEditProducts;
    this.appService.addUsers = this.product;
    this.result = true;
    this.close();
  }
}

