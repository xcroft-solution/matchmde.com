import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  private apiUrl = environment.api_url

  constructor(private http: HttpClient) { }

  captchaVerification(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/captcha-verification`, data);
  }
  submitForm(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/submit_newsletter`, data);
  }
}
