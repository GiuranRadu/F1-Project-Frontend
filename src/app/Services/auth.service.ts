import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private APIUrl = 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  //* Send token by header
  private createHeader(token: any) {
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', 'bearer ' + token)
    }
    return headers
  }

  getAllUsers(token: any): Observable<any> {
    return this.http.get(this.APIUrl + `/users`, { headers: this.createHeader(token) })
  }

  register(user: any): Observable<any> {
    return this.http.post(this.APIUrl + '/register', user)
  }

  login(user: any): Observable<any> {
    return this.http.post(this.APIUrl + '/login', user);
  }

  getCurrentDataOfUser(id: any, token: any): Observable<any> {
    return this.http.get(this.APIUrl + `/users/${id}`, { headers: this.createHeader(token) })
  }

  search(field:any, searchValue:any, token: any): Observable<any> {
    return this.http.get<any>(this.APIUrl + "/users" + `?${field}=${searchValue}`,{ headers: this.createHeader(token) })
  }

  updateCurrentUserData(id: any, body: any, token: any): Observable<any> {
    return this.http.patch(this.APIUrl + `/users/${id}`, body, { headers: this.createHeader(token) })
  }

  forgotPassword(email: any): Observable<any> {
    return this.http.post(this.APIUrl + '/login/forgotPassword', email)
  }

  resetPassword(token: any, user: any): Observable<any> {
    return this.http.patch(this.APIUrl + `/login/resetPassword/${token}`, user)
  }

}
