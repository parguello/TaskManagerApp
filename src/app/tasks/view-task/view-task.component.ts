import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { Message } from 'primeng/components/common/api';
import { Subscription, Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { TaskService } from '../../services/task.service';
import { Task } from '../../model/task';



@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {

  msgs: Message[] = [];
  subscription: Subscription
  loading: boolean;
  selectedTask: any;

  public cols: any;
  tasks: Task[];
  tasksFiltered: Task[];

  constructor(private router: Router, private taskService: TaskService) {

  }

  ngOnInit() {

    console.log('in init')


    this.cols = [
      { field: 'name', header: 'Name' },
      { field: 'priority', header: 'Priority' },
      { field: 'status', header: 'Status' },
      { field: 'assignedUser', header: 'User' },
      { field: '', header: '' }
    ];
    this.fetchTasks();

  }

  onFilter(e) {

    this.tasksFiltered = null;
    localStorage.setItem("filterTask", JSON.stringify(e));

    if (JSON.stringify(e.filters) === JSON.stringify({})) {
      localStorage.setItem("filterTask", null);
    }

    //this.selectedTask = JSON.parse(localStorage.getItem("TaskLocal")).selection;

  }

  fetchTasks() {

    this.loading = true;

    this.tasksFiltered = null;


    this.taskService.getTasks().pipe(map(data => Object.keys(data).map(k => data[k])),
      catchError(error => of(null)))
      .subscribe(data => {
        this.tasks = data;
        console.log(data);
        this.loading = false;
      });

  }

  onAddTask() {
    this.router.navigate(['add-task']);
  }

  onRowSelect(event) {

    this.selectedTask = event.data;


    this.router.navigate(['/edit-task', this.selectedTask.id]);
  }



}
