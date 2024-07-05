import {Component, Input, Output} from "@angular/core";
import {NavigationStart, Router, RouterLink} from "@angular/router";
import {ClickOutsideDirective} from "../../../directives/clickOutside.directive";

@Component({
  standalone: true,
  selector: 'Mobile-dropdown',
  imports: [
    RouterLink,
    ClickOutsideDirective
  ],
  template: `
    <div (clickOutside)="toggle(false)" class="dropdown">
      <button (click)="toggle()">
        <div [class]="[show ? 'tilt-45': '']"></div>
        <div [class]="[show ? 'opacity-0': 'opacity-100']"></div>
        <div [class]="[show ? 'tilt--45 rotate-45': '']"></div>
      </button>
      @if (show) {
        <div class="menu" data-aos="slide-up" data-aos-duration="550">
          @for (path of paths; track path.name) {
            <a data-aos="fade-up" [routerLink]="path.path">{{ path.name }}</a>
          }
          <p>Fat-Bikes Kenya &copy;{{ date }}</p>
        </div>
      }
    </div>
  `
})
export class DropdownComponent {
  date: number = new Date().getUTCFullYear()
  show: boolean = false;
  @Input() paths: Array<PathObj> = [];
  @Output() hideMenu = this.toggle

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart)
        this.toggle(false)
    })
  }

  toggle(value?: boolean) {
    this.show = value === undefined ? !this.show : value;
  }
}
