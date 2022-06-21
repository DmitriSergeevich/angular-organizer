import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { switchMap } from 'rxjs';
import { DateService } from 'src/app/shared/date.service';
import { ITask, TasksService } from 'src/app/shared/tasks.service';

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.less'],
})
export class OrganizerComponent implements OnInit {
  form!: FormGroup;
  tasks!: ITask[];
  constructor(
    readonly dateService: DateService,
    private taskService: TasksService
  ) {}

  ngOnInit(): void {
    this.dateService.date
      .pipe(switchMap((value) => this.taskService.load(value)))
      .subscribe((tasks) => {
        this.tasks = tasks;
      });

    this.form = new FormGroup({
      title: new FormControl('', Validators.required),
    });
  }

  submit() {
    const { title } = this.form.value;

    const task: ITask = {
      title,
      date: this.dateService.date.value.format('DD-MM-YYYY'),
    };

    this.taskService.create(task).subscribe({
      next: (task) => {
        this.tasks.push(task);
        this.form.reset();
      },

      error: (error) => console.error(error),
    });
  }

  remove(task: ITask) {
    this.taskService.remove(task).subscribe({
      next: () => {
        this.tasks = this.tasks.filter((t) => t.id !== task.id);
      },
      error: (err) => console.error(err),
    });
  }
}
