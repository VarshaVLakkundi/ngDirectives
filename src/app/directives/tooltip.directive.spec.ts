import { TooltipDirective } from './tooltip.directive';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

// Mock component to host the directive
@Component({
  template: `<div appTooltip="Tooltip text">Test Element</div>`
})
class TestComponent {}

describe('TooltipDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let directiveEl: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, TooltipDirective]
    });

    fixture = TestBed.createComponent(TestComponent);
    directiveEl = fixture.debugElement.query(By.directive(TooltipDirective));
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(directiveEl).toBeTruthy();
  });

  it('should create and show tooltip element on mouse enter', () => {
    const event = new MouseEvent('mouseenter');
    directiveEl.triggerEventHandler('mouseenter', event);
    fixture.detectChanges();

    const tooltipElement = directiveEl.nativeElement.querySelector('div');
    expect(tooltipElement).toBeTruthy();
    expect(tooltipElement.textContent).toBe('Tooltip text');
    expect(tooltipElement.style.display).toBe('block');
  });

  it('should hide tooltip element on mouse leave', () => {
    const enterEvent = new MouseEvent('mouseenter');
    directiveEl.triggerEventHandler('mouseenter', enterEvent);
    fixture.detectChanges();

    const leaveEvent = new MouseEvent('mouseleave');
    directiveEl.triggerEventHandler('mouseleave', leaveEvent);
    fixture.detectChanges();

    const tooltipElement = directiveEl.nativeElement.querySelector('div');
    expect(tooltipElement).toBeTruthy();
    expect(tooltipElement.style.display).toBe('none');
  });

  it('should update tooltip position on mouse move', () => {
    const enterEvent = new MouseEvent('mouseenter');
    directiveEl.triggerEventHandler('mouseenter', enterEvent);
    fixture.detectChanges();

    const moveEvent = new MouseEvent('mousemove');
    directiveEl.triggerEventHandler('mousemove', moveEvent);
    fixture.detectChanges();

    const tooltipElement = directiveEl.nativeElement.querySelector('div');
    const rect = directiveEl.nativeElement.getBoundingClientRect();
    expect(tooltipElement.style.top).toBe(`${rect.top - tooltipElement.offsetHeight - 10}px`);
    expect(tooltipElement.style.left).toBe(`${rect.left + (rect.width / 2) - (tooltipElement.offsetWidth / 2)}px`);
  });

  it('should update tooltip position on drag end', () => {
    const enterEvent = new MouseEvent('mouseenter');
    directiveEl.triggerEventHandler('mouseenter', enterEvent);
    fixture.detectChanges();

    const dragEndEvent = new MouseEvent('dragend');
    directiveEl.triggerEventHandler('document:dragend', dragEndEvent);
    fixture.detectChanges();

    const tooltipElement = directiveEl.nativeElement.querySelector('div');
    const rect = directiveEl.nativeElement.getBoundingClientRect();
    expect(tooltipElement.style.top).toBe(`${rect.top - tooltipElement.offsetHeight - 10}px`);
    expect(tooltipElement.style.left).toBe(`${rect.left + (rect.width / 2) - (tooltipElement.offsetWidth / 2)}px`);
  });
});
