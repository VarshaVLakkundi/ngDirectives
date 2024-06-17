import { Directive, ElementRef, Renderer2, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appDraggable]'
})
export class DraggableDirective {
  @Output() dragEnd: EventEmitter<any> = new EventEmitter();

  private startX: number;
  private startY: number;
  private initialLeft: number;
  private initialTop: number;
  private dragging: boolean = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mousedown', ['$event']) onMouseDown(event: MouseEvent) {
    event.preventDefault();
    this.dragging = true;
    this.startX = event.clientX;
    this.startY = event.clientY;
    const rect = this.el.nativeElement.getBoundingClientRect();
    this.initialLeft = rect.left;
    this.initialTop = rect.top;

    document.addEventListener('mousemove', this.onMouseMove.bind(this));
    document.addEventListener('mouseup', this.onMouseUp.bind(this));
  }

  onMouseMove(event: MouseEvent) {
    if (!this.dragging) return;
    const diffX = event.clientX - this.startX;
    const diffY = event.clientY - this.startY;

    this.renderer.setStyle(this.el.nativeElement, 'position', 'relative');
    this.renderer.setStyle(this.el.nativeElement, 'zIndex', '1000');
    this.renderer.setStyle(this.el.nativeElement, 'left', `${diffX}px`);
    this.renderer.setStyle(this.el.nativeElement, 'top', `${diffY}px`);
  }

  onMouseUp(event: MouseEvent) {
    if (!this.dragging) return;
    this.dragging = false;
    const diffX = event.clientX - this.startX;
    const diffY = event.clientY - this.startY;
    
    const finalLeft = this.initialLeft + diffX;
    const finalTop = this.initialTop + diffY;

    this.dragEnd.emit({ top: finalTop, left: finalLeft });
    document.removeEventListener('mousemove', this.onMouseMove.bind(this));
    document.removeEventListener('mouseup', this.onMouseUp.bind(this));

    this.renderer.removeStyle(this.el.nativeElement, 'zIndex');
    this.renderer.removeStyle(this.el.nativeElement, 'left');
    this.renderer.removeStyle(this.el.nativeElement, 'top');
  }
}
