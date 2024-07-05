import {Component} from "@angular/core";


@Component({
  standalone: true,
  selector: 'page-spinner',
  template: `
    <div class="page flex">
      <div class="w-[50px] h-[50px] m-auto rounded-full border-2 border-accent-200 border-t-accent animate-spin "></div>
    </div>
  `
})
export class PageSpinnerComponent {

}
