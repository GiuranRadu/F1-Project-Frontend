import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OptionalRoutesService {

  constructor(private http: HttpClient) { }

  private APIUrl = 'http://localhost:3000/optional'


  //* Send token by header
  private createHeader(token: any) {
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', 'bearer ' + token)
    }
    return headers
  }


  getPilotStats(token: any) {
    return this.http.get(this.APIUrl + `/pilotStats`, { headers: this.createHeader(token) })
  }

  getCircuitsStats(token: any) {
    return this.http.get(this.APIUrl + `/circuitsStats`, { headers: this.createHeader(token) })
  }

 

}
