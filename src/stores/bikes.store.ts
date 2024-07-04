import {Store, StoreConfig} from "@datorama/akita";
import {Injectable} from "@angular/core";



export function createInitialState(): BikeStoreState {
  return {
    bikes: [
      {
        category: "",
        list: []
      }
    ]
  }
}

@Injectable({providedIn: 'root'})
@StoreConfig({name: 'bikes'})
export class BikesStore extends Store<BikeStoreState> {
  constructor() {
    super(createInitialState());
  }
}
