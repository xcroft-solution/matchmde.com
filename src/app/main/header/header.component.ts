import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Output() formResponse = new EventEmitter<any>();
  url: string = '/';
  fragmentId: string = '';
  scrollToSection(fragment: string){
    this.fragmentId = fragment;
    this.emitData();
  }
  emitData() {
    this.formResponse.emit({
      url: this.url,
      fragmentId: this.fragmentId,
    });
  }
}
