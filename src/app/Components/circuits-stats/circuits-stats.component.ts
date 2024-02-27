import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { OptionalRoutesService } from 'src/app/Services/optional-routes.service';

@Component({
  selector: 'app-circuits-stats',
  templateUrl: './circuits-stats.component.html',
  styleUrls: ['./circuits-stats.component.css']
})
export class CircuitsStatsComponent implements OnInit {

  loggedUser: any = "";
  circuitsStats: any = [];
  token: any;



  constructor(private cookies: CookieService, private ORS: OptionalRoutesService, private router: Router) { }


  ngOnInit(): void {
    this.token = this.cookies.get("token");
    this.getLoggedUserDetails()
    this.getCircuitStats()
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

  getCircuitStats() {
    this.ORS.getCircuitsStats(this.token).subscribe(data => {
      this.circuitsStats = data['circuitStats'].filter(el => el.circuitName !== null); //!aici am exclus 
      console.log(this.circuitsStats);
    })
  }


  test() {
    console.log(this.loggedUser);
  }


  goToCircuit(circuitId: any) {
    this.router.navigate([`/main/circuitsStats/${circuitId}`]);
  }
}
