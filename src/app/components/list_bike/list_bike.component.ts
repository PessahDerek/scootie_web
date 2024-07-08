import {Component, Input} from "@angular/core";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {defaultBike} from "../../../libs/defaults/default_data";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  standalone: true,
  selector: 'list_bike',
  imports: [
    NgOptimizedImage,
    NgIf
  ],
  template: `
    <div (click)="viewProduct()"
         class="w-full h-full md:inline-block cursor-pointer active:shadow-none hover:shadow-xl hover:-translate-y-[5px] gap-2 bg-white">
      <div class="w-full h-[20vmax] {{loading ? 'animate-pulse':''}}">
        <img (load)="doneLoading()" class="w-full h-full object-center object-contain" fill priority
             [ngSrc]="bike.image1??''"
             [alt]="bike.brand"/>
      </div>
      <div class="flex justify-between p-2 flex-wrap">
        <div class="grid ">
          <span class="text-[16px]">{{ bike.brand }}</span>
          <span class="text-[18px]">{{ bike.model }}</span>
        </div>
        <div>
          <p class="{{bike.discount > 0 ? 'text-[16px] line-through text-accent':'text-[22px]'}}">
            Ksh.{{ bike.price.toLocaleString() }}</p>
          <p *ngIf="bike.discount > 0" class="text-[22px]">Ksh.{{ bike.discount.toLocaleString() }}</p>
        </div>
      </div>
    </div>
  `
})
export class ListBikeComponent {
  @Input() bike: BikeObj = defaultBike;
  @Input() category: string = '';
  loading = true;

  constructor(private router: Router, private url: ActivatedRoute) {
  }

  viewProduct(): void {
    this.router.navigate([`/category/${this.category}/${this.bike.id}`])
      .then(()=>{})
      .catch(_err => {
        // pass
      })
  }
  doneLoading(){
    this.loading = false;
  }

}
