import {Component, Input} from "@angular/core";
import {RouterLink} from "@angular/router";
import {NgOptimizedImage} from "@angular/common";


@Component({
  standalone: true,
  selector: 'list-category',
  imports: [
    RouterLink,
    NgOptimizedImage
  ],
  template: `
    <div (mouseleave)="toggleFocus(false)" (mouseenter)="toggleFocus(true)" data-aos="fade-up" data-aos-duration="700"
         class="w-full h-[50vmin] cursor-pointer overflow-hidden "
    >
      <img class="'w-full h-full object-cover object-center {{focus ? 'scale-110':'scale-100'}}" fill priority
           [ngSrc]="thumbnail"
           [alt]="category">
<!--      <div-->
<!--        class="w-full h-full absolute top-0 left-0 flex text-white font-1 bg-gradient-to-br from-black to-transparent">-->
        <a
          [routerLink]="'view/'+category"
           class="w-full h-full absolute top-0 left-0 flex text-white font-1 bg-gradient-to-br from-black to-transparent text-[3ch] text-center font-bold m-auto"
        >
          <span class="m-auto">{{ category }}</span>
        </a>
<!--      </div>-->
    </div>
  `
})
export class ListCategoryComponent {
  @Input() category: string = '';
  @Input() thumbnail: string = '';
  focus: boolean = false;

  toggleFocus(focus: boolean = !this.focus) {
    this.focus = focus;
  }
}
