import {Component} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {ListBikeComponent} from "../../components/list_bike/list_bike.component";
import {MobileFilterComponent} from "../../components/filter/filter.component";
import {BikesService} from "../../../services/bikes.service";
import {BikeQuery} from "../../../stores/bikes/bike.query";
import {NgIf} from "@angular/common";
import {FilterService} from "../../../services/filter.service";


@Component({
  standalone: true,
  selector: 'category-page',
  imports: [
    ListBikeComponent,
    MobileFilterComponent,
    NgIf
  ],
  templateUrl: './category_page.component.html',
})

export class CategoryPageComponent {
  category: string = "";
  bikes: Array<{ page: number, bikes: BikeObj[] }> = [];
  page: number = 1;
  list: BikeObj[] = [];
  total_pages: Array<number> = [];
  filtered_list: BikeObj[] = []
  filter_mode = false;

  constructor(private bikeQuery: BikeQuery, private route: ActivatedRoute, private bikeService: BikesService, private filterService: FilterService) {
  }

  ngOnInit() {
    window.scrollTo({top: 0, behavior: "smooth"});
    this.route.params
      .subscribe(params => {
          this.category = params['category']
          this.filterService.category.next(this.category)
        }
      )
    this.bikeService.fetch_by_category(this.category, this.page)
      .subscribe()
    this.bikeQuery.bikes_via_category(this.category, this.page)
      .subscribe(data => {
        this.list = data
      })
    this.filterService.filterMode
      .subscribe(mode => {
        this.filter_mode = mode
      })
    this.filterService.list.subscribe(
      list => this.filtered_list = list.get(this.page) ?? []
    )
  }
}
