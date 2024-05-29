import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private router: Router, private route: ActivatedRoute){

  }

  scrollToSection(sectionId: string): void {

    if (this.router.url !== '/') {
      this.router.navigate(['/'], { queryParams: { scrollTo: sectionId } });
    } else {
      this.scrollToSectionOnPage(sectionId);
    }
    
  }

  scrollToSectionOnPage(section: string) {
    setTimeout(() => {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
      }
    }, 300);
  }

}
