import {Injectable} from '@angular/core';
import TileLayer from "ol/layer/Tile";
import {StadiaMaps} from "ol/source";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import {GeoJSON} from "ol/format";

@Injectable({
  providedIn: 'root'
})
export class MapLayerService {

  constructor() {}

  public createTileLayer(): TileLayer<any> {
    return new TileLayer({
      source: new StadiaMaps({
        layer: 'alidade_smooth_dark',
        retina: true,
      }),
    });
  }

  createVectorLayerFromFile(geoJsonData: any): VectorLayer {
    const vectorSource = new VectorSource({
      format: new GeoJSON(),
      features: new GeoJSON().readFeatures(geoJsonData, {
        dataProjection: 'EPSG:4326',
        featureProjection: 'EPSG:3857',
      }),
    });

    return new VectorLayer({
      source: vectorSource,
    });
  }
}
