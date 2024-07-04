import {BikesStore} from "../../stores/bikes.store";
import {HttpClient} from "@angular/common/http";
import {tap} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class BikesService {
  // TODO: change the condition
  base = window.location.href.includes("pixy") ? "https://pixystix.pythonanywhere.com" : "http://192.168.100.76:8000"

  constructor(private bikeStore: BikesStore, private api: HttpClient) {
  }

  updateBikes(category: string, page: number, bikes: BikeObj[]) {
    const bike_list = [...this.bikeStore.getValue().bikes];
    const find = bike_list.findIndex(bike => bike.category === category)
    if(find === -1){ // category doesn't exist in bike store list
      // create list
      const new_entry: BikesInStore = {category: category, list: [{page: page, bikes: bikes}]}
      bike_list.push(new_entry)
    } else { // it exists and is updating, ideally creating a new page
      bike_list[find].list.push({page: page, bikes: bikes})
    }
    this.bikeStore.update(prev => ({...prev, bikes: [...prev.bikes, ...bike_list]}))
  }

  updateOneBike(bike: BikeObj) {
    const bike_list = [...this.bikeStore.getValue().bikes]
    const found = bike_list.findIndex(f => f.category === bike.category)
    if(found === -1){// not found
      bike_list.push({category: bike.category, list: [{page: 1, bikes: [bike]}]})
    } else {
      for(const list of bike_list[found].list) {
        if(list.bikes.length < 20){// default page size
          list.bikes.push(bike)
        }
      }
    }
    this.bikeStore.update(prev => ({...prev, bikes: [...prev.bikes, ...bike_list]}))
  }

  fetch_by_category(category: string, page: number = 1) {
    return this.api.get<{results: BikeObj[], total_pages: number }>(`${this.base}/bikes/?category=${category}/`)
      .pipe(tap(result => {
        console.log("bike.service.results: ", result)
        this.updateBikes(category, page, result.results)
      }))
  }
  fetch_by_id(id: number){
    return this.api.get<BikeObj>(`${this.base}/bikes/${id}/`)
      .pipe(
        tap(result => {
          // update inside store
          this.updateOneBike(result)
        })
      )
  }
}
