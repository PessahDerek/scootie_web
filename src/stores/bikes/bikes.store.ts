import {Store, StoreConfig} from "@datorama/akita";
import {Injectable} from "@angular/core";



export function createInitialState(): BikeStoreObj {
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
export class BikesStore extends Store<BikeStoreObj> {
  constructor() {
    super(createInitialState());
  }
}
