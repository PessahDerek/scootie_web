import {Component} from "@angular/core";
import {NgOptimizedImage} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {RouterLink} from "@angular/router";
import {ListCategoryComponent} from "../../components/list_category/listcategory.component";
import {ListReviewComponent} from "../../components/list_review/list_review.component";
import {CarouselComponent} from "../../components/carousel/carousel.component";
import {SafePipe} from "../../app.component";
import {FetchBikesService} from "../../../services/read/fetch_bikes.service";
import sanitize from "sanitize-html";


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


  constructor(private api: FetchBikesService) {
  }

  ngOnInit() {
    this.api.get<{content: string}>('/content/1/',)
      .subscribe((data) => {
        this.about = sanitize((data as { content: string }).content)
      })
    this.api.get<{ results: Array<CategoryObj> }>(`/category/`)
      .subscribe(data => {
        this.categories = [...this.categories, ...data.results]
      })
    this.api.get<{ results: ReviewObj[] }>(`/reviews/`)
      .subscribe(data => {
        this.reviews = [...data.results]
      })
    this.api.get<{ results: { url: string }[] }>(`/videos/`)
      .subscribe(data => {
        // Replace url to only get the unique id
        this.videoUrl = data.results[0]?.url.replace("https://youtu.be/", "https://www.youtube.com/embed/").trim()
      })
  }

  protected readonly ListReviewComponent = ListReviewComponent;
}
