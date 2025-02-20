import {Injectable} from '@angular/core';
import OLMap from 'ol/Map';
import View from 'ol/View';
import {fromLonLat} from 'ol/proj';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class MapService {
  private readonly MAX_ZOOM: number = 18;

  constructor(private _http: HttpClient) {}

  public createMap(target: string, center: [number, number], zoom: number): OLMap {
    return new OLMap({
      target,
      view: new View({
        center: fromLonLat(center),
        zoom,
        maxZoom: this.MAX_ZOOM,
      }),
    });
  }

  public async geocodeCity(city: string): Promise<[number, number] | undefined> {
    const geocodeUrl = `${environment.geocodeBaseUrl}${encodeURIComponent(city)}, Israel`;
    try {
      const results: any[] | undefined = await this._http.get<any[]>(geocodeUrl).toPromise();
      if (results && results[0]) {
        const { lat, lon } = results[0];
        return [parseFloat(lon), parseFloat(lat)];
      }
      return undefined;
    } catch (error) {
      console.error(`Geocoding failed for city: ${city}`, error);
      return undefined;
    }
  }
}
