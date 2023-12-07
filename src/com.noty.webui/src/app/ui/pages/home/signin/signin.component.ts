import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserProxyService } from 'src/app/services/user-proxy.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html'
})
export class SigninComponent implements OnInit {

  errorMessage: string | null = null;

  signInForm!: FormGroup;

  submitting = false;

  model = {
    email: null,
    password: null
  };

  public constructor(
    private userProxy: UserProxyService,
    private router: Router
  ) {

  }

  public get email() {
    return this.signInForm.get('email');
  }

  public get password() {
    return this.signInForm.get('password');
  }

  public isInvalid(fieldName: string): boolean {
    let field = this.signInForm.get(fieldName);
    return field?.invalid && (field?.dirty || field?.touched) || false;
  }

  public ngOnInit(): void {
    this.signInForm = new FormGroup({
      email: new FormControl(this.model.email, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(this.model.password, [
        Validators.required,
        Validators.minLength(4)
      ])
    });
  }

  public async onSubmit(): Promise<void> {
    if (this.signInForm.invalid)
      return;

    this.errorMessage = null;
    try {
      this.submitting = true;
      let response = await this.userProxy.singin({
        email: this.email?.value,
        password: this.password?.value
      });

      this.router.navigate(['/app/dashboard'])

    } catch (e) {
      console.error(e);
      this.errorMessage = (<Error>e).message;

    } finally {
      this.submitting = true;

    }
  }
}
