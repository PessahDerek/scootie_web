import {Component} from "@angular/core";
import {TextInputComponent} from "../text_input/text_input.component";
import {FormArray, FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {NgForOf} from "@angular/common";
import {ApiService} from "../../../services/api.service";


@Component({
  standalone: true,
  selector: 'app-pcFilter',
  imports: [
    TextInputComponent,
    ReactiveFormsModule,
    NgForOf
  ],
  template: `
    <form [formGroup]="filters" class="w-[200px] h-full hidden md:grid gap-4 auto-rows-max">
      <input placeholder="Search" class="light-input"/>
      <div class="hor-line"></div>
      <p>Price</p>
      <input formControlName="max" type="number" placeholder="Max price" class="light-input"/>
      <input formControlName="min" type="number" placeholder="Min price" class="light-input"/>
      <div class="grid gap-2">
        <span class="flex gap-2">
          <input
            formControlName="lowToHigh" value="true" class="w-[20px] h-[20px] text-accent" type="radio"
          />
          <label>Low to high</label>
        </span>
        <span class="flex gap-2">
          <input
            formControlName="lowToHigh" value="false" class="w-[20px] h-[20px]" type="radio"
          />
          <label>High to low</label>
        </span>
      </div>
      <div class="hor-line"></div>
      <div class="grid gap-2">
        <p>Brands</p>
        <div formArrayName="brands">
          <div *ngFor="let brand of brands; index as i">
            <span class="flex gap-2">
              <input class="w-[20px] h-[20px] rounded-full " type="checkbox" [formControlName]="i">
              <label for="brands">{{ brand }}</label>
            </span>
          </div>
        </div>
      </div>
      <div class="w-full flex gap-2">
        <button class="pri-btn-ac flex-1">
          Save
        </button>
        <button class="flex-1 outline-acc">
          Reset
        </button>
      </div>
    </form>
  `
})
export class PcFilterComponent {
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
      console.log("Data: ", data)
    })
  }
}
