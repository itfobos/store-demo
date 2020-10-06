import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { DateTime, GmtDateTimeService } from '../common/service/gmt-date-time.service';
import { DataState } from '../common/data-state.enum';
import { FetchDateTimeAction } from './fetch-date-time-action';
import { Subscription } from 'rxjs';
import { isNotNullOrUndefined } from '@eastbanctech/ts-optional';

@State<DateTimeModel>({
  name: 'ngxsdatetimestore',
  defaults: {
    dateTime: undefined,
    dataState: DataState.NotRequested
  }
})
@Injectable()
export class NgxsDateTimeStore {
  constructor(private readonly dateTimeService: GmtDateTimeService) {
  }

  @Selector()
  static getDataState(model: DateTimeModel): DataState {
    return model.dataState;
  }

  @Selector()
  static getDateTime(model: DateTimeModel): DateTime {
    return model.dateTime;
  }

  @Action(FetchDateTimeAction)
  fetchData({getState, setState}: StateContext<DateTimeModel>): void {
    setState({
      ...getState(),
      dataState: DataState.Loading
    });

    const releaseSubscription = new Subscription();

    const dataProducerSubscription = this.dateTimeService.gmtDateTimeNow()
      .subscribe(
        value => {
          const state = getState();

          if (isNotNullOrUndefined(value)) {
            setState({
              ...state,
              dateTime: value,
              dataState: DataState.Received
            });
          } else {
            setState({
              ...state,
              dataState: DataState.NotFound
            });
          }

          releaseSubscription.unsubscribe();
        },
        (/*error*/) => {
          const state = getState();
          setState({
            ...state,
            dataState: DataState.Error
          });

          releaseSubscription.unsubscribe();
        }
      );

    releaseSubscription.add(dataProducerSubscription);
  }
}

export interface DateTimeModel {
  dateTime: DateTime;
  dataState: DataState;
}
