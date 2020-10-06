import { Component } from '@angular/core';
import { DateTimeStore } from '../date-time-store';
import { DataState } from '../../../common/data-state.enum';

@Component({
  selector: 'app-gmt-time',
  templateUrl: './gmt-time.component.html',
  styleUrls: ['./gmt-time.component.scss'],
  providers: [DateTimeStore]
})
export class GmtTimeComponent {

  constructor(private readonly dateTimeStore: DateTimeStore) {
  }

  get dataState(): DataState {
    return this.dateTimeStore.dataState;
  }

  get dateTimeStr(): string {
    return this.dateTimeStore.data.map(dto => `${dto.date} ${dto.time}`).orElse('');
  }
}
