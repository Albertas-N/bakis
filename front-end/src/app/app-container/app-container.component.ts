import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';



@Component({
  selector: 'app-app-container',
  templateUrl: './app-container.component.html',
  styleUrls: ['./app-container.component.css']
})
export class AppContainerComponent implements OnInit {
  @ViewChild('map', { static: false }) mapElement!: ElementRef;

  map!: google.maps.Map;
  infoWindow!: google.maps.InfoWindow;

  ngOnInit() {
    this.initMap();
  }

  initMap(): void {
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 6,
    });

    this.infoWindow = new google.maps.InfoWindow();

    const locationButton = document.createElement('button');

    locationButton.textContent = 'Pan to Current Location';
    locationButton.classList.add('custom-map-control-button');

    this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);

    locationButton.addEventListener('click', () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position: GeolocationPosition) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };

            this.infoWindow.setPosition(pos);
            this.infoWindow.setContent('Location found.');
            this.infoWindow.open(this.map);
            this.map.setCenter(pos);
          },
          () => {
            this.handleLocationError(true, this.infoWindow, this.map.getCenter()!);
          }
        );
      } else {
        this.handleLocationError(false, this.infoWindow, this.map.getCenter()!);
      }
    });
  }

  handleLocationError(
    browserHasGeolocation: boolean,
    infoWindow: google.maps.InfoWindow,
    pos: google.maps.LatLng
  ) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
      browserHasGeolocation
        ? 'Error: The Geolocation service failed.'
        : "Error: Your browser doesn't support geolocation."
    );
    infoWindow.open(this.map);
  }
}