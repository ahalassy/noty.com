import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './configuration/app-routing.module';
import { UserProxyService } from './services/user-proxy.service';
import { FormsModule } from '@angular/forms';
import { SignupComponent } from './ui/pages/home/signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    UserProxyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
