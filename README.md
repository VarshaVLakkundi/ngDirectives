# TaskListApp

## Overview

The Task List App is a simple Angular application designed to demonstrate the use of custom directives to enhance the user interface and functionality. The app includes a list of tasks, each with detailed information, and incorporates the following custom directives:

* **TooltipDirective**: Displays a tooltip with additional information when hovering over a task.
* **HoverHighlightDirective**: Highlights a task when the mouse hovers over it.
* **DraggableDirective**: Allows tasks to be dragged and repositioned within the list.

## Features

* **Task List Display**: View a list of tasks with titles, descriptions, statuses, and assigned users.
* **Tooltips**: Show additional details when hovering over a task.
* **Highlight on Hover**: Change the background color of a task when the mouse hovers over it.
* **Drag and Drop**: Reorder tasks by dragging and dropping them to new positions.

## Directives

**Tooltip Directive**

Displays a tooltip with the specified text when hovering over the element.

**Usage**
```
<div appTooltip="Tooltip text">Hover over me</div>
```

**Hover Highlight Directive**

Changes the background color of the element when hovered.

**Usage**
```
<div appHoverHighlight hoverColor="lightblue">Hover over me</div>
```

**Draggable Directive**

Enables dragging of the element and emits the final position on drag end.

**Usage**
```
<div appDraggable (dragEnd)="onDragEnd($event)">Drag me</div>
```


## Development server
  ```
  $ cd todo-list-app
  $ npm install
  $ ng serve
```


