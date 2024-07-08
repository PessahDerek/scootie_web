import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";


@Injectable({
  providedIn: "root"
})
export class NotificationService {
  alert = new BehaviorSubject<{title: "Notification!" | "Warning!", message: string}>({
    title: "Notification!",
    message: "",
  })
  show_alert = new BehaviorSubject<boolean>(false)

  constructor() {
  }

  notify(message: string, title:"Notification!"|"Warning!" ="Notification!") {
    this.alert.next({title, message});
    this.show_alert.next(true)
  }
  hide_alert(): void {
    this.show_alert.next(false)
  }


}
