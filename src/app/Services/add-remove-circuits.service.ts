import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddRemoveCircuitsService {

  private APIUrl = 'http://localhost:3000/users'


  constructor(private http: HttpClient) { }

  //* Send token by header
  private createHeader(token: any) {
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', 'bearer ' + token)
    }
    return headers
  }


  addCircuitToArray(id: any, body: any, token: any): Observable<any> {
    return this.http.post(this.APIUrl + `/addCircuits/${id}`, body, { headers: this.createHeader(token) })
  }

  removeCircuitFromArray(id: any, body: any, token: any): Observable<any> {
    const options = {
      headers: this.createHeader(token),
      body: body // Pass the request body directly here
    };
  
    return this.http.delete(this.APIUrl + `/removeCircuits/${id}`, options);
  }

}
