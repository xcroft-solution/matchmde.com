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


  customOptions: OwlOptions = {
    loop:true,
    autoplay:true,
    mouseDrag: true,
    touchDrag: true,
    margin: 45,
    center: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    nav:true,
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

  constructor(private modalService: NgbModal, 
    private elementRef: ElementRef,
    public activeRoute: ActivatedRoute,
    private router: Router,
  ){ }

  ngOnInit() {
    this.activeRoute.fragment.subscribe(fragment => {
      if(fragment){
        this.scrollToSection(fragment);
      }
    });
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


  openVerticallyCentered(content:any) {
		this.modalService.open(content, { windowClass: 'match-made-modal', backdropClass: 'match-made-modal-backdrop', centered: true, size: 'lg' });
	}

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    }
  }
  onClickHeader(event: any) {
    this.scrollToSection(event.fragmentId)
  }
}
