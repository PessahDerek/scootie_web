import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParamsOptions} from "@angular/common/http";
import {Observable} from "rxjs";

type HttpClientInstance<T> = HttpClient & T

@Injectable({
  providedIn: "root",
})
export class ApiService {
  // TODO: set this to fixed in production
  baseUrl: string = !window.location.href.includes('local')
    // ?"https://pixystix.pythonanywhere.com"
    ?"https://852efed9db358e42af732634dc183a58.serveo.net"
    // : "http://192.168.100.76:8000"
    : "https://852efed9db358e42af732634dc183a58.serveo.net"
    // : "http://localhost:8000"

  constructor(private http: HttpClient) {}

  post<T>(url: string, payload: object, options?: HttpHeaders){
    return this.http.post<T>(`${this.baseUrl}${url}/`, payload, {...options?options:{}})
  }
  get<T>(url: string, options?: object): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}${url}/`, options)
  }
}
