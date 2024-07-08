import {Component} from "@angular/core";
import {NotificationService} from "../../../services/notification.service";
import {NgIf, NgOptimizedImage} from "@angular/common";


@Component({
  standalone: true,
  selector: "app-alerts",
  imports: [
    NgIf,
    NgOptimizedImage
  ],
  template: `
    <div
      data-aos="slide-down" data-aos-duration="300"
      class="w-[300px] min-h-[15vh] active:scale-[98%] cursor-pointer flex z-50 fixed top-[75px] rounded-lg drop-shadow-xl border p-5 left-0 right-0 m-auto {{title === 'Notification!' ? 'bg-white border-green-200' : 'bg-accent-50'}}"
      *ngIf="show"
    >
      <div class="flex-1 grid gap-2 auto-rows-max">
        <h2 class="text-[18px] font-bold">{{ title }}</h2>
        <p>{{ message }}</p>
      </div>
      <button (click)="hide_alert()" class="w-[20px] h-[20px] active:opacity-70 m-auto">
        <img class="w-[15px]" ngSrc="../../../assets/icons/cancel.svg" alt="" height="37" width="37"/>
      </button>
    </div>
  `
})
export class AlertComponent {
  title: "Notification!" | "Warning!" = "Notification!";
  message: string = "";
  show: boolean = true;

  constructor(private notificationService: NotificationService) {
  }

  ngOnInit() {
    this.notificationService
      .alert.subscribe(({title, message}) => {
      this.title = title
      this.message = message
    })
    this.notificationService
      .show_alert.subscribe(show =>
      this.show = show
    )
  }
  hide_alert(): void {
    this.notificationService.hide_alert()
  }
}

