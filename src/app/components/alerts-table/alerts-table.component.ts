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

  private mockAlerts: IAlertData[] = [
    { Date: '2024-10-29 20:43:51', City: 'תל אביב', Title: 'ירי רקטות וטילים' },
    { Date: '2024-11-1 10:13:32', City: 'חיפה', Title: 'חדירת כלי טיס עוין' },
    { Date: '2024-10-30 15:59:02', City: 'נתניה', Title: 'ירי רקטות וטילים' },
  ];

  constructor(private _alertsFetchService: AlertsFetchService, private _alertsParserService: AlertsParserService) {}

  public ngOnInit(): void {
    this._alertsFetchService.fetchRawAlerts().subscribe(
      (rawAlerts: any) => {
        this.dataSource.data = this._alertsParserService.parseAlerts(rawAlerts).map((alert: IAlertData) => {
          const emoji: string = alert.Title.includes('ירי רקטות וטילים') ? '🚀' : '✈️';
          return {
            ...alert,
            Title: `${alert.Title} ${emoji}`,
          };
        });
      },
      (error: any) => {
        console.error(error.message);
      }
    );
  }

  // TODO: For run the mockData:
  // public ngOnInit(): void {
  //   this.dataSource.data = this.mockAlerts.map((alert: IAlertData) => {
  //     const emoji: string = alert.Title.includes('ירי רקטות וטילים') ? '🚀' : '✈️';
  //     return {
  //       Date: alert.Date,
  //       City: alert.City,
  //       Title: `${alert.Title} ${emoji}`,
  //     };
  //   });
  // }
}
