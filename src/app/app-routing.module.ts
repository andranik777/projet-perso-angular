import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {DetailsGameComponent} from "./details-game/details-game.component";

const routes: Routes = [
  {path:"",component:HomeComponent},
  {
    path: 'game/:page:search:ordering',
    component: HomeComponent,
  },
  {
    path: 'game/:page:ordering',
    component: HomeComponent,
  },{
  path:'details/:id',
    component: DetailsGameComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
