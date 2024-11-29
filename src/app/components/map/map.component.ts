import {Component, Input, OnInit} from '@angular/core';
import 'ol/ol.css';
import Map from 'ol/Map';
import {MapService} from "../../services/map.service";
import {MapLayerService} from "../../services/map-layer.service";
import {HttpClient} from "@angular/common/http";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.less']
})

export class MapComponent implements OnInit {
  @Input() center: [number, number] = [34.8516, 31.0461];
  @Input() zoom: number = 7.5;
  @Input() geoJsonPath: string = 'assets/IsraelPolygons.geojson';

  public map!: Map;

  constructor(private _mapService: MapService,
              private _layerService: MapLayerService,
              private _http: HttpClient) {}

  public ngOnInit(): void {
    this.map = this._mapService.createMap('map', this.center, this.zoom);

    const tileLayer: TileLayer<any> = this._layerService.createTileLayer();
    this.map.addLayer(tileLayer);

    // TODO This part of code load the geoJson file and make the map very slow...
    // this._http.get(this.geoJsonPath).subscribe((geoJsonData:any) => {
    //   const vectorLayer: VectorLayer<VectorSource<any>, any> = this._layerService.createVectorLayerFromFile(geoJsonData);
    //   this.map.addLayer(vectorLayer);
    // });
  }
}
