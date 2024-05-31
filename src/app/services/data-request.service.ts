import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataRequestService {

  constructor(private http: HttpClient) { }
  private apiUrl = 'https://pradanacademy.com:81/API';

  // Define a method to make a POST request
  // pradanDataDeleteRequest(data: any): Observable<any> {
  //   const url = 'https://pradanacademy.com:81/API/Account/login'; // Replace with your API endpoint
  //   return this.http.post<any>(url, data);
  // }


 public pradanDataDeleteRequest(data: any): Observable<any> {
    const url = `${this.apiUrl}/Account/login`;
    return this.http.post<any>(url, data).pipe(
      catchError(this.handleError)
    );
  }

 public sendEmail(to: string, subject: string, body: string): Observable<any> {
    const emailData = { to, subject, body };
    return this.http.post<any>(this.apiUrl, emailData).pipe(
      catchError(this.handleError)
    );
  }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`
      );
    }
    return throwError('Something went wrong; please try again later.');
  }
}
