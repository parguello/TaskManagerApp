import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from '../model/task';
import { Subscription, Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})

export class BoardComponent {

  availableTasks: Task[];

  selectedTasks: Task[];

  draggedTask: Task;

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.selectedTasks = [];

    //this.loading = true;



    this.taskService.getTasks().pipe(map(data => Object.keys(data).map(k => data[k])),
      catchError(error => of(null)))
      .subscribe(data => {
        this.availableTasks = data;
        console.log(data);
        //this.loading = false;
      });
  }

  dragStart(event, car: Task) {
    this.draggedTask = car;
  }

  drop(event) {
    if (this.draggedTask) {
      let draggedTaskIndex = this.findIndex(this.draggedTask);
      this.selectedTasks = [...this.selectedTasks, this.draggedTask];
      this.availableTasks = this.availableTasks.filter((val, i) => i != draggedTaskIndex);
      this.draggedTask = null;
    }
  }

  dragEnd(event) {
    this.draggedTask = null;
  }

  findIndex(task: Task) {
    let index = -1;
    for (let i = 0; i < this.availableTasks.length; i++) {
      if (task.id === this.availableTasks[i].id) {
        index = i;
        break;
      }
    }
    return index;
  }

}
