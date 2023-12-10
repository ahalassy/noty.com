/******************************************************************************
 *
 *   Copyright Adam Halassy, Budapest, HUN.
 *   This is an unpublished work. All rights reserved.
 *
 * ---------------------------------------------------------------------------
 *   This source is part of the Noty project
 * 
 *****************************************************************************/

import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './configuration/app-routing.module';
import { UserProxyService } from './services/user-proxy.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './ui/pages/home/signup/signup.component';
import { NgIf, NgFor } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SigninComponent } from './ui/pages/home/signin/signin.component';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { ImpersonationService } from './services/impersonation.service';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgFor,
    NgIf,
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    ImpersonationService,
    JwtHelperService,
    UserProxyService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
