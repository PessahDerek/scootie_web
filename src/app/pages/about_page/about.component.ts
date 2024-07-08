import {Component} from "@angular/core";
import {ContentQuery} from "../../../stores/content/content.query";


@Component({
  standalone: true,
  selector: "about-page",
  template: `
    <div class="page" data-aos="zoom-in">
      <div class="w-[90%] m-auto">
        <br>
        <h2 class="text-[26px] font-bold">About us</h2>
        <br>
        <div class="w-full p-5 bg-gray-100 rounded-md md:columns-2">
          <span [innerHTML]="content"></span>
        </div>
      </div>
      <br>
      <br>
    </div>
  `
})
export class AboutComponent {
  content: string = ""
  constructor(private contentQuery: ContentQuery) {
  }

  ngOnInit(){
    window.scrollTo({top: 0, behavior: 'smooth'});
    this.contentQuery.about
      .subscribe(data => {
        this.content = data
      })
  }
}
