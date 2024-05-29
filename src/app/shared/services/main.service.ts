import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ENDPOINTS, API_URL } from '../utils/api-endpoint';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private http: HttpClient) { }

  submitNewsLetter(payload: any) {
    return this.http.post(API_URL + API_ENDPOINTS.submitNewsletter, payload)
  }
  verifyCaptcha(data: any) {
    return this.http.post(API_URL + API_ENDPOINTS.captchaVerification, data)
  }
  nearByCafe() {
    return this.http.get(API_URL + API_ENDPOINTS.nearByCafe)
  }
}
