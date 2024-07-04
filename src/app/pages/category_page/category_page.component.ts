import {Component} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {ListBikeComponent} from "../../components/list_bike/list_bike.component";
import {PcFilterComponent} from "../../components/pc_filter/pc_filter.component";
import {BikesService} from "../../../services/bike_service/bikes.service";
import {BikeQuery} from "../../../services/bike_service/bike.query";


@Component({
  standalone: true,
  selector: 'category-page',
  imports: [
    HttpClientModule,
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
  complete: boolean = false;

  constructor(private query: BikeQuery, private route: ActivatedRoute, private bikeService: BikesService) {
  }

  ngOnInit() {
    window.scrollTo({top: 0, behavior: "smooth"});
    this.route.params
      .subscribe(params => {
          this.category = params['category']
        }
      )
    this.bikeService.fetch_by_category(this.category, this.page)
      .subscribe({
        next: value => {
          this.total_pages = [...Array(value.total_pages).keys()].map(i => i + 1)
        }
      })
    this.query.bikes_via_category(this.category, this.page)
      .subscribe(data => this.list = this.list.concat(data))

    // this.bikeService.fetchByCategory(this.category)
    //   .subscribe(data => {
    //     const last = this.bikes.at(-1)?.page??0
    //     this.bikes.push({page: last + 1, bikes: data})
    //     this.list = this.bikes.find(b => b.page === this.page)?.bikes??[]
    //   })

  }


}
