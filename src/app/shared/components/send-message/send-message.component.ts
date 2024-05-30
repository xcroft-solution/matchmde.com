import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MainService } from '../../services/main.service';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.scss']
})
export class SendMessageComponent implements OnInit {
  contactForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    subject: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    details: new FormControl('', [Validators.required]),
    newsletter: new FormControl(true)
  });
  submitted: boolean = false;

  message: string = '';
  messageType: string = '';
  captchaResolved: any
  captchaResponse: any
  siteKey: string = environment.recaptcha.siteKey;

  constructor(private _service: MainService) { }

  ngOnInit(): void {

  }

  get contactFormControl() {
    return this.contactForm.controls;
  }


  isLoading: boolean = false
  newsLetterSubscription: Subscription = null as any

  submit() {
    this.submitted = true
    if (this.contactForm.valid) {
      this.isLoading = true
      this._service.submitNewsLetter(this.contactForm.value).subscribe({
        next: (response) => {
          if (response) {
            this.contactForm.reset()
            this.submitted = false
            this.isLoading = false;
          }
        },
        error: (err) => {
          this.isLoading = false
          this.submitted = false
        }
      });
    }
  }

  submitForm() {
    this.submitted = true;
    if (this.contactForm.valid) {
      this._service.submitNewsLetter(this.contactForm.value).subscribe({
        next: (response: any) => {
          if (response.status) {
            this.contactForm.reset();
            this.submitted = false;
            this.showMessage('Success', 'alert-success');
          }
          setTimeout(() => {
            this.message = '';
          }, 10000);
        },
        error: (error) => {
          this.submitted = false;
          console.error(error);
        }
      });
    }
  }
  showMessage(message: string, type: string): void {
    this.message = message;
    this.messageType = type;

    setTimeout(() => {
      this.message = '';
    }, 5000); // Message will disappear after 5 seconds
  }

  onCaptchaResolved(captchaResponse: any): void {
    this.captchaResolved = true;
    this.captchaResponse = captchaResponse;
  }


  ngOnDestroy() {
    this.newsLetterSubscription?.unsubscribe()
  }
}
