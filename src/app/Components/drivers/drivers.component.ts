import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/Services/auth.service';
import { OptionalRoutesService } from 'src/app/Services/optional-routes.service';

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.css']
})
export class DriversComponent implements OnInit {

  loggedUser: any = "";
  allUsers: any = [];
  token: any;
  pilotStats: any = [];
  searchText:any;
  searchForm: FormGroup;



  constructor(private AS: AuthService, private cookies: CookieService, private ORS: OptionalRoutesService, private router: Router) { }


  ngOnInit(): void {
    this.token = this.cookies.get("token");
    this.getLoggedUserDetails();
    this.getAllUsers()
    this.getPilotStats()

    this.searchForm = new FormGroup({
      searchInput: new FormControl('')
    })

  }

  getAllUsers() {
    this.AS.getAllUsers(this.token).subscribe((result) => {
      const loggedUserId = this.loggedUser._id;

      //! Use filter to exclude the loggedUser from the allUsers array
      this.allUsers = result.data.users.filter(user => user._id !== loggedUserId);
    });
  }


  getPilotStats() {
    this.ORS.getPilotStats(this.token).subscribe((result) => {
      this.pilotStats = result['pilotStats']
    })
  }

  getLoggedUserDetails() { //! return user data from DB from LOGIN moment
    const userDataString = this.cookies.get('loggedUser');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      this.loggedUser = userData;
    } else {
      console.log('No users logged');
    }
  }
  
  goToPilot(id: any) {
    console.log(id);
    this.router.navigate([`/main/drivers/${id}`]);
  }
    
  
  onKeyUp() {    
    this.searchText = this.searchForm.value.searchInput;
  }

  clear(){
    this.searchText = '';
    this.searchForm.reset();
  }
  
  test() {      
  }

}
