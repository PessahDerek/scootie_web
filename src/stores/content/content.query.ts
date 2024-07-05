import {Injectable} from "@angular/core";
import {Query} from "@datorama/akita";
import {ContentStore} from "./content.store";


@Injectable({
  providedIn: "root",
})
export class ContentQuery extends Query<ContentStoreObj> {
  about = this.select(state => state.about)
  contacts = this.select(state => state.contacts)
  faqs = this.select(state => state.faqs)
  reviews = this.select(state => state.reviews)
  video_url = this.select(state => state.video_url)
  loading = this.selectLoading()

  constructor(protected contentStore: ContentStore) {
    super(contentStore);
  }
}

