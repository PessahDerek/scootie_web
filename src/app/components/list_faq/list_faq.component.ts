import {Component, Input} from "@angular/core";
import {NgIf} from "@angular/common";


@Component({
  standalone: true,
  selector: 'list_faq',
  imports: [
    NgIf
  ],
  template: `
    <div data-aos="fade-up" class="w-full grid gap-2 border border-[#fff] border-opacity-20 p-2">
      <div
        (click)="toggle()"
        class="w-full min-h-[40px] cursor-pointer font-bold flex justify-between leading-loose border-b {{show ? ' border-b-primary-700':'border-transparent'}}">
        <span>{{ faq.question }}</span>
        <div class="w-[40px] h-[40px] text-center leading-[40px] bg-accent bg-opacity-20">
          @if (show) {
            -
          } @else {
            +
          }
        </div>
      </div>
      <div *ngIf="show" [id]="id">
        <p>{{ faq.answer }}</p>
      </div>
    </div>
  `
})
export class ListFaqComponent {
  @Input() faq: FaqObj = {question: "", answer: ""};
  id = Math.random().toString(36);
  show: boolean = false;

  toggle(){
    this.show = !this.show;
    if(this.show){
      // wait for div to appear in DOM because it is conditionally rendered
      setTimeout(()=>{
        const element = document.getElementById(this.id);
        if(element)
          return element.scrollIntoView({behavior: "smooth", inline: "center", block: "center"});
      }, 20)

    }
  }
}
