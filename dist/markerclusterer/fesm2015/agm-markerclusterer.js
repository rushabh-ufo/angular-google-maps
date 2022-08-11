import { __awaiter } from 'tslib';
import { MarkerManager, GoogleMapsAPIWrapper, InfoWindowManager, AgmCoreModule } from '@agm/core';
import { Injectable, NgZone, EventEmitter, Directive, Input, Output, NgModule } from '@angular/core';
import MarkerClusterer from '@google/markerclustererplus';
import { Observable } from 'rxjs';

class ClusterManager extends MarkerManager {
    constructor(_mapsWrapper, _zone) {
        super(_mapsWrapper, _zone);
        this._mapsWrapper = _mapsWrapper;
        this._zone = _zone;
        this._clustererInstance = new Promise((resolver) => {
            this._resolver = resolver;
        });
    }
    init(options) {
        this._mapsWrapper.getNativeMap().then(map => {
            const clusterer = new MarkerClusterer(map, [], options);
            this._resolver(clusterer);
        });
    }
    getClustererInstance() {
        return this._clustererInstance;
    }
    addMarker(markerDirective) {
        const clusterPromise = this.getClustererInstance();
        const markerPromise = this._mapsWrapper
            .createMarker({
            position: {
                lat: markerDirective.latitude,
                lng: markerDirective.longitude,
            },
            label: markerDirective.label,
            draggable: markerDirective.draggable,
            icon: markerDirective.iconUrl,
            opacity: markerDirective.opacity,
            visible: markerDirective.visible,
            zIndex: markerDirective.zIndex,
            title: markerDirective.title,
            clickable: markerDirective.clickable,
        }, false);
        Promise
            .all([clusterPromise, markerPromise])
            .then(([cluster, marker]) => cluster.addMarker(marker));
        this._markers.set(markerDirective, markerPromise);
    }
    deleteMarker(marker) {
        const markerPromise = this._markers.get(marker);
        if (markerPromise == null) {
            // marker already deleted
            return Promise.resolve();
        }
        return markerPromise.then((m) => {
            this._zone.run(() => {
                m.setMap(null);
                this.getClustererInstance().then(cluster => {
                    cluster.removeMarker(m);
                    this._markers.delete(marker);
                });
            });
        });
    }
    clearMarkers() {
        return this.getClustererInstance().then(cluster => {
            cluster.clearMarkers();
        });
    }
    setGridSize(c) {
        this.getClustererInstance().then(cluster => {
            cluster.setGridSize(c.gridSize);
        });
    }
    setMaxZoom(c) {
        this.getClustererInstance().then(cluster => {
            cluster.setMaxZoom(c.maxZoom);
        });
    }
    setStyles(c) {
        this.getClustererInstance().then(cluster => {
            cluster.setStyles(c.styles);
        });
    }
    setZoomOnClick(c) {
        this.getClustererInstance().then(cluster => {
            if (c.zoomOnClick !== undefined) {
                cluster.setZoomOnClick(c.zoomOnClick);
            }
        });
    }
    setAverageCenter(c) {
        this.getClustererInstance().then(cluster => {
            if (c.averageCenter !== undefined) {
                cluster.setAverageCenter(c.averageCenter);
            }
        });
    }
    setImagePath(c) {
        this.getClustererInstance().then(cluster => {
            if (c.imagePath !== undefined) {
                cluster.setImagePath(c.imagePath);
            }
        });
    }
    setMinimumClusterSize(c) {
        this.getClustererInstance().then(cluster => {
            if (c.minimumClusterSize !== undefined) {
                cluster.setMinimumClusterSize(c.minimumClusterSize);
            }
        });
    }
    setImageExtension(c) {
        this.getClustererInstance().then(cluster => {
            if (c.imageExtension !== undefined) {
                cluster.setImageExtension(c.imageExtension);
            }
        });
    }
    createClusterEventObservable(eventName) {
        return new Observable((subscriber) => {
            this._zone.runOutsideAngular(() => {
                this._clustererInstance.then((m) => {
                    m.addListener(eventName, (e) => this._zone.run(() => subscriber.next(e)));
                });
            });
        });
    }
    setCalculator(c) {
        this.getClustererInstance().then(cluster => {
            if (typeof c.calculator === 'function') {
                cluster.setCalculator(c.calculator);
            }
        });
    }
    setClusterClass(c) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof c.clusterClass !== 'undefined') {
                const instance = yield this.getClustererInstance();
                instance.setClusterClass(c.clusterClass);
            }
        });
    }
    setEnableRetinaIcons(c) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof c.enableRetinaIcons !== 'undefined') {
                const instance = yield this.getClustererInstance();
                instance.setEnableRetinaIcons(c.enableRetinaIcons);
            }
        });
    }
    setIgnoreHidden(c) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof c.ignoreHidden !== 'undefined') {
                const instance = yield this.getClustererInstance();
                instance.setIgnoreHidden(c.ignoreHidden);
            }
        });
    }
    setImageSizes(c) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof c.imageSizes !== 'undefined') {
                const instance = yield this.getClustererInstance();
                instance.setImageSizes(c.imageSizes);
            }
        });
    }
    setTitle(c) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof c.title !== 'undefined') {
                const instance = yield this.getClustererInstance();
                instance.setTitle(c.title);
            }
        });
    }
}
ClusterManager.decorators = [
    { type: Injectable }
];
ClusterManager.ctorParameters = () => [
    { type: GoogleMapsAPIWrapper },
    { type: NgZone }
];

