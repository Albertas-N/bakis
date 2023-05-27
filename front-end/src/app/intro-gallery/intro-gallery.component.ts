// intro-gallery.component.ts
import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { DataService } from '../data.service';

@Component({
  selector: 'app-intro-gallery',
  templateUrl: './intro-gallery.component.html',
  styleUrls: ['./intro-gallery.component.css'],
  animations: [
    trigger('slide', [
      transition(':increment', [
        style({ transform: 'translateX(-100%)' }),
        animate('400ms ease-in', style({ transform: 'translateX(0%)' }))
      ]),
      transition(':decrement', [
        style({ transform: 'translateX(100%)' }),
        animate('400ms ease-in', style({ transform: 'translateX(0%)' }))
      ])
    ])
  ]
})
export class IntroGalleryComponent implements OnInit {
  images: { src: string; alt: string }[] = [];

  currentIndex = 0;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getItems().subscribe(events => {
      this.images = events.map(event => ({ src: event.image_src, alt: 'Vilnius Event' }));
    });
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  previous() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }
}
