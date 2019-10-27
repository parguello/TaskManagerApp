import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    apiURL: string = 'https://tasksmanager-302f5.firebaseio.com/User';

    constructor(private httpClient: HttpClient) { }

    public getUserById(id: string) {
        return this.httpClient.get<any>(`${this.apiURL}/User${id}.json`);
    }

    public getUsers(): Observable<User> {
        return this.httpClient.get<User>(`${this.apiURL}.json`);
    }
}
