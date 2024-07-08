import {BikesStore} from "../stores/bikes/bikes.store";
import {map, mergeMap, Observable, switchMap, tap} from "rxjs";
import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";
import {BikeQuery} from "../stores/bikes/bike.query";

declare interface CategoryResultObj {
  results: CategoryObj[]
}

@Injectable({
  providedIn: "root",
})
export class BikesService {
  // TODO: change the condition
  base = window.location.href.includes("pixy") ? "https://pixystix.pythonanywhere.com" : "http://192.168.100.76:8000"

  constructor(private bikeQuery: BikeQuery, private bikeStore: BikesStore, private api: ApiService) {
  }

  /**
   * @description : Adds bikes to pages in a category
   * @param category : string : category name
   * @param page : number : the page to update
   * @param new_bikes : BikeObj[] : an array of bikes, ideally should be 20 for each page
   */
  updateBikesInStore(category: string, page: number, new_bikes: Array<BikeObj>) {
    this.bikeQuery.select(t => t.bikes)
      .subscribe(bikes => {
        for (const bike of new_bikes)
          // check if category exists in store
          if (bikes.has(category)) {
            // check if page exists
            if (bikes.get(category)?.has(page))
              this.bikeStore.update(state => state.bikes.get(category)?.get(page)?.set(bike.id, bike))
            else
              this.bikeStore.update(store => store.bikes.get(category)?.set(page, new Map().set(bike.id, bike)))
          } else { // category doesn't exist, so does the page obviously
            // const new_entry = new Map<number, BikeObj[]>().set(page, new_bikes)
            this.bikeStore.update(store => store.bikes.set(category, new Map().set(page, new Map().set(bike.id, bike))))
          }
      })
  }

  /**
   *
   * @param bike : BikeObj : The new bike you want to add, we'll get category from the bike itself
   * @param page : number : page number (optional), we'll always assume page to be 1
   */
  updateOneBike(bike: BikeObj, page: number = 1) {
    this.bikeQuery.find_one_bike_in_store(bike.id, bike.category, page)
      .subscribe(found => {
        if (!found) // confirm is not in the store
          this.bikeStore.update(store => {
              const new_page = new Map().set(page, new Map().set(bike.id, bike));
              // check if its category and page is there
              if (store.bikes.has(bike.category))
                this.bikeStore.update(store => {
                  if (store.bikes.get(bike.category)?.has(page))
                    this.bikeStore.update(store => store.bikes.get(bike.category)?.get(page)?.set(bike.id, bike))
                  else this.bikeStore.update(store => store.bikes.get(bike.category)?.set(page, new Map().set(bike.id, bike)))
                })
              else this.bikeStore.update(store => store.bikes.set(bike.category, new_page))
            }
          )
      })
  }

  fetch_all_categories() {
    return this.api.get<CategoryResultObj>('/category')
      .pipe(tap(data => {
        for (let category of data.results) // add the products to their store
          this.updateBikesInStore(category.category, 1, category.bikes)
        return data
      }))
  }

  /**
   * @description : Fetches the products from the server by the name of the category, works with page number which defaults to 1
   * @param category :string : Name of the category product
   * @param page : number: Page number of the bike you want
   */
  fetch_by_category(category: string, page: number = 1) {
    return this.api.get<
      BikeObj[]
    >(`/bikes/by-category-page/?category=${category}&page=${page}/`)
      .pipe(tap(result => {
        this.updateBikesInStore(category, page, result)
      }))
  }

  fetch_by_id(id: number): Observable<BikeObj | undefined> {
    // check locally first
    return this.bikeQuery.select(store => {
      const pages = [...store.bikes.values()].find(page => page.has(id))
      return [...pages?.get(id)?.values() ?? []][0]
    }).pipe(
      // tap(value => {
      //   if (!value) {
      //     return this.api.get<BikeObj | undefined>(`/bikes/${id}`)
      //       .pipe(
      //         tap(result => {
      //           // update inside store
      //           if (result)
      //             this.updateOneBike(result)
      //           console.log("From database: ", result)
      //           return result
      //         }),
      //       )
      //   }
      //   return value
      // })
      switchMap(result => {
        if (!result)
          return this.api.get<BikeObj | undefined>(`/bikes/${id}`)
            .pipe(
              tap(result => {
                // update inside store
                if (result)
                  this.updateOneBike(result)
                console.log("From database: ", result)
                return result
              }),
            )
        return new Observable<BikeObj | undefined>(subscriber => {
          subscriber.next(result)
          subscriber.complete()
        })
      })
    )

    // if (foundLocally) {
    //   return new Observable((subscriber) => {
    //     subscriber.next(foundLocally.values())
    //     subscriber.complete()
    //     return () => {
    //     }
    //   })
    // } else {
    //   return this.api.get<BikeObj | undefined>(`/bikes/${id}`)
    //     .pipe(
    //       tap(result => {
    //         // update inside store
    //         if (result)
    //           this.updateOneBike(result)
    //         return result
    //       })
    //     )
    // }
  }
}
