import {Component} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FilterService} from "../../../services/filter.service";
import {NgForOf, NgIf} from "@angular/common";


@Component({
  standalone: true,
  selector: 'app-mobile-filter',
  imports: [
    NgIf,
    FormsModule,
    NgForOf,
    ReactiveFormsModule
  ],
  template: `
    <form class="w-full h-[60px] bg-primary-400 grid md:hidden sticky top-[70px] z-40">
      <span class="w-full h-full flex p-2 gap-2 m-auto {{dropdown ? '' : 'rounded-b-xl shadow-md'}}">
        <input placeholder="Search" class="light-input m-auto">
        <button (click)="toggleDrop()" class="acc-btn-lt m-auto">
          Filters
        </button>
      </span>
      <div data-aos="fade-up" class="w-full sticky grid rounded-b-xl gap-2 p-2 top-[140px] bg-white shadow-xl z-40"
           *ngIf="dropdown"
      >
        <p>Price</p>
        <input (input)="edit_field($event)" [value]="filter.max" name="max" type="number" placeholder="Max price"
               class="light-input"/>
        <input (input)="edit_field($event)" [value]="filter.min" name="min" type="number" placeholder="Min price"
               class="light-input"/>
        <div class="grid gap-2">
          <span class="flex gap-2">
            <input
              name="lowToHigh" value="true"
              class="w-[20px] h-[20px]" type="radio" (input)="edit_field($event)"
            />
            <label>Low to high</label>
          </span>
          <span class="flex gap-2">
            <input
              name="lowToHigh" value="false"
              class="w-[20px] h-[20px]" type="radio" (input)="edit_field($event)"
            />
            <label>High to low</label>
          </span>
        </div>
        <div class="hor-line"></div>
        <div class="grid gap-2">
          <p>Brands</p>
          <div>
            <div *ngFor="let brand of brands; index as i">
              <span class="flex gap-2">
                <input
                  [name]="'brand.'+brand"
                  class="w-[20px] h-[20px] rounded-full "
                  (click)="edit_field($event)" [value]="filter.brands.includes(brand)"
                  [defaultChecked]="false"
                  type="checkbox"
                />
                <label for="brands">{{ brand }}</label>
              </span>
            </div>
          </div>
        </div>
        <div class="w-full flex gap-2">
          <button (click)="apply_filters()" type="button" class="pri-btn-ac flex-1">
            Save
          </button>
          <button (click)="cancel_filter()" type="button" class="flex-1 outline-acc">
            Reset
          </button>
        </div>
      </div>
    </form>
  `
})
export class MobileFilterComponent {
  brands: string[] = []
  dropdown: boolean = true; // TODO: default to false
  filter: FilterObj = {
    max: 0,
    min: 0,
    lowToHigh: undefined,
    brands: []
  }

  constructor(private filterService: FilterService) {
  }

  apply_filters() {
    // TODO: complete
    this.filterService.applyFilters()
  }

  ngOnInit(): void {
    this.filterService.brands
      .subscribe(brands => {
        this.brands = [...brands];
      })
    this.filterService.filters
      .subscribe(value => this.filter = value)
  }

  edit_field(e: Event) {
    const target = e.target as HTMLInputElement;
    if (target.name.includes('brand')) {
      const brands = target.checked
        ? this.filter.brands.concat([target.name.replace('brand.', '')])
        : this.filter.brands.filter(f => f !== target.name.replace('brand.', ''))
      this.filterService.edit_filter('brands', brands)
    } else this.filterService.edit_filter(target.name, target.value)
  }
  cancel_filter(){
    this.filterService.clear_list()
  }
  toggleDrop() {
    this.dropdown = !this.dropdown;
  }
}
