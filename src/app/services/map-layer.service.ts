import {Injectable} from '@angular/core';
import TileLayer from "ol/layer/Tile";
import {StadiaMaps} from "ol/source";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import {GeoJSON} from "ol/format";
import {Feature} from "ol";
import {Point} from "ol/geom";
import {Icon, Style} from "ol/style";

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

  public createVectorLayerFromFile(geoJsonData: any): VectorLayer {
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
  public addMarker(vectorSource: VectorSource, coords: [number, number], alert: any, markerPngPath: string, markerScale: number, markerAnchor: number[]): void {
    const feature = new Feature({
      geometry: new Point(coords).transform('EPSG:4326', 'EPSG:3857'),
      alert,
    });

    feature.setStyle(
      new Style({
        image: new Icon({
          src: markerPngPath,
          scale: markerScale,
          anchor: markerAnchor,
        }),
      })
    );

    vectorSource.addFeature(feature);
  }
}
