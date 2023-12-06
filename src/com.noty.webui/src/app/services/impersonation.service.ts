import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

import * as CookieUtil from 'src/framework/CookieUtil';

@Injectable({
  providedIn: 'root'
})
export class ImpersonationService {

  constructor(
    private jwtHelper: JwtHelperService
  ) { }

  public isAuthenticated(): boolean {
    let token = CookieUtil.getCookie('noty.debug.session');
    return token
      ? !this.jwtHelper.isTokenExpired(token)
      : false;

  }
}

export const canActivateRoute: CanActivateFn =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const router = inject(Router);    
    const hasPermission = inject(ImpersonationService).isAuthenticated()

    if (!hasPermission) {
      router.navigate(["/home/signin"]);
      return false;
    }

    return true;
  };
