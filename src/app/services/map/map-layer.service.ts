import {Injectable} from '@angular/core';
import TileLayer from "ol/layer/Tile";
import {StadiaMaps} from "ol/source";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import {GeoJSON} from "ol/format";
import {Feature} from "ol";
import {Geometry, Point} from "ol/geom";
import {Icon, Style} from "ol/style";
import {IAlertData} from "../../interfaces/alert-data.interface";

@Injectable({
  providedIn: 'root'
})
export class MapLayerService {

  private readonly LAYER_NAME: string = 'alidade_smooth_dark'

  constructor() {}

  public createTileLayer(): TileLayer<any> {
    return new TileLayer({
      source: new StadiaMaps({
        layer: this.LAYER_NAME,
        retina: true,
      }),
    });
  }

  public createVectorLayerFromFile(geoJsonData: any): VectorLayer {
    const vectorSource: VectorSource<Feature<Geometry>> = new VectorSource({
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

  public addMarker(vectorSource: VectorSource, coords: [number, number], alert: IAlertData, markerPngPath: string, markerScale: number, markerAnchor: number[]): void {
    const feature: Feature<Point> = new Feature({
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
