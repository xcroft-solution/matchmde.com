import { Component, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss']
})
export class PrivacyPolicyComponent {
  constructor(
    private router: Router,
  ) { }
  navigateScroll(url: string, fragmentId: string) {
    this.router.navigate([url], { fragment: fragmentId });
  }
  onClickHeader(event: any) {
    this.router.navigate([event.url], { fragment: event.fragmentId });
  }
}
