import {Injectable} from '@angular/core';
import {IAlertData} from "../interfaces/alert-data.interface";

@Injectable({
  providedIn: 'root',
})
export class AlertsParserService {

  public parseAlerts(rawAlerts: any): IAlertData[] {
    return rawAlerts.map((alert: any) => ({
      Date: alert.alertDate.split(',')[0].trim(),
      City: alert.data,
      Title: alert.title,
    }));
  }
}
