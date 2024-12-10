import {Component, Input, OnInit} from '@angular/core';
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

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.less']
})

export class MapComponent implements OnInit {
  @Input() center: [number, number] = [34.8516, 31.0461];
  @Input() zoom: number = 7.5;
  @Input() geoJsonPath: string = 'assets/IsraelPolygons.geojson';
  @Input() markerPngPath: string = 'assets/map-marker.png';
  @Input() markerScale: number = 0.04;
  @Input() markerAnchor: number[] = [0.5, 0.5];
  @Input() zIndex: number = 100;

  public map!: Map;
  private _vectorSource: VectorSource = new VectorSource();
  private _vectorLayer: VectorLayer = new VectorLayer();

  constructor(private _mapService: MapService,
               private _layerService: MapLayerService,
               private _alertsFetchService: AlertsFetchService,
              private _http: HttpClient) {}

  public ngOnInit(): void {
    this.map = this._mapService.createMap('map', this.center, this.zoom);
    const tileLayer: TileLayer<any> = this._layerService.createTileLayer();
    this.map.addLayer(tileLayer);

    this._http.get(this.geoJsonPath).subscribe((geoJsonData:any) => {
      const vectorLayer: VectorLayer<VectorSource<any>, any> = this._layerService.createVectorLayerFromFile(geoJsonData);
      this.map.addLayer(vectorLayer);
    });

    this.loadAlerts();
  }

  private loadAlerts(): void {
    this._alertsFetchService.fetchRawAlerts().subscribe({
      next: (rawAlerts) => {
        const alerts: IAlertData[] = rawAlerts.map((alert: any) => ({
          Date: alert.alertDate,
          City: alert.data,
          Title: alert.title,
        }));
        this.addMarkersForAlerts(alerts);
      },
      error: (error) => {
        console.error('API fetch failed, using mock data', error.message);
        this.addMarkersForAlerts(this._alertsFetchService.getMockAlerts());
      },
    });
  }

  private addMarkersForAlerts(alerts: IAlertData[]): void {
    alerts.forEach((alert) => {
      this._mapService.geocodeCity(alert.City).then((coords) => {
        if (coords) {
          this._layerService.addMarker(this._vectorSource, coords, alert, this.markerPngPath, this.markerScale, this.markerAnchor);
        }
      });
    });

    this._vectorLayer.setSource(this._vectorSource);
    this._vectorLayer.setZIndex(this.zIndex);
    this.map.addLayer(this._vectorLayer);
  }
}
