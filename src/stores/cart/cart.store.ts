import {Injectable} from "@angular/core";
import {Store, StoreConfig} from "@datorama/akita";


export function createInitialCartState(): CartStoreObj{
  return {
    items: [],
    show_cart: false
  }
}

@Injectable({
  providedIn: "root"
})
@StoreConfig({name: 'cart'})
export class CartStore extends Store<CartStoreObj>{

  constructor() {
    super(createInitialCartState());
  }
}
