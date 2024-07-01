import {Component, Input, Output} from "@angular/core";
import {NavigationStart, Router, RouterLink} from "@angular/router";
import {ClickOutsideDirective} from "../../directives/clickOutside.directive";

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
        <div [class]="[show ? 'hide': '']"></div>
        <div [class]="[show ? 'hide': '']"></div>
        <div [class]="[show ? 'hide': '']"></div>
      </button>
      @if (show) {
        <div class="menu" data-aos="fade-up">
          @for (path of paths; track paths) {
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
    router.events.subscribe(event => {
      if(event instanceof NavigationStart)
        this.toggle(false)
    })
  }

  toggle(value?: boolean){
    this.show = value === undefined ? !this.show : value;
  }
}
