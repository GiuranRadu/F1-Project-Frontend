import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms'
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  emailForm: FormGroup;

  constructor(private AS: AuthService, private router: Router, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.emailForm = new FormGroup({
      email: new FormControl('')
    });
  }

  sendToEmail() {
    console.log(this.emailForm.value);
    let email = this.emailForm.value

    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
      this.AS.forgotPassword(email).subscribe((data) => {
        console.log(data.message);
        

        this.router.navigate(['/login/resetPassword']);

      }, (error) => {
        if (error) {
          console.log(error);          
          this.showError()
        }
      })
    }, 3000)

  }

  showError(){
    Swal.fire({
      title: 'No email found in our DB!',
      text: 'Do you want to try again',
      icon: 'error',
      confirmButtonText: 'Yes'
    })
  }


  showSpinner(time: any) {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, time)
  }

}
