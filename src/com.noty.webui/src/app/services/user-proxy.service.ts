import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProxyBase } from 'src/framework/ProxyBase';

@Injectable({
  providedIn: 'root'
})
export class UserProxyService extends ProxyBase {

  constructor(
    http: HttpClient
  ) {
    super(http);
  }

  public signup(request: SignInRequest): Promise<SignUpResponse> {
    return this.postAsync('user', request);
  }

  public singin(request: Sing) {
    return this.postAsync('auth', request, { cookie: 'yes' });
  }
}
