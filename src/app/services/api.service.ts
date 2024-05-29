import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  private apiUrl = 'https://uat.matchmde.com/api/v1';

  constructor(private http: HttpClient) { }

  captchaVerification(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/captcha-verification`, data);
  }
  submitForm(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/submit_newsletter`, data);
  }
}
