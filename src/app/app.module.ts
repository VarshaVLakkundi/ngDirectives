import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClient } from '@angular/common/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HoverHighlightDirective } from './directives/hover-highlight.directive';
import { TooltipDirective } from './directives/tooltip.directive';
import { DraggableDirective } from './directives/draggable.directive';
import { ToDoListComponent } from './to-do-list/to-do-list.component';
import { ToDoListService } from './to-do-list/to-do-list.service';

@NgModule({
  declarations: [
    AppComponent,
    HoverHighlightDirective,
    TooltipDirective,
    DraggableDirective,
    ToDoListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [ToDoListService,
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
