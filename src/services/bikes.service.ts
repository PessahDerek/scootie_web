import {BikesStore} from "../stores/bikes/bikes.store";
import {Observable, tap} from "rxjs";
import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";

declare interface CategoryResultObj {
  results: CategoryObj[]
}

@Injectable({
  providedIn: "root",
})
export class BikesService {
  // TODO: change the condition
  base = window.location.href.includes("pixy") ? "https://pixystix.pythonanywhere.com" : "http://192.168.100.76:8000"

  constructor(private bikeStore: BikesStore, private api: ApiService) {
  }

  updateBikes(category: string, page: number, bikes: BikeObj[]) {
    const bike_list = [...this.bikeStore.getValue().bikes];
    const find = bike_list.findIndex(bike => bike.category.toLowerCase() === category.toLowerCase())
    if(find === -1){ // category doesn't exist in bike store list
      // create list
      const new_entry: BikesInStore = {category: category, list: [{page: page, bikes: bikes}]}
      bike_list.push(new_entry)
    } else { // it exists and is updating, ideally creating a new page
      bike_list[find].list.push({page: page, bikes: bikes})
    }
    this.bikeStore.update(prev => ({...prev, bikes: [...bike_list]}))
  }

  updateOneBike(bike: BikeObj) {
    const bike_list = [...this.bikeStore.getValue().bikes]
    const found = bike_list.findIndex(f => f.category.toLowerCase() === bike.category.toLowerCase())
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

  fetch_all_categories(){
    return this.api.get<CategoryResultObj>('/category')
      .pipe(tap(data => {
        for (let category of data.results) // add the products to their store
          this.updateBikes(category.category, 1, category.bikes)
        return data
      }))
  }
  fetch_by_category(category: string, page: number = 1) {
    console.log("here")
    return this.api.get<{results: BikeObj[], total_pages: number }>(`/bikes/?category=${category}/`)
      .pipe(tap(result => {
        console.log("bike.service.results: ", result)
        this.updateBikes(category, page, result.results)
      }))
  }
  fetch_by_id(id: number): Observable<BikeObj|undefined>{
    // check locally first
    const foundLocally = this.bikeStore.getValue().bikes.
    flatMap(category => category.list.flatMap((list, index) => {
      if(list.bikes.find(f => f.id === id)){
        return list.bikes[index]
      }
      return []
    })).find(f => f.id === id)
    if(foundLocally){
      return new Observable((subscriber)=>{
        subscriber.next(foundLocally as BikeObj)
        subscriber.complete()
        return ()=>{}
      })
    } else {
      return this.api.get<BikeObj|undefined>(`/bikes/${id}`)
        .pipe(
          tap(result => {
            // update inside store
            if(result)
              this.updateOneBike(result)
            return result
          })
        )
    }
  }
}