// tslint:disable: jsdoc-format
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
// tslint:enable: jsdoc-format
class AgmMarkerCluster {
    constructor(_clusterManager) {
        this._clusterManager = _clusterManager;
        this.clusterClick = new EventEmitter();
        this._observableSubscriptions = [];
    }
    /** @internal */
    ngOnDestroy() {
        this._clusterManager.clearMarkers();
        this._observableSubscriptions.forEach((s) => s.unsubscribe());
    }
    /** @internal */
    ngOnChanges(changes) {
        // tslint:disable: no-string-literal
        if (changes['gridSize']) {
            this._clusterManager.setGridSize(this);
        }
        if (changes['maxZoom']) {
            this._clusterManager.setMaxZoom(this);
        }
        if (changes['zoomOnClick']) {
            this._clusterManager.setZoomOnClick(this);
        }
        if (changes['averageCenter']) {
            this._clusterManager.setAverageCenter(this);
        }
        if (changes['minimumClusterSize']) {
            this._clusterManager.setMinimumClusterSize(this);
        }
        if (changes['imagePath']) {
            this._clusterManager.setImagePath(this);
        }
        if (changes['imageExtension']) {
            this._clusterManager.setImageExtension(this);
        }
        if (changes['calculator']) {
            this._clusterManager.setCalculator(this);
        }
        if (changes['styles']) {
            this._clusterManager.setStyles(this);
        }
        if (changes['clusterClass']) {
            this._clusterManager.setClusterClass(this);
        }
        if (changes['enableRetinaIcons']) {
            this._clusterManager.setEnableRetinaIcons(this);
        }
        if (changes['ignoreHidden']) {
            this._clusterManager.setIgnoreHidden(this);
        }
        if (changes['imageSizes']) {
            this._clusterManager.setImageSizes(this);
        }
        if (changes['title']) {
            this._clusterManager.setTitle(this);
        }
        // tslint:enable: no-string-literal
    }
    _addEventListeners() {
        const handlers = [
            {
                name: 'clusterclick',
                handler: () => this.clusterClick.emit(),
            },
        ];
        handlers.forEach((obj) => {
            const os = this._clusterManager.createClusterEventObservable(obj.name).subscribe(obj.handler);
            this._observableSubscriptions.push(os);
        });
    }
    /** @internal */
    ngOnInit() {
        this._addEventListeners();
        this._clusterManager.init({
            averageCenter: this.averageCenter,
            calculator: this.calculator,
            clusterClass: this.clusterClass,
            enableRetinaIcons: this.enableRetinaIcons,
            gridSize: this.gridSize,
            ignoreHidden: this.ignoreHidden,
            imageExtension: this.imageExtension,
            imagePath: this.imagePath,
            imageSizes: this.imageSizes,
            maxZoom: this.maxZoom,
            minimumClusterSize: this.minimumClusterSize,
            styles: this.styles,
            title: this.title,
            zoomOnClick: this.zoomOnClick,
        });
    }
}
AgmMarkerCluster.decorators = [
    { type: Directive, args: [{
                selector: 'agm-marker-cluster',
                providers: [
                    ClusterManager,
                    { provide: MarkerManager, useExisting: ClusterManager },
                    InfoWindowManager,
                ],
            },] }
];
AgmMarkerCluster.ctorParameters = () => [
    { type: ClusterManager }
];
AgmMarkerCluster.propDecorators = {
    gridSize: [{ type: Input }],
    maxZoom: [{ type: Input }],
    zoomOnClick: [{ type: Input }],
    averageCenter: [{ type: Input }],
    minimumClusterSize: [{ type: Input }],
    styles: [{ type: Input }],
    calculator: [{ type: Input }],
    imagePath: [{ type: Input }],
    imageExtension: [{ type: Input }],
    clusterClass: [{ type: Input }],
    enableRetinaIcons: [{ type: Input }],
    ignoreHidden: [{ type: Input }],
    imageSizes: [{ type: Input }],
    title: [{ type: Input }],
    clusterClick: [{ type: Output }]
};

class AgmMarkerClustererModule {
}
AgmMarkerClustererModule.decorators = [
    { type: NgModule, args: [{
                imports: [AgmCoreModule],
                declarations: [AgmMarkerCluster],
                exports: [AgmMarkerCluster],
            },] }
];

/*
 * Public API Surface of markerclusterer
 */

/**
 * Generated bundle index. Do not edit.
 */

export { AgmMarkerCluster, AgmMarkerClustererModule, ClusterManager };
//# sourceMappingURL=agm-markerclusterer.js.map
