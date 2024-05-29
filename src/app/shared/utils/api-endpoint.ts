import { environment } from 'src/environments/environment';

export const API_URL: string = environment.api_url;

export const API_ENDPOINTS = {
    nearByCafe: 'nearby_cafe_restaurant',
    captchaVerification: 'captcha-verification',
    submitNewsletter: 'submit_newsletter'
}