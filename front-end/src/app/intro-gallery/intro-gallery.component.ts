import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';


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
export class IntroGalleryComponent {
  isExpanded = false;

  toggleGallery(): void {
    this.isExpanded = !this.isExpanded;
  }
  images = [
    { src: 'assets/kryziai.jpg', alt: 'Category 1' },
    { src: 'assets/gediminopilis.jpg', alt: 'Category 2' },
    { src: 'assets/trakupilis.jpg', alt: 'Category 3' }
  ];

  currentIndex = 0;

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  previous() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }
}
