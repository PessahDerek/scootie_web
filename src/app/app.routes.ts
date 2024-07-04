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
    path: "category/:category/:id",
    loadComponent: ()=>import('./pages/bike_page/bike_page.component')
      .then(m => m.BikePageComponent)
  }
];


