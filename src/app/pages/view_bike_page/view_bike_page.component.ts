import {Component} from "@angular/core";
import {BikeQuery} from "../../../stores/bikes/bike.query";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {DetailComponent} from "../../components/list_details/list_details.component";
import {CartQuery} from "../../../stores/cart/cart.query";
import {CartService} from "../../../services/cart.service";
import {PageSpinnerComponent} from "../../components/page_spinner/page_spinner.component";
import {BikesService} from "../../../services/bikes.service";


@Component({
  standalone: true,
  selector: 'app-view-bike',
  templateUrl: './view_bike_page.component.html',
  imports: [
    NgIf,
    NgOptimizedImage,
    DetailComponent,
    PageSpinnerComponent,
    RouterLink
  ]
})
export class BikePageComponent {
  id: number = 0;
  bike?: BikeObj;
  cart_state?: CartItem = undefined;
  error_getting_bike: string | undefined = undefined;
  category: string = ""

  constructor(private bikeService: BikesService, private cartService: CartService, private cartQuery: CartQuery, private bikeQuery: BikeQuery, private router: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.router.params.subscribe(params => {
      this.category = params['category']
      this.id = params["id"];
    })
    this.cartQuery.get_bike_cart_state(Number(this.id))
      .subscribe(value => {
        this.cart_state = value
      })

    this.bikeService.fetch_by_id(Number(this.id))
      .subscribe(bike => {
        if (bike) {
          this.error_getting_bike = undefined;
          return this.bike = bike;
        } else return this.error_getting_bike = "Sorry, it seems we could not find this bike (Maybe this url is broken " +
          "or we no longer have it 🤔), but I'm sure you'll love the other stuff we've got 🤩."
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

  protected readonly window = window;
}
