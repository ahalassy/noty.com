import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

import * as CookieUtil from 'src/framework/CookieUtil';
import { UserProxyService } from './user-proxy.service';

@Injectable({
  providedIn: 'root'
})
export class ImpersonationService {

  constructor(
    private jwtHelper: JwtHelperService,
    private proxy: UserProxyService
  ) { }

  public isAuthenticated(): boolean {
    let token = CookieUtil.getCookie('noty.debug.session');
    return token
      ? !this.jwtHelper.isTokenExpired(token)
      : false;

  }

  public release(): Promise<void> {
    return this.proxy.signOut();
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
