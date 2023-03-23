import { Component } from '@angular/core';

@Component({
  selector: 'app-intro-gallery',
  templateUrl: './intro-gallery.component.html',
  styleUrls: ['./intro-gallery.component.css']
})
export class IntroGalleryComponent {
  isExpanded = false;

  toggleGallery(): void {
    this.isExpanded = !this.isExpanded;
  }
}