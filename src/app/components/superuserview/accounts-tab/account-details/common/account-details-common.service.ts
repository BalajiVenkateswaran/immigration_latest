﻿import {Injectable} from "@angular/core";

@Injectable()
export class AccountDetailsCommonService {

  private _accountId : string;
  private _addProducts:any;
  private _addDiscounts:any;

  get accountId(): string {
      return this._accountId;
  }

  set accountId(_accountId: string) {
      this._accountId = _accountId;
  }
  get addProducts():any{
    return this._addProducts;
  }
  set addProducts(_addProducts:any){
    this._addProducts=_addProducts;
  }
  get addDiscounts():any{
    return this._addDiscounts;
  }
  set addDiscounts(_addDiscounts:any){
    this._addDiscounts=_addDiscounts;
  }


  public destroy(){
    this._accountId = null;
    this._addProducts=null;
    this._addDiscounts=null;
  }
}
