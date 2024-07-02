import {Component} from "@angular/core";
import {NgOptimizedImage} from "@angular/common";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import sanitize from "sanitize-html";
import {RouterLink} from "@angular/router";
import {ListCategoryComponent} from "../../components/list_category/listcategory.component";
import {ListReviewComponent} from "../../components/list_review/list_review.component";
import {CarouselComponent} from "../../components/carousel/carousel.component";
import {SafePipe} from "../../app/app.component";


@Component({
  standalone: true,
  selector: "landing-page",
  templateUrl: "./landing.component.html",
  imports: [
    NgOptimizedImage,
    HttpClientModule,
    RouterLink,
    ListCategoryComponent,
    ListReviewComponent,
    CarouselComponent,
    SafePipe,
  ]
})
export class LandingComponent {
  about: string = "";
  benefits: { title: string, description: string }[] = [
    {
      title: "Fuel efficiency",
      description: "Vivamus eros dolor, consequat in orci sed, mollis aliquet nisi. Quisque velit arcu, ullamcorper id diam at."
    },
    {
      title: "Time efficiency",
      description: "Vivamus eros dolor, consequat in orci sed, mollis aliquet nisi. Quisque velit arcu, ullamcorper id diam at."
    },
    {
      title: "Sleek design",
      description: "Vivamus eros dolor, consequat in orci sed, mollis aliquet nisi. Quisque velit arcu, ullamcorper id diam at."
    },
    {
      title: "Eco-friendly",
      description: "Vivamus eros dolor, consequat in orci sed, mollis aliquet nisi. Quisque velit arcu, ullamcorper id diam at."
    },
  ];
  categories: Array<CategoryObj> = [];
  reviews: Array<ReviewObj> = [];
  videoUrl: string = "";
  base: string = "http://192.168.100.76:8000"

  constructor(private http: HttpClient) {
    this.http.get<{ content: string }>(`${this.base}/content/1/`)
      .subscribe(data => {
        this.about = sanitize(data.content)
        // console.log(data.content);
      })
    this.http.get<{results: Array<CategoryObj>}>(`${this.base}/category/`)
      .subscribe(data => {
        this.categories = [...this.categories, ...data.results]
      })
    this.http.get<{results: ReviewObj[]}>(`${this.base}/reviews/`)
      .subscribe(data => {
        this.reviews = [...data.results]
      })
    this.http.get<{results: {url: string}[]}>(`${this.base}/videos/`)
      .subscribe(data => {
        // Replace url to only get the unique id
        this.videoUrl = data.results[0]?.url.replace("https://youtu.be/", "https://www.youtube.com/embed/").trim()
        console.log(this.videoUrl)
      })
  }

  protected readonly ListReviewComponent = ListReviewComponent;
}
