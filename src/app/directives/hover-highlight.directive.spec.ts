import { HoverHighlightDirective } from './hover-highlight.directive';
import { ElementRef, Renderer2 } from '@angular/core';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ToDoListComponent } from '../to-do-list/to-do-list.component';


// Mock component to host the directive
@Component({
  template: `<div appHoverHighlight [hoverColor]="color">Test Element</div>`
})
class TestComponent {
  color: string = 'blue';
}

describe('HoverHighlightDirective', () => {
  let fixture: ComponentFixture<ToDoListComponent>;
  let component: ToDoListComponent;
  let directiveEl: any;
  let directive: HoverHighlightDirective;
  let renderer: Renderer2;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ToDoListComponent, HoverHighlightDirective],
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

    fixture = TestBed.createComponent(ToDoListComponent);
    component = fixture.componentInstance;
    directiveEl = fixture.debugElement.query(By.directive(HoverHighlightDirective));
    directive = directiveEl.injector.get(HoverHighlightDirective);
    renderer = TestBed.inject(Renderer2);
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should apply background color on mouse enter', () => {
    const event = new MouseEvent('mouseenter');
    directiveEl.triggerEventHandler('mouseenter', event);
    expect(directiveEl.nativeElement.style.backgroundColor).toBe('blue');
  });

  it('should remove background color on mouse leave', () => {
    // First set the background color
    const enterEvent = new MouseEvent('mouseenter');
    directiveEl.triggerEventHandler('mouseenter', enterEvent);
    expect(directiveEl.nativeElement.style.backgroundColor).toBe('blue');

    // Then remove the background color
    const leaveEvent = new MouseEvent('mouseleave');
    directiveEl.triggerEventHandler('mouseleave', leaveEvent);
    expect(directiveEl.nativeElement.style.backgroundColor).toBe('');
  });

  it('should use default color if hoverColor is not provided', () => {
    component.color = ''; // Clear the color input
    fixture.detectChanges();
    
    const event = new MouseEvent('mouseenter');
    directiveEl.triggerEventHandler('mouseenter', event);
    expect(directiveEl.nativeElement.style.backgroundColor).toBe('yellow');
  });
});
