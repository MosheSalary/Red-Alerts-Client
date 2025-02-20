import {Component, OnInit} from '@angular/core';
import 'ol/ol.css';
import Map from 'ol/Map';
import {MapService} from "../../services/map.service";
import {MapLayerService} from "../../services/map-layer.service";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import {IAlertData} from "../../interfaces/alert-data.interface";
import {AlertsFetchService} from "../../services/alerts-fetch.service";
import {HttpClient} from "@angular/common/http";
import {AlertsParserService} from "../../services/alerts-parser.service";

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.less']
})

export class MapComponent implements OnInit {
  private readonly CENTER_COORDS: [number, number] = [34.8516, 31.0461];
  private readonly ZOOM: number = 7.5;
  private readonly GEO_JSON_PATH: string = 'assets/IsraelPolygons.geojson';
  private readonly MARKER_PNG_PATH: string = 'assets/map-marker.png';
  private readonly MARKER_SCALE: number = 0.04;
  private readonly MARKER_ANCHOR: number[] = [0.5, 0.5];
  private readonly ZINDEX: number = 100;

  public map!: Map;
  private _vectorSource: VectorSource = new VectorSource();
  private _vectorLayer: VectorLayer = new VectorLayer();

  constructor(private _mapService: MapService,
               private _layerService: MapLayerService,
               private _alertsFetchService: AlertsFetchService,
              private _alertsParserService: AlertsParserService,
              private _http: HttpClient) {}

  public ngOnInit(): void {
    this.map = this._mapService.createMap('map', this.CENTER_COORDS, this.ZOOM);
    const tileLayer: TileLayer<any> = this._layerService.createTileLayer();
    this.map.addLayer(tileLayer);

    this._http.get(this.GEO_JSON_PATH).subscribe((geoJsonData:any) => {
      const vectorLayer: VectorLayer<VectorSource<any>, any> = this._layerService.createVectorLayerFromFile(geoJsonData);
      this.map.addLayer(vectorLayer);
    });

    this.loadAlerts();
  }

  private loadAlerts(): void {
    this._alertsFetchService.fetchRawAlerts().subscribe({
      next: (rawAlerts: any) => {
        const alerts: IAlertData[] = this._alertsParserService.parseAlerts(rawAlerts);
        this.addMarkersForAlerts(alerts);
      },
      error: (error: Error) => {
        console.error('API fetch failed, using mock data', error.message);
        this.addMarkersForAlerts(this._alertsFetchService.getMockAlerts());
      },
    });
  }

  private addMarkersForAlerts(alerts: IAlertData[]): void {
    alerts.forEach((alert: IAlertData) => {
      this._mapService.geocodeCity(alert.City).then((coords: [number,number] | undefined) => {
        if (coords) {
          this._layerService.addMarker(this._vectorSource, coords, alert, this.MARKER_PNG_PATH, this.MARKER_SCALE, this.MARKER_ANCHOR);
        }
      });
    });

    this._vectorLayer.setSource(this._vectorSource);
    this._vectorLayer.setZIndex(this.ZINDEX);
    this.map.addLayer(this._vectorLayer);
  }
}
