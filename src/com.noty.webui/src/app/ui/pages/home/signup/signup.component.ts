import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserProxyService } from 'src/app/services/user-proxy.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit {

  errorMessage: string | null = null;

  signUpForm!: FormGroup;

  submitting = false;

  model = {
    email: null,
    password: null,
    isTermsAndConditionsAccepted: false,
    isPrivacyPolicyAccepted: false
  };

  public constructor(
    private userProxy: UserProxyService,
    private router: Router
  ) {

  }

  public get email() {
    return this.signUpForm.get('email');
  }

  public get password() {
    return this.signUpForm.get('password');
  }

  public get isTermsAndConditionsAccepted() {
    return this.signUpForm.get('isTermsAndConditionsAccepted');
  }

  public get isPrivacyPolicyAccepted() {
    return this.signUpForm.get('isPrivacyPolicyAccepted');
  }

  public isInvalid(fieldName: string): boolean {
    let field = this.signUpForm.get(fieldName);
    return field?.invalid && (field?.dirty || field?.touched) || false;
  }

  public ngOnInit(): void {
    this.signUpForm = new FormGroup({
      email: new FormControl(this.model.email, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(this.model.password, [
        Validators.required,
        Validators.minLength(4)
      ]),
      isTermsAndConditionsAccepted: new FormControl(
        this.model.isTermsAndConditionsAccepted,
        [
          Validators.requiredTrue
        ]),
      isPrivacyPolicyAccepted: new FormControl(
        this.model.isPrivacyPolicyAccepted,
        [
          Validators.requiredTrue
        ])
    });
  }

  public async onSubmit(): Promise<void> {
    if (this.signUpForm.invalid)
      return;

    this.errorMessage = null;
    try {
      this.submitting = true;
      let response = await this.userProxy.signup({
        email: this.email?.value,
        password: this.password?.value
      });

      this.router.navigate(['/home/thanks'])

    } catch (e) {
      console.error(e);
      this.errorMessage = (<Error>e).message;

    } finally {
      this.submitting = true;

    }
  }
}
