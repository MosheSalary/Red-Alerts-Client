import {Component, OnInit} from '@angular/core';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import {OSM, StadiaMaps} from 'ol/source';
import TileLayer from 'ol/layer/Tile';
import {fromLonLat} from "ol/proj";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import {GeoJSON} from "ol/format";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.less'
})

export class MapComponent implements OnInit {
  public map!: Map

  ngOnInit(): void {
    this.map = new Map({
      layers: [
        new TileLayer({
          // source: new OSM(),
          source: new StadiaMaps({
            layer: 'alidade_smooth_dark',
            retina: true,
          }),
        }),
        new VectorLayer({
          source: new VectorSource({
            url: 'assets/IsraelPolygons.geojson',
            format: new GeoJSON()
          }),
        }),
      ],
      target: 'map',
      view: new View({
        center: fromLonLat([34.8516, 31.0461]),
        zoom: 7.5,
        maxZoom: 18,
      }),
    });
  }
}
