import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';

@Directive({
  selector: 'img[rotate]',
  standalone: true,
})
export class RotateDirective implements OnInit {
  @Input() rotate: string = '0';
  @Input() step: string = '10';

  private currentRotation: number = 0;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.currentRotation = parseFloat(this.rotate) || 0;
    this.applyRotation();
  }

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent): void {
    const stepValue = parseFloat(this.step) || 10;

    if (event.shiftKey) {
      this.currentRotation -= stepValue;
    } else {
      this.currentRotation += stepValue;
    }

    this.applyRotation();
  }

  private applyRotation(): void {
    this.el.nativeElement.style.transform = `rotate(${this.currentRotation}deg)`;
  }
}
