import {Injectable} from '@angular/core';
import {IAlertData} from "../interfaces/alert-data.interface";

@Injectable({
  providedIn: 'root',
})
export class AlertsParserService {

  public parseAlerts(rawAlerts: any): IAlertData[] {
    return rawAlerts.map((alert: IAlertData) => ({
      Date: alert.Date,
      City: alert.City,
      Title: alert.Title,
    }));
  }
}
