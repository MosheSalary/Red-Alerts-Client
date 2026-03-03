import {Component, OnInit} from '@angular/core';
import 'ol/ol.css';
import Map from 'ol/Map';
import {MapService} from "../../services/map/map.service";
import {MapLayerService} from "../../services/map/map-layer.service";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import {IAlertData} from "../../interfaces/alert-data.interface";
import {AlertsFetchService} from "../../services/alerts/alerts-fetch.service";
import {HttpClient} from "@angular/common/http";
import {AlertsParserService} from "../../services/alerts/alerts-parser.service";
import {fromLonLat} from "ol/proj";

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
  private readonly Z_INDEX: number = 100;

  public map!: Map;
  private _vectorSource: VectorSource = new VectorSource();
  private _vectorLayer: VectorLayer = new VectorLayer();
  private _layerAdded: boolean = false;

  constructor(private _mapService: MapService,
               private _layerService: MapLayerService,
               private _alertsFetchService: AlertsFetchService,
              private _alertsParserService: AlertsParserService,
              private _http: HttpClient) {}

  get vectorSource(): VectorSource {
    return this._vectorSource;
  }

  set vectorSource(value: VectorSource) {
    this._vectorSource = value;
  }

  get vectorLayer(): VectorLayer {
    return this._vectorLayer;
  }

  set vectorLayer(value: VectorLayer) {
    this._vectorLayer = value;
  }

  get layerAdded(): boolean {
    return this._layerAdded;
  }

  set layerAdded(value: boolean) {
    this._layerAdded = value;
  }

  public ngOnInit(): void {
    this.map = this._mapService.createMap('map', this.CENTER_COORDS, this.ZOOM);
    const tileLayer: TileLayer<any> = this._layerService.createTileLayer();
    this.map.addLayer(tileLayer);

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
          this._layerService.addMarker(this.vectorSource, coords, alert, this.MARKER_PNG_PATH, this.MARKER_SCALE, this.MARKER_ANCHOR);
        }
      });
    });

    this.vectorLayer.setSource(this.vectorSource);
    this.vectorLayer.setZIndex(this.Z_INDEX);
    this.map.addLayer(this.vectorLayer);
  }

  public centerMap(): void {
    if (this.map) {
      this.map.getView().animate({
        center: fromLonLat(this.CENTER_COORDS),
        zoom: this.ZOOM,
        duration: 1000,
      });
    }
  }

  public turnLayer(): void {
    if (this.layerAdded && this.vectorLayer) {
      this.map.removeLayer(this.vectorLayer);
      this.layerAdded = false;
    } else {
      this._http.get(this.GEO_JSON_PATH).subscribe((geoJsonData: any) => {
        this.vectorLayer = this._layerService.createVectorLayerFromFile(geoJsonData);
        this.map.addLayer(this.vectorLayer);
        this.layerAdded = true;
      });
    }
  }
}
