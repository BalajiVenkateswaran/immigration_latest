import {Injectable} from "@angular/core";
import {Http, ResponseContentType} from "@angular/http";
import {Observable}     from 'rxjs/Observable';
import '../rxjs-operators';
import {petition} from "../models/petitions";

@Injectable()
export class RestService {
      immp_endpoint_url: String = "http://34.200.77.115:8080/immigrationPortal";
      //immp_endpoint_url: String = "http://localhost:8080/immigrationPortal";

  constructor(private http: Http) {
  }

  getData(url: string): Observable<petition[]> {
    return this.http.get(this.immp_endpoint_url+url)
      .map(res => res.json() || {})
      .catch(this.handleError);
  }

  postData(url: string, data: any): Observable<any[]> {
    return this.http.post(this.immp_endpoint_url+url, data)
      .map(res => res.json() || {})
      .catch(this.handleError);
  }

  postDataWithHeaders(url: string, formData: any, headers: any): Observable<any[]>{
    return this.http.post(this.immp_endpoint_url+url, formData, headers)
      .map(res => res.json() || {})
      .catch(this.handleError);
  }

  putData(url: string, data: any): Observable<any[]> {
    return this.http.put(this.immp_endpoint_url+url, data)
      .map(res => res.json() || {})
      .catch(this.handleError);
  }

  deleteData(url: string): Observable<any[]> {
      return this.http.delete(this.immp_endpoint_url+url)
        .map(res => res.json() || {})
        .catch(this.handleError);
  }
  getFile(url: string): Observable<any[]> {
      return this.http.get(this.immp_endpoint_url + url, { responseType: ResponseContentType.Blob })
          .map((res) => {
              return new Blob([res.blob()], { type: 'application/pdf' })
          })
          .catch(this.handleError);

  }

  private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
