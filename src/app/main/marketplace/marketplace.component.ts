import { Component, Input } from '@angular/core';
import { MainService } from 'src/app/shared/services/main.service';

@Component({
  selector: 'app-marketplace',
  templateUrl: './marketplace.component.html',
  styleUrls: ['./marketplace.component.scss']
})
export class MarketplaceComponent {
  active = 1;
  marketPlacesData: any = [];
  latitude: any
  longitude: any
  constructor(private _service: MainService) { }
  ngOnInit() {
    this.getLocation()

  }

  marketPlace(latitude: any, longitude: any) {
    const payload: any = {
      latitude: latitude,
      longitude: longitude
    }
    this._service.nearByCafe(payload).subscribe((res: any) => {
      this.marketPlacesData = res?.data;
      this.marketPlacesData.length > 0 && this.marketPlacesData.filter((item: any) => {
        if (item.photos.length == 0) {
          item.photos.push('/assets/images/cafe-default.jpg')
        }
      })
    })
  }

  getLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.longitude = position.coords.longitude;
        this.latitude = position.coords.latitude;
        this.marketPlace(this.latitude, this.longitude)
      });
    } else {
      console.log("No support for geolocation")
    }
  }
}
