import { Directive, ElementRef, Renderer2, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appTooltip]'
})
export class TooltipDirective {
  @Input() appTooltip: string = '';
  private tooltipElement: HTMLElement;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.showTooltip();
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.hideTooltip();
  }

  @HostListener('mousemove') onMouseMove() {
    if (this.tooltipElement) {
      this.setPosition();
    }
  }

  @HostListener('document:dragend', ['$event']) onDragEnd(event: DragEvent) {
    if (this.tooltipElement) {
      this.setPosition();
    }
  }

  private showTooltip() {
    if (!this.tooltipElement) {
      this.createTooltip();
    }
    this.setPosition();
    this.renderer.setStyle(this.tooltipElement, 'display', 'block');
  }

  private hideTooltip() {
    if (this.tooltipElement) {
      this.renderer.setStyle(this.tooltipElement, 'display', 'none');
    }
  }

  private createTooltip() {
    this.tooltipElement = this.renderer.createElement('div');
    this.renderer.appendChild(this.tooltipElement, this.renderer.createText(this.appTooltip));
    
    this.renderer.setStyle(this.tooltipElement, 'position', 'absolute');
    this.renderer.setStyle(this.tooltipElement, 'backgroundColor', '#333');
    this.renderer.setStyle(this.tooltipElement, 'color', '#fff');
    this.renderer.setStyle(this.tooltipElement, 'padding', '5px');
    this.renderer.setStyle(this.tooltipElement, 'borderRadius', '4px');
    this.renderer.setStyle(this.tooltipElement, 'whiteSpace', 'nowrap');
    this.renderer.setStyle(this.tooltipElement, 'zIndex', '1000');
    this.renderer.setStyle(this.tooltipElement, 'display', 'none');

    this.renderer.appendChild(this.el.nativeElement, this.tooltipElement);
  }

  private setPosition() {
    const rect = this.el.nativeElement.getBoundingClientRect();
    this.renderer.setStyle(this.tooltipElement, 'top', `${rect.top - this.tooltipElement.offsetHeight - 10}px`);
    this.renderer.setStyle(this.tooltipElement, 'left', `${rect.left + (rect.width / 2) - (this.tooltipElement.offsetWidth / 2)}px`);
  }
  
}
