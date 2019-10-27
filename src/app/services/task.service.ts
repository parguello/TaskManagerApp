import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../model/task';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    apiURL: string = 'https://tasksmanager-302f5.firebaseio.com/Task';

    constructor(private httpClient: HttpClient) { }


    public createTask(task: Task) { }

    public updateTask(task: Task) { }

    public deleteTask(id: number) {
        return this.httpClient.delete<any>(`${this.apiURL}/Task${id}.json`);
    }

    public getTaskById(id: number) {
        return this.httpClient.get<any>(`${this.apiURL}/Task${id}.json`);
    }

    public getTasks(): Observable<any> {
        return this.httpClient.get<any>(`${this.apiURL}.json`);
    }
}