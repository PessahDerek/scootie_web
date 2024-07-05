import {Component, Input, TemplateRef} from "@angular/core";
import {NgForOf, NgTemplateOutlet} from "@angular/common";
import {ListReviewComponent} from "../list_review/list_review.component";


@Component({
  standalone: true,
  selector: 'carousel-component',
  imports: [
    NgForOf,
    NgTemplateOutlet,
    ListReviewComponent,
  ],
  template: `
    <div class="w-full h-max grid gap-4 auto-rows-max">
      <div class="w-full h-max p-2 flex overflow-x-auto gap-4 scroll-m-0 hide-scroll-bar bg-primary">
        @for (review of reviews; track review.name) {
          <list_review [review]="review" />
        }
      </div>
<!--      <div class="grid grid-flow-col auto-cols-max gap-2 m-auto">-->
<!--        <div class="w-[10px] h-[10px] rounded-full bg-accent" *ngFor="let dot of [].constructor(reviews.length)"></div>-->
<!--      </div>-->
    </div>
  `
})
export class CarouselComponent {
  @Input() reviews: Array<ReviewObj> = [];

}
