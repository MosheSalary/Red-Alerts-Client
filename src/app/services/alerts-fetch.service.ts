import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {IAlertData} from "../interfaces/alert-data.interface";

@Injectable({
  providedIn: 'root',
})
export class AlertsFetchService {
  private readonly _historyAlertsUrl: string = environment.HistoryAlertsUrl;

  constructor(private _http: HttpClient) {}

  public fetchRawAlerts(): Observable<any> {
    return this._http.get(this._historyAlertsUrl);
  }

  public getMockAlerts(): IAlertData[] {
    return [
      {Date: '2024-10-29 20:43:51', City: 'תל אביב', Title: 'ירי רקטות וטילים'},
      {Date: '2024-11-1 10:13:32', City: 'חיפה', Title: 'חדירת כלי טיס עוין'},
      {Date: '2024-10-30 15:59:02', City: 'נתניה', Title: 'ירי רקטות וטילים'},
      {Date: '2024-9-30 11:59:02', City: 'נהריה', Title: 'ירי רקטות וטילים'},
      {Date: '2024-10-30 15:59:51', City: 'פתח תקווה', Title: 'ירי רקטות וטילים'},
      {Date: '2024-10-30 15:59:31', City: 'אשקלון', Title: 'ירי רקטות וטילים'},
      {Date: '2024-10-30 17:49:32', City: 'ירושלים', Title: 'חדירת כלי טיס עוין'},
      {Date: '2024-10-30 15:19:52', City: 'באר שבע', Title: 'ירי רקטות וטילים'},
      {Date: '2024-10-30 15:23:02', City: 'קריית שמונה', Title: 'ירי רקטות וטילים'},
      {Date: '2024-11-30 15:59:45', City: 'אילת', Title: 'חדירת כלי טיס עוין'},
    ];
  }
}
