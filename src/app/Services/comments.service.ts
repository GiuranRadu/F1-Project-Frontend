import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {



  private APIUrl = 'http://localhost:3000/comments'

  constructor(private http: HttpClient) { }

  //* Send token by header
  private createHeader(token: any) {
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', 'bearer ' + token)
    }
    return headers
  }

  createComment(userId: any, comment: any, token: any) {
    return this.http.post(this.APIUrl + `/${userId}`, comment, { headers: this.createHeader(token) });
  }

  getMyComments(userId: any, token: any) {
    return this.http.get(this.APIUrl + `/getAllComments/${userId}`, { headers: this.createHeader(token) })
  }

  deleteComment(commentId: any, token: any) {
    return this.http.delete(this.APIUrl + `/${commentId}`, { headers: this.createHeader(token) })
  }

  editComment(commentId: any, body: any, token: any) {
    return this.http.patch(this.APIUrl + `/${commentId}`, body, { headers: this.createHeader(token) })
  }

  getAllCommentsIfAdmin(token: any) {
    return this.http.get(this.APIUrl + `/getAllComments`, { headers: this.createHeader(token)})
  }


}
