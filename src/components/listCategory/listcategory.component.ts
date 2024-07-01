import {Component, Input} from "@angular/core";


@Component({
  standalone: true,
  selector: 'list-category',
  template: `
    <div (mouseleave)="toggleFocus(false)" (mouseenter)="toggleFocus(true)" data-aos="fade-up" data-aos-duration="700" class="w-full h-[40vh] cursor-pointer overflow-hidden ">
      <img [class]="['w-full h-full object-cover object-center',focus ? 'scale-110':'scale-100']" [src]="thumbnail" alt="">
      <div class="w-full h-full absolute top-0 left-0 flex text-white font-1 bg-gradient-to-br from-black to-transparent">
        <a class="text-[3ch] w-max h-max font-bold m-auto">{{ category }}</a>
      </div>
    </div>
  `
})
export class ListCategoryComponent {
  @Input() category: string = '';
  @Input() thumbnail: string = '';
  focus:boolean = false;

  toggleFocus(focus: boolean = !this.focus){
    this.focus = focus;
  }
}
