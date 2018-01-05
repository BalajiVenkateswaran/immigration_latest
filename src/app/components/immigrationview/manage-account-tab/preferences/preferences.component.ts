import {Component, OnInit} from '@angular/core';
import {ManageAccountpreferencessService} from './preferences.service';
import {HeaderService} from '../../../common/header/header.service';
import {SmartTableFrameworkComponent} from '../../../framework/smarttable/smarttable.component';


@Component({
    selector: 'app-manageaccount-preferences',
    templateUrl: './preferences.component.html',
    styleUrls: ['./preferences.component.sass'],
  providers: [ManageAccountpreferencessService],
  entryComponents: [SmartTableFrameworkComponent]
})
export class ManageAccountPreferencesComponent implements OnInit {

    public products: any= [];
    public discounts: any= [];
    public settings;
    public data;
    public settings1;
    public data1;
    constructor(private headerService: HeaderService, private manageAccountpreferencessService: ManageAccountpreferencessService) {
        this.settings = {
            'isAddButtonEnable': false,
            'isDeleteEnable': false,
            'columnsettings': [
                {
                    headerName: 'Name',
                    field: 'productCatalog.productName',
                },
                {
                    headerName: 'Code',
                    field: 'productCatalog.productCode',
                },
                {
                    headerName: 'Description',
                    field: 'productCatalog.productDesc'
                },
                {
                    headerName: 'Start Date',
                    field: 'startDate'
                },
                {
                    headerName: 'End Date',
                    field: 'endDate'
                },
                {
                    headerName: 'Max Users',
                    field: 'productCatalog.maxUsers'
                },
                {
                    headerName: 'Max Clients/Month',
                    field: 'productCatalog.maxClients'
                },
                {
                    headerName: 'Max Petitions/Month',
                    field: 'productCatalog.maxPetitions'
                },
                {
                    headerName: 'Max S3 Storage',
                    field: 'productCatalog.maxS3Storage'
                },
                {
                    headerName: 'Cost',
                    field: 'productCatalog.cost'
                }
            ]
        }
        this.settings1 = {
            'isAddButtonEnable': false,
            'isDeleteEnable': false,
            'columnsettings': [
                {
                    headerName: 'Name',
                    field: 'discountCatalog.discountName',
                },
                {
                    headerName: 'Code',
                    field: 'discountCatalog.discountCode',
                },
                {
                    headerName: 'Description',
                    field: 'discountCatalog.discountDesc'
                },
                {
                    headerName: 'Start Date',
                    field: 'startDate'
                },
                {
                    headerName: 'End Date',
                    field: 'endDate'
                },
                {
                    headerName: 'Cost',
                    field: 'discountCatalog.cost'
                },
                {
                    headerName: 'Percentage',
                    field: 'discountCatalog.discountPercentage'
                }
            ]
        }
    }

    ngOnInit() {
        this.getproducts();
        this.getdiscounts();
    }
    getproducts() {
        this.manageAccountpreferencessService.getproductsAccount(this.headerService.user.accountId).subscribe((res) => {
            if (res['statusCode'] === 'SUCCESS') {
                this.data = res['products'];
            }
        });
    }
    getdiscounts() {
        this.manageAccountpreferencessService.getdiscountsAccount(this.headerService.user.accountId).subscribe((res) => {
            if (res['statusCode'] === 'SUCCESS') {
                this.data1 = res['discounts'];

            }
        });
    }
}
