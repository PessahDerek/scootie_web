import {Component} from "@angular/core";
import {BikeQuery} from "../../../stores/bikes/bike.query";
import {ActivatedRoute} from "@angular/router";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {DetailComponent} from "../../components/list_details/list_details.component";
import {CartQuery} from "../../../stores/cart/cart.query";
import {CartService} from "../../../services/cart.service";
import {PageSpinnerComponent} from "../../components/page_spinner/page_spinner.component";
import {BikesService} from "../../../services/bikes.service";


@Component({
  standalone: true,
  selector: 'app-bike-page',
  templateUrl: './bike_page.component.html',
  imports: [
    NgIf,
    NgOptimizedImage,
    DetailComponent,
    PageSpinnerComponent
  ]
})
export class BikePageComponent {
  id: number = 0;
  bike?: BikeObj;
  cart_state?: CartItem = undefined;

  constructor(private bikeService: BikesService, private cartService: CartService, private cartQuery: CartQuery, private bikeQuery: BikeQuery, private router: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.router.params.subscribe(params => {
      this.id = params["id"];
    })
    this.cartQuery.get_bike_cart_state(this.id)
      .subscribe(value => {
        this.cart_state = value
      })

    this.bikeService.fetch_by_id(this.id)
      .subscribe(bike => {
        this.bike = bike;
      })
  }

  edit_cart(key: string, value: number | string) {
    this.cartService.edit_in_cart(this.id, key, value)
  }

  add_to_cart() {
    if (this.bike)
      this.cartService.add_to_cart({
        id: this.bike?.id,
        brand: this.bike?.brand,
        model: this.bike?.model,
        price: this.bike?.price,
        discount: this.bike?.discount,
        qty: 1
      })
  }

  remove_frm_cart() {
    this.cartService.remove_from_cart(this.id)
  }
}
