import {Injectable} from "@angular/core";
import {Http, ResponseContentType, RequestOptions, Headers} from "@angular/http";
import {Observable}     from 'rxjs/Observable';
import '../rxjs-operators';
import {AppService} from "./app.service";

@Injectable()
export class RestService {
      //immp_endpoint_url: String = "http://34.200.77.115:8080/immigrationPortal";
      immp_endpoint_url: String = "http://localhost:8080/immigrationPortal";

  constructor(private http: Http, private appService: AppService) {
  }

  getData(url: string): Observable<any> {
     let headers = new Headers();
     headers.append('X-Requested-With', 'XMLHttpRequest' );
     return this.intercept(this.http.get(this.immp_endpoint_url+url, { withCredentials: true, headers: headers})
                                 .map(res => res.json() || {}));
  }

  postData(url: string, data: any): Observable<any[]> {
    let headers = new Headers();
    headers.append('X-Requested-With', 'XMLHttpRequest' );
    return this.intercept(this.http.post(this.immp_endpoint_url+url, data, { withCredentials: true, headers: headers })
      .map(res => res.json() || {}));
  }

  postDataWithHeaders(url: string, formData: any): Observable<any[]>{
    const headers = new Headers({});
    headers.append('X-Requested-With', 'XMLHttpRequest' );
    let requestOptions = new RequestOptions({
       withCredentials: true,
       headers: headers
    });
    return this.intercept(this.http.post(this.immp_endpoint_url+url, formData, requestOptions)
        .map(res => res.json() || {}));
  }

  putData(url: string, data: any): Observable<any[]> {
    let headers = new Headers();
    headers.append('X-Requested-With', 'XMLHttpRequest' );
    return this.intercept(this.http.put(this.immp_endpoint_url+url, data, { withCredentials: true, headers: headers })
      .map(res => res.json() || {}));
  }

  deleteData(url: string): Observable<any[]> {
      let headers = new Headers();
      headers.append('X-Requested-With', 'XMLHttpRequest' );
      return this.intercept(this.http.delete(this.immp_endpoint_url+url, { withCredentials: true, headers: headers })
        .map(res => res.json() || {}));
  }
  getFile(url: string): Observable<any[]> {

      let headers = new Headers();
      headers.append('X-Requested-With', 'XMLHttpRequest' );
      return this.intercept(this.http.get(this.immp_endpoint_url + url, { withCredentials: true , headers: headers, responseType: ResponseContentType.Blob })
          .map((res) => {
              return new Blob([res.blob()], { type: 'application/pdf' })
          }));

  }

  intercept(observable: Observable<any>){
        return observable.catch(err => {
            if (err.status === 401){
                return this.unauthorised();
            } else {
                return Observable.throw(err);
            }
        });
    }

    unauthorised(): Observable<any>
    {
        this.appService.destroy();
        this.appService.moveToPage('');
        return Observable.empty();
    }
}
