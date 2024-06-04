import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main/main.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgbAccordionModule, NgbDropdownModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { PrivacyComponent } from './privacy/privacy.component';
import { TermsComponent } from './terms/terms.component';
import { MarketplaceComponent } from './marketplace/marketplace.component';
import { ContactusComponent } from './contactus/contactus.component';

@NgModule({
  declarations: [
    MainComponent,
    PrivacyComponent,
    TermsComponent,
    MarketplaceComponent,
    ContactusComponent,
    
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    CarouselModule,
    NgbNavModule,
    NgbAccordionModule,
    NgbDropdownModule,
    ReactiveFormsModule,
    SharedModule
    
  ]
})
export class MainModule { }
