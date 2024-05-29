import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main/main.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgbAccordionModule, NgbDropdownModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { HeaderComponent } from './header/header.component';
import { TermConditionsComponent } from './term-conditions/term-conditions.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [
    MainComponent,
    PrivacyPolicyComponent,
    HeaderComponent,
    TermConditionsComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    CarouselModule,
    NgbNavModule,
    NgbAccordionModule,
    NgbDropdownModule,
    ReactiveFormsModule,
    RecaptchaModule,
    RecaptchaFormsModule
  ]
})
export class MainModule { }
