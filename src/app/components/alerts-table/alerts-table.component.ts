import {Component, OnInit} from '@angular/core';
import {AlertsService} from '../../services/alerts.service';
import {MatTableDataSource} from '@angular/material/table';
import {IAlertData} from "../../interfaces/alert-data.interface";
import {EAlertColumns} from "../../enums/alert-columns.enum";

@Component({
  selector: 'app-alerts-table',
  templateUrl: './alerts-table.component.html',
  styleUrls: ['./alerts-table.component.less']
})

export class AlertsTableComponent implements OnInit {

  displayedColumns: string[] = [EAlertColumns.Num,EAlertColumns.Date, EAlertColumns.City, EAlertColumns.Title];
  dataSource: MatTableDataSource<IAlertData> = new MatTableDataSource<IAlertData>();

  constructor(private _alertService: AlertsService) {}

  ngOnInit(): void {
    this._alertService.get24HAlerts().subscribe(
      (response: any) => {
        this.dataSource.data = response.map((alert: any) => {
          let emoji = alert.title.includes('ירי רקטות וטילים') ? '🚀' : '✈️';
          return {
            Date: alert.alertDate,
            City: alert.data,
            Title: `${alert.title} ${emoji}`
          };
        });
      },
      (error: any) => {
        console.error(error.message);
      }
    );
  }

  public applyFilter(event: Event): void {
    const filterValue: string = (event.target as HTMLInputElement).value;
    this.dataSource.filter  = filterValue.trim().toLowerCase();
  }
}
