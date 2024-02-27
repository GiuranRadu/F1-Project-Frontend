import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/Services/auth.service';
import { countries } from 'countries-list';
import { FormControl, FormGroup } from '@angular/forms';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-driver-info',
  templateUrl: './driver-info.component.html',
  styleUrls: ['./driver-info.component.css']
})
export class DriverInfoComponent implements OnInit {

  userId: string;
  token: any;
  clickedUser!: any;
  countryList: any[];
  userForm: FormGroup;
  @ViewChild("container2") container2: ElementRef;
  @ViewChild("switchButtonEl") switchButtonEl: ElementRef;


  constructor(private route: ActivatedRoute, private AS: AuthService, private cookies: CookieService, public dialog: MatDialog, private spinner: NgxSpinnerService) { }


  ngOnInit(): void {
    this.token = this.cookies.get("token");

    this.route.paramMap.subscribe(params => {
      this.userId = params.get('id');
    });

    this.userForm = new FormGroup({
      name: new FormControl(''),
      age: new FormControl(''),
      country: new FormControl(''),
      email: new FormControl('')
    })

    this.countryList = this.getCountries();

    this.getClickedUserDetails()

    console.log(this.fromParent1);

  }

  fromParent1: any = 'TEXT1'


  sanitizePicturePath(path: string) {
    if (path) {
      const filenameArray = path.split('\\');
      const filename = filenameArray[filenameArray.length - 1];
      return filename;
    } else {
      console.log('No problem');
      return 'default/path.jpg'
    }
  }

  getClickedUserDetails() {
    this.AS.getCurrentDataOfUser(this.userId, this.token).subscribe((data) => {
      this.clickedUser = data.data.user
      this.fromParent1 = data.data.user
      console.log(this.fromParent1);
    })
    return this.clickedUser
  }

 


  test() {
    console.log(this.userForm.value);
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

  updateUser() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Confirmation',
        message: `Are you sure you want to update User? `
      }
    });

    dialogRef.afterClosed().subscribe(confirmation => {
      if (confirmation) {
        this.showSpinner(1500)
        this.AS.updateCurrentUserData(this.userId, this.userForm.value, this.token).subscribe((response) => {
          console.log('User Updated', response);
          this.getClickedUserDetails();
          this.userForm.reset()
          
        }, (error) => {
          alert(error.error.message)
          console.log(error.error.message);
        })
      } else {
        console.log('Nothing happened');
        this.userForm.reset()
      }
    })
  }


  switch: boolean = false;
  switchButton() {
    this.switch = !this.switch;
    if (this.switch) {
      this.container2.nativeElement.classList.remove("hidden");
      this.switchButtonEl.nativeElement.innerHTML = "Hide Circuit Component"
      this.switch = true
    } else {
      this.container2.nativeElement.classList.add("hidden");
      this.switchButtonEl.nativeElement.innerHTML = "Show Circuit Component"
    }
  }

  showSpinner(time:any) {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();   
    }, time)  
  }


}
