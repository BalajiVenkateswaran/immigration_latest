import { LocalDataSource } from 'ng2-smart-table';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { Component, OnInit } from '@angular/core';
import {AppService} from "../../services/app.service";
@Component({
  selector: 'app-superuserview-productcatalog',
  templateUrl: './superuserview-productcatalog.component.html',
  styleUrls: ['./superuserview-productcatalog.component.sass']
})
export class SuperuserviewProductcatalogComponent implements OnInit {
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
        "createdOn":"06-29-2017",

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
        "createdOn":"06-29-2017",
        
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
        "createdOn":"06-29-2017",
        
      }
    ];
  }
  source: LocalDataSource = new LocalDataSource();
  ngOnInit() {
    this.appService.showSideBarMenu("superuserview-product", "superuserview-productcatalog");
    this.source.load(this.products);
  }
 
}
