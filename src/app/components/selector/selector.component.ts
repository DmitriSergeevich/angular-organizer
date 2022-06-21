import { Component } from '@angular/core';
import { DateService } from 'src/app/shared/date.service';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.less'],
})
export class SelectorComponent {
  constructor(readonly dateService: DateService) {}

  go(dir: number) {
    this.dateService.changeMonth(dir);
  }
}
