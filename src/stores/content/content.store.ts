import {Injectable} from "@angular/core";
import {Store, StoreConfig} from "@datorama/akita";


export function createInitialContentStoreState(): ContentStoreObj {

  return {
    about: "",
    contacts: [],
    // categories: [],
    faqs: [],
    reviews: [],
    video_url: ""
  }
}

@Injectable({
  providedIn: 'root'
})
@StoreConfig({
  name: 'content',
  cache: {
    ttl: 432000000 // cache lives 5 days
  }
})
export class ContentStore extends Store<ContentStoreObj> {

  constructor() {
    super(createInitialContentStoreState());
  }
}

