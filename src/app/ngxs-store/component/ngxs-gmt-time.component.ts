import { Component, OnDestroy } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { NgxsDateTimeStore } from '../ngxs-date-time-store';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { DataState } from '../../common/data-state.enum';
import { DateTime } from '../../common/service/gmt-date-time.service';
import { FetchDateTimeAction } from '../fetch-date-time-action';

@Component({
  selector: 'app-ngxs-gmt-time',
  templateUrl: './ngxs-gmt-time.component.html',
  styleUrls: ['./ngxs-gmt-time.component.scss']
})
export class NgxsGmtTimeComponent implements OnDestroy {
  @Select(NgxsDateTimeStore.getDataState) private dataStateInternal$!: Observable<DataState>;
  private readonly dataState$ = new BehaviorSubject<DataState>(DataState.NotRequested);

  @Select(NgxsDateTimeStore.getDateTime) private dataInternal$: Observable<DateTime>;
  private readonly data$ = new BehaviorSubject<DateTime>(undefined);

  private releaseSubscription = new Subscription();

  constructor(private readonly store: Store) {
    this.releaseSubscription.add(
      this.dataStateInternal$.subscribe(this.dataState$)
    );

    this.releaseSubscription.add(
      this.dataInternal$.subscribe(this.data$)
    );

    store.dispatch(new FetchDateTimeAction());
  }

  ngOnDestroy(): void {
    this.releaseSubscription.unsubscribe();
  }

  get dataState(): DataState {
    return this.dataState$.value;
  }

  get dateTimeStr(): string {
    const dateTimeValue = this.data$.value;
    return `${dateTimeValue.date} ${dateTimeValue.time}`;
  }
}
