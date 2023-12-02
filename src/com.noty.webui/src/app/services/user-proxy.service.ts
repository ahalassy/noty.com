import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProxyBase } from 'src/framework/ProxyBase';
import * as formUtil from "src/framework/FormUtil";

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
    const form = formUtil.objectToForm(request);
    return this.postAsync('user', form, {});
  }

  public singin(request: SignInRequest): Promise<void> {
    const form = formUtil.objectToForm(request);
    return this.postAsync('auth', form, { cookie: 'yes' });
  }
}
