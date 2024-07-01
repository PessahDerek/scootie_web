import {Component} from "@angular/core";
import {NgOptimizedImage} from "@angular/common";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import sanitize from "sanitize-html";
import {RouterLink} from "@angular/router";
import {ListCategoryComponent} from "../../components/listCategory/listcategory.component";
import {ListReviewComponent} from "../../components/listReview/list_review.component";
import {CarouselComponent} from "../../components/carousel/carousel.component";


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

  constructor(private http: HttpClient) {
    this.http.get<{ content: string }>("http://127.0.0.1:8000/content/1/")
      .subscribe(data => {
        this.about = sanitize(data.content)
        // console.log(data.content);
      })
    this.http.get<{results: Array<CategoryObj>}>("http://127.0.0.1:8000/category/")
      .subscribe(data => {
        this.categories = [...this.categories, ...data.results]
      })
    this.http.get<{results: ReviewObj[]}>("http://127.0.0.1:8000/reviews/")
      .subscribe(data => {
        this.reviews = [...data.results]
      })
  }

}
