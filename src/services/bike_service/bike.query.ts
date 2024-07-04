import {Query} from "@datorama/akita";
import {BikesStore} from "../../stores/bikes.store";
import {Injectable} from "@angular/core";
import {BikesService} from "./bikes.service";
import {catchError, combineLatest, concatMap, flatMap, mergeMap, Observable, of, tap} from "rxjs";

@Injectable({
  providedIn: "root",
})
export class BikeQuery extends Query<BikeStoreState> {

  bikes = this.select(state => state.bikes)

  constructor(protected override store: BikesStore, private bikeService: BikesService) {
    super(store);
  }

  bikes_via_category(category: string, page: number = 1) {
    return this.select(state => state.bikes.find(bike => bike.category === category)?.list.find(l => l.page === page)?.bikes ?? [])
  }

  bike_via_id(id: number, category?: string) {
    // check in store
    const local = this.select(state => {
      const list = state.bikes?.flatMap(bike => category ?
        bike.category === category ? bike.list.flatMap(l => l.bikes) : []
        :
        bike.list.flatMap(l => l.bikes)
      )
      return list?.find(f => f.id === id)
    })

    const server = this.bikeService.fetch_by_id(id)
    return combineLatest([local, server])
  }
}

