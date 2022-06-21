import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import * as moment from 'moment';

interface ICreateResponse {
  name: string;
}

export interface ITask {
  id?: string;
  title: string;
  date?: string;
}

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  static url: string =
    'https://angular-organizer-3000-default-rtdb.asia-southeast1.firebasedatabase.app/';
  constructor(private http: HttpClient) {}

  create(task: ITask): Observable<ITask> {
    return this.http
      .post<ICreateResponse>(`${TasksService.url}/${task.date}.json`, task)
      .pipe(
        map((res) => {
          return { ...task, id: res.name };
        })
      );
  }

  load(date: moment.Moment): Observable<ITask[]> {
    return this.http
      .get<Task[]>(`${TasksService.url}/${date.format('DD-MM-YYYY')}.json`)
      .pipe(
        map((tasks) => {
          if (!tasks) {
            return [];
          }
          return Object.keys(tasks).map((key) => ({ ...tasks[key], id: key }));
        })
      );
  }

  remove(task: ITask): Observable<void> {
    return this.http.delete<void>(
      `${TasksService.url}/${task.date}/${task.id}.json`
    );
  }
}
