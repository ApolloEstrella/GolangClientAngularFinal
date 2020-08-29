import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";


import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private REST_API_GET = "http://localhost:12345/api/people";

  private REST_API_POST = "http://localhost:12345/api/person";

  private REST_API_DELETE = "http://localhost:12345/api/delete";

  private REST_API_UPDATE = "http://localhost:12345/api/update";

  constructor(private httpClient: HttpClient) { }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    //window.alert(errorMessage);
    console.log(errorMessage)
    return throwError(errorMessage);
  }

  public sendGetRequest() {
    return this.httpClient.get(this.REST_API_GET).pipe(catchError(this.handleError));
  }

  public sendPostRequest(body) {
    return this.httpClient.post(this.REST_API_POST, body).pipe(catchError(this.handleError));
  }

  public sendDeleteRequest(id) {
    const httpOptions = { headers: new HttpHeaders() }
    httpOptions.headers = httpOptions.headers.set("Access-Control-Allow-Origin", "*")
    httpOptions.headers = httpOptions.headers.set("Access-Control-Allow-Methods", "DELETE")
    const url = `${this.REST_API_DELETE}/${id}`;
    return this.httpClient.delete(url, httpOptions).pipe(catchError(this.handleError));
  }

  public sendUpdateRequest(body, id) {
    const httpOptions = { headers: new HttpHeaders() }
    httpOptions.headers = httpOptions.headers.set("Access-Control-Allow-Origin", "*")
    httpOptions.headers = httpOptions.headers.set("Access-Control-Allow-Methods", "DELETE")
    const url = `${this.REST_API_UPDATE}/${id}`;
    return this.httpClient.put(url, body).pipe(catchError(this.handleError));
  }
}