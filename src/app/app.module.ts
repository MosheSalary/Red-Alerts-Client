import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {AlertsService} from "./services/alerts.service";
import { MapComponent } from './components/map/map.component';
import {FormsModule} from "@angular/forms";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef,
  MatRow, MatRowDef,
  MatTable, MatTableModule
} from "@angular/material/table";
import {MatInput, MatInputModule} from "@angular/material/input";
import { CitysTableComponent } from './components/citys-table/citys-table.component';
import {CdkVirtualScrollViewport, ScrollingModule} from "@angular/cdk/scrolling";

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    CitysTableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatFormField,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatInput,
    MatHeaderRow,
    MatCell,
    MatRow,
    MatCellDef,
    MatRowDef,
    MatHeaderRowDef,
    MatHeaderCellDef,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    CdkVirtualScrollViewport,
    ScrollingModule
  ],
  providers: [
    provideClientHydration(),
    AlertsService,
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
