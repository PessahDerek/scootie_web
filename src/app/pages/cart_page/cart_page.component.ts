import {Component} from "@angular/core";
import {CartService} from "../../../services/cart.service";
import {CartQuery} from "../../../stores/cart/cart.query";
import {NgForOf, NgIf} from "@angular/common";
import {readable} from "../../../libs/methods/shared";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ClickOutsideDirective} from "../../../directives/clickOutside.directive";


@Component({
  standalone: true,
  selector: 'app-cart',
  templateUrl: './cart_page.component.html',
  imports: [
    NgIf,
    NgForOf,
    FormsModule,
    ReactiveFormsModule,
    ClickOutsideDirective
  ]
})
export class CartPageComponent {
  showing: boolean = false;
  cart_items: CartItem[] = [];
  userDetails = new FormGroup({
    first_name: new FormControl(""),
    last_name: new FormControl(""),
    phone: new FormControl(""),
    email: new FormControl("")
  })
  loading: boolean = false;
  keys = ['model', 'brand', 'qty', 'price', 'discount']
  constructor(private cart_query: CartQuery, private cartService: CartService) {}

  ngOnInit(){
    this.cart_query.showing
      .subscribe(showing => this.showing = showing)
    this.cart_query.cart
      .subscribe(cart_items => this.cart_items = cart_items)
    this.cart_query.loading
      .subscribe(isLoading => {
        this.loading = isLoading
      })
  }

  sendCart(){
    this.cartService.sendCart(this.userDetails.getRawValue() as ClientDetailsObj)
      .subscribe({
        next: data => {
          console.log(data)
        },
        error: err => {
          console.log(err)
        }
      })
  }

  remove_product(id: number){
    this.cartService.remove_from_cart(id)
  }
  cancel(){
    this.cartService.toggle_cart()
  }
  handleClickOutside(){
    this.cartService.toggle_cart(this.showing)
  }
  protected readable = readable
}
