import {Query} from "@datorama/akita";
import {BikesStore} from "./bikes.store";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

@Injectable({
  providedIn: "root",
})
export class BikeQuery extends Query<BikeStoreObj> {
  // categories = this.select(state => state.bikes.map(bike => ({category: bike.category, bikes: bike.list.flatMap(p => p.bikes[0])}) satisfies CategoryObj));
  categories: Observable<{category: string, bikes: BikeObj[]}[]> = this.select(({bikes}) => {
    const categoryNames = [...bikes.keys()]
    // get just page 1 for each category
    return categoryNames.map(category => {
      const foundCategory = bikes.get(category)
      const categoryPage = foundCategory?.get(1)
      if(foundCategory && categoryPage)
        return {category: category, bikes: [...categoryPage.values()]}
      return {category: "", bikes: []}
    })
  })

  constructor(protected override store: BikesStore) {
    super(store);
  }


  bikes_via_category(category: string, page: number = 1): Observable<BikeObj[]>{
    return this.select(bikeStore => {
      const list = bikeStore.bikes.get(category)?.get(page)?.values()
      if(list !== undefined)
        return [...list]
      return []
    })
  }

  find_one_bike_in_store(id: number, category: string, page: number = 1): Observable<BikeObj|undefined>{
    return this.select(store => {
      return store.bikes.get(category)?.get(page)?.get(id)
    })
  }

}

