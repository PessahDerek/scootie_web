import {Component} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {ListBikeComponent} from "../../components/list_bike/list_bike.component";
import {PcFilterComponent} from "../../components/pc_filter/pc_filter.component";
import {BikesService} from "../../../services/bikes.service";
import {BikeQuery} from "../../../stores/bikes/bike.query";


@Component({
  standalone: true,
  selector: 'category-page',
  imports: [
    ListBikeComponent,
    PcFilterComponent
  ],
  templateUrl: './category_page.component.html',
})

export class CategoryPageComponent {
  category: string = "";
  bikes: Array<{ page: number, bikes: BikeObj[] }> = [];
  page: number = 1;
  list: BikeObj[] = [];
  total_pages: Array<number> = [];

  constructor(private bikeQuery: BikeQuery, private route: ActivatedRoute, private bikeService: BikesService) {
  }

  ngOnInit() {
    window.scrollTo({top: 0, behavior: "smooth"});
    this.route.params
      .subscribe(params => {
          this.category = params['category']
        }
      )
    this.bikeService.fetch_by_category(this.category, this.page)
      .subscribe()
    this.bikeQuery.bikes_via_category(this.category, this.page)
      .subscribe(data => this.list = data)
  }


}
