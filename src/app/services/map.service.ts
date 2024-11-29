import {Injectable, Input} from '@angular/core';
import OLMap from 'ol/Map';
import View from 'ol/View';
import {fromLonLat} from 'ol/proj';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  @Input() maxZoom: number = 18;

  constructor() {}

  public createMap(target: string, center: [number, number], zoom: number): OLMap {
    return new OLMap({
      target,
      view: new View({
        center: fromLonLat(center),
        zoom,
        maxZoom: this.maxZoom,
      }),
    });
  }
}
