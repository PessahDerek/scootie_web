import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";
import {Router} from "@angular/router";
import {BikeQuery} from "../stores/bikes/bike.query";
import {BehaviorSubject} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class FilterService {
  category = new BehaviorSubject<string>("")
  brands = new BehaviorSubject<string[]>([])
  filters = new BehaviorSubject<FilterObj>({
    max: 0,
    min: 0,
    lowToHigh: undefined,
    brands: []
  })
  page = new BehaviorSubject<number>(1)
  list = new BehaviorSubject<Map<number, BikeObj[]>>(new Map().set(1, []))
  filterMode = new BehaviorSubject<boolean>(false)

  constructor(private api: ApiService, private bikeQuery: BikeQuery, private router: Router) {
    // this.category = this.router.url.replace('/view/', "")
    // set brands
    this.bikeQuery.categories
      .subscribe(data => {
        const find = data.find(f => f.category === this.category.value)
        if (find) {
          const brands = find.bikes.map(f => f.brand)
          this.brands.next(brands)
        }
      })
  }

  // TODO: remember to call this when category_page unmounts
  clear_list() {
    this.list.value.clear()
    this.filterMode.next(false)
  }

  edit_filter(field: string, value: boolean | string | string[]) {
    if (field === 'lowToHigh' && typeof value === "string")
      value = value.toLowerCase() === 'true'
    this.filters.next({...this.filters.value, [field]: value})
  }

  set_page(page: number = 1) {
    this.page.next(page)
  }

  applyFilters(callback?: () => any) {
    const filter = this.filters.getValue()
    const user_wants: { [key: string]: boolean | number | string[] } = {}
    if (!Number.isNaN(Number(filter.max)) && Number(filter.max) > 0) {
      user_wants["max"] = Number(filter.max)
    }
    if (!Number.isNaN(Number(filter.min)) && Number(filter.min) > 0) {
      user_wants["min"] = Number(filter.min)
    }
    if (filter.brands.length > 0) {
      user_wants['brands'] = filter.brands
    }
    if (filter.lowToHigh !== undefined) {
      user_wants['lowToHigh'] = filter.lowToHigh // === 'true' ? true : false
    }
    // create new pages of 20 each
    // let holdBikes: CategoryObj = {category: this.category, bikes: []}
    let holdBikes: BikeObj[] = []
    // this.bikeQuery.categories
    this.bikeQuery.bikes_via_category(this.category.value, this.page.value)
      .subscribe(foundBikes => {
        for (const bike of foundBikes) {
          const price = parseFloat(bike.discount.toString()) > 0 ? parseFloat(bike.discount.toString()) : Number(bike.price)
          for (const key of Object.keys(user_wants)) {
            console.log("key: ", key, " _ ", user_wants)
            if (key === 'max' && (price > (user_wants[key] as number))) {
              // price is higher than maximum
              // console.log('breaks at max')
              break
            }
            if (key === 'min' && (price < (user_wants[key] as number))) {
              // price is less than minimum
              // console.log('breaks at min')
              break
            }
            if (key === 'brands' && !(user_wants[key] as string[]).includes(bike.brand)) {
              // is not of the required brand
              // console.log('breaks at brands')
              break
            }
            // console.log("Pushing: ", bike)
            holdBikes.push(bike)
          }
        }
        if ('lowToHigh' in user_wants) {
          holdBikes = holdBikes.sort(
            user_wants['lowToHigh'] === true
              ? (a, b) => Number(a.price) - Number(b.price)
              : (a, b) => Number(b.price) - Number(a.price)
          )
        }
        const max_page = ((holdBikes.length / 20) < 1 ? 1 : (holdBikes.length / 20))
        for (let i = 1; i <= max_page; i++) {
          const val = this.list.value.set(1, [...holdBikes.slice((i * 20) - 20, ((i * 20) - 20) + 20)])
          this.list.next(new Map(val))
        }
        this.filterMode.next(true)
        if (callback)
          callback()
      })
      .unsubscribe()
  }
}
