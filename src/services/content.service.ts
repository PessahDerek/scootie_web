import {Injectable, SecurityContext} from "@angular/core";
import {ApiService} from "./api.service";
import {EMPTY, forkJoin, Observable, switchMap, tap} from "rxjs";
import {DomSanitizer} from "@angular/platform-browser";
import {ContentStore} from "../stores/content/content.store";
import {BikesService} from "./bikes.service";
import {ContentQuery} from "../stores/content/content.query";


declare type InitialDataObj = [
  Observable<AboutResultObj>,
  // Observable<CategoryResultObj>,
  Observable<ReviewsResultObj>,
  Observable<ContactResultObj>,
  Observable<FaqResultObj>,
  Observable<VideoUrlResultObj>
]
// declare type InitialDataObj = Observable<AboutResultObj | CategoryResultObj | ReviewsResultObj | ContactResultObj | FaqResultObj | VideoUrlResultObj>[]
declare type AllInitialObservablesObj = Observable<[
  AboutResultObj,
  // CategoryResultObj,
  ReviewsResultObj,
  ContactResultObj, FaqResultObj, VideoUrlResultObj
]>
// declare type AllInitialObservablesObj = Observable<(AboutResultObj | CategoryResultObj | ReviewsResultObj | ContactResultObj | FaqResultObj | VideoUrlResultObj)[]>

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  constructor(private contentQuery: ContentQuery, private bikeService: BikesService, private contentStore: ContentStore, private api: ApiService, private sanitizer: DomSanitizer) {
  }

  fetchAllInitialContent(): AllInitialObservablesObj {
    this.contentStore.setLoading(true)
    const about = this.api.get<AboutResultObj>('/content/1')
      .pipe(
        tap((data) => {
        try {
          const sanitized = this.sanitizer.sanitize(SecurityContext.HTML, data.content)
          if (sanitized) {
            this.contentStore.update(prev => ({...prev, about: sanitized}))
            return {content: sanitized}
          }
          return {content: ""}
        } catch (err) {
          return {content: ""}
        }
      }))
    const contacts = this.api.get<ContactResultObj>('/contacts')
      .pipe(tap(data => {
        this.contentStore.update(prev => ({...prev, contacts: data.results}))
        return data
      }))
    const faqs = this.api.get<FaqResultObj>('/faqs')
      .pipe(tap(data => {
        this.contentStore.update(prev => ({...prev, faqs: data.results}))
        return data
      }))
    // const categories = this.api.get<CategoryResultObj>('/category')
    //   .pipe(tap(data => {
    //     for (let category of data.results) // add the products to their store
    //       this.bikeService.updateBikes(category.category, 1, category.bikes)
    //     return data
    //   }))
    const reviews = this.api.get<ReviewsResultObj>('/reviews')
      .pipe(tap(data => {
        this.contentStore.update(prev => ({...prev, reviews: data.results}))
        return data
      }))
    const video = this.api.get<VideoUrlResultObj>('/videos')
      .pipe(tap(data => {
        this.contentStore.update(
          prev =>
            ({...prev, video_url: data.results[0].url
                .replace("https://youtu.be/", "https://www.youtube.com/embed/").trim() ?? ""}))
        return data
      }))
    const observables: InitialDataObj = [about, reviews, contacts, faqs, video]
    // const observables: InitialDataObj = []
    const do_the_fetch = forkJoin(observables)
      .pipe(tap(data =>{
        this.contentStore.setLoading(false)
        return data
      }))

    return this.contentQuery.selectHasCache()
      .pipe(
        switchMap(hasCache => {
          return hasCache ? EMPTY : do_the_fetch;
        })
      )

  }
}
