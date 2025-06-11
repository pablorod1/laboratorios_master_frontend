import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { RotateDirective } from '../../../directives/rotate.directive';

interface ImageItem {
  id: number;
  src: string;
  title: string;
}

@Component({
  selector: 'app-gallery',
  imports: [CommonModule, RotateDirective],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss',
})
export class GalleryComponent implements OnDestroy {
  images: ImageItem[] = [
    { id: 1, src: '/assets/img-1.jpg', title: 'Primera imagen' },
    { id: 2, src: '/assets/img-2.jpg', title: 'Segunda imagen' },
    { id: 3, src: '/assets/img-3.jpg', title: 'Tercera imagen' },
    { id: 4, src: '/assets/img-4.jpg', title: 'Cuarta imagen' },
    { id: 5, src: '/assets/img-5.jpg', title: 'Quinta imagen' },
    { id: 6, src: '/assets/img-6.jpg', title: 'Sexta imagen' },
    { id: 7, src: '/assets/img-7.jpg', title: 'Séptima imagen' },
    { id: 8, src: '/assets/img-8.jpg', title: 'Octava imagen' },
  ];

  selectedImageIndex: number = 0;
  imageScale: number = 1;
  isPlaying: boolean = false;
  slideInterval: any;

  // Pagination properties
  currentPage: number = 0;
  itemsPerPage: number = 3;

  get selectedImage(): ImageItem {
    return this.images[this.selectedImageIndex];
  }

  get isFirstImage(): boolean {
    return this.selectedImageIndex === 0;
  }

  get isLastImage(): boolean {
    return this.selectedImageIndex === this.images.length - 1;
  }

  get totalPages(): number {
    return Math.ceil(this.images.length / this.itemsPerPage);
  }

  get isFirstPage(): boolean {
    return this.currentPage === 0;
  }

  get isLastPage(): boolean {
    return this.currentPage === this.totalPages - 1;
  }

  get startIndex(): number {
    return this.currentPage * this.itemsPerPage;
  }

  get endIndex(): number {
    return this.startIndex + this.itemsPerPage;
  }

  selectImage(index: number): void {
    // Adjust index to global array position
    this.selectedImageIndex = this.startIndex + index;
  }

  previousImage(): void {
    if (!this.isFirstImage) {
      this.selectedImageIndex--;
    }

    // Check if we need to change the page
    if (this.selectedImageIndex < this.startIndex) {
      this.currentPage--;
    }
  }

  nextImage(): void {
    if (!this.isLastImage) {
      this.selectedImageIndex++;
    }

    // Check if we need to change the page
    if (this.selectedImageIndex >= this.endIndex) {
      this.currentPage++;
    }
  }

  previousPage(): void {
    if (!this.isFirstPage) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (!this.isLastPage) {
      this.currentPage++;
    }
  }

  zoomIn(): void {
    this.imageScale += 0.2;
  }

  zoomOut(): void {
    if (this.imageScale > 0.2) {
      this.imageScale -= 0.2;
    }
  }

  play(): void {
    this.isPlaying = true;
    this.slideInterval = setInterval(() => {
      if (this.isLastImage) {
        this.selectedImageIndex = 0;
      } else {
        this.selectedImageIndex++;
      }

      // Check if we need to change the page
      if (this.selectedImageIndex >= this.endIndex) {
        this.currentPage++;
      }
      if (this.currentPage >= this.totalPages) {
        this.currentPage = 0; // Reset to first page if we exceed total pages
      }
    }, 2000);
  }

  stop(): void {
    this.isPlaying = false;
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }

  ngOnDestroy(): void {
    this.stop();
  }
}
