import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from '../ui/pages/home/signin/signin.component';
import { HomeComponent } from '../ui/pages/home/home.component';
import { LandingComponent } from '../ui/pages/home/landing/landing.component';

const routes: Routes = [
  { path: '', redirectTo: 'home/landing', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: 'landing', component: LandingComponent },
      { path: 'signin', component: SigninComponent }
    ]
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
