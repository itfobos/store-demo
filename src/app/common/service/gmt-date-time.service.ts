import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GmtDateTimeService {

  constructor(private readonly httpClient: HttpClient) {
  }

  gmtDateTimeNow(): Observable<DateTime> {
    return this.httpClient.get('http://date.jsontest.com/') as Observable<DateTime>;
  }
}

export interface DateTime {
  date: string; // Example: "09-23-2020"
  time: string; //Example: "03:53:25 AM"
}
