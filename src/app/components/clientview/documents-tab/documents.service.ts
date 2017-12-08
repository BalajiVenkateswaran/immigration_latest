import {Injectable} from '@angular/core';
import {RestService} from '../../../services/rest.service';

@Injectable()
export class DocumentService {
  private _selectedOrgId: string;

  constructor(private restService: RestService) {
  }

  get selectedOrgId(): string {
    return this._selectedOrgId;
  }

  set selectedOrgId(value: string) {
    this._selectedOrgId = value;
  }

  public saveNewDocumentRepository(documentRepositorytData) {
      return this.restService.postData('/documentRepository', documentRepositorytData);
  }
  public getFile(clientId: string) {
      return this.restService.getData('/file/entityId/' + clientId + '/entityType/CLIENT');
  }
  public deleteFile(fileId: string) {
      return this.restService.deleteData('/file/' + fileId + '/org/' + this._selectedOrgId);
  }
  public uploadFile(entityId: string, formData: FormData) {
      return this.restService.postDataWithHeaders('/file/upload/entityId/' + entityId + '/entityType/CLIENT/org/' + this._selectedOrgId,
          formData);
  }
  public replaceFile(fileId: string, formData: FormData) {
      return this.restService.postDataWithHeaders('/file/replace/' + fileId + '/org/' + this._selectedOrgId, formData);
  }
  public renameFile(url: string, data: any) {
      return this.restService.postData(url, data);

  }
  public downloadFile(fileId: string) {
      return this.restService.getFile('/file/' + fileId + '/org/' + this._selectedOrgId);

  }
  public getOrgNames(userid: string) {
      return this.restService.getData('/client/organizations/' + userid);
  }
}
