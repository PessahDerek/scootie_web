import {Routes} from '@angular/router';
import {LandingComponent} from "./pages/landing_page/landing.component";
import {AboutComponent} from "./pages/about_page/about.component";

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
  {
    path: "view/:category",
    loadComponent: ()=>import('./pages/category_page/category_page.component')
      .then(m => m.CategoryPageComponent),
  },
  {
    path: "view/:category/:id",
    loadComponent: ()=>import('./pages/view_bike_page/view_bike_page.component')
      .then(m => m.BikePageComponent)
  }
];


