import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-term-conditions',
  templateUrl: './term-conditions.component.html',
  styleUrls: ['./term-conditions.component.scss']
})
export class TermConditionsComponent {
  constructor(
    private router: Router,
  ) { }
  onClickHeader(event: any) {
    this.router.navigate([event.url], { fragment: event.fragmentId });
  }
}
