import {Component, Input} from "@angular/core";
import {NgFor, NgOptimizedImage} from "@angular/common";


@Component({
  standalone: true,
  selector: 'image_carousel',
  imports: [
    NgOptimizedImage,
    NgFor
  ],
  template: `
    <div class="w-full flex flex-wrap-reverse md:flex-nowrap gap-2">
      <div class="w-max max-w-[250px] overflow-x-auto hide-scroll-bar grid grid-flow-col md:grid-flow-row md:auto-rows-max gap-2">
        <div class="w-[50px] h-[50px] cursor-pointer" *ngFor="let img of images; index as i;">
          <img [ngSrc]="img" (click)="view_image(i)" fill class="w-full h-[50px] {{i === active ? 'opacity-100':'opacity-50'}} object-contain"
               alt=""/>
        </div>
      </div>
      <div class="flex-1 min-w-[300px] h-[50vh] md:h-[70vh]">
        <img [ngSrc]="images[active]" fill class="w-full h-full object-contain" alt=""/>
      </div>
    </div>
  `
})
export class ImageCarouselComponent {
  @Input() images: string[] = [];
  active: number = 0;

  view_image = (index: number) => this.active = index
}

