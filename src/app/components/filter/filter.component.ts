import {Component} from "@angular/core";
import {TextInputComponent} from "../text_input/text_input.component";
import {FormArray, FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {NgForOf} from "@angular/common";
import {ApiService} from "../../../services/api.service";
import {PcFilterComponent} from "../pcfilter/pc.component";
import {MobileFilterComponent} from "../mobilefilter/mobile.component";


@Component({
  standalone: true,
  selector: 'app-pcFilter',
  imports: [
    TextInputComponent,
    ReactiveFormsModule,
    NgForOf,
    PcFilterComponent,
    MobileFilterComponent,
  ],
  template: `
<!--    <app-pc-filter class="hidden md:block" [brands]="brands" [filters]="filters" />-->
<!--    <app-mobile-filter class="block md:hidden" [brands]="brands" [filters]="filters" />-->
  `
})
export class FilterComponent {
  category: string = ""
  brands: string[] = []
  filters = new FormGroup({
    max: new FormControl(0),
    min: new FormControl(0),
    lowToHigh: new FormControl(true),
    brands: new FormArray([new FormControl("")])
  })

  constructor(private api: ApiService, private route: ActivatedRoute) {
  }

  ngOnInit(){
    // set category
    this.route.params.subscribe(par => {
      this.category = par['category']
    })
    // set brands
    this.api.get<BikeObj[]>(`/bikes/by-category/?category=${this.category}`)
      .subscribe(data => {
        this.brands = [...new Set(data.map(b => b.brand))]; // Remove duplicates
        this.filters.setValue({...this.filters.getRawValue(),
          brands: [...this.brands.map(brand => brand)]})
      })

    this.filters.get('min')?.valueChanges.subscribe(value => {
      const max = this.filters.get('max')?.value
      if((max && value) && value > max){
        this.filters.setValue({...this.filters.getRawValue(), max: value})
      }
    })
    this.filters.get('max')?.valueChanges.subscribe(value => {
      const min = this.filters.get('min')?.value
      if((min && value) && value < min)
        this.filters.setValue({...this.filters.getRawValue(), min: value})
    })
    this.filters.get('brands')?.valueChanges.subscribe(data => {

    })
  }
}
