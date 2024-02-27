import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/Services/auth.service';
import { CircuitsService } from 'src/app/Services/circuits.service';
import { OptionalRoutesService } from 'src/app/Services/optional-routes.service';

@Component({
  selector: 'app-circuit',
  templateUrl: './circuit.component.html',
  styleUrls: ['./circuit.component.css']
})
export class CircuitComponent implements OnInit {


  circuitId:any;
  token: any;
  circuitStats :any;
  circuitInfo :any;


  constructor(private route: ActivatedRoute, private AS: AuthService, private cookies: CookieService ,private ORS: OptionalRoutesService, private CS : CircuitsService, private router: Router) { }


  ngOnInit(): void {
    this.token = this.cookies.get("token");

    this.route.paramMap.subscribe(params => {
      this.circuitId = params.get('id');
    });

    this.getCircuitStats()

    
  }


  getCircuitInfo(){
    console.log();
  }

  getCircuitStats(){
     this.ORS.getCircuitsStats(this.token).subscribe(data => {
      let allCircuitsStats = data['circuitStats'].filter(el => el.circuitName !== null); //!aici am exclus 
      this.circuitStats = allCircuitsStats.find(el => el.circuitId === this.circuitId)
      if (this.circuitStats && this.circuitStats.users) {
        this.circuitStats.users.sort((a, b) => a.completionTime - b.completionTime);
      }
      console.log("STATS",this.circuitStats);
    })

    this.CS.getCircuitById(this.circuitId, this.token).subscribe((data)=>{
      this.circuitInfo = data.circuit
      console.log("INFO",this.circuitInfo);
    })
  }

  test(){
    this.getCircuitStats()
  }

  goToPilot(pilotId:any){
    console.log(pilotId);
    this.router.navigate([`/main/drivers/${pilotId}`]);
  }



}
