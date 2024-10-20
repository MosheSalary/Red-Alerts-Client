import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {interval, Observable, switchMap} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class AlertsService {

  private _HistoryAlertsUrl: string = environment.HistoryAlertsUrl;
  private _CurrentAlertsUrl: string = environment.CurrentAlertsUrl;

  constructor(private http: HttpClient) {}

  get HistoryAlertsUrl(): string {
    return this._HistoryAlertsUrl;
  }

  set HistoryAlertsUrl(value: string) {
    this._HistoryAlertsUrl = value;
  }

  get CurrentAlertsUrl(): string {
    return this._CurrentAlertsUrl;
  }

  set CurrentAlertsUrl(value: string) {
    this._CurrentAlertsUrl = value;
  }

  public get24HAlerts(): Observable<any> {
    return this.http.get(this.HistoryAlertsUrl);
  }

  getAlertsEverySecond(): Observable<any> {
    return interval(1000).pipe(
      switchMap(() => this.http.get(this.CurrentAlertsUrl))
    );
  }
}
