import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from '../ui/pages/home/signin/signin.component';
import { HomeComponent } from '../ui/pages/home/home.component';
import { LandingComponent } from '../ui/pages/home/landing/landing.component';
import { SignupComponent } from '../ui/pages/home/signup/signup.component';
import { NotyappComponent } from '../ui/pages/app/notyapp.component';
import { DashboardComponent } from '../ui/pages/app/dashboard/dashboard.component';
import { ThanksComponent } from '../ui/pages/home/thanks/thanks.component';
import { canActivateRoute as canActivateDashboardRoute } from '../services/impersonation.service';

const routes: Routes = [
  { path: '', redirectTo: 'home/landing', pathMatch: 'full' },
  { path: 'app', redirectTo: 'app/dashboard', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: 'landing', component: LandingComponent },
      { path: 'signin', component: SigninComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'thanks', component: ThanksComponent }
    ]
  },
  {
    path: "app",
    canActivate: [canActivateDashboardRoute],
    component: NotyappComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
