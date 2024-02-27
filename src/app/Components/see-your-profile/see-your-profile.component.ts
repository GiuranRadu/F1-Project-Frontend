import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/Services/auth.service';
import { countries } from 'countries-list';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-see-your-profile',
  templateUrl: './see-your-profile.component.html',
  styleUrls: ['./see-your-profile.component.css']
})
export class SeeYourProfileComponent implements OnInit {

  token: any;
  loggedUserId: any
  loggedUser: any
  circuitsAttended: any[];
  userForm: FormGroup;
  countryList: any[];


  constructor(private cookies: CookieService, private AS: AuthService, private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.token = this.cookies.get("token");
    this.getLoggedUserDetails();

    this.AS.getCurrentDataOfUser(this.loggedUserId, this.token).subscribe((result) => {      
      this.loggedUser = result.data.user;
      this.circuitsAttended = result.data.user.circuits     
    })

    this.userForm = new FormGroup({
      name: new FormControl(''),
      age: new FormControl(''),
      country: new FormControl(''),
      email: new FormControl(''),
      picture: new FormControl('')
    })

    this.countryList = this.getCountries();
  }


  getCountries(): any[] {
    const countriesArray = [];
    for (const code in countries) {
      if (countries.hasOwnProperty(code)) {
        countriesArray.push({ code, name: countries[code].name });
      }
    }
    return countriesArray;
  }


  getLoggedUserDetails() { //! return user data from DB from LOGIN moment
    const userDataString = this.cookies.get('loggedUser');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      this.loggedUserId = userData._id;
      // console.log(userData);
    } else {
      console.log('No users logged');
    }
  }


  sanitizePicturePath(path: string) {
    const filenameArray = path.split('\\'); // Use double backslashes for the path separator
    const filename = filenameArray[filenameArray.length - 1];
    return filename
  }


  picture: File | undefined;
  getFile(event: any) {
    console.log(event.target.files);
    if (event.target.files && event.target.files.length > 0) {
      console.log(event.target.files);
      this.picture = event.target.files[0];
    }
  } 


  updateUser() {
    console.log(this.userForm.value);
    const formValues = this.userForm.value;
    const formData = new FormData();

    for (const key in formValues) {
      if (formValues.hasOwnProperty(key)) {
        formData.append(key, formValues[key]);
      }
    }

    if (this.picture) {
      formData.append("picture", this.picture, this.picture.name)
    }

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Confirmation',
        message: `Do you want to update? `
      }
    });

    dialogRef.afterClosed().subscribe(confirmation => {
      if(confirmation){
        this.AS.updateCurrentUserData(this.loggedUserId ,formData, this.token).subscribe((response) => {
          console.log('User Updated', response);
          location.reload();
          //! HERE I NEED TO ADD A SPINNER FOR 2s     
        }, (error) => {
          alert(error.error.message)
          console.log(error.error.message);
        })  
      }
    })
  }


  switch:boolean = false
  @ViewChild("changePasswordButton") changePasswordButton : ElementRef
  wannaChangePassword(){
    this.switch = !this.switch;
    if(this.switch){
      this.changePasswordButton.nativeElement.innerHTML = "Cancel"
    }else{
      this.changePasswordButton.nativeElement.innerHTML = "Wanna Change Password?"
    }
  }


  cancel(){
    this.switch = false;
  } 


  resetForm() {
    this.userForm.reset()
  }


  wannaChangeCircuits(){
    this.router.navigate(['/main/selectCircuits']);
  }


}
