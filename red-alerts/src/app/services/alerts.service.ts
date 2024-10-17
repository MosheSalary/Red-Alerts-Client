import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {interval, Observable, switchMap} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  private _AlertsHistoryUrl: string = environment.AlertsHistoryUrl;
  private _CurrentAlertsUrl: string = environment.CurrentAlertsUrl;

  constructor(private http: HttpClient) {}

  get AlertsHistoryUrl(): string {
    return this._AlertsHistoryUrl;
  }

  set AlertsHistoryUrl(value: string) {
    this._AlertsHistoryUrl = value;
  }

  get CurrentAlertsUrl(): string {
    return this._CurrentAlertsUrl;
  }

  set CurrentAlertsUrl(value: string) {
    this._CurrentAlertsUrl = value;
  }

  public get24HAlerts(): Observable<any> {
    return this.http.get(this.AlertsHistoryUrl);
  }

  getAlertsEverySecond(): Observable<any> {
    return interval(1000).pipe(
      switchMap(() => this.http.get(this.CurrentAlertsUrl))
    );
  }
}
