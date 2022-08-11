import { AgmMarker, GoogleMapsAPIWrapper, MarkerManager } from '@agm/core';
import { NgZone } from '@angular/core';
import { MarkerClustererOptions } from '@google/markerclustererplus';
import MarkerClusterer from '@google/markerclustererplus';
import { Observable } from 'rxjs';
import { AgmMarkerCluster } from '../../directives/marker-cluster';
export declare class ClusterManager extends MarkerManager {
    protected _mapsWrapper: GoogleMapsAPIWrapper;
    protected _zone: NgZone;
    private _clustererInstance;
    private _resolver;
    constructor(_mapsWrapper: GoogleMapsAPIWrapper, _zone: NgZone);
    init(options: MarkerClustererOptions): void;
    getClustererInstance(): Promise<MarkerClusterer>;
    addMarker(markerDirective: AgmMarker): void;
    deleteMarker(marker: AgmMarker): Promise<void>;
    clearMarkers(): Promise<void>;
    setGridSize(c: AgmMarkerCluster): void;
    setMaxZoom(c: AgmMarkerCluster): void;
    setStyles(c: AgmMarkerCluster): void;
    setZoomOnClick(c: AgmMarkerCluster): void;
    setAverageCenter(c: AgmMarkerCluster): void;
    setImagePath(c: AgmMarkerCluster): void;
    setMinimumClusterSize(c: AgmMarkerCluster): void;
    setImageExtension(c: AgmMarkerCluster): void;
    createClusterEventObservable<T>(eventName: string): Observable<T>;
    setCalculator(c: AgmMarkerCluster): void;
    setClusterClass(c: AgmMarkerCluster): Promise<void>;
    setEnableRetinaIcons(c: AgmMarkerCluster): Promise<void>;
    setIgnoreHidden(c: AgmMarkerCluster): Promise<void>;
    setImageSizes(c: AgmMarkerCluster): Promise<void>;
    setTitle(c: AgmMarkerCluster): Promise<void>;
}
