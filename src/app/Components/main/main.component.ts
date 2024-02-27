import { Component, ElementRef, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeStyle } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { TeamsService } from 'src/app/Services/teams.service';



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  teams: any = [];
  token: any;
  backgroundImageUrl = '../../../assets/';
  loggedUser: any = "";


  constructor(private router: Router, private TS: TeamsService, private cookies: CookieService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.token = this.cookies.get("token");
    this.getLoggedUserDetails();


    this.TS.getAllTeams(this.token).subscribe((result) => {
      this.teams = result.data.teams;
      // console.log(this.teams);
    }, (error) => {
      console.log("error", error);
    });
  }



  sanitizedBackgroundImageUrl(url: string): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle(`url(${url.replace(/\s/g, '%20')})`);
  }

  sanitizePicturePath(path: string) {
    const filenameArray = path.split('\\'); // Use double backslashes for the path separator
    const filename = filenameArray[filenameArray.length - 1];
    return filename
  }


  goToPilot(id: any) {
    if(this.loggedUser.role === "full"){
      this.router.navigate(['/main/drivers', id]);
    }else{
      console.log('You are not authorized');
    }
  }


  getLoggedUserDetails() { //! return user data from DB from LOGIN moment
    const userDataString = this.cookies.get('loggedUser');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      this.loggedUser = userData;
      // console.log(userData);
    } else {
      console.log('No users logged');
    }
  }


}
