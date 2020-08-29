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
    /* const httpOptions = {
        headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Methods": "DELETE",
        
        "Access-Control-Request-Method": "DELETE",
        "Access-Control-Request-Headers": "X-PINGOTHER, Content-Type",


        "Access-Control-Allow-Headers": "content-type,access-control-allow-origin, access-control-allow-headers, access-control-allow-credentials, access-control-allow-methods"
        
      })   response.Header().Set(, "X-PINGOTHER, Content-Type")
    }; */
    const httpOptions = {headers: new HttpHeaders()}
    httpOptions.headers = httpOptions.headers.set("Access-Control-Allow-Origin", "*")
    httpOptions.headers = httpOptions.headers.set("Access-Control-Allow-Methods", "DELETE")
    //httpOptions.headers = httpOptions.headers.set("Content-Type", "application/json")
    //httpOptions.headers = httpOptions.headers.set("Access-Control-Request-Method", "DELETE")
    //httpOptions.headers = httpOptions.headers.set("Access-Control-Request-Headers", "X-PINGOTHER, Content-Type")
    //httpOptions.headers = httpOptions.headers.set("Access-Control-Allow-Headers", "x-pingother, content-type,access-control-allow-origin, access-control-allow-headers, access-control-allow-credentials, access-control-allow-methods")
    const url = `${this.REST_API_DELETE}/${id}`;
    return this.httpClient.delete(url, httpOptions).pipe(catchError(this.handleError));
  }
}