import {Component} from "@angular/core";
import {NavigationEnd, NavigationSkipped, Router, RouterLink} from "@angular/router";
import {DropdownComponent} from "../dropdown/dropdown.component";
import {CartQuery} from "../../../stores/cart/cart.query";
import {CartService} from "../../../services/cart.service";


@Component({
  selector: "navbar",
  standalone: true,
  imports: [
    RouterLink,
    DropdownComponent,
  ],
  template: `
    <nav class="w-full h-[70px] sticky top-0 z-40 bg-primary-400">
      <div class="w-[90%] h-full flex justify-between m-auto border-b border-b-primary-600">
        <a class="truncate font-1 text-[3vmax] font-bold md:font-normal leading-[70px] text-accent" href="/">Fat-bikes Kenya</a>
        <!-- PC navigation, hidden in mobile -->
        <div class="w-max font-1 hidden md:flex gap-5">
          @for (path of paths; track path.name) {
            @if (path.path) {
              <a
                class="{{(activeUrl === path.path) && active_action === '' ? 'acc-btn-lt': 'pri-btn'}} m-auto cursor-pointer !w-max flex"
                [routerLink]="path.path">
                {{ path.name }}
              </a>
            } @else {
              <a (click)="toggleCart()"
                 class="{{active_action === 'show-cart' ? 'acc-btn-lt': 'pri-btn'}} m-auto cursor-pointer !w-max flex">
                {{ path.name }}
                <p>({{ cart_count }})</p>
              </a>
            }

          }
        </div>
        <!-- Mobile navigation, hidden in PC -->
        <Mobile-dropdown class="block md:hidden mt-auto mb-auto" [paths]="paths"/>
      </div>
    </nav>
  `
})
export class NavbarComponent {
  activeUrl: string = "/";
  cart_count = 0;
  active_action: "show-cart" | "" = "";
  paths: Array<PathObj> = [
    {name: "Home", path: "/"},
    {name: "About", path: "/about"},
    {name: "Cart", action: 'show-cart'},
  ];

  constructor(private incomingRouter: Router, private cart_query: CartQuery, private cartService: CartService) {
    this.listenToNavigationEnd(this.incomingRouter)
  }

  ngOnInit(): void {
    this.cart_query.cart
      .subscribe(data => {
        this.cart_count = data.length
      })
    this.cart_query.showing
      .subscribe(showing => {
        this.active_action = showing ? "show-cart" : ""
      })
  }

  toggleCart() {
    this.cartService.toggle_cart()
  }

  private listenToNavigationEnd(router: Router) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.activeUrl = event.url;
        this.cartService.toggle_cart(false)
        this.active_action = ""
      }
      if (event instanceof NavigationSkipped) {
        this.active_action = ""
        this.cartService.toggle_cart(false)
        this.active_action = ""
      }
    })
  }

}
