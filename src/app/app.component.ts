import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'match-made';
  loading:boolean = false;
constructor() { }
ngOnInit(): void {
  setTimeout(() => {
    this.loading = true;
  }, 200);
}
}
