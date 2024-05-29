import { Component, ElementRef, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OwlOptions } from 'ngx-owl-carousel-o';
import * as AOS from 'aos';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  active = 1;
  valueToAnimate: number = 0;
  valueToAnimate2: number = 0;
  sendMessageForm!: FormGroup;
  isSubmitted: boolean = false;
  message: string = '';
  messageType:string = '';
  captchaResolved: any
  captchaResponse: any
  siteKey: string = environment.recaptcha.siteKey;

  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    mouseDrag: true,
    touchDrag: true,
    margin: 45,
    center: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    nav: true,
    navText: [
      '<i class="fa-solid fa-chevron-left"></i>',
      '<i class="fa-solid fa-chevron-right"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      740: {
        items: 2,
      },
      1100: {
        items: 4,
      },
    },
  };

  constructor(
    private modalService: NgbModal,
    private elementRef: ElementRef,
    private _fb: FormBuilder,
    private apiService: ApiService,
  ) { }

  ngOnInit() {
    this.activeRoute.fragment.subscribe(fragment => {
      if(fragment){
        this.scrollToSection(fragment);
      }
    });
    AOS.init();
    this.initForm();
  }
  initForm() {
    this.sendMessageForm = this._fb.group({
      name: ['', Validators.required],
      subject: ['', Validators.required],
      // email: ['', Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i)],
      email: ['', Validators.required],
      details: ['', Validators.required]
    });
  }
  get frmCtrl() {
    return this.sendMessageForm.controls;
  }

  ngAfterViewInit() {
    AOS.refresh();

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.sectionInView();
          observer.disconnect();
        }
      });
    });

    const targetSection = this.elementRef.nativeElement.querySelector('#targetSection');
    observer.observe(targetSection);
  }

  sectionInView() {
    // Set your desired final number here
    const finalValue = 10252;
    const finalValue2 = 106156;
    const duration = 2000; // in milliseconds
    const duration2 = 2500; // in milliseconds
    const interval = 50;
    const increment = Math.ceil(finalValue / (duration / interval));
    const increment2 = Math.ceil(finalValue2 / (duration2 / interval));

    const intervalId = setInterval(() => {
      if (this.valueToAnimate < finalValue) {
        this.valueToAnimate += increment;
      } else {
        clearInterval(intervalId);
        this.valueToAnimate = finalValue; // Ensure final value is exact
      }
    }, interval);
    const intervalId2 = setInterval(() => {
      if (this.valueToAnimate2 < finalValue2) {
        this.valueToAnimate2 += increment2;
      } else {
        clearInterval(intervalId2);
        this.valueToAnimate2 = finalValue2; // Ensure final value is exact
      }
    }, interval);
  }


  openVerticallyCentered(content: any) {
    this.modalService.open(content, { windowClass: 'match-made-modal', backdropClass: 'match-made-modal-backdrop', centered: true, size: 'lg' });
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    }
  }
  submitForm() {
    this.isSubmitted = true;
    if (this.sendMessageForm.valid) {
      const isCaptcha: any = this.captchaVerification();
      if (!isCaptcha?.status) {
        this.showMessage('Failed', 'alert-danger');
        return
      }
      this.apiService.submitForm(this.sendMessageForm.value).subscribe({
        next: (response) => {
          if(response.status){
            this.showMessage('Success', 'alert-success');
          }else{
            this.showMessage('Failed', 'alert-danger');
          }
          setTimeout(() => {
            this.message = '';
          }, 10000);
        },
        error: (error) => {
          this.showMessage('Failed', 'alert-danger');
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
  captchaVerification() {
    if (!this.captchaResolved) {
      return;
    }
    const captchaPayload = {
      "platform": "web",
      "info": "",
      "timestamp": Date.now(),
      "token": this.captchaResponse
    }
    this.apiService.captchaVerification(captchaPayload).subscribe(
      (response: any) => {
        if (response.isSuccess === true) {
          return response;
        }
      },
      (error) => {
        console.log("error", error);
      }
    );
  }
 
  onCaptchaResolved(captchaResponse: any): void {
    this.captchaResolved = true;
    this.captchaResponse = captchaResponse;
  }
}
