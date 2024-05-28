import { Component, ElementRef, OnInit } from '@angular/core';
import * as AOS from 'aos';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  valueToAnimate: number = 0;
  valueToAnimate2: number = 0;
  constructor(
    private elementRef: ElementRef,
  ){}
  ngOnInit() {
    AOS.init();
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
}
