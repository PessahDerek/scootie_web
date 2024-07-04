import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";


@Injectable({
  providedIn: "root",
})
export class FetchBikesService {
  base = !window.location.href.includes("pixy")?"https://pixystix.pythonanywhere.com" : "http://192.168.100.76:8000"

  constructor(private http: HttpClient) {
  }

  get<T>(route: string, options?: object): Observable<T> {
    return this.http.get<T>(`${this.base}/${route}`, options)
  }
  post<T>(route: string, data: any, options?: object){
    return this.http.post<T>(`${this.base}/${route}`, data, options)
  }
  fetchByCategory(category: string, count?: number): Observable<BikeObj[]> {
    return this.http.get<BikeObj[]>(`${this.base}/bikes/by-category/?category=${category}`)
  }

}
