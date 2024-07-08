import {Component, Input} from "@angular/core";
import {FormArray, FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";


@Component({
  standalone: true,
  selector: 'app-pc-filter',
  imports: [
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
  @Input() brands: string[] = []
  filters = new FormGroup({
    max: new FormControl(0),
    min: new FormControl(0),
    lowToHigh: new FormControl(true),
    brands: new FormArray([new FormControl("")])
  })
}
