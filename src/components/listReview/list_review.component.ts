import {Component, Input} from "@angular/core";
import {NgForOf, NgIf} from "@angular/common";


@Component({
  standalone: true,
  selector: "list_review",
  imports: [
    NgForOf,
    NgIf
  ],
  template: `
    <div class="w-full max-w-[300px] grid">
      <div class="w-full h-[20px] gap-2 grid grid-flow-col auto-cols-max">
        <div class="w-full h-[10px] absolute bg-primary-600 bottom-0" ></div>
        <div class="flex pl-2" *ngFor="let rating of [].constructor(5); let i = index ">
          <div
            class="w-max bg-clip-text text-transparent {{(i+1)<= review.rating ? 'bg-accent':'bg-accent-100'}}">
            ⭐
          </div>
        </div>
      </div>
      <div class="p-2 bg-primary-600 ">
        <strong>{{ review.name }}</strong>
        <p class="line-clamp-6">{{ review.review }}</p>
      </div>
    </div>
  `
})
export class ListReviewComponent {
  @Input() review: ReviewObj = {name: "", review: "", rating: 5};

  protected readonly Array = Array;
}
