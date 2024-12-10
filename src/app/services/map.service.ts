import {Injectable, Input} from '@angular/core';
import OLMap from 'ol/Map';
import View from 'ol/View';
import {fromLonLat} from 'ol/proj';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class MapService {
  @Input() maxZoom: number = 18;

  constructor(private _http: HttpClient) {}

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

  public async geocodeCity(city: string): Promise<[number, number] | null> {
    const geocodeUrl = `${environment.geocodeBaseUrl}${encodeURIComponent(city)}, Israel`;
    try {
      const results = await this._http.get<any[]>(geocodeUrl).toPromise();
      if (results && results[0]) {
        const { lat, lon } = results[0];
        return [parseFloat(lon), parseFloat(lat)];
      }
      return null;
    } catch (error) {
      console.error(`Geocoding failed for city: ${city}`, error);
      return null;
    }
  }
}
