import {Component, Pipe, PipeTransform} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NavbarComponent} from "./components/navbar/navbar.component";
import Aos from "aos";
import {DomSanitizer} from "@angular/platform-browser";
import {FooterComponent} from "./components/footer/footer.component";

@Pipe({
  name: 'safe',
  standalone: true,
})
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {
  }

  transform(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'Fat-Bikes Kenya';

  ngOnInit() {
    Aos.init({
      duration: 700
    })
  }
}
