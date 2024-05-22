import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataRequestService {

  constructor(private http: HttpClient) { }

  // Define a method to make a POST request
  pradanDataDeleteRequest(data: any): Observable<any> {
    const url = 'https://pradanacademy.com:81/API/Account/login'; // Replace with your API endpoint
    return this.http.post<any>(url, data);
  }

  private apiUrl = 'https://pradanacademy.com:81/API'; // Backend API URL

  sendEmail(to: string, subject: string, body: string) {
    const emailData = { to, subject, body };
    return this.http.post<any>(this.apiUrl, emailData);
  }
}
