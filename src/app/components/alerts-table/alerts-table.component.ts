import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {AlertsFetchService} from '../../services/alerts-fetch.service';
import {AlertsParserService} from '../../services/alerts-parser.service';
import {IAlertData} from '../../interfaces/alert-data.interface';
import {EAlertColumns} from '../../enums/alert-columns.enum';

@Component({
  selector: 'alerts-table',
  templateUrl: './alerts-table.component.html',
  styleUrls: ['./alerts-table.component.less'],
})
export class AlertsTableComponent implements OnInit {

  protected displayedColumns: string[] = [
    EAlertColumns.Num,
    EAlertColumns.Date,
    EAlertColumns.City,
    EAlertColumns.Title,
  ];
  protected dataSource: MatTableDataSource<IAlertData> = new MatTableDataSource<IAlertData>();

  constructor(private _alertsFetchService: AlertsFetchService, private _alertsParserService: AlertsParserService) {}

  public ngOnInit(): void {
    this._alertsFetchService.fetchRawAlerts().subscribe({
      next: (rawAlerts) => {
        this.dataSource.data = this._alertsParserService.parseAlerts(rawAlerts).map((alert: IAlertData) => {
          const emoji: string = alert.Title.includes('ירי רקטות וטילים') ? '🚀' : '✈️';
          return {
            ...alert,
            Title: `${alert.Title} ${emoji}`,
          };
        });
      },
      error: (error) => {
        console.error("API fetch failed, using mock data", error.message);
        this.dataSource.data = this._alertsFetchService.getMockAlerts().map((alert: IAlertData) => {
          const emoji: string = alert.Title.includes('ירי רקטות וטילים') ? '🚀' : '✈️';
          return {
            ...alert,
            Title: `${alert.Title} ${emoji}`,
          };
        });
      },
    });
  }
}
