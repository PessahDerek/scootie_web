import {CartStore} from "../stores/cart/cart.store";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ApiService} from "./api.service";
import {tap} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class CartService {

  constructor(private CartStore: CartStore, private api: ApiService) {
  }

  sendCart(client: ClientDetailsObj){
    this.CartStore.setLoading(true)
    return this.api.post('/cart', {
      client: client,
      items: this.CartStore.getValue().items
    }).pipe(data => {
      this.CartStore.setLoading(false)
      return data
    })
  }

  toggle_cart(show: boolean = !this.CartStore.getValue().show_cart){
    this.CartStore.update(prev => ({...prev, show_cart: show}))
  }

  add_to_cart(cart_item: CartItem) {
    // check if item is in cart
    const index = this.CartStore.getValue().items.findIndex(c => c.id == cart_item.id)
    if (index === -1) {
      // this.store.update()
      this.CartStore.update(state => ({...state, items: [...state.items, ...[cart_item]]}))
    } else if (JSON.stringify(this.CartStore.getValue().items[index]) !== JSON.stringify(cart_item)) {
      const copy = [...this.CartStore.getValue().items]
      copy[index] = cart_item;
      this.CartStore.update(prev => ({...prev, items: [...copy]}))
    }
  }

  remove_from_cart(bike_id: number) {
    const copy = [...this.CartStore.getValue().items.filter(c => c.id != bike_id)]
    this.CartStore.update(prev => ({...prev, items: [...copy]}))
  }

  edit_in_cart(id: number, field: string, value: string | number) {
    const copy = [...this.CartStore.getValue().items.map(cart => {
      if (cart.id.toString() == id.toString()) {
        const hold = {...cart}
        if(field === 'qty' && Number(value) > 0)
          hold[field] = Math.abs(parseFloat(value.toString()))
        return hold
      }
      return cart
    })]
    this.CartStore.update(prev => ({...prev, items: [...copy]}))
  }
}
