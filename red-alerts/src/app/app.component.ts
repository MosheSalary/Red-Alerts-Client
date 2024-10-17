import {Component, OnInit} from '@angular/core';
import {AlertsService} from "./alerts.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})
export class AppComponent implements OnInit {

  private _alertsHistoryData: string[] = [];
  private _CurrentalertsData: string[] = [];

  title = 'red-alerts';

  constructor(private _alertService: AlertsService) {}

  get alertsHistoryData(): string[] {
    return this._alertsHistoryData;
  }

  set alertsHistoryData(value: string[]) {
    this._alertsHistoryData = value;
  }

  get CurrentalertsData(): string[] {
    return this._CurrentalertsData;
  }

  set CurrentalertsData(value: string[]) {
    this._CurrentalertsData = value;
  }


  ngOnInit(): void {
    this._alertService.get24HAlerts().subscribe(
      (response) => {
      this.alertsHistoryData = response.map((alert: any) => alert.data);
    },
      (error) => {
        console.error(error.message);
      });
  }
}
