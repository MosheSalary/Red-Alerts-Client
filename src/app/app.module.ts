import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";
import { MapComponent } from './components/map/map.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatTableModule } from "@angular/material/table";
import { MatInputModule } from "@angular/material/input";
import { ScrollingModule } from "@angular/cdk/scrolling";
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatSelectModule } from "@angular/material/select";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { MatIconModule } from "@angular/material/icon";
import { MatRadioModule } from "@angular/material/radio";   // ✅ needed

import { AlertsTableComponent } from './components/alerts-table/alerts-table.component';
import { HeaderComponent } from './components/header/header.component';
import { MapButtonsComponent } from './components/map-buttons/map-buttons.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    AlertsTableComponent,
    HeaderComponent,
    MapButtonsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ScrollingModule,

    MatFormFieldModule,
    MatTableModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatRadioModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
