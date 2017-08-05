import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-superuserview-accountdetails-mfd',
  templateUrl: './superuserview-accountdetails-mfd.component.html',
  styleUrls: ['./superuserview-accountdetails-mfd.component.scss']
})
export class SuperuserviewAccountdetailsMfdComponent implements OnInit {
  public settings;
  constructor() { 
    this.settings={
            'isDeleteEnable':false,
            'isAddButtonEnable':false,
            'columnsettings': [
                {

                    headerName: "Entity Name",
                    field: "entityName",
                },
                {

                    headerName: "Entity Type",
                    field: "entityType",
                },
                {

                    headerName: "Deleted By",
                    field: "deletedByUser"
                },
                {
                    headerName: "MFD on",
                    field: "markedForDeletionDate"
                },
                {

                    headerName: "Deleted on",
                    field: "deletionDate"
                },
                {

                    headerName: "Client Name",
                    field: ""
                },
                {

                    headerName: "Petition Name",
                    field: "petitionName"
                }
                
            ]
        }
    
   
  }

  ngOnInit() {
  }

}
