import { Component, OnInit, Inject, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SearchResult } from '../data.service';
import { MatDialog } from '@angular/material/dialog';
import { AppComponent } from '../app.component';

declare var google: any;

@Component({
  selector: 'app-result-details',
  templateUrl: './result-details.component.html',
  styleUrls: ['./result-details.component.css'],
})
export class ResultDetailsComponent implements OnInit, AfterViewInit {
  @ViewChild('map', { static: false }) mapElement!: ElementRef;

  map!: google.maps.Map;
  geocoder!: google.maps.Geocoder;

  constructor(
    public dialogRef: MatDialogRef<ResultDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SearchResult
  ) {}

  ngOnInit(): void {
    // Initialize Geocoder
    this.geocoder = new google.maps.Geocoder();
  }

  ngAfterViewInit() {
    this.initMap();
  }

  initMap(): void {
    // Initialize map
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 8
    });

    // Geocode the address and center the map and add a marker on it
    this.geocoder.geocode({ 'address': this.data.address }, (results, status) => {
      if (status == 'OK' && results !== null) {
        this.map.setCenter(results[0].geometry.location);
        new google.maps.Marker({
          map: this.map,
          position: results[0].geometry.location
        });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });    
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
