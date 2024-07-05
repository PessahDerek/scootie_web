import {Query} from "@datorama/akita";
import {BikesStore} from "./bikes.store";
import {Injectable} from "@angular/core";
import {BikesService} from "../../services/bikes.service";
import {combineLatest} from "rxjs";

@Injectable({
  providedIn: "root",
})
export class BikeQuery extends Query<BikeStoreObj> {

  // bikes = this.select(state => state.bikes)
  categories = this.select(state => state.bikes.map(bike => ({category: bike.category, bikes: bike.list.flatMap(p => p.bikes[0])}) satisfies CategoryObj));

  constructor(protected override store: BikesStore, private bikeService: BikesService) {
    super(store);
  }

  bikes_via_category(category: string, page: number = 1) {
    return this.select(state => state.bikes.find(bike => bike.category === category)?.list.find(l => l.page === page)?.bikes ?? [])
  }
}

