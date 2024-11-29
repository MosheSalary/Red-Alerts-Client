import {NgModule} from '@angular/core';
import {BrowserModule, provideClientHydration} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {MapComponent} from './components/map/map.component';
import {FormsModule} from "@angular/forms";
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
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
import {AlertsTableComponent} from './components/alerts-table/alerts-table.component';
import {CdkVirtualScrollViewport, ScrollingModule} from "@angular/cdk/scrolling";
import {HeaderComponent} from './components/header/header.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    AlertsTableComponent,
    HeaderComponent
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
    BrowserAnimationsModule,
    ScrollingModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
