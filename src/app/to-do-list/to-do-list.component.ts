import { Component, OnInit } from '@angular/core';
import { ToDoListService } from './to-do-list.service';

interface Task {
  id: number;
  details: string;
  title: string;
  description?: string;
  status: string;
  type: string;
  assigned_to: string;
}

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css']
})
export class ToDoListComponent implements OnInit {
  items: Task[] = [];
  color: string;
  
  constructor(private service: ToDoListService) {}

  ngOnInit(): void {
   this.service.getTasks().subscribe(data  => {
    this.items = data.tasks;
    console.log(this.items)
   })
  }


  onDragEnd(index: number, position: any) {
    console.log(`Moved item at index ${index} to position (${position.left}, ${position.top})`);
    
    // Calculate the new index for the item based on its final position
    const newIndex = this.calculateNewIndex(position);

    // Move the item within the array to the new index
    if (newIndex !== index) {
      const movedItem = this.items.splice(index, 1)[0];
      this.items.splice(newIndex, 0, movedItem);
    }
  }

  private calculateNewIndex(position: any): number {
    // Determine new index based on the vertical position
    const itemHeight = 50; // Assuming each item has a height of 50px
    const newIndex = Math.floor(position.top / itemHeight);

    // Ensure the new index is within bounds
    return Math.max(0, Math.min(this.items.length - 1, newIndex));
  }

  getColor(type: any) {
    const color = {
      "User Story": "#9d9bff",
      "Bug": "#da5238",
      "Task": "#5dd669"
    }
    return color[type];
  }
}
