import {Component, OnInit} from "@angular/core";
import {BikeQuery} from "../../../services/bike_service/bike.query";
import {ActivatedRoute} from "@angular/router";
import {NgIf, NgOptimizedImage} from "@angular/common";


@Component({
  standalone: true,
  selector: 'app-bike-page',
  templateUrl: './bike_page.component.html',
  imports: [
    NgIf,
    NgOptimizedImage
  ]
})
export class BikePageComponent {
  id: number = 0;
  bike?: BikeObj;
  constructor(private query: BikeQuery, private router: ActivatedRoute) {}

  ngOnInit(): void {
    this.router.params.subscribe(params => {
      this.id = params["id"];
    })
    this.query.bike_via_id(this.id)
      .subscribe({
        next: bike => {
          console.log("Found...:", bike)
          this.bike = bike[0] || bike[1]
        },
        error: err => {
        }
      })
  }
}
