import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavbarComponent} from "../components/navbar/navbar.component";
import Aos from "aos";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'Fat-Bikes Kenya';

  ngOnInit(){
    Aos.init()
  }
}
