import { SimpleGenericStore } from '../generic-store/simple-generic-store';
import { DateTime, GmtDateTimeService } from '../../service/gmt-date-time.service';
import { Injectable } from '@angular/core';

@Injectable()
export class DateTimeStore extends SimpleGenericStore<DateTime> {

  constructor(dateTimeService: GmtDateTimeService) {
    super(() => dateTimeService.gmtDateTimeNow());
  }
}
