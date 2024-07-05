import {Component} from "@angular/core";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {RouterLink} from "@angular/router";
import {ListCategoryComponent} from "../../components/list_category/listcategory.component";
import {ListReviewComponent} from "../../components/list_review/list_review.component";
import {CarouselComponent} from "../../components/carousel/carousel.component";
import {SafePipe} from "../../app.component";
import {ContentService} from "../../../services/content.service";
import {ContentQuery} from "../../../stores/content/content.query";
import {PageSpinnerComponent} from "../../components/page_spinner/page_spinner.component";
import {BikesService} from "../../../services/bikes.service";
import {BikeQuery} from "../../../stores/bikes/bike.query";


@Component({
  standalone: true,
  selector: "landing-page",
  templateUrl: "./landing.component.html",
  imports: [
    NgOptimizedImage,
    RouterLink,
    ListCategoryComponent,
    ListReviewComponent,
    CarouselComponent,
    SafePipe,
    PageSpinnerComponent,
    NgIf,
  ]
})
export class LandingComponent {
  ready: boolean = false;
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


  constructor(private bikeService: BikesService, private bikeQuery: BikeQuery, private contentService: ContentService, private contentQuery: ContentQuery) {
  }

  ngOnInit() {
    window.scrollTo({top: 0, behavior: 'smooth'});
    this.bikeService
      .fetch_all_categories()
      .subscribe({
          complete: () => this.ready = true
        }
      )
    this.contentQuery.about.subscribe(data => {
      this.about = data;
    })
    this.bikeQuery.categories
      .subscribe(data => {
        this.categories = data.filter(f => !!f.category);
      })
    this.contentQuery.reviews.subscribe(data => {
      this.reviews = [...data]
    })
    this.contentQuery.video_url.subscribe(data => {
      this.videoUrl = data
    })
    this.contentQuery.loading.subscribe(isLoading => {
      this.ready = !isLoading;
    })
  }

}
