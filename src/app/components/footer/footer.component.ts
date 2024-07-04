import {Component} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {ListFaqComponent} from "../list_faq/list_faq.component";
import {ListContactComponent} from "../list_contact/list_contact.component";
import {FetchBikesService} from "../../../services/read/fetch_bikes.service";


@Component({
  standalone: true,
  selector: "footer-component",
  imports: [
    ListFaqComponent,
    HttpClientModule,
    ListContactComponent,
  ],
  template: `
    <footer class="w-full min-h-[30vh] text-primary overflow-y-hidden grid auto-rows-max p-5 bg-accent-950">
      <div class="w-[90%] m-auto grid md:grid-cols-2 gap-4">
        <div class="grid gap-2">
          <h2 class="text-[2ch] font-1">Faqs</h2>
          @for (faq of faqs; track faqs) {
            <list_faq [faq]="faq"/>
          }
        </div>
        <div class="grid auto-rows-max h-max">
          <h2 class="text-[2ch] font-1">Reach us</h2>
          @for (contact of contacts; track contacts) {
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

  constructor(private api: FetchBikesService) {
  }
  ngOnInit(){
    this.api.get<{results: FaqObj[]}>(`/faqs/`)
      .subscribe(data => {
        this.faqs = this.faqs.concat(data.results)
      })
    this.api.get<{results: ContactObj[]}>(`/contacts/`)
      .subscribe(data =>{
        this.contacts = this.contacts.concat(data.results)
      })
  }
}
