import { EventEmitter, OnChanges, OnDestroy, OnInit, SimpleChange } from '@angular/core';
import { ClusterIconStyle, MarkerClustererOptions } from '@google/markerclustererplus';
import { Calculator } from '@google/markerclustererplus/dist/markerclusterer';
import { ClusterManager } from '../services/managers/cluster-manager';
/**
 * AgmMarkerCluster clusters map marker if they are near together
 *
 * ### Example
```typescript
import { Component } from '@angular/core';

@Component({
 selector: 'my-map-cmp',
 styles: [`
   agm-map {
     height: 300px;
   }
 `],
 template: `
   <agm-map [latitude]="lat" [longitude]="lng" [zoom]="zoom">
     <agm-marker-cluster>
       <agm-marker [latitude]="lat" [longitude]="lng" [label]="'M'">
       </agm-marker>
       <agm-marker [latitude]="lat2" [longitude]="lng2" [label]="'N'">
       </agm-marker>
     </agm-marker-cluster>
   </agm-map>
 `
})
```
 */
export declare class AgmMarkerCluster implements OnDestroy, OnChanges, OnInit, MarkerClustererOptions {
    private _clusterManager;
    /**
     * The grid size of a cluster in pixels
     */
    gridSize: number;
    /**
     * The maximum zoom level that a marker can be part of a cluster.
     */
    maxZoom: number;
    /**
     * Whether the default behaviour of clicking on a cluster is to zoom into it.
     */
    zoomOnClick: boolean;
    /**
     * Whether the center of each cluster should be the average of all markers in the cluster.
     */
    averageCenter: boolean;
    /**
     * The minimum number of markers to be in a cluster before the markers are hidden and a count is shown.
     */
    minimumClusterSize: number;
    /**
     * An object that has style properties.
     */
    styles: ClusterIconStyle[];
    /**
     * A function that calculates the cluster style and text based on the markers in the cluster.
     */
    calculator: Calculator;
    imagePath: string;
    imageExtension: string;
    /**
     * The name of the CSS class defining general styles for the cluster markers.
     * Use this class to define CSS styles that are not set up by the code that
     * processes the `styles` array.
     *
     * @defaultValue 'cluster'
     */
    clusterClass: string;
    /**
     * Whether to allow the use of cluster icons that have sizes that are some
     * multiple (typically double) of their actual display size. Icons such as
     * these look better when viewed on high-resolution monitors such as Apple's
     * Retina displays. Note: if this property is `true`, sprites cannot be used
     * as cluster icons.
     *
     * @defaultValue false
     */
    enableRetinaIcons: boolean;
    /**
     * Whether to ignore hidden markers in clusters. You may want to set this to
     * `true` to ensure that hidden markers are not included in the marker count
     * that appears on a cluster marker (this count is the value of the `text`
     * property of the result returned by the default `calculator`). If set to
     * `true` and you change the visibility of a marker being clustered, be sure
     * to also call `MarkerClusterer.repaint()`.
     *
     * @defaultValue false
     */
    ignoreHidden: boolean;
    /**
     * An array of numbers containing the widths of the group of
     * `<imagePath><n>.<imageExtension>` image files. (The images are assumed to
     * be square.)
     *
     * @defaultValue [53, 56, 66, 78, 90]
     */
    imageSizes: number[];
    /**
     * The tooltip to display when the mouse moves over a cluster marker.
     * (Alternatively, you can use a custom `calculator` function to specify a
     * different tooltip for each cluster marker.)
     *
     * @defaultValue ''
     */
    title: string;
    clusterClick: EventEmitter<void>;
    private _observableSubscriptions;
    constructor(_clusterManager: ClusterManager);
    /** @internal */
    ngOnDestroy(): void;
    /** @internal */
    ngOnChanges(changes: {
        [key: string]: SimpleChange;
    }): void;
    private _addEventListeners;
    /** @internal */
    ngOnInit(): void;
}
