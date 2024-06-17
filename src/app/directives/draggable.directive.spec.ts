import { DraggableDirective } from './draggable.directive';
import { ElementRef, Renderer2 } from '@angular/core';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ToDoListComponent } from '../to-do-list/to-do-list.component'


@Component({
  template: `<div appDraggable (dragEnd)="onDragEnd($event)"></div>`
})
class TestComponent {
  onDragEnd(event: any) {
    console.log('Drag ended:', event);
  }
}

describe('DraggableDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let directiveEl: any;
  let directive: DraggableDirective;
  let renderer: Renderer2;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, DraggableDirective],
      providers: [
        Renderer2,
        {
          provide: ElementRef,
          useValue: {
            nativeElement: document.createElement('div')
          }
        }
      ]
    });

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    directiveEl = fixture.debugElement.query(By.directive(DraggableDirective));
    directive = directiveEl.injector.get(DraggableDirective);
    renderer = TestBed.inject(Renderer2);
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should start dragging on mousedown', () => {
    const event = new MouseEvent('mousedown', { clientX: 100, clientY: 100 });
    directiveEl.triggerEventHandler('mousedown', event);
    expect(directive['dragging']).toBeTrue();
    expect(directive['startX']).toBe(100);
    expect(directive['startY']).toBe(100);
  });

  it('should move the element on mousemove', () => {
    directive['dragging'] = true;
    directive['startX'] = 100;
    directive['startY'] = 100;

    const event = new MouseEvent('mousemove', { clientX: 150, clientY: 150 });
    directiveEl.triggerEventHandler('mousemove', event);

    expect(directiveEl.nativeElement.style.left).toBe('50px');
    expect(directiveEl.nativeElement.style.top).toBe('50px');
  });

  it('should stop dragging on mouseup', () => {
    directive['dragging'] = true;
    directive['startX'] = 100;
    directive['startY'] = 100;

    const event = new MouseEvent('mouseup', { clientX: 150, clientY: 150 });
    spyOn(component, 'onDragEnd');

    directiveEl.triggerEventHandler('mouseup', event);

    expect(directive['dragging']).toBeFalse();
    expect(component.onDragEnd).toHaveBeenCalledWith({ top: directive['initialTop'] + 50, left: directive['initialLeft'] + 50 });
  });

  it('should remove styles on mouseup', () => {
    directive['dragging'] = true;
    directive['startX'] = 100;
    directive['startY'] = 100;

    const event = new MouseEvent('mouseup', { clientX: 150, clientY: 150 });
    directiveEl.triggerEventHandler('mouseup', event);

    expect(directiveEl.nativeElement.style.zIndex).toBe('');
    expect(directiveEl.nativeElement.style.left).toBe('');
    expect(directiveEl.nativeElement.style.top).toBe('');
  });
});

