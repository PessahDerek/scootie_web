import {Query} from "@datorama/akita";
import {CartStore} from "./cart.store";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CartQuery extends Query<CartStoreObj>{
  cart = this.select(state => state.items as Array<CartItem>)
  showing = this.select(state => state.show_cart as boolean)
  loading = this.selectLoading()
  get_bike_cart_state = (id: number):Observable<CartItem|undefined> => this.select(state => state.items.find(f => f.id.toString() === id.toString()));

  constructor(protected CartStore: CartStore) {
    super(CartStore);
  }



}

