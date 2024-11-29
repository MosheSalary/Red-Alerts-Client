import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AlertsFetchService {
  private readonly _historyAlertsUrl: string = environment.HistoryAlertsUrl;

  constructor(private _http: HttpClient) {}

  public fetchRawAlerts(): Observable<any> {
    return this._http.get(this._historyAlertsUrl);
  }
}
