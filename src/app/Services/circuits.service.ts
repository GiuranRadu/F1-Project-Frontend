import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CircuitsService {

  private APIUrl = 'http://localhost:3000/circuits'


  constructor(private http: HttpClient) { }

  //* Send token by header
  private createHeader(token: any) {
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', 'bearer ' + token)
    }
    return headers
  }


  getAllCircuits(token: any): Observable<any> {
    return this.http.get(this.APIUrl, { headers: this.createHeader(token) })
  }

  createCircuit(circuit: any, token: any): Observable<any> {
    return this.http.post(this.APIUrl, circuit, { headers: this.createHeader(token) })
  }

  deleteCircuit(id: any, token: any): Observable<any> {
    return this.http.delete(this.APIUrl + `/${id}`, { headers: this.createHeader(token) })
  }

  updateCircuit(id: any, updatedCircuit: any, token: any): Observable<any> {
    return this.http.patch(this.APIUrl + `/${id}`, updatedCircuit, { headers: this.createHeader(token) })
  }

  getCircuitById(id: any, token: any): Observable<any> {
    return this.http.get(this.APIUrl + `/${id}`, { headers: this.createHeader(token) })
  }




  //! ----------  NOT IMPLEMENTED YET  ----------
  search(field: any, searchValue: any, token: any) {
    return this.http.get<any>(this.APIUrl + `?${field}=${searchValue}`, { headers: this.createHeader(token) })
  }


}