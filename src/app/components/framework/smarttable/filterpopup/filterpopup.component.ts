import { Component, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import { SmartTableService } from '../common/smarttable.service';
import { QueryParameters } from '../types/query-parameters';
import { IhDateUtil } from '../../../framework/utils/date.component';
export interface ConfirmModel {
  title: string;
  message: string;

}

@Component({
  selector: 'app-filterpopup',
  templateUrl: './filterpopup.component.html',
  styleUrls: ['./filterpopup.component.scss']
})
export class FilterpopupComponent extends DialogComponent<ConfirmModel, boolean> implements OnInit {
  public headerNamesArray;
  public queryParameters: QueryParameters;
  public datePickerOptions = IhDateUtil.datePickerOptions;
  public datePickerValue: any = [];
  public data: any = [];
  constructor(public dialogService: DialogService, public smartTableService: SmartTableService) {
    super(dialogService);
    this.queryParameters = new QueryParameters();
    this.headerNamesArray = this.smartTableService.headerNamesArray;
    console.log(this.smartTableService.filteredData);
    if (this.smartTableService.filteredData != undefined) {
      if (this.smartTableService.filteredData.length > 0) {
        for (let item of this.headerNamesArray) {
          for (let i of this.smartTableService.filteredData) {
            if (item.headerName == i.fieldHeader) {
              item.fieldValue = i.fieldValue;
              break;
            }
            else {
              item.fieldValue = null;
            }
          }
        }
      }

    }
    else {
      this.headerNamesArray.map(item => {
        return item.fieldValue = null;
      })
    }

    console.log(this.headerNamesArray);
    this.headerNamesArray.map(item => {
      if (item.type != undefined) {
        item.typeFlag = true;
      }
      else {
        item.typeFlag = false;
      }
    });
    this.headerNamesArray.map((item,index) => {
      if (item.type == 'datePicker') {
        this.datePickerValue[index] = item.fieldValue;
        return false;
      }else{
        this.datePickerOptions[index] = null;
      }
      if (item.type == 'dropDown') {
        this.data[index] = item.data;
        return false;
      }else{
        this.data[index] = null;
      }
      if(item.type == 'none'){
        this.headerNamesArray.splice(index,1);
      }
      return true;
     
    })
  }


  ngOnInit() {

  }
  confirm() {
    // on click on confirm button we set dialog result as true,
    // ten we can get dialog result from caller code
    this.result = true;
    this.close();
  }
  cancel() {
    this.result = false;
    this.close();
  }
  onApplyFilterClick() {
    let filledData = this.headerNamesArray.filter(item => {

      if (item.fieldValue != null) {
        return item;
      }
    })
    filledData.map(item => {
      if (item.type == 'datePicker') {
        item.fieldValue = item.fieldValue.formatted;
      }
    })
    this.smartTableService.sendData({ 'data': filledData });
    this.result = true;
    this.close();
  }

}
