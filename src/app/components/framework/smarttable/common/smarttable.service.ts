import { Injectable } from '@angular/core';
import { Subject,Observable } from "rxjs/";


@Injectable()
export class SmartTableService {
    private _headerNamesArray: any = [];
    private _filteredData: any = [];
    private subject = new Subject<any>();
    constructor() { }
    set headerNamesArray(headerNamesArray: any[]){
        this._headerNamesArray=headerNamesArray;
    }
    get headerNamesArray(){
        return this._headerNamesArray;
    }
    
    sendData(data: Object){
        this.subject.next(data);
    }
    getFilterData(): Observable<any>{
        return this.subject.asObservable();
    }
    set filteredData(filteredData: any[]){
        this._filteredData = filteredData;
    }
    get filteredData(){
        return this._filteredData;
    }
}