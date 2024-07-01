import {Component, Input} from "@angular/core";
import {NgForOf} from "@angular/common";


@Component({
  standalone: true,
  selector: 'carousel-component',
  imports: [
    NgForOf
  ],
  template: `
    <div class="w-full grid gap-4 auto-rows-max min-h-[20vh]">
      <div class="w-full h-[80%] bg-primary-600">
        @for (data of data; track data){
          {{component}}
        }
      </div>
      <div class="grid grid-flow-col auto-cols-max gap-2 m-auto">
        <div class="w-[10px] h-[10px] rounded-full bg-accent" *ngFor="let dot of [].constructor(data.length)"></div>
      </div>
    </div>
  `
})
export class CarouselComponent {
  @Input() component?: Component;
  @Input() data: Array<any> = [];
}
