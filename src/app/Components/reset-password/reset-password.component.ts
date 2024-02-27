import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  resetForm: FormGroup;

  tokenForm: FormGroup;

  token6Digits: any;

  @ViewChildren('tokenInput') tokenInputs: QueryList<ElementRef>;


  constructor(private AS: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.tokenForm = new FormGroup({
      digit1: new FormControl(''),
      digit2: new FormControl(''),
      digit3: new FormControl(''),
      digit4: new FormControl(''),
      digit5: new FormControl(''),
      digit6: new FormControl(''),
    })

    this.resetForm = new FormGroup({
      password: new FormControl(''),
      confirmPassword: new FormControl('')
    });

  }

  resetPassword() {
    const orderedValues = Object.values(this.tokenForm.value);
    this.token6Digits = orderedValues.join('');

    let user = { ...this.resetForm.value, token: this.token6Digits };
    console.log(user);
    this.AS.resetPassword(user.token, user).subscribe((data) => {         
      this.showSuccess()
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2000);
    }, (error) => {
      if (error) {       
        this.showError()
      }
    })
  }

  onDigitInput(index: number): void {
    const value = this.tokenForm.controls[`digit${index + 1}`].value.toString();
    const nextIndex = index + 1;

    if (nextIndex < this.tokenInputs.length && value.length === 1) {
      this.tokenInputs.toArray()[nextIndex].nativeElement.focus();
    }
  }  

  showError(){
    Swal.fire({
      title: 'Some Error occured!',
      text: 'Please try again carefully!',
      icon: 'error',
      confirmButtonText: 'Yes'
    })
  }

  showSuccess(){
    Swal.fire({
      title: "Good job!",
      text: "You changed the password successfully",      
      icon: "success"
    });
  }

}
