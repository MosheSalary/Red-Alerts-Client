import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'map-buttons',
  templateUrl: './map-buttons.component.html',
  styleUrl: './map-buttons.component.less'
})
export class MapButtonsComponent {

  @Output() centerMapEvent: EventEmitter<void> = new EventEmitter<void>();
  @Output() addLayerEvent: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  public centerMap(): void {
    this.centerMapEvent.emit();
  }

  public addLayer(): void {
    this.addLayerEvent.emit();
  }
}
