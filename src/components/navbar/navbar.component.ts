import {Component} from "@angular/core";
import {NavigationEnd, Router, RouterLink} from "@angular/router";
import {DropdownComponent} from "../dropdown/dropdown.component";

interface PathObj {
  name: string;
  path: string;
}

@Component({
  selector: "navbar",
  standalone: true,
  imports: [
    RouterLink,
    DropdownComponent
  ],
  template: `
    <nav class="w-full h-[70px] sticky top-0 z-40 bg-primary-400">
      <div class="w-[90%] h-full flex justify-between m-auto border-b border-b-primary-600">
        <a class="font-1 text-[3vmax] font-bold md:font-normal leading-[70px] text-accent" href="/">Fat-bikes Kenya</a>
        <!-- PC navigation, hidden in mobile -->
        <div class="w-max font-1 hidden md:flex gap-5">
          @for (path of paths; track paths){
            <a [class]="[activeUrl === path.path ? 'acc-btn-lt': 'pri-btn', 'm-auto']" [routerLink]="path.path">
              {{path.name}}
            </a>
          }
        </div>
        <!-- Mobile navigation, hidden in PC -->
        <Mobile-dropdown class="block md:hidden mt-auto mb-auto" [paths]="paths" />
      </div>
    </nav>
  `
})
export class NavbarComponent {
  activeUrl: string = "/";
  paths: Array<PathObj> = [
    {name: "Home", path: "/"},
    {name: "About", path: "/about"},
    {name: "Cart", path: "/cart"},
  ];
  dropdown = DropdownComponent;

  constructor(private incomingRouter: Router) {
    this.listenToNavigationEnd(incomingRouter)
  }

  private listenToNavigationEnd(router: Router) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd)
        this.activeUrl = event.url;
    })
  }

}
