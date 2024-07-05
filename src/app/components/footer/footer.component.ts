import {Component} from "@angular/core";
import {ListFaqComponent} from "../list_faq/list_faq.component";
import {ListContactComponent} from "../list_contact/list_contact.component";
import {ContentQuery} from "../../../stores/content/content.query";


@Component({
  standalone: true,
  selector: "footer-component",
  imports: [
    ListFaqComponent,
    ListContactComponent,
  ],
  template: `
    <footer class="w-full min-h-[30vh] text-primary overflow-y-hidden grid auto-rows-max p-5 bg-accent-950">
      <div class="w-[90%] m-auto grid md:grid-cols-2 gap-4">
        <div class="grid gap-2">
          <h2 class="text-[2ch] font-1">Faqs</h2>
          @for (faq of faqs; track faq.question) {
            <list_faq [faq]="faq"/>
          }
        </div>
        <div class="grid auto-rows-max h-max">
          <h2 class="text-[2ch] font-1">Reach us</h2>
          @for (contact of contacts; track contact.contact) {
            <list_contact [contact]="contact"/>
          }
        </div>
      </div>
      <br>
      <br>
      <span class="w-max m-auto text-accent">&copy;{{ year }} Fat-Bikes Kenya</span>
    </footer>
  `
})
export class FooterComponent {
  year: number = new Date().getUTCFullYear();
  faqs: Array<FaqObj> = [];
  contacts: Array<ContactObj> = []

  constructor(private contentQuery: ContentQuery) {
  }
  ngOnInit(){
    this.contentQuery.faqs
      .subscribe(data =>{
        this.faqs = data
      })
    this.contentQuery.contacts
      .subscribe(data =>{
        this.contacts = data
      })
  }
}
