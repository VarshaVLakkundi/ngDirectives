import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ToDoListService {

  private url = './assets/tasks.json'; 

  constructor(private http: HttpClient) { }

  getTasks() {
    return this.http.get<any>(this.url);
  }
}