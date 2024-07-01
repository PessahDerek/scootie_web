import { Routes } from '@angular/router';
import {LandingComponent} from "../pages/landingPage/landing.component";
import {AboutComponent} from "../pages/aboutPage/about.component";

export const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
    pathMatch: "full"
  },
  {
    path: "about",
    component: AboutComponent,
    pathMatch: "full"
  },
];

