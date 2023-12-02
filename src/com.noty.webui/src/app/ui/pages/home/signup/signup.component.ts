import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent implements OnInit {

  submitted: boolean = false;

  signUpForm!: FormGroup;

  model = {
    email: null,
    password: null,
    isTermsAndConditionsAccepted: false,
    isPrivacyPolicyAccepted: false
  };

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

  public onSubmit(): void {
    this.submitted = true;
    console.log(this.model);
  }

}
