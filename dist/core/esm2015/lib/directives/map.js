import { isPlatformServer } from '@angular/common';
import { Component, ContentChildren, Directive, ElementRef, EventEmitter, Inject, Input, NgZone, Output, PLATFORM_ID } from '@angular/core';
import { FitBoundsService } from '../services/fit-bounds';
import { GoogleMapsAPIWrapper } from '../services/google-maps-api-wrapper';
import { CircleManager } from '../services/managers/circle-manager';
import { InfoWindowManager } from '../services/managers/info-window-manager';
import { LayerManager } from '../services/managers/layer-manager';
import { MarkerManager } from '../services/managers/marker-manager';
import { PolygonManager } from '../services/managers/polygon-manager';
import { PolylineManager } from '../services/managers/polyline-manager';
import { RectangleManager } from '../services/managers/rectangle-manager';
import { DataLayerManager } from './../services/managers/data-layer-manager';
import { KmlLayerManager } from './../services/managers/kml-layer-manager';
export class AgmMapControl {
}
AgmMapControl.decorators = [
    { type: Directive }
];
AgmMapControl.propDecorators = {
    position: [{ type: Input }]
};
export class AgmFullscreenControl extends AgmMapControl {
    getOptions() {
        return {
            fullscreenControl: true,
            fullscreenControlOptions: {
                position: this.position && google.maps.ControlPosition[this.position],
            },
        };
    }
}
AgmFullscreenControl.decorators = [
    { type: Directive, args: [{
                selector: 'agm-map agm-fullscreen-control',
                providers: [{ provide: AgmMapControl, useExisting: AgmFullscreenControl }],
            },] }
];
export class AgmMapTypeControl extends AgmMapControl {
    getOptions() {
        return {
            mapTypeControl: true,
            mapTypeControlOptions: {
                position: this.position && google.maps.ControlPosition[this.position],
                style: this.style && google.maps.MapTypeControlStyle[this.style],
                mapTypeIds: this.mapTypeIds && this.mapTypeIds.map(mapTypeId => google.maps.MapTypeId[mapTypeId]),
            },
        };
    }
}
AgmMapTypeControl.decorators = [
    { type: Directive, args: [{
                selector: 'agm-map agm-map-type-control',
                providers: [{ provide: AgmMapControl, useExisting: AgmMapTypeControl }],
            },] }
];
AgmMapTypeControl.propDecorators = {
    mapTypeIds: [{ type: Input }],
    style: [{ type: Input }]
};
export class AgmPanControl extends AgmMapControl {
    getOptions() {
        return {
            panControl: true,
            panControlOptions: {
                position: this.position && google.maps.ControlPosition[this.position],
            },
        };
    }
}
AgmPanControl.decorators = [
    { type: Directive, args: [{
                selector: 'agm-map agm-pan-control',
                providers: [{ provide: AgmMapControl, useExisting: AgmPanControl }],
            },] }
];
export class AgmRotateControl extends AgmMapControl {
    getOptions() {
        return {
            rotateControl: true,
            rotateControlOptions: {
                position: this.position && google.maps.ControlPosition[this.position],
            },
        };
    }
}
AgmRotateControl.decorators = [
    { type: Directive, args: [{
                selector: 'agm-map agm-rotate-control',
                providers: [{ provide: AgmMapControl, useExisting: AgmRotateControl }],
            },] }
];
export class AgmScaleControl extends AgmMapControl {
    getOptions() {
        return {
            scaleControl: true,
        };
    }
}
AgmScaleControl.decorators = [
    { type: Directive, args: [{
                selector: 'agm-map agm-scale-control',
                providers: [{ provide: AgmMapControl, useExisting: AgmScaleControl }],
            },] }
];
export class AgmStreetViewControl extends AgmMapControl {
    getOptions() {
        return {
            streetViewControl: true,
            streetViewControlOptions: {
                position: this.position && google.maps.ControlPosition[this.position],
            },
        };
    }
}
AgmStreetViewControl.decorators = [
    { type: Directive, args: [{
                selector: 'agm-map agm-street-view-control',
                providers: [{ provide: AgmMapControl, useExisting: AgmStreetViewControl }],
            },] }
];
export class AgmZoomControl extends AgmMapControl {
    getOptions() {
        return {
            zoomControl: true,
            zoomControlOptions: {
                position: this.position && google.maps.ControlPosition[this.position],
                style: this.style && google.maps.ZoomControlStyle[this.style],
            },
        };
    }
}
AgmZoomControl.decorators = [
    { type: Directive, args: [{
                selector: 'agm-map agm-zoom-control',
                providers: [{ provide: AgmMapControl, useExisting: AgmZoomControl }],
            },] }
];
AgmZoomControl.propDecorators = {
    style: [{ type: Input }]
};
/**
 * AgmMap renders a Google Map.
 * **Important note**: To be able see a map in the browser, you have to define a height for the
 * element `agm-map`.
 *
 * ### Example
 * ```typescript
 * import { Component } from '@angular/core';
 *
 * @Component({
 *  selector: 'my-map-cmp',
 *  styles: [`
 *    agm-map {
 *      height: 300px;
 *    }
 * `],
 *  template: `
 *    <agm-map [latitude]="lat" [longitude]="lng" [zoom]="zoom">
 *    </agm-map>
 *  `
 * })
 * ```
 */
export class AgmMap {
    constructor(_elem, _mapsWrapper, 
    // tslint:disable-next-line: ban-types
    _platformId, _fitBoundsService, _zone) {
        this._elem = _elem;
        this._mapsWrapper = _mapsWrapper;
        this._platformId = _platformId;
        this._fitBoundsService = _fitBoundsService;
        this._zone = _zone;
        /**
         * The longitude that defines the center of the map.
         */
        this.longitude = 0;
        /**
         * The latitude that defines the center of the map.
         */
        this.latitude = 0;
        /**
         * The zoom level of the map. The default zoom level is 8.
         */
        this.zoom = 8;
        /**
         * Enables/disables if map is draggable.
         */
        // tslint:disable-next-line:no-input-rename
        this.draggable = true;
        /**
         * Enables/disables zoom and center on double click. Enabled by default.
         */
        this.disableDoubleClickZoom = false;
        /**
         * Enables/disables all default UI of the Google map. Please note: When the map is created, this
         * value cannot get updated.
         */
        this.disableDefaultUI = false;
        /**
         * If false, disables scrollwheel zooming on the map. The scrollwheel is enabled by default.
         */
        this.scrollwheel = true;
        /**
         * If false, prevents the map from being controlled by the keyboard. Keyboard shortcuts are
         * enabled by default.
         */
        this.keyboardShortcuts = true;
        /**
         * Styles to apply to each of the default map types. Note that for Satellite/Hybrid and Terrain
         * modes, these styles will only apply to labels and geometry.
         */
        this.styles = [];
        /**
         * When true and the latitude and/or longitude values changes, the Google Maps panTo method is
         * used to
         * center the map. See: https://developers.google.com/maps/documentation/javascript/reference#Map
         */
        this.usePanning = false;
        /**
         * Sets the viewport to contain the given bounds.
         * If this option to `true`, the bounds get automatically computed from all elements that use the {@link AgmFitBounds} directive.
         */
        this.fitBounds = false;
        /**
         * The map mapTypeId. Defaults to 'roadmap'.
         */
        this.mapTypeId = 'ROADMAP';
        /**
         * When false, map icons are not clickable. A map icon represents a point of interest,
         * also known as a POI. By default map icons are clickable.
         */
        this.clickableIcons = true;
        /**
         * A map icon represents a point of interest, also known as a POI.
         * When map icons are clickable by default, an info window is displayed.
         * When this property is set to false, the info window will not be shown but the click event
         * will still fire
         */
        this.showDefaultInfoWindow = true;
        /**
         * This setting controls how gestures on the map are handled.
         * Allowed values:
         * - 'cooperative' (Two-finger touch gestures pan and zoom the map. One-finger touch gestures are not handled by the map.)
         * - 'greedy'      (All touch gestures pan or zoom the map.)
         * - 'none'        (The map cannot be panned or zoomed by user gestures.)
         * - 'auto'        [default] (Gesture handling is either cooperative or greedy, depending on whether the page is scrollable or not.
         */
        this.gestureHandling = 'auto';
        /**
         * Controls the automatic switching behavior for the angle of incidence of
         * the map. The only allowed values are 0 and 45. The value 0 causes the map
         * to always use a 0° overhead view regardless of the zoom level and
         * viewport. The value 45 causes the tilt angle to automatically switch to
         * 45 whenever 45° imagery is available for the current zoom level and
         * viewport, and switch back to 0 whenever 45° imagery is not available
         * (this is the default behavior). 45° imagery is only available for
         * satellite and hybrid map types, within some locations, and at some zoom
         * levels. Note: getTilt returns the current tilt angle, not the value
         * specified by this option. Because getTilt and this option refer to
         * different things, do not bind() the tilt property; doing so may yield
         * unpredictable effects. (Default of AGM is 0 (disabled). Enable it with value 45.)
         */
        this.tilt = 0;
        /**
         * Map ID support
         */
        this.mapId = null;
        this._observableSubscriptions = [];
        /**
         * This event emitter gets emitted when the user clicks on the map (but not when they click on a
         * marker or infoWindow).
         */
        // tslint:disable-next-line: max-line-length
        this.mapClick = new EventEmitter();
        /**
         * This event emitter gets emitted when the user right-clicks on the map (but not when they click
         * on a marker or infoWindow).
         */
        this.mapRightClick = new EventEmitter();
        /**
         * This event emitter gets emitted when the user double-clicks on the map (but not when they click
         * on a marker or infoWindow).
         */
        this.mapDblClick = new EventEmitter();
        /**
         * This event emitter is fired when the map center changes.
         */
        this.centerChange = new EventEmitter();
        /**
         * This event is fired when the viewport bounds have changed.
         */
        this.boundsChange = new EventEmitter();
        /**
         * This event is fired when the mapTypeId property changes.
         */
        this.mapTypeIdChange = new EventEmitter();
        /**
         * This event is fired when the map becomes idle after panning or zooming.
         */
        this.idle = new EventEmitter();
        /**
         * This event is fired when the zoom level has changed.
         */
        this.zoomChange = new EventEmitter();
        /**
         * This event is fired when the google map is fully initialized.
         * You get the google.maps.Map instance as a result of this EventEmitter.
         */
        this.mapReady = new EventEmitter();
        /**
         * This event is fired when the visible tiles have finished loading.
         */
        this.tilesLoaded = new EventEmitter();
    }
    /** @internal */
    ngAfterContentInit() {
        if (isPlatformServer(this._platformId)) {
            // The code is running on the server, do nothing
            return;
        }
        // todo: this should be solved with a new component and a viewChild decorator
        const container = this._elem.nativeElement.querySelector('.agm-map-container-inner');
        this._initMapInstance(container);
    }
    _initMapInstance(el) {
        const mapOption = {
            center: { lat: this.latitude || 0, lng: this.longitude || 0 },
            zoom: this.zoom,
            minZoom: this.minZoom,
            maxZoom: this.maxZoom,
            controlSize: this.controlSize,
            disableDefaultUI: this.disableDefaultUI,
            disableDoubleClickZoom: this.disableDoubleClickZoom,
            scrollwheel: this.scrollwheel,
            backgroundColor: this.backgroundColor,
            draggable: this.draggable,
            draggableCursor: this.draggableCursor,
            draggingCursor: this.draggingCursor,
            keyboardShortcuts: this.keyboardShortcuts,
            styles: this.styles,
            mapTypeId: this.mapTypeId.toLocaleLowerCase(),
            clickableIcons: this.clickableIcons,
            gestureHandling: this.gestureHandling,
            tilt: this.tilt,
            restriction: this.restriction,
        };
        if (this.mapId) {
            mapOption.mapId = this.mapId;
        }
        this._mapsWrapper.createMap(el, mapOption)
            .then(() => this._mapsWrapper.getNativeMap())
            .then(map => this.mapReady.emit(map));
        // register event listeners
        this._handleMapCenterChange();
        this._handleMapZoomChange();
        this._handleMapMouseEvents();
        this._handleBoundsChange();
        this._handleMapTypeIdChange();
        this._handleTilesLoadedEvent();
        this._handleIdleEvent();
        this._handleControlChange();
    }
    /** @internal */
    ngOnDestroy() {
        // unsubscribe all registered observable subscriptions
        this._observableSubscriptions.forEach((s) => s.unsubscribe());
        // remove all listeners from the map instance
        this._mapsWrapper.clearInstanceListeners();
        if (this._fitBoundsSubscription) {
            this._fitBoundsSubscription.unsubscribe();
        }
    }
    /* @internal */
    ngOnChanges(changes) {
        this._updateMapOptionsChanges(changes);
        this._updatePosition(changes);
    }
    _updateMapOptionsChanges(changes) {
        const options = {};
        const optionKeys = Object.keys(changes).filter(k => AgmMap._mapOptionsAttributes.indexOf(k) !== -1);
        optionKeys.forEach((k) => { options[k] = changes[k].currentValue; });
        this._mapsWrapper.setMapOptions(options);
    }
    /**
     * Triggers a resize event on the google map instance.
     * When recenter is true, the of the google map gets called with the current lat/lng values or fitBounds value to recenter the map.
     * Returns a promise that gets resolved after the event was triggered.
     */
    triggerResize(recenter = true) {
        // Note: When we would trigger the resize event and show the map in the same turn (which is a
        // common case for triggering a resize event), then the resize event would not
        // work (to show the map), so we trigger the event in a timeout.
        return new Promise((resolve) => {
            setTimeout(() => {
                return this._mapsWrapper.triggerMapEvent('resize').then(() => {
                    if (recenter) {
                        this.fitBounds != null ? this._fitBounds() : this._setCenter();
                    }
                    resolve();
                });
            });
        });
    }
    _updatePosition(changes) {
        // tslint:disable: no-string-literal
        if (changes['latitude'] == null && changes['longitude'] == null &&
            !changes['fitBounds']) {
            // no position update needed
            return;
        }
        // tslint:enable: no-string-literal
        // we prefer fitBounds in changes
        if ('fitBounds' in changes) {
            this._fitBounds();
            return;
        }
        if (typeof this.latitude !== 'number' || typeof this.longitude !== 'number') {
            return;
        }
        this._setCenter();
    }
    _setCenter() {
        const newCenter = {
            lat: this.latitude,
            lng: this.longitude,
        };
        if (this.usePanning) {
            this._mapsWrapper.panTo(newCenter);
        }
        else {
            this._mapsWrapper.setCenter(newCenter);
        }
    }
    _fitBounds() {
        switch (this.fitBounds) {
            case true:
                this._subscribeToFitBoundsUpdates();
                break;
            case false:
                if (this._fitBoundsSubscription) {
                    this._fitBoundsSubscription.unsubscribe();
                }
                break;
            default:
                if (this._fitBoundsSubscription) {
                    this._fitBoundsSubscription.unsubscribe();
                }
                this._updateBounds(this.fitBounds, this.fitBoundsPadding);
        }
    }
    _subscribeToFitBoundsUpdates() {
        this._zone.runOutsideAngular(() => {
            this._fitBoundsSubscription = this._fitBoundsService.getBounds$().subscribe(b => {
                this._zone.run(() => this._updateBounds(b, this.fitBoundsPadding));
            });
        });
    }
    _updateBounds(bounds, padding) {
        if (!bounds) {
            return;
        }
        if (this._isLatLngBoundsLiteral(bounds) && typeof google !== 'undefined' && google && google.maps && google.maps.LatLngBounds) {
            const newBounds = new google.maps.LatLngBounds();
            newBounds.union(bounds);
            bounds = newBounds;
        }
        if (this.usePanning) {
            this._mapsWrapper.panToBounds(bounds, padding);
            return;
        }
        this._mapsWrapper.fitBounds(bounds, padding);
    }
    _isLatLngBoundsLiteral(bounds) {
        return bounds != null && bounds.extend === undefined;
    }
    _handleMapCenterChange() {
        const s = this._mapsWrapper.subscribeToMapEvent('center_changed').subscribe(() => {
            this._mapsWrapper.getCenter().then((center) => {
                this.latitude = center.lat();
                this.longitude = center.lng();
                this.centerChange.emit({ lat: this.latitude, lng: this.longitude });
            });
        });
        this._observableSubscriptions.push(s);
    }
    _handleBoundsChange() {
        const s = this._mapsWrapper.subscribeToMapEvent('bounds_changed').subscribe(() => {
            this._mapsWrapper.getBounds().then((bounds) => { this.boundsChange.emit(bounds); });
        });
        this._observableSubscriptions.push(s);
    }
    _handleMapTypeIdChange() {
        const s = this._mapsWrapper.subscribeToMapEvent('maptypeid_changed').subscribe(() => {
            this._mapsWrapper.getMapTypeId().then((mapTypeId) => { this.mapTypeIdChange.emit(mapTypeId); });
        });
        this._observableSubscriptions.push(s);
    }
    _handleMapZoomChange() {
        const s = this._mapsWrapper.subscribeToMapEvent('zoom_changed').subscribe(() => {
            this._mapsWrapper.getZoom().then((z) => {
                this.zoom = z;
                this.zoomChange.emit(z);
            });
        });
        this._observableSubscriptions.push(s);
    }
    _handleIdleEvent() {
        const s = this._mapsWrapper.subscribeToMapEvent('idle').subscribe(() => { this.idle.emit(void 0); });
        this._observableSubscriptions.push(s);
    }
    _handleTilesLoadedEvent() {
        const s = this._mapsWrapper.subscribeToMapEvent('tilesloaded').subscribe(() => this.tilesLoaded.emit(void 0));
        this._observableSubscriptions.push(s);
    }
    _handleMapMouseEvents() {
        const events = [
            { name: 'click', emitter: this.mapClick },
            { name: 'rightclick', emitter: this.mapRightClick },
            { name: 'dblclick', emitter: this.mapDblClick },
        ];
        events.forEach(e => {
            const s = this._mapsWrapper.subscribeToMapEvent(e.name).subscribe(([event]) => {
                // the placeId will be undefined in case the event was not an IconMouseEvent (google types)
                if (event.placeId && !this.showDefaultInfoWindow) {
                    event.stop();
                }
                e.emitter.emit(event);
            });
            this._observableSubscriptions.push(s);
        });
    }
    _handleControlChange() {
        this._setControls();
        this.mapControls.changes.subscribe(() => this._setControls());
    }
    _setControls() {
        const controlOptions = {
            fullscreenControl: !this.disableDefaultUI,
            mapTypeControl: false,
            panControl: false,
            rotateControl: false,
            scaleControl: false,
            streetViewControl: !this.disableDefaultUI,
            zoomControl: !this.disableDefaultUI,
        };
        this.mapControls.forEach(control => Object.assign(controlOptions, control.getOptions()));
        this._mapsWrapper.setMapOptions(controlOptions);
    }
}
/**
 * Map option attributes that can change over time
 */
AgmMap._mapOptionsAttributes = [
    'disableDoubleClickZoom', 'scrollwheel', 'draggable', 'draggableCursor', 'draggingCursor',
    'keyboardShortcuts', 'styles', 'zoom', 'minZoom', 'maxZoom', 'mapTypeId', 'clickableIcons',
    'gestureHandling', 'tilt', 'restriction', 'mapId',
];
AgmMap.decorators = [
    { type: Component, args: [{
                selector: 'agm-map',
                providers: [
                    CircleManager,
                    DataLayerManager,
                    DataLayerManager,
                    FitBoundsService,
                    GoogleMapsAPIWrapper,
                    InfoWindowManager,
                    KmlLayerManager,
                    LayerManager,
                    MarkerManager,
                    PolygonManager,
                    PolylineManager,
                    RectangleManager,
                ],
                template: `
              <div class='agm-map-container-inner sebm-google-map-container-inner'></div>
              <div class='agm-map-content'>
                <ng-content></ng-content>
              </div>
  `,
                styles: [`
    .agm-map-container-inner {
      width: inherit;
      height: inherit;
    }
    .agm-map-content {
      display:none;
    }
  `]
            },] }
];
AgmMap.ctorParameters = () => [
    { type: ElementRef },
    { type: GoogleMapsAPIWrapper },
    { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
    { type: FitBoundsService },
    { type: NgZone }
];
AgmMap.propDecorators = {
    longitude: [{ type: Input }],
    latitude: [{ type: Input }],
    zoom: [{ type: Input }],
    minZoom: [{ type: Input }],
    maxZoom: [{ type: Input }],
    controlSize: [{ type: Input }],
    draggable: [{ type: Input, args: ['mapDraggable',] }],
    disableDoubleClickZoom: [{ type: Input }],
    disableDefaultUI: [{ type: Input }],
    scrollwheel: [{ type: Input }],
    backgroundColor: [{ type: Input }],
    draggableCursor: [{ type: Input }],
    draggingCursor: [{ type: Input }],
    keyboardShortcuts: [{ type: Input }],
    styles: [{ type: Input }],
    usePanning: [{ type: Input }],
    fitBounds: [{ type: Input }],
    fitBoundsPadding: [{ type: Input }],
    mapTypeId: [{ type: Input }],
    clickableIcons: [{ type: Input }],
    showDefaultInfoWindow: [{ type: Input }],
    gestureHandling: [{ type: Input }],
    tilt: [{ type: Input }],
    restriction: [{ type: Input }],
    mapId: [{ type: Input }],
    mapClick: [{ type: Output }],
    mapRightClick: [{ type: Output }],
    mapDblClick: [{ type: Output }],
    centerChange: [{ type: Output }],
    boundsChange: [{ type: Output }],
    mapTypeIdChange: [{ type: Output }],
    idle: [{ type: Output }],
    zoomChange: [{ type: Output }],
    mapReady: [{ type: Output }],
    tilesLoaded: [{ type: Output }],
    mapControls: [{ type: ContentChildren, args: [AgmMapControl,] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLmpzIiwic291cmNlUm9vdCI6IkQ6L0F1dG9tYXRpb24vYW5ndWxhci1nb29nbGUtbWFwcy9wYWNrYWdlcy9jb3JlL3NyYy8iLCJzb3VyY2VzIjpbImxpYi9kaXJlY3RpdmVzL21hcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNuRCxPQUFPLEVBQW9CLFNBQVMsRUFBRSxlQUFlLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQXdCLE1BQU0sRUFBRSxXQUFXLEVBQTRCLE1BQU0sZUFBZSxDQUFDO0FBRzlNLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzFELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQzNFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUNwRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUM3RSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDbEUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUN0RSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDeEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDMUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDN0UsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBSzNFLE1BQU0sT0FBZ0IsYUFBYTs7O1lBRGxDLFNBQVM7Ozt1QkFFUCxLQUFLOztBQVFSLE1BQU0sT0FBTyxvQkFBcUIsU0FBUSxhQUFhO0lBQ3JELFVBQVU7UUFDUixPQUFPO1lBQ0wsaUJBQWlCLEVBQUUsSUFBSTtZQUN2Qix3QkFBd0IsRUFBRTtnQkFDeEIsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQzthQUN0RTtTQUNGLENBQUM7SUFDSixDQUFDOzs7WUFaRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGdDQUFnQztnQkFDMUMsU0FBUyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsYUFBYSxFQUFFLFdBQVcsRUFBRSxvQkFBb0IsRUFBRSxDQUFDO2FBQzNFOztBQWVELE1BQU0sT0FBTyxpQkFBa0IsU0FBUSxhQUFhO0lBSWxELFVBQVU7UUFDUixPQUFPO1lBQ0wsY0FBYyxFQUFFLElBQUk7WUFDcEIscUJBQXFCLEVBQUU7Z0JBQ3JCLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7Z0JBQ3JFLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztnQkFDaEUsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQzthQUNsRztTQUNGLENBQUM7SUFDSixDQUFDOzs7WUFqQkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSw4QkFBOEI7Z0JBQ3hDLFNBQVMsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxXQUFXLEVBQUUsaUJBQWlCLEVBQUUsQ0FBQzthQUN4RTs7O3lCQUVFLEtBQUs7b0JBQ0wsS0FBSzs7QUFrQlIsTUFBTSxPQUFPLGFBQWMsU0FBUSxhQUFhO0lBQzlDLFVBQVU7UUFDUixPQUFPO1lBQ0wsVUFBVSxFQUFFLElBQUk7WUFDaEIsaUJBQWlCLEVBQUU7Z0JBQ2pCLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7YUFDdEU7U0FDRixDQUFDO0lBQ0osQ0FBQzs7O1lBWkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSx5QkFBeUI7Z0JBQ25DLFNBQVMsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxXQUFXLEVBQUUsYUFBYSxFQUFFLENBQUM7YUFDcEU7O0FBZ0JELE1BQU0sT0FBTyxnQkFBaUIsU0FBUSxhQUFhO0lBQ2pELFVBQVU7UUFDUixPQUFPO1lBQ0wsYUFBYSxFQUFFLElBQUk7WUFDbkIsb0JBQW9CLEVBQUU7Z0JBQ3BCLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7YUFDdEU7U0FDRixDQUFDO0lBQ0osQ0FBQzs7O1lBWkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSw0QkFBNEI7Z0JBQ3RDLFNBQVMsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxXQUFXLEVBQUUsZ0JBQWdCLEVBQUUsQ0FBQzthQUN2RTs7QUFnQkQsTUFBTSxPQUFPLGVBQWdCLFNBQVEsYUFBYTtJQUNoRCxVQUFVO1FBQ1IsT0FBTztZQUNMLFlBQVksRUFBRSxJQUFJO1NBQ25CLENBQUM7SUFDSixDQUFDOzs7WUFURixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLDJCQUEyQjtnQkFDckMsU0FBUyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsYUFBYSxFQUFFLFdBQVcsRUFBRSxlQUFlLEVBQUUsQ0FBQzthQUN0RTs7QUFhRCxNQUFNLE9BQU8sb0JBQXFCLFNBQVEsYUFBYTtJQUNyRCxVQUFVO1FBQ1IsT0FBTztZQUNMLGlCQUFpQixFQUFFLElBQUk7WUFDdkIsd0JBQXdCLEVBQUU7Z0JBQ3hCLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7YUFDdEU7U0FDRixDQUFDO0lBQ0osQ0FBQzs7O1lBWkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxpQ0FBaUM7Z0JBQzNDLFNBQVMsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxXQUFXLEVBQUUsb0JBQW9CLEVBQUUsQ0FBQzthQUMzRTs7QUFnQkQsTUFBTSxPQUFPLGNBQWUsU0FBUSxhQUFhO0lBRS9DLFVBQVU7UUFDUixPQUFPO1lBQ0wsV0FBVyxFQUFFLElBQUk7WUFDakIsa0JBQWtCLEVBQUU7Z0JBQ2xCLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7Z0JBQ3JFLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQzthQUM5RDtTQUNGLENBQUM7SUFDSixDQUFDOzs7WUFkRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLDBCQUEwQjtnQkFDcEMsU0FBUyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsYUFBYSxFQUFFLFdBQVcsRUFBRSxjQUFjLEVBQUUsQ0FBQzthQUNyRTs7O29CQUVFLEtBQUs7O0FBWVI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FzQkc7QUFpQ0gsTUFBTSxPQUFPLE1BQU07SUF3T2pCLFlBQ1UsS0FBaUIsRUFDakIsWUFBa0M7SUFDMUMsc0NBQXNDO0lBQ1QsV0FBbUIsRUFDdEMsaUJBQW1DLEVBQ3JDLEtBQWE7UUFMYixVQUFLLEdBQUwsS0FBSyxDQUFZO1FBQ2pCLGlCQUFZLEdBQVosWUFBWSxDQUFzQjtRQUViLGdCQUFXLEdBQVgsV0FBVyxDQUFRO1FBQ3RDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFDckMsVUFBSyxHQUFMLEtBQUssQ0FBUTtRQTdPdkI7O1dBRUc7UUFDTSxjQUFTLEdBQUcsQ0FBQyxDQUFDO1FBRXZCOztXQUVHO1FBQ00sYUFBUSxHQUFHLENBQUMsQ0FBQztRQUV0Qjs7V0FFRztRQUNNLFNBQUksR0FBRyxDQUFDLENBQUM7UUFtQmxCOztXQUVHO1FBQ0gsMkNBQTJDO1FBQ3BCLGNBQVMsR0FBRyxJQUFJLENBQUM7UUFFeEM7O1dBRUc7UUFDTSwyQkFBc0IsR0FBRyxLQUFLLENBQUM7UUFFeEM7OztXQUdHO1FBQ00scUJBQWdCLEdBQUcsS0FBSyxDQUFDO1FBRWxDOztXQUVHO1FBQ00sZ0JBQVcsR0FBRyxJQUFJLENBQUM7UUF3QjVCOzs7V0FHRztRQUNNLHNCQUFpQixHQUFHLElBQUksQ0FBQztRQUVsQzs7O1dBR0c7UUFDTSxXQUFNLEdBQStCLEVBQUUsQ0FBQztRQUVqRDs7OztXQUlHO1FBQ00sZUFBVSxHQUFHLEtBQUssQ0FBQztRQUU1Qjs7O1dBR0c7UUFDTSxjQUFTLEdBQXlFLEtBQUssQ0FBQztRQU9qRzs7V0FFRztRQUNNLGNBQVMsR0FBdUMsU0FBUyxDQUFDO1FBRW5FOzs7V0FHRztRQUNNLG1CQUFjLEdBQUcsSUFBSSxDQUFDO1FBRS9COzs7OztXQUtHO1FBQ00sMEJBQXFCLEdBQUcsSUFBSSxDQUFDO1FBRXRDOzs7Ozs7O1dBT0c7UUFDTSxvQkFBZSxHQUF1QyxNQUFNLENBQUM7UUFFcEU7Ozs7Ozs7Ozs7Ozs7V0FhRztRQUNJLFNBQUksR0FBRyxDQUFDLENBQUM7UUFRbEI7O1dBRUc7UUFDTyxVQUFLLEdBQVcsSUFBSSxDQUFDO1FBV3ZCLDZCQUF3QixHQUFtQixFQUFFLENBQUM7UUFHdEQ7OztXQUdHO1FBQ0gsNENBQTRDO1FBQ2xDLGFBQVEsR0FBbUQsSUFBSSxZQUFZLEVBQW9DLENBQUM7UUFFMUg7OztXQUdHO1FBQ08sa0JBQWEsR0FBc0IsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUVyRTs7O1dBR0c7UUFDTyxnQkFBVyxHQUFzQixJQUFJLFlBQVksRUFBTyxDQUFDO1FBRW5FOztXQUVHO1FBQ08saUJBQVksR0FBNEMsSUFBSSxZQUFZLEVBQTZCLENBQUM7UUFFaEg7O1dBRUc7UUFDTyxpQkFBWSxHQUEyQyxJQUFJLFlBQVksRUFBNEIsQ0FBQztRQUU5Rzs7V0FFRztRQUNPLG9CQUFlLEdBQXdDLElBQUksWUFBWSxFQUF5QixDQUFDO1FBRTNHOztXQUVHO1FBQ08sU0FBSSxHQUF1QixJQUFJLFlBQVksRUFBUSxDQUFDO1FBRTlEOztXQUVHO1FBQ08sZUFBVSxHQUF5QixJQUFJLFlBQVksRUFBVSxDQUFDO1FBRXhFOzs7V0FHRztRQUNPLGFBQVEsR0FBc0IsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUVoRTs7V0FFRztRQUNPLGdCQUFXLEdBQXVCLElBQUksWUFBWSxFQUFRLENBQUM7SUFXbEUsQ0FBQztJQUVKLGdCQUFnQjtJQUNoQixrQkFBa0I7UUFDaEIsSUFBSSxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUU7WUFDdEMsZ0RBQWdEO1lBQ2hELE9BQU87U0FDUjtRQUNELDZFQUE2RTtRQUM3RSxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsMEJBQTBCLENBQUMsQ0FBQztRQUNyRixJQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVPLGdCQUFnQixDQUFDLEVBQWU7UUFDdEMsTUFBTSxTQUFTLEdBQVE7WUFDckIsTUFBTSxFQUFFLEVBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsU0FBUyxJQUFJLENBQUMsRUFBQztZQUMzRCxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7WUFDZixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87WUFDckIsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPO1lBQ3JCLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVztZQUM3QixnQkFBZ0IsRUFBRSxJQUFJLENBQUMsZ0JBQWdCO1lBQ3ZDLHNCQUFzQixFQUFFLElBQUksQ0FBQyxzQkFBc0I7WUFDbkQsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXO1lBQzdCLGVBQWUsRUFBRSxJQUFJLENBQUMsZUFBZTtZQUNyQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVM7WUFDekIsZUFBZSxFQUFFLElBQUksQ0FBQyxlQUFlO1lBQ3JDLGNBQWMsRUFBRSxJQUFJLENBQUMsY0FBYztZQUNuQyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsaUJBQWlCO1lBQ3pDLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtZQUNuQixTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsRUFBRTtZQUM3QyxjQUFjLEVBQUUsSUFBSSxDQUFDLGNBQWM7WUFDbkMsZUFBZSxFQUFFLElBQUksQ0FBQyxlQUFlO1lBQ3JDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtZQUNmLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVztTQUM5QixDQUFDO1FBQ0YsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ2QsU0FBUyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1NBQzlCO1FBQ0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsRUFBRSxFQUFFLFNBQVMsQ0FBQzthQUN2QyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsQ0FBQzthQUM1QyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBRXhDLDJCQUEyQjtRQUMzQixJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztRQUM5QixJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztRQUM1QixJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUM3QixJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUMzQixJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztRQUM5QixJQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztRQUMvQixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztJQUM5QixDQUFDO0lBRUQsZ0JBQWdCO0lBQ2hCLFdBQVc7UUFDVCxzREFBc0Q7UUFDdEQsSUFBSSxDQUFDLHdCQUF3QixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7UUFFOUQsNkNBQTZDO1FBQzdDLElBQUksQ0FBQyxZQUFZLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztRQUMzQyxJQUFJLElBQUksQ0FBQyxzQkFBc0IsRUFBRTtZQUMvQixJQUFJLENBQUMsc0JBQXNCLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDM0M7SUFDSCxDQUFDO0lBRUQsZUFBZTtJQUNmLFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDdkMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBRU8sd0JBQXdCLENBQUMsT0FBc0I7UUFDckQsTUFBTSxPQUFPLEdBQThCLEVBQUUsQ0FBQztRQUM5QyxNQUFNLFVBQVUsR0FDZCxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNuRixVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3JFLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsYUFBYSxDQUFDLFdBQW9CLElBQUk7UUFDcEMsNkZBQTZGO1FBQzdGLDhFQUE4RTtRQUM5RSxnRUFBZ0U7UUFDaEUsT0FBTyxJQUFJLE9BQU8sQ0FBTyxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQ25DLFVBQVUsQ0FBQyxHQUFHLEVBQUU7Z0JBQ2QsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO29CQUMzRCxJQUFJLFFBQVEsRUFBRTt3QkFDWixJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7cUJBQ2hFO29CQUNELE9BQU8sRUFBRSxDQUFDO2dCQUNaLENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTyxlQUFlLENBQUMsT0FBc0I7UUFDNUMsb0NBQW9DO1FBQ3BDLElBQUksT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLElBQUksSUFBSSxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksSUFBSTtZQUMzRCxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsRUFBRTtZQUN6Qiw0QkFBNEI7WUFDNUIsT0FBTztTQUNSO1FBQ0QsbUNBQW1DO1FBRW5DLGlDQUFpQztRQUNqQyxJQUFJLFdBQVcsSUFBSSxPQUFPLEVBQUU7WUFDMUIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQ2xCLE9BQU87U0FDUjtRQUVELElBQUksT0FBTyxJQUFJLENBQUMsUUFBUSxLQUFLLFFBQVEsSUFBSSxPQUFPLElBQUksQ0FBQyxTQUFTLEtBQUssUUFBUSxFQUFFO1lBQzNFLE9BQU87U0FDUjtRQUNELElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBRU8sVUFBVTtRQUNoQixNQUFNLFNBQVMsR0FBRztZQUNoQixHQUFHLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDbEIsR0FBRyxFQUFFLElBQUksQ0FBQyxTQUFTO1NBQ3BCLENBQUM7UUFDRixJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDbkIsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDcEM7YUFBTTtZQUNMLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQ3hDO0lBQ0gsQ0FBQztJQUVPLFVBQVU7UUFDaEIsUUFBUSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ3RCLEtBQUssSUFBSTtnQkFDUCxJQUFJLENBQUMsNEJBQTRCLEVBQUUsQ0FBQztnQkFDcEMsTUFBTTtZQUNSLEtBQUssS0FBSztnQkFDUixJQUFJLElBQUksQ0FBQyxzQkFBc0IsRUFBRTtvQkFDL0IsSUFBSSxDQUFDLHNCQUFzQixDQUFDLFdBQVcsRUFBRSxDQUFDO2lCQUMzQztnQkFDRCxNQUFNO1lBQ1I7Z0JBQ0UsSUFBSSxJQUFJLENBQUMsc0JBQXNCLEVBQUU7b0JBQy9CLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztpQkFDM0M7Z0JBQ0QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1NBQzdEO0lBQ0gsQ0FBQztJQUVPLDRCQUE0QjtRQUNsQyxJQUFJLENBQUMsS0FBSyxDQUFDLGlCQUFpQixDQUFDLEdBQUcsRUFBRTtZQUNoQyxJQUFJLENBQUMsc0JBQXNCLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDOUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztZQUNyRSxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVTLGFBQWEsQ0FBQyxNQUFrRSxFQUFFLE9BQXNDO1FBQ2hJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDWCxPQUFPO1NBQ1I7UUFDRCxJQUFJLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxPQUFPLE1BQU0sS0FBSyxXQUFXLElBQUksTUFBTSxJQUFJLE1BQU0sQ0FBQyxJQUFJLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDN0gsTUFBTSxTQUFTLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1lBQ2pELFNBQVMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDeEIsTUFBTSxHQUFHLFNBQVMsQ0FBQztTQUNwQjtRQUNELElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNuQixJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDL0MsT0FBTztTQUNSO1FBQ0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFTyxzQkFBc0IsQ0FBQyxNQUFrRTtRQUMvRixPQUFPLE1BQU0sSUFBSSxJQUFJLElBQUssTUFBYyxDQUFDLE1BQU0sS0FBSyxTQUFTLENBQUM7SUFDaEUsQ0FBQztJQUVPLHNCQUFzQjtRQUM1QixNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLG1CQUFtQixDQUFDLGdCQUFnQixDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUMvRSxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQTBCLEVBQUUsRUFBRTtnQkFDaEUsSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUM7Z0JBQzdCLElBQUksQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDO2dCQUM5QixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUE4QixDQUFDLENBQUM7WUFDakcsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVPLG1CQUFtQjtRQUN6QixNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLG1CQUFtQixDQUFDLGdCQUFnQixDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUMvRSxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSxDQUFDLElBQUksQ0FDaEMsQ0FBQyxNQUFnQyxFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQy9FLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLHdCQUF3QixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRU8sc0JBQXNCO1FBQzVCLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsbUJBQW1CLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFO1lBQ2xGLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxFQUFFLENBQUMsSUFBSSxDQUNuQyxDQUFDLFNBQWdDLEVBQUUsRUFBRSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckYsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsd0JBQXdCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFTyxvQkFBb0I7UUFDMUIsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxtQkFBbUIsQ0FBQyxjQUFjLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFO1lBQzdFLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBUyxFQUFFLEVBQUU7Z0JBQzdDLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDO2dCQUNkLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFCLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsd0JBQXdCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFTyxnQkFBZ0I7UUFDdEIsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsQ0FBQyxTQUFTLENBQy9ELEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFTyx1QkFBdUI7UUFDN0IsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxtQkFBbUIsQ0FBQyxhQUFhLENBQUMsQ0FBQyxTQUFTLENBQ3RFLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQ3BDLENBQUM7UUFDRixJQUFJLENBQUMsd0JBQXdCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFTyxxQkFBcUI7UUFHM0IsTUFBTSxNQUFNLEdBQVk7WUFDdEIsRUFBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFDO1lBQ3ZDLEVBQUMsSUFBSSxFQUFFLFlBQVksRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBQztZQUNqRCxFQUFDLElBQUksRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUM7U0FDOUMsQ0FBQztRQUVGLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDakIsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUMvRCxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRTtnQkFDViwyRkFBMkY7Z0JBQzNGLElBQU0sS0FBb0MsQ0FBQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMscUJBQXFCLEVBQUU7b0JBQ2pGLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztpQkFDZDtnQkFDRCxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN4QixDQUFDLENBQUMsQ0FBQztZQUNMLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDeEMsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsb0JBQW9CO1FBQ2xCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNwQixJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUM7SUFDaEUsQ0FBQztJQUVELFlBQVk7UUFDVixNQUFNLGNBQWMsR0FBb0M7WUFDdEQsaUJBQWlCLEVBQUUsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCO1lBQ3pDLGNBQWMsRUFBRSxLQUFLO1lBQ3JCLFVBQVUsRUFBRSxLQUFLO1lBQ2pCLGFBQWEsRUFBRSxLQUFLO1lBQ3BCLFlBQVksRUFBRSxLQUFLO1lBQ25CLGlCQUFpQixFQUFFLENBQUMsSUFBSSxDQUFDLGdCQUFnQjtZQUN6QyxXQUFXLEVBQUUsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCO1NBQ3BDLENBQUM7UUFDRixJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFLE9BQU8sQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDekYsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDbEQsQ0FBQzs7QUF4VkQ7O0dBRUc7QUFDWSw0QkFBcUIsR0FBYTtJQUMvQyx3QkFBd0IsRUFBRSxhQUFhLEVBQUUsV0FBVyxFQUFFLGlCQUFpQixFQUFFLGdCQUFnQjtJQUN6RixtQkFBbUIsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLGdCQUFnQjtJQUMxRixpQkFBaUIsRUFBRSxNQUFNLEVBQUUsYUFBYSxFQUFFLE9BQU87Q0FDbEQsQ0FBQzs7WUExTUgsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxTQUFTO2dCQUNuQixTQUFTLEVBQUU7b0JBQ1QsYUFBYTtvQkFDYixnQkFBZ0I7b0JBQ2hCLGdCQUFnQjtvQkFDaEIsZ0JBQWdCO29CQUNoQixvQkFBb0I7b0JBQ3BCLGlCQUFpQjtvQkFDakIsZUFBZTtvQkFDZixZQUFZO29CQUNaLGFBQWE7b0JBQ2IsY0FBYztvQkFDZCxlQUFlO29CQUNmLGdCQUFnQjtpQkFDakI7Z0JBVUQsUUFBUSxFQUFFOzs7OztHQUtUO3lCQWRROzs7Ozs7OztHQVFSO2FBT0Y7OztZQXpMaUUsVUFBVTtZQUluRSxvQkFBb0I7WUFrYWlCLE1BQU0sdUJBQS9DLE1BQU0sU0FBQyxXQUFXO1lBbmFkLGdCQUFnQjtZQUhrRixNQUFNOzs7d0JBOEw5RyxLQUFLO3VCQUtMLEtBQUs7bUJBS0wsS0FBSztzQkFNTCxLQUFLO3NCQU1MLEtBQUs7MEJBS0wsS0FBSzt3QkFNTCxLQUFLLFNBQUMsY0FBYztxQ0FLcEIsS0FBSzsrQkFNTCxLQUFLOzBCQUtMLEtBQUs7OEJBTUwsS0FBSzs4QkFRTCxLQUFLOzZCQVFMLEtBQUs7Z0NBTUwsS0FBSztxQkFNTCxLQUFLO3lCQU9MLEtBQUs7d0JBTUwsS0FBSzsrQkFLTCxLQUFLO3dCQUtMLEtBQUs7NkJBTUwsS0FBSztvQ0FRTCxLQUFLOzhCQVVMLEtBQUs7bUJBZ0JMLEtBQUs7MEJBTUwsS0FBSztvQkFLSixLQUFLO3VCQW1CTixNQUFNOzRCQU1OLE1BQU07MEJBTU4sTUFBTTsyQkFLTixNQUFNOzJCQUtOLE1BQU07OEJBS04sTUFBTTttQkFLTixNQUFNO3lCQUtOLE1BQU07dUJBTU4sTUFBTTswQkFLTixNQUFNOzBCQUVOLGVBQWUsU0FBQyxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaXNQbGF0Zm9ybVNlcnZlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBBZnRlckNvbnRlbnRJbml0LCBDb21wb25lbnQsIENvbnRlbnRDaGlsZHJlbiwgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIEluamVjdCwgSW5wdXQsIE5nWm9uZSwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIE91dHB1dCwgUExBVEZPUk1fSUQsIFF1ZXJ5TGlzdCwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IEZpdEJvdW5kc1NlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9maXQtYm91bmRzJztcbmltcG9ydCB7IEdvb2dsZU1hcHNBUElXcmFwcGVyIH0gZnJvbSAnLi4vc2VydmljZXMvZ29vZ2xlLW1hcHMtYXBpLXdyYXBwZXInO1xuaW1wb3J0IHsgQ2lyY2xlTWFuYWdlciB9IGZyb20gJy4uL3NlcnZpY2VzL21hbmFnZXJzL2NpcmNsZS1tYW5hZ2VyJztcbmltcG9ydCB7IEluZm9XaW5kb3dNYW5hZ2VyIH0gZnJvbSAnLi4vc2VydmljZXMvbWFuYWdlcnMvaW5mby13aW5kb3ctbWFuYWdlcic7XG5pbXBvcnQgeyBMYXllck1hbmFnZXIgfSBmcm9tICcuLi9zZXJ2aWNlcy9tYW5hZ2Vycy9sYXllci1tYW5hZ2VyJztcbmltcG9ydCB7IE1hcmtlck1hbmFnZXIgfSBmcm9tICcuLi9zZXJ2aWNlcy9tYW5hZ2Vycy9tYXJrZXItbWFuYWdlcic7XG5pbXBvcnQgeyBQb2x5Z29uTWFuYWdlciB9IGZyb20gJy4uL3NlcnZpY2VzL21hbmFnZXJzL3BvbHlnb24tbWFuYWdlcic7XG5pbXBvcnQgeyBQb2x5bGluZU1hbmFnZXIgfSBmcm9tICcuLi9zZXJ2aWNlcy9tYW5hZ2Vycy9wb2x5bGluZS1tYW5hZ2VyJztcbmltcG9ydCB7IFJlY3RhbmdsZU1hbmFnZXIgfSBmcm9tICcuLi9zZXJ2aWNlcy9tYW5hZ2Vycy9yZWN0YW5nbGUtbWFuYWdlcic7XG5pbXBvcnQgeyBEYXRhTGF5ZXJNYW5hZ2VyIH0gZnJvbSAnLi8uLi9zZXJ2aWNlcy9tYW5hZ2Vycy9kYXRhLWxheWVyLW1hbmFnZXInO1xuaW1wb3J0IHsgS21sTGF5ZXJNYW5hZ2VyIH0gZnJvbSAnLi8uLi9zZXJ2aWNlcy9tYW5hZ2Vycy9rbWwtbGF5ZXItbWFuYWdlcic7XG5cbmV4cG9ydCB0eXBlIENvbnRyb2xQb3NpdGlvbiA9IGtleW9mIHR5cGVvZiBnb29nbGUubWFwcy5Db250cm9sUG9zaXRpb247XG5cbkBEaXJlY3RpdmUoKVxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEFnbU1hcENvbnRyb2wge1xuICBASW5wdXQoKSBwb3NpdGlvbjogQ29udHJvbFBvc2l0aW9uO1xuICBhYnN0cmFjdCBnZXRPcHRpb25zKCk6IFBhcnRpYWw8Z29vZ2xlLm1hcHMuTWFwT3B0aW9ucz47XG59XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ2FnbS1tYXAgYWdtLWZ1bGxzY3JlZW4tY29udHJvbCcsXG4gIHByb3ZpZGVyczogW3sgcHJvdmlkZTogQWdtTWFwQ29udHJvbCwgdXNlRXhpc3Rpbmc6IEFnbUZ1bGxzY3JlZW5Db250cm9sIH1dLFxufSlcbmV4cG9ydCBjbGFzcyBBZ21GdWxsc2NyZWVuQ29udHJvbCBleHRlbmRzIEFnbU1hcENvbnRyb2wge1xuICBnZXRPcHRpb25zKCk6IFBhcnRpYWw8Z29vZ2xlLm1hcHMuTWFwT3B0aW9ucz4ge1xuICAgIHJldHVybiB7XG4gICAgICBmdWxsc2NyZWVuQ29udHJvbDogdHJ1ZSxcbiAgICAgIGZ1bGxzY3JlZW5Db250cm9sT3B0aW9uczoge1xuICAgICAgICBwb3NpdGlvbjogdGhpcy5wb3NpdGlvbiAmJiBnb29nbGUubWFwcy5Db250cm9sUG9zaXRpb25bdGhpcy5wb3NpdGlvbl0sXG4gICAgICB9LFxuICAgIH07XG4gIH1cbn1cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ2FnbS1tYXAgYWdtLW1hcC10eXBlLWNvbnRyb2wnLFxuICBwcm92aWRlcnM6IFt7IHByb3ZpZGU6IEFnbU1hcENvbnRyb2wsIHVzZUV4aXN0aW5nOiBBZ21NYXBUeXBlQ29udHJvbCB9XSxcbn0pXG5leHBvcnQgY2xhc3MgQWdtTWFwVHlwZUNvbnRyb2wgZXh0ZW5kcyBBZ21NYXBDb250cm9sIHtcbiAgQElucHV0KCkgbWFwVHlwZUlkczogKGtleW9mIHR5cGVvZiBnb29nbGUubWFwcy5NYXBUeXBlSWQpW107XG4gIEBJbnB1dCgpIHN0eWxlOiBrZXlvZiB0eXBlb2YgZ29vZ2xlLm1hcHMuTWFwVHlwZUNvbnRyb2xTdHlsZTtcblxuICBnZXRPcHRpb25zKCk6IFBhcnRpYWw8Z29vZ2xlLm1hcHMuTWFwT3B0aW9ucz4ge1xuICAgIHJldHVybiB7XG4gICAgICBtYXBUeXBlQ29udHJvbDogdHJ1ZSxcbiAgICAgIG1hcFR5cGVDb250cm9sT3B0aW9uczoge1xuICAgICAgICBwb3NpdGlvbjogdGhpcy5wb3NpdGlvbiAmJiBnb29nbGUubWFwcy5Db250cm9sUG9zaXRpb25bdGhpcy5wb3NpdGlvbl0sXG4gICAgICAgIHN0eWxlOiB0aGlzLnN0eWxlICYmIGdvb2dsZS5tYXBzLk1hcFR5cGVDb250cm9sU3R5bGVbdGhpcy5zdHlsZV0sXG4gICAgICAgIG1hcFR5cGVJZHM6IHRoaXMubWFwVHlwZUlkcyAmJiB0aGlzLm1hcFR5cGVJZHMubWFwKG1hcFR5cGVJZCA9PiBnb29nbGUubWFwcy5NYXBUeXBlSWRbbWFwVHlwZUlkXSksXG4gICAgICB9LFxuICAgIH07XG4gIH1cbn1cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnYWdtLW1hcCBhZ20tcGFuLWNvbnRyb2wnLFxuICBwcm92aWRlcnM6IFt7IHByb3ZpZGU6IEFnbU1hcENvbnRyb2wsIHVzZUV4aXN0aW5nOiBBZ21QYW5Db250cm9sIH1dLFxufSlcbmV4cG9ydCBjbGFzcyBBZ21QYW5Db250cm9sIGV4dGVuZHMgQWdtTWFwQ29udHJvbCB7XG4gIGdldE9wdGlvbnMoKTogUGFydGlhbDxnb29nbGUubWFwcy5NYXBPcHRpb25zPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHBhbkNvbnRyb2w6IHRydWUsXG4gICAgICBwYW5Db250cm9sT3B0aW9uczoge1xuICAgICAgICBwb3NpdGlvbjogdGhpcy5wb3NpdGlvbiAmJiBnb29nbGUubWFwcy5Db250cm9sUG9zaXRpb25bdGhpcy5wb3NpdGlvbl0sXG4gICAgICB9LFxuICAgIH07XG4gIH1cbn1cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnYWdtLW1hcCBhZ20tcm90YXRlLWNvbnRyb2wnLFxuICBwcm92aWRlcnM6IFt7IHByb3ZpZGU6IEFnbU1hcENvbnRyb2wsIHVzZUV4aXN0aW5nOiBBZ21Sb3RhdGVDb250cm9sIH1dLFxufSlcbmV4cG9ydCBjbGFzcyBBZ21Sb3RhdGVDb250cm9sIGV4dGVuZHMgQWdtTWFwQ29udHJvbCB7XG4gIGdldE9wdGlvbnMoKTogUGFydGlhbDxnb29nbGUubWFwcy5NYXBPcHRpb25zPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJvdGF0ZUNvbnRyb2w6IHRydWUsXG4gICAgICByb3RhdGVDb250cm9sT3B0aW9uczoge1xuICAgICAgICBwb3NpdGlvbjogdGhpcy5wb3NpdGlvbiAmJiBnb29nbGUubWFwcy5Db250cm9sUG9zaXRpb25bdGhpcy5wb3NpdGlvbl0sXG4gICAgICB9LFxuICAgIH07XG4gIH1cbn1cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnYWdtLW1hcCBhZ20tc2NhbGUtY29udHJvbCcsXG4gIHByb3ZpZGVyczogW3sgcHJvdmlkZTogQWdtTWFwQ29udHJvbCwgdXNlRXhpc3Rpbmc6IEFnbVNjYWxlQ29udHJvbCB9XSxcbn0pXG5leHBvcnQgY2xhc3MgQWdtU2NhbGVDb250cm9sIGV4dGVuZHMgQWdtTWFwQ29udHJvbHtcbiAgZ2V0T3B0aW9ucygpOiBQYXJ0aWFsPGdvb2dsZS5tYXBzLk1hcE9wdGlvbnM+IHtcbiAgICByZXR1cm4ge1xuICAgICAgc2NhbGVDb250cm9sOiB0cnVlLFxuICAgIH07XG4gIH1cbn1cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnYWdtLW1hcCBhZ20tc3RyZWV0LXZpZXctY29udHJvbCcsXG4gIHByb3ZpZGVyczogW3sgcHJvdmlkZTogQWdtTWFwQ29udHJvbCwgdXNlRXhpc3Rpbmc6IEFnbVN0cmVldFZpZXdDb250cm9sIH1dLFxufSlcbmV4cG9ydCBjbGFzcyBBZ21TdHJlZXRWaWV3Q29udHJvbCBleHRlbmRzIEFnbU1hcENvbnRyb2wge1xuICBnZXRPcHRpb25zKCk6IFBhcnRpYWw8Z29vZ2xlLm1hcHMuTWFwT3B0aW9ucz4ge1xuICAgIHJldHVybiB7XG4gICAgICBzdHJlZXRWaWV3Q29udHJvbDogdHJ1ZSxcbiAgICAgIHN0cmVldFZpZXdDb250cm9sT3B0aW9uczoge1xuICAgICAgICBwb3NpdGlvbjogdGhpcy5wb3NpdGlvbiAmJiBnb29nbGUubWFwcy5Db250cm9sUG9zaXRpb25bdGhpcy5wb3NpdGlvbl0sXG4gICAgICB9LFxuICAgIH07XG4gIH1cbn1cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnYWdtLW1hcCBhZ20tem9vbS1jb250cm9sJyxcbiAgcHJvdmlkZXJzOiBbeyBwcm92aWRlOiBBZ21NYXBDb250cm9sLCB1c2VFeGlzdGluZzogQWdtWm9vbUNvbnRyb2wgfV0sXG59KVxuZXhwb3J0IGNsYXNzIEFnbVpvb21Db250cm9sIGV4dGVuZHMgQWdtTWFwQ29udHJvbHtcbiAgQElucHV0KCkgc3R5bGU6IGtleW9mIHR5cGVvZiBnb29nbGUubWFwcy5ab29tQ29udHJvbFN0eWxlO1xuICBnZXRPcHRpb25zKCk6IFBhcnRpYWw8Z29vZ2xlLm1hcHMuTWFwT3B0aW9ucz4ge1xuICAgIHJldHVybiB7XG4gICAgICB6b29tQ29udHJvbDogdHJ1ZSxcbiAgICAgIHpvb21Db250cm9sT3B0aW9uczoge1xuICAgICAgICBwb3NpdGlvbjogdGhpcy5wb3NpdGlvbiAmJiBnb29nbGUubWFwcy5Db250cm9sUG9zaXRpb25bdGhpcy5wb3NpdGlvbl0sXG4gICAgICAgIHN0eWxlOiB0aGlzLnN0eWxlICYmIGdvb2dsZS5tYXBzLlpvb21Db250cm9sU3R5bGVbdGhpcy5zdHlsZV0sXG4gICAgICB9LFxuICAgIH07XG4gIH1cbn1cblxuLyoqXG4gKiBBZ21NYXAgcmVuZGVycyBhIEdvb2dsZSBNYXAuXG4gKiAqKkltcG9ydGFudCBub3RlKio6IFRvIGJlIGFibGUgc2VlIGEgbWFwIGluIHRoZSBicm93c2VyLCB5b3UgaGF2ZSB0byBkZWZpbmUgYSBoZWlnaHQgZm9yIHRoZVxuICogZWxlbWVudCBgYWdtLW1hcGAuXG4gKlxuICogIyMjIEV4YW1wbGVcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIGltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuICpcbiAqIEBDb21wb25lbnQoe1xuICogIHNlbGVjdG9yOiAnbXktbWFwLWNtcCcsXG4gKiAgc3R5bGVzOiBbYFxuICogICAgYWdtLW1hcCB7XG4gKiAgICAgIGhlaWdodDogMzAwcHg7XG4gKiAgICB9XG4gKiBgXSxcbiAqICB0ZW1wbGF0ZTogYFxuICogICAgPGFnbS1tYXAgW2xhdGl0dWRlXT1cImxhdFwiIFtsb25naXR1ZGVdPVwibG5nXCIgW3pvb21dPVwiem9vbVwiPlxuICogICAgPC9hZ20tbWFwPlxuICogIGBcbiAqIH0pXG4gKiBgYGBcbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWdtLW1hcCcsXG4gIHByb3ZpZGVyczogW1xuICAgIENpcmNsZU1hbmFnZXIsXG4gICAgRGF0YUxheWVyTWFuYWdlcixcbiAgICBEYXRhTGF5ZXJNYW5hZ2VyLFxuICAgIEZpdEJvdW5kc1NlcnZpY2UsXG4gICAgR29vZ2xlTWFwc0FQSVdyYXBwZXIsXG4gICAgSW5mb1dpbmRvd01hbmFnZXIsXG4gICAgS21sTGF5ZXJNYW5hZ2VyLFxuICAgIExheWVyTWFuYWdlcixcbiAgICBNYXJrZXJNYW5hZ2VyLFxuICAgIFBvbHlnb25NYW5hZ2VyLFxuICAgIFBvbHlsaW5lTWFuYWdlcixcbiAgICBSZWN0YW5nbGVNYW5hZ2VyLFxuICBdLFxuICBzdHlsZXM6IFtgXG4gICAgLmFnbS1tYXAtY29udGFpbmVyLWlubmVyIHtcbiAgICAgIHdpZHRoOiBpbmhlcml0O1xuICAgICAgaGVpZ2h0OiBpbmhlcml0O1xuICAgIH1cbiAgICAuYWdtLW1hcC1jb250ZW50IHtcbiAgICAgIGRpc3BsYXk6bm9uZTtcbiAgICB9XG4gIGBdLFxuICB0ZW1wbGF0ZTogYFxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSdhZ20tbWFwLWNvbnRhaW5lci1pbm5lciBzZWJtLWdvb2dsZS1tYXAtY29udGFpbmVyLWlubmVyJz48L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz0nYWdtLW1hcC1jb250ZW50Jz5cbiAgICAgICAgICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBBZ21NYXAgaW1wbGVtZW50cyBPbkNoYW5nZXMsIEFmdGVyQ29udGVudEluaXQsIE9uRGVzdHJveSB7XG4gIC8qKlxuICAgKiBUaGUgbG9uZ2l0dWRlIHRoYXQgZGVmaW5lcyB0aGUgY2VudGVyIG9mIHRoZSBtYXAuXG4gICAqL1xuICBASW5wdXQoKSBsb25naXR1ZGUgPSAwO1xuXG4gIC8qKlxuICAgKiBUaGUgbGF0aXR1ZGUgdGhhdCBkZWZpbmVzIHRoZSBjZW50ZXIgb2YgdGhlIG1hcC5cbiAgICovXG4gIEBJbnB1dCgpIGxhdGl0dWRlID0gMDtcblxuICAvKipcbiAgICogVGhlIHpvb20gbGV2ZWwgb2YgdGhlIG1hcC4gVGhlIGRlZmF1bHQgem9vbSBsZXZlbCBpcyA4LlxuICAgKi9cbiAgQElucHV0KCkgem9vbSA9IDg7XG5cbiAgLyoqXG4gICAqIFRoZSBtaW5pbWFsIHpvb20gbGV2ZWwgb2YgdGhlIG1hcCBhbGxvd2VkLiBXaGVuIG5vdCBwcm92aWRlZCwgbm8gcmVzdHJpY3Rpb25zIHRvIHRoZSB6b29tIGxldmVsXG4gICAqIGFyZSBlbmZvcmNlZC5cbiAgICovXG4gIEBJbnB1dCgpIG1pblpvb206IG51bWJlcjtcblxuICAvKipcbiAgICogVGhlIG1heGltYWwgem9vbSBsZXZlbCBvZiB0aGUgbWFwIGFsbG93ZWQuIFdoZW4gbm90IHByb3ZpZGVkLCBubyByZXN0cmljdGlvbnMgdG8gdGhlIHpvb20gbGV2ZWxcbiAgICogYXJlIGVuZm9yY2VkLlxuICAgKi9cbiAgQElucHV0KCkgbWF4Wm9vbTogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBUaGUgY29udHJvbCBzaXplIGZvciB0aGUgZGVmYXVsdCBtYXAgY29udHJvbHMuIE9ubHkgZ292ZXJucyB0aGUgY29udHJvbHMgbWFkZSBieSB0aGUgTWFwcyBBUEkgaXRzZWxmXG4gICAqL1xuICBASW5wdXQoKSBjb250cm9sU2l6ZTogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBFbmFibGVzL2Rpc2FibGVzIGlmIG1hcCBpcyBkcmFnZ2FibGUuXG4gICAqL1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8taW5wdXQtcmVuYW1lXG4gIEBJbnB1dCgnbWFwRHJhZ2dhYmxlJykgZHJhZ2dhYmxlID0gdHJ1ZTtcblxuICAvKipcbiAgICogRW5hYmxlcy9kaXNhYmxlcyB6b29tIGFuZCBjZW50ZXIgb24gZG91YmxlIGNsaWNrLiBFbmFibGVkIGJ5IGRlZmF1bHQuXG4gICAqL1xuICBASW5wdXQoKSBkaXNhYmxlRG91YmxlQ2xpY2tab29tID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIEVuYWJsZXMvZGlzYWJsZXMgYWxsIGRlZmF1bHQgVUkgb2YgdGhlIEdvb2dsZSBtYXAuIFBsZWFzZSBub3RlOiBXaGVuIHRoZSBtYXAgaXMgY3JlYXRlZCwgdGhpc1xuICAgKiB2YWx1ZSBjYW5ub3QgZ2V0IHVwZGF0ZWQuXG4gICAqL1xuICBASW5wdXQoKSBkaXNhYmxlRGVmYXVsdFVJID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIElmIGZhbHNlLCBkaXNhYmxlcyBzY3JvbGx3aGVlbCB6b29taW5nIG9uIHRoZSBtYXAuIFRoZSBzY3JvbGx3aGVlbCBpcyBlbmFibGVkIGJ5IGRlZmF1bHQuXG4gICAqL1xuICBASW5wdXQoKSBzY3JvbGx3aGVlbCA9IHRydWU7XG5cbiAgLyoqXG4gICAqIENvbG9yIHVzZWQgZm9yIHRoZSBiYWNrZ3JvdW5kIG9mIHRoZSBNYXAgZGl2LiBUaGlzIGNvbG9yIHdpbGwgYmUgdmlzaWJsZSB3aGVuIHRpbGVzIGhhdmUgbm90XG4gICAqIHlldCBsb2FkZWQgYXMgdGhlIHVzZXIgcGFucy4gVGhpcyBvcHRpb24gY2FuIG9ubHkgYmUgc2V0IHdoZW4gdGhlIG1hcCBpcyBpbml0aWFsaXplZC5cbiAgICovXG4gIEBJbnB1dCgpIGJhY2tncm91bmRDb2xvcjogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgbmFtZSBvciB1cmwgb2YgdGhlIGN1cnNvciB0byBkaXNwbGF5IHdoZW4gbW91c2luZyBvdmVyIGEgZHJhZ2dhYmxlIG1hcC4gVGhpcyBwcm9wZXJ0eSB1c2VzXG4gICAqIHRoZSBjc3MgICogY3Vyc29yIGF0dHJpYnV0ZSB0byBjaGFuZ2UgdGhlIGljb24uIEFzIHdpdGggdGhlIGNzcyBwcm9wZXJ0eSwgeW91IG11c3Qgc3BlY2lmeSBhdFxuICAgKiBsZWFzdCBvbmUgZmFsbGJhY2sgY3Vyc29yIHRoYXQgaXMgbm90IGEgVVJMLiBGb3IgZXhhbXBsZTpcbiAgICogW2RyYWdnYWJsZUN1cnNvcl09XCIndXJsKGh0dHA6Ly93d3cuZXhhbXBsZS5jb20vaWNvbi5wbmcpLCBhdXRvOydcIlxuICAgKi9cbiAgQElucHV0KCkgZHJhZ2dhYmxlQ3Vyc29yOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSBuYW1lIG9yIHVybCBvZiB0aGUgY3Vyc29yIHRvIGRpc3BsYXkgd2hlbiB0aGUgbWFwIGlzIGJlaW5nIGRyYWdnZWQuIFRoaXMgcHJvcGVydHkgdXNlcyB0aGVcbiAgICogY3NzIGN1cnNvciBhdHRyaWJ1dGUgdG8gY2hhbmdlIHRoZSBpY29uLiBBcyB3aXRoIHRoZSBjc3MgcHJvcGVydHksIHlvdSBtdXN0IHNwZWNpZnkgYXQgbGVhc3RcbiAgICogb25lIGZhbGxiYWNrIGN1cnNvciB0aGF0IGlzIG5vdCBhIFVSTC4gRm9yIGV4YW1wbGU6XG4gICAqIFtkcmFnZ2luZ0N1cnNvcl09XCIndXJsKGh0dHA6Ly93d3cuZXhhbXBsZS5jb20vaWNvbi5wbmcpLCBhdXRvOydcIlxuICAgKi9cbiAgQElucHV0KCkgZHJhZ2dpbmdDdXJzb3I6IHN0cmluZztcblxuICAvKipcbiAgICogSWYgZmFsc2UsIHByZXZlbnRzIHRoZSBtYXAgZnJvbSBiZWluZyBjb250cm9sbGVkIGJ5IHRoZSBrZXlib2FyZC4gS2V5Ym9hcmQgc2hvcnRjdXRzIGFyZVxuICAgKiBlbmFibGVkIGJ5IGRlZmF1bHQuXG4gICAqL1xuICBASW5wdXQoKSBrZXlib2FyZFNob3J0Y3V0cyA9IHRydWU7XG5cbiAgLyoqXG4gICAqIFN0eWxlcyB0byBhcHBseSB0byBlYWNoIG9mIHRoZSBkZWZhdWx0IG1hcCB0eXBlcy4gTm90ZSB0aGF0IGZvciBTYXRlbGxpdGUvSHlicmlkIGFuZCBUZXJyYWluXG4gICAqIG1vZGVzLCB0aGVzZSBzdHlsZXMgd2lsbCBvbmx5IGFwcGx5IHRvIGxhYmVscyBhbmQgZ2VvbWV0cnkuXG4gICAqL1xuICBASW5wdXQoKSBzdHlsZXM6IGdvb2dsZS5tYXBzLk1hcFR5cGVTdHlsZVtdID0gW107XG5cbiAgLyoqXG4gICAqIFdoZW4gdHJ1ZSBhbmQgdGhlIGxhdGl0dWRlIGFuZC9vciBsb25naXR1ZGUgdmFsdWVzIGNoYW5nZXMsIHRoZSBHb29nbGUgTWFwcyBwYW5UbyBtZXRob2QgaXNcbiAgICogdXNlZCB0b1xuICAgKiBjZW50ZXIgdGhlIG1hcC4gU2VlOiBodHRwczovL2RldmVsb3BlcnMuZ29vZ2xlLmNvbS9tYXBzL2RvY3VtZW50YXRpb24vamF2YXNjcmlwdC9yZWZlcmVuY2UjTWFwXG4gICAqL1xuICBASW5wdXQoKSB1c2VQYW5uaW5nID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIHZpZXdwb3J0IHRvIGNvbnRhaW4gdGhlIGdpdmVuIGJvdW5kcy5cbiAgICogSWYgdGhpcyBvcHRpb24gdG8gYHRydWVgLCB0aGUgYm91bmRzIGdldCBhdXRvbWF0aWNhbGx5IGNvbXB1dGVkIGZyb20gYWxsIGVsZW1lbnRzIHRoYXQgdXNlIHRoZSB7QGxpbmsgQWdtRml0Qm91bmRzfSBkaXJlY3RpdmUuXG4gICAqL1xuICBASW5wdXQoKSBmaXRCb3VuZHM6IGdvb2dsZS5tYXBzLkxhdExuZ0JvdW5kc0xpdGVyYWwgfCBnb29nbGUubWFwcy5MYXRMbmdCb3VuZHMgfCBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIFBhZGRpbmcgYW1vdW50IGZvciB0aGUgYm91bmRzLlxuICAgKi9cbiAgQElucHV0KCkgZml0Qm91bmRzUGFkZGluZzogbnVtYmVyIHwgZ29vZ2xlLm1hcHMuUGFkZGluZztcblxuICAvKipcbiAgICogVGhlIG1hcCBtYXBUeXBlSWQuIERlZmF1bHRzIHRvICdyb2FkbWFwJy5cbiAgICovXG4gIEBJbnB1dCgpIG1hcFR5cGVJZDoga2V5b2YgdHlwZW9mIGdvb2dsZS5tYXBzLk1hcFR5cGVJZCA9ICdST0FETUFQJztcblxuICAvKipcbiAgICogV2hlbiBmYWxzZSwgbWFwIGljb25zIGFyZSBub3QgY2xpY2thYmxlLiBBIG1hcCBpY29uIHJlcHJlc2VudHMgYSBwb2ludCBvZiBpbnRlcmVzdCxcbiAgICogYWxzbyBrbm93biBhcyBhIFBPSS4gQnkgZGVmYXVsdCBtYXAgaWNvbnMgYXJlIGNsaWNrYWJsZS5cbiAgICovXG4gIEBJbnB1dCgpIGNsaWNrYWJsZUljb25zID0gdHJ1ZTtcblxuICAvKipcbiAgICogQSBtYXAgaWNvbiByZXByZXNlbnRzIGEgcG9pbnQgb2YgaW50ZXJlc3QsIGFsc28ga25vd24gYXMgYSBQT0kuXG4gICAqIFdoZW4gbWFwIGljb25zIGFyZSBjbGlja2FibGUgYnkgZGVmYXVsdCwgYW4gaW5mbyB3aW5kb3cgaXMgZGlzcGxheWVkLlxuICAgKiBXaGVuIHRoaXMgcHJvcGVydHkgaXMgc2V0IHRvIGZhbHNlLCB0aGUgaW5mbyB3aW5kb3cgd2lsbCBub3QgYmUgc2hvd24gYnV0IHRoZSBjbGljayBldmVudFxuICAgKiB3aWxsIHN0aWxsIGZpcmVcbiAgICovXG4gIEBJbnB1dCgpIHNob3dEZWZhdWx0SW5mb1dpbmRvdyA9IHRydWU7XG5cbiAgLyoqXG4gICAqIFRoaXMgc2V0dGluZyBjb250cm9scyBob3cgZ2VzdHVyZXMgb24gdGhlIG1hcCBhcmUgaGFuZGxlZC5cbiAgICogQWxsb3dlZCB2YWx1ZXM6XG4gICAqIC0gJ2Nvb3BlcmF0aXZlJyAoVHdvLWZpbmdlciB0b3VjaCBnZXN0dXJlcyBwYW4gYW5kIHpvb20gdGhlIG1hcC4gT25lLWZpbmdlciB0b3VjaCBnZXN0dXJlcyBhcmUgbm90IGhhbmRsZWQgYnkgdGhlIG1hcC4pXG4gICAqIC0gJ2dyZWVkeScgICAgICAoQWxsIHRvdWNoIGdlc3R1cmVzIHBhbiBvciB6b29tIHRoZSBtYXAuKVxuICAgKiAtICdub25lJyAgICAgICAgKFRoZSBtYXAgY2Fubm90IGJlIHBhbm5lZCBvciB6b29tZWQgYnkgdXNlciBnZXN0dXJlcy4pXG4gICAqIC0gJ2F1dG8nICAgICAgICBbZGVmYXVsdF0gKEdlc3R1cmUgaGFuZGxpbmcgaXMgZWl0aGVyIGNvb3BlcmF0aXZlIG9yIGdyZWVkeSwgZGVwZW5kaW5nIG9uIHdoZXRoZXIgdGhlIHBhZ2UgaXMgc2Nyb2xsYWJsZSBvciBub3QuXG4gICAqL1xuICBASW5wdXQoKSBnZXN0dXJlSGFuZGxpbmc6IGdvb2dsZS5tYXBzLkdlc3R1cmVIYW5kbGluZ09wdGlvbnMgPSAnYXV0byc7XG5cbiAgICAvKipcbiAgICAgKiBDb250cm9scyB0aGUgYXV0b21hdGljIHN3aXRjaGluZyBiZWhhdmlvciBmb3IgdGhlIGFuZ2xlIG9mIGluY2lkZW5jZSBvZlxuICAgICAqIHRoZSBtYXAuIFRoZSBvbmx5IGFsbG93ZWQgdmFsdWVzIGFyZSAwIGFuZCA0NS4gVGhlIHZhbHVlIDAgY2F1c2VzIHRoZSBtYXBcbiAgICAgKiB0byBhbHdheXMgdXNlIGEgMMKwIG92ZXJoZWFkIHZpZXcgcmVnYXJkbGVzcyBvZiB0aGUgem9vbSBsZXZlbCBhbmRcbiAgICAgKiB2aWV3cG9ydC4gVGhlIHZhbHVlIDQ1IGNhdXNlcyB0aGUgdGlsdCBhbmdsZSB0byBhdXRvbWF0aWNhbGx5IHN3aXRjaCB0b1xuICAgICAqIDQ1IHdoZW5ldmVyIDQ1wrAgaW1hZ2VyeSBpcyBhdmFpbGFibGUgZm9yIHRoZSBjdXJyZW50IHpvb20gbGV2ZWwgYW5kXG4gICAgICogdmlld3BvcnQsIGFuZCBzd2l0Y2ggYmFjayB0byAwIHdoZW5ldmVyIDQ1wrAgaW1hZ2VyeSBpcyBub3QgYXZhaWxhYmxlXG4gICAgICogKHRoaXMgaXMgdGhlIGRlZmF1bHQgYmVoYXZpb3IpLiA0NcKwIGltYWdlcnkgaXMgb25seSBhdmFpbGFibGUgZm9yXG4gICAgICogc2F0ZWxsaXRlIGFuZCBoeWJyaWQgbWFwIHR5cGVzLCB3aXRoaW4gc29tZSBsb2NhdGlvbnMsIGFuZCBhdCBzb21lIHpvb21cbiAgICAgKiBsZXZlbHMuIE5vdGU6IGdldFRpbHQgcmV0dXJucyB0aGUgY3VycmVudCB0aWx0IGFuZ2xlLCBub3QgdGhlIHZhbHVlXG4gICAgICogc3BlY2lmaWVkIGJ5IHRoaXMgb3B0aW9uLiBCZWNhdXNlIGdldFRpbHQgYW5kIHRoaXMgb3B0aW9uIHJlZmVyIHRvXG4gICAgICogZGlmZmVyZW50IHRoaW5ncywgZG8gbm90IGJpbmQoKSB0aGUgdGlsdCBwcm9wZXJ0eTsgZG9pbmcgc28gbWF5IHlpZWxkXG4gICAgICogdW5wcmVkaWN0YWJsZSBlZmZlY3RzLiAoRGVmYXVsdCBvZiBBR00gaXMgMCAoZGlzYWJsZWQpLiBFbmFibGUgaXQgd2l0aCB2YWx1ZSA0NS4pXG4gICAgICovXG4gIEBJbnB1dCgpIHRpbHQgPSAwO1xuXG4gIC8qKlxuICAgKiBPcHRpb25zIGZvciByZXN0cmljdGluZyB0aGUgYm91bmRzIG9mIHRoZSBtYXAuXG4gICAqIFVzZXIgY2Fubm90IHBhbiBvciB6b29tIGF3YXkgZnJvbSByZXN0cmljdGVkIGFyZWEuXG4gICAqL1xuICBASW5wdXQoKSByZXN0cmljdGlvbjogZ29vZ2xlLm1hcHMuTWFwUmVzdHJpY3Rpb247XG5cbiAgLyoqXG4gICAqIE1hcCBJRCBzdXBwb3J0XG4gICAqL1xuICAgQElucHV0KCkgbWFwSWQ6IHN0cmluZyA9IG51bGw7XG5cbiAgLyoqXG4gICAqIE1hcCBvcHRpb24gYXR0cmlidXRlcyB0aGF0IGNhbiBjaGFuZ2Ugb3ZlciB0aW1lXG4gICAqL1xuICBwcml2YXRlIHN0YXRpYyBfbWFwT3B0aW9uc0F0dHJpYnV0ZXM6IHN0cmluZ1tdID0gW1xuICAgICdkaXNhYmxlRG91YmxlQ2xpY2tab29tJywgJ3Njcm9sbHdoZWVsJywgJ2RyYWdnYWJsZScsICdkcmFnZ2FibGVDdXJzb3InLCAnZHJhZ2dpbmdDdXJzb3InLFxuICAgICdrZXlib2FyZFNob3J0Y3V0cycsICdzdHlsZXMnLCAnem9vbScsICdtaW5ab29tJywgJ21heFpvb20nLCAnbWFwVHlwZUlkJywgJ2NsaWNrYWJsZUljb25zJyxcbiAgICAnZ2VzdHVyZUhhbmRsaW5nJywgJ3RpbHQnLCAncmVzdHJpY3Rpb24nLCAnbWFwSWQnLFxuICBdO1xuXG4gIHByaXZhdGUgX29ic2VydmFibGVTdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuICBwcml2YXRlIF9maXRCb3VuZHNTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAvKipcbiAgICogVGhpcyBldmVudCBlbWl0dGVyIGdldHMgZW1pdHRlZCB3aGVuIHRoZSB1c2VyIGNsaWNrcyBvbiB0aGUgbWFwIChidXQgbm90IHdoZW4gdGhleSBjbGljayBvbiBhXG4gICAqIG1hcmtlciBvciBpbmZvV2luZG93KS5cbiAgICovXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbWF4LWxpbmUtbGVuZ3RoXG4gIEBPdXRwdXQoKSBtYXBDbGljazogRXZlbnRFbWl0dGVyPGFueSB8IGdvb2dsZS5tYXBzLkljb25Nb3VzZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55IHwgZ29vZ2xlLm1hcHMuSWNvbk1vdXNlRXZlbnQ+KCk7XG5cbiAgLyoqXG4gICAqIFRoaXMgZXZlbnQgZW1pdHRlciBnZXRzIGVtaXR0ZWQgd2hlbiB0aGUgdXNlciByaWdodC1jbGlja3Mgb24gdGhlIG1hcCAoYnV0IG5vdCB3aGVuIHRoZXkgY2xpY2tcbiAgICogb24gYSBtYXJrZXIgb3IgaW5mb1dpbmRvdykuXG4gICAqL1xuICBAT3V0cHV0KCkgbWFwUmlnaHRDbGljazogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICAvKipcbiAgICogVGhpcyBldmVudCBlbWl0dGVyIGdldHMgZW1pdHRlZCB3aGVuIHRoZSB1c2VyIGRvdWJsZS1jbGlja3Mgb24gdGhlIG1hcCAoYnV0IG5vdCB3aGVuIHRoZXkgY2xpY2tcbiAgICogb24gYSBtYXJrZXIgb3IgaW5mb1dpbmRvdykuXG4gICAqL1xuICBAT3V0cHV0KCkgbWFwRGJsQ2xpY2s6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgLyoqXG4gICAqIFRoaXMgZXZlbnQgZW1pdHRlciBpcyBmaXJlZCB3aGVuIHRoZSBtYXAgY2VudGVyIGNoYW5nZXMuXG4gICAqL1xuICBAT3V0cHV0KCkgY2VudGVyQ2hhbmdlOiBFdmVudEVtaXR0ZXI8Z29vZ2xlLm1hcHMuTGF0TG5nTGl0ZXJhbD4gPSBuZXcgRXZlbnRFbWl0dGVyPGdvb2dsZS5tYXBzLkxhdExuZ0xpdGVyYWw+KCk7XG5cbiAgLyoqXG4gICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgdmlld3BvcnQgYm91bmRzIGhhdmUgY2hhbmdlZC5cbiAgICovXG4gIEBPdXRwdXQoKSBib3VuZHNDaGFuZ2U6IEV2ZW50RW1pdHRlcjxnb29nbGUubWFwcy5MYXRMbmdCb3VuZHM+ID0gbmV3IEV2ZW50RW1pdHRlcjxnb29nbGUubWFwcy5MYXRMbmdCb3VuZHM+KCk7XG5cbiAgLyoqXG4gICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgbWFwVHlwZUlkIHByb3BlcnR5IGNoYW5nZXMuXG4gICAqL1xuICBAT3V0cHV0KCkgbWFwVHlwZUlkQ2hhbmdlOiBFdmVudEVtaXR0ZXI8Z29vZ2xlLm1hcHMuTWFwVHlwZUlkPiA9IG5ldyBFdmVudEVtaXR0ZXI8Z29vZ2xlLm1hcHMuTWFwVHlwZUlkPigpO1xuXG4gIC8qKlxuICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIG1hcCBiZWNvbWVzIGlkbGUgYWZ0ZXIgcGFubmluZyBvciB6b29taW5nLlxuICAgKi9cbiAgQE91dHB1dCgpIGlkbGU6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICAvKipcbiAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSB6b29tIGxldmVsIGhhcyBjaGFuZ2VkLlxuICAgKi9cbiAgQE91dHB1dCgpIHpvb21DaGFuZ2U6IEV2ZW50RW1pdHRlcjxudW1iZXI+ID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG5cbiAgLyoqXG4gICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgZ29vZ2xlIG1hcCBpcyBmdWxseSBpbml0aWFsaXplZC5cbiAgICogWW91IGdldCB0aGUgZ29vZ2xlLm1hcHMuTWFwIGluc3RhbmNlIGFzIGEgcmVzdWx0IG9mIHRoaXMgRXZlbnRFbWl0dGVyLlxuICAgKi9cbiAgQE91dHB1dCgpIG1hcFJlYWR5OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIC8qKlxuICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIHZpc2libGUgdGlsZXMgaGF2ZSBmaW5pc2hlZCBsb2FkaW5nLlxuICAgKi9cbiAgQE91dHB1dCgpIHRpbGVzTG9hZGVkOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgQENvbnRlbnRDaGlsZHJlbihBZ21NYXBDb250cm9sKSBtYXBDb250cm9sczogUXVlcnlMaXN0PEFnbU1hcENvbnRyb2w+O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgX2VsZW06IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSBfbWFwc1dyYXBwZXI6IEdvb2dsZU1hcHNBUElXcmFwcGVyLFxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogYmFuLXR5cGVzXG4gICAgQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBfcGxhdGZvcm1JZDogT2JqZWN0LFxuICAgIHByb3RlY3RlZCBfZml0Qm91bmRzU2VydmljZTogRml0Qm91bmRzU2VydmljZSxcbiAgICBwcml2YXRlIF96b25lOiBOZ1pvbmVcbiAgKSB7fVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgIGlmIChpc1BsYXRmb3JtU2VydmVyKHRoaXMuX3BsYXRmb3JtSWQpKSB7XG4gICAgICAvLyBUaGUgY29kZSBpcyBydW5uaW5nIG9uIHRoZSBzZXJ2ZXIsIGRvIG5vdGhpbmdcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gdG9kbzogdGhpcyBzaG91bGQgYmUgc29sdmVkIHdpdGggYSBuZXcgY29tcG9uZW50IGFuZCBhIHZpZXdDaGlsZCBkZWNvcmF0b3JcbiAgICBjb25zdCBjb250YWluZXIgPSB0aGlzLl9lbGVtLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignLmFnbS1tYXAtY29udGFpbmVyLWlubmVyJyk7XG4gICAgdGhpcy5faW5pdE1hcEluc3RhbmNlKGNvbnRhaW5lcik7XG4gIH1cblxuICBwcml2YXRlIF9pbml0TWFwSW5zdGFuY2UoZWw6IEhUTUxFbGVtZW50KSB7XG4gICAgY29uc3QgbWFwT3B0aW9uOiBhbnkgPSB7XG4gICAgICBjZW50ZXI6IHtsYXQ6IHRoaXMubGF0aXR1ZGUgfHwgMCwgbG5nOiB0aGlzLmxvbmdpdHVkZSB8fCAwfSxcbiAgICAgIHpvb206IHRoaXMuem9vbSxcbiAgICAgIG1pblpvb206IHRoaXMubWluWm9vbSxcbiAgICAgIG1heFpvb206IHRoaXMubWF4Wm9vbSxcbiAgICAgIGNvbnRyb2xTaXplOiB0aGlzLmNvbnRyb2xTaXplLFxuICAgICAgZGlzYWJsZURlZmF1bHRVSTogdGhpcy5kaXNhYmxlRGVmYXVsdFVJLFxuICAgICAgZGlzYWJsZURvdWJsZUNsaWNrWm9vbTogdGhpcy5kaXNhYmxlRG91YmxlQ2xpY2tab29tLFxuICAgICAgc2Nyb2xsd2hlZWw6IHRoaXMuc2Nyb2xsd2hlZWwsXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6IHRoaXMuYmFja2dyb3VuZENvbG9yLFxuICAgICAgZHJhZ2dhYmxlOiB0aGlzLmRyYWdnYWJsZSxcbiAgICAgIGRyYWdnYWJsZUN1cnNvcjogdGhpcy5kcmFnZ2FibGVDdXJzb3IsXG4gICAgICBkcmFnZ2luZ0N1cnNvcjogdGhpcy5kcmFnZ2luZ0N1cnNvcixcbiAgICAgIGtleWJvYXJkU2hvcnRjdXRzOiB0aGlzLmtleWJvYXJkU2hvcnRjdXRzLFxuICAgICAgc3R5bGVzOiB0aGlzLnN0eWxlcyxcbiAgICAgIG1hcFR5cGVJZDogdGhpcy5tYXBUeXBlSWQudG9Mb2NhbGVMb3dlckNhc2UoKSxcbiAgICAgIGNsaWNrYWJsZUljb25zOiB0aGlzLmNsaWNrYWJsZUljb25zLFxuICAgICAgZ2VzdHVyZUhhbmRsaW5nOiB0aGlzLmdlc3R1cmVIYW5kbGluZyxcbiAgICAgIHRpbHQ6IHRoaXMudGlsdCxcbiAgICAgIHJlc3RyaWN0aW9uOiB0aGlzLnJlc3RyaWN0aW9uLFxuICAgIH07XG4gICAgaWYgKHRoaXMubWFwSWQpIHtcbiAgICAgIG1hcE9wdGlvbi5tYXBJZCA9IHRoaXMubWFwSWQ7XG4gICAgfVxuICAgIHRoaXMuX21hcHNXcmFwcGVyLmNyZWF0ZU1hcChlbCwgbWFwT3B0aW9uKVxuICAgICAgLnRoZW4oKCkgPT4gdGhpcy5fbWFwc1dyYXBwZXIuZ2V0TmF0aXZlTWFwKCkpXG4gICAgICAudGhlbihtYXAgPT4gdGhpcy5tYXBSZWFkeS5lbWl0KG1hcCkpO1xuXG4gICAgLy8gcmVnaXN0ZXIgZXZlbnQgbGlzdGVuZXJzXG4gICAgdGhpcy5faGFuZGxlTWFwQ2VudGVyQ2hhbmdlKCk7XG4gICAgdGhpcy5faGFuZGxlTWFwWm9vbUNoYW5nZSgpO1xuICAgIHRoaXMuX2hhbmRsZU1hcE1vdXNlRXZlbnRzKCk7XG4gICAgdGhpcy5faGFuZGxlQm91bmRzQ2hhbmdlKCk7XG4gICAgdGhpcy5faGFuZGxlTWFwVHlwZUlkQ2hhbmdlKCk7XG4gICAgdGhpcy5faGFuZGxlVGlsZXNMb2FkZWRFdmVudCgpO1xuICAgIHRoaXMuX2hhbmRsZUlkbGVFdmVudCgpO1xuICAgIHRoaXMuX2hhbmRsZUNvbnRyb2xDaGFuZ2UoKTtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgLy8gdW5zdWJzY3JpYmUgYWxsIHJlZ2lzdGVyZWQgb2JzZXJ2YWJsZSBzdWJzY3JpcHRpb25zXG4gICAgdGhpcy5fb2JzZXJ2YWJsZVN1YnNjcmlwdGlvbnMuZm9yRWFjaCgocykgPT4gcy51bnN1YnNjcmliZSgpKTtcblxuICAgIC8vIHJlbW92ZSBhbGwgbGlzdGVuZXJzIGZyb20gdGhlIG1hcCBpbnN0YW5jZVxuICAgIHRoaXMuX21hcHNXcmFwcGVyLmNsZWFySW5zdGFuY2VMaXN0ZW5lcnMoKTtcbiAgICBpZiAodGhpcy5fZml0Qm91bmRzU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLl9maXRCb3VuZHNTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cblxuICAvKiBAaW50ZXJuYWwgKi9cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIHRoaXMuX3VwZGF0ZU1hcE9wdGlvbnNDaGFuZ2VzKGNoYW5nZXMpO1xuICAgIHRoaXMuX3VwZGF0ZVBvc2l0aW9uKGNoYW5nZXMpO1xuICB9XG5cbiAgcHJpdmF0ZSBfdXBkYXRlTWFwT3B0aW9uc0NoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGNvbnN0IG9wdGlvbnM6IHtbcHJvcE5hbWU6IHN0cmluZ106IGFueX0gPSB7fTtcbiAgICBjb25zdCBvcHRpb25LZXlzID1cbiAgICAgIE9iamVjdC5rZXlzKGNoYW5nZXMpLmZpbHRlcihrID0+IEFnbU1hcC5fbWFwT3B0aW9uc0F0dHJpYnV0ZXMuaW5kZXhPZihrKSAhPT0gLTEpO1xuICAgIG9wdGlvbktleXMuZm9yRWFjaCgoaykgPT4geyBvcHRpb25zW2tdID0gY2hhbmdlc1trXS5jdXJyZW50VmFsdWU7IH0pO1xuICAgIHRoaXMuX21hcHNXcmFwcGVyLnNldE1hcE9wdGlvbnMob3B0aW9ucyk7XG4gIH1cblxuICAvKipcbiAgICogVHJpZ2dlcnMgYSByZXNpemUgZXZlbnQgb24gdGhlIGdvb2dsZSBtYXAgaW5zdGFuY2UuXG4gICAqIFdoZW4gcmVjZW50ZXIgaXMgdHJ1ZSwgdGhlIG9mIHRoZSBnb29nbGUgbWFwIGdldHMgY2FsbGVkIHdpdGggdGhlIGN1cnJlbnQgbGF0L2xuZyB2YWx1ZXMgb3IgZml0Qm91bmRzIHZhbHVlIHRvIHJlY2VudGVyIHRoZSBtYXAuXG4gICAqIFJldHVybnMgYSBwcm9taXNlIHRoYXQgZ2V0cyByZXNvbHZlZCBhZnRlciB0aGUgZXZlbnQgd2FzIHRyaWdnZXJlZC5cbiAgICovXG4gIHRyaWdnZXJSZXNpemUocmVjZW50ZXI6IGJvb2xlYW4gPSB0cnVlKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgLy8gTm90ZTogV2hlbiB3ZSB3b3VsZCB0cmlnZ2VyIHRoZSByZXNpemUgZXZlbnQgYW5kIHNob3cgdGhlIG1hcCBpbiB0aGUgc2FtZSB0dXJuICh3aGljaCBpcyBhXG4gICAgLy8gY29tbW9uIGNhc2UgZm9yIHRyaWdnZXJpbmcgYSByZXNpemUgZXZlbnQpLCB0aGVuIHRoZSByZXNpemUgZXZlbnQgd291bGQgbm90XG4gICAgLy8gd29yayAodG8gc2hvdyB0aGUgbWFwKSwgc28gd2UgdHJpZ2dlciB0aGUgZXZlbnQgaW4gYSB0aW1lb3V0LlxuICAgIHJldHVybiBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSkgPT4ge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tYXBzV3JhcHBlci50cmlnZ2VyTWFwRXZlbnQoJ3Jlc2l6ZScpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgIGlmIChyZWNlbnRlcikge1xuICAgICAgICAgICAgdGhpcy5maXRCb3VuZHMgIT0gbnVsbCA/IHRoaXMuX2ZpdEJvdW5kcygpIDogdGhpcy5fc2V0Q2VudGVyKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX3VwZGF0ZVBvc2l0aW9uKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZTogbm8tc3RyaW5nLWxpdGVyYWxcbiAgICBpZiAoY2hhbmdlc1snbGF0aXR1ZGUnXSA9PSBudWxsICYmIGNoYW5nZXNbJ2xvbmdpdHVkZSddID09IG51bGwgJiZcbiAgICAgICAgIWNoYW5nZXNbJ2ZpdEJvdW5kcyddKSB7XG4gICAgICAvLyBubyBwb3NpdGlvbiB1cGRhdGUgbmVlZGVkXG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIHRzbGludDplbmFibGU6IG5vLXN0cmluZy1saXRlcmFsXG5cbiAgICAvLyB3ZSBwcmVmZXIgZml0Qm91bmRzIGluIGNoYW5nZXNcbiAgICBpZiAoJ2ZpdEJvdW5kcycgaW4gY2hhbmdlcykge1xuICAgICAgdGhpcy5fZml0Qm91bmRzKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiB0aGlzLmxhdGl0dWRlICE9PSAnbnVtYmVyJyB8fCB0eXBlb2YgdGhpcy5sb25naXR1ZGUgIT09ICdudW1iZXInKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX3NldENlbnRlcigpO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2V0Q2VudGVyKCkge1xuICAgIGNvbnN0IG5ld0NlbnRlciA9IHtcbiAgICAgIGxhdDogdGhpcy5sYXRpdHVkZSxcbiAgICAgIGxuZzogdGhpcy5sb25naXR1ZGUsXG4gICAgfTtcbiAgICBpZiAodGhpcy51c2VQYW5uaW5nKSB7XG4gICAgICB0aGlzLl9tYXBzV3JhcHBlci5wYW5UbyhuZXdDZW50ZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9tYXBzV3JhcHBlci5zZXRDZW50ZXIobmV3Q2VudGVyKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9maXRCb3VuZHMoKSB7XG4gICAgc3dpdGNoICh0aGlzLmZpdEJvdW5kcykge1xuICAgICAgY2FzZSB0cnVlOlxuICAgICAgICB0aGlzLl9zdWJzY3JpYmVUb0ZpdEJvdW5kc1VwZGF0ZXMoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIGZhbHNlOlxuICAgICAgICBpZiAodGhpcy5fZml0Qm91bmRzU3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgdGhpcy5fZml0Qm91bmRzU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBpZiAodGhpcy5fZml0Qm91bmRzU3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgdGhpcy5fZml0Qm91bmRzU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fdXBkYXRlQm91bmRzKHRoaXMuZml0Qm91bmRzLCB0aGlzLmZpdEJvdW5kc1BhZGRpbmcpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3N1YnNjcmliZVRvRml0Qm91bmRzVXBkYXRlcygpIHtcbiAgICB0aGlzLl96b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMuX2ZpdEJvdW5kc1N1YnNjcmlwdGlvbiA9IHRoaXMuX2ZpdEJvdW5kc1NlcnZpY2UuZ2V0Qm91bmRzJCgpLnN1YnNjcmliZShiID0+IHtcbiAgICAgICAgdGhpcy5fem9uZS5ydW4oKCkgPT4gdGhpcy5fdXBkYXRlQm91bmRzKGIsIHRoaXMuZml0Qm91bmRzUGFkZGluZykpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgX3VwZGF0ZUJvdW5kcyhib3VuZHM6IGdvb2dsZS5tYXBzLkxhdExuZ0JvdW5kcyB8IGdvb2dsZS5tYXBzLkxhdExuZ0JvdW5kc0xpdGVyYWwsIHBhZGRpbmc/OiBudW1iZXIgfCBnb29nbGUubWFwcy5QYWRkaW5nKSB7XG4gICAgaWYgKCFib3VuZHMpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRoaXMuX2lzTGF0TG5nQm91bmRzTGl0ZXJhbChib3VuZHMpICYmIHR5cGVvZiBnb29nbGUgIT09ICd1bmRlZmluZWQnICYmIGdvb2dsZSAmJiBnb29nbGUubWFwcyAmJiBnb29nbGUubWFwcy5MYXRMbmdCb3VuZHMpIHtcbiAgICAgIGNvbnN0IG5ld0JvdW5kcyA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmdCb3VuZHMoKTtcbiAgICAgIG5ld0JvdW5kcy51bmlvbihib3VuZHMpO1xuICAgICAgYm91bmRzID0gbmV3Qm91bmRzO1xuICAgIH1cbiAgICBpZiAodGhpcy51c2VQYW5uaW5nKSB7XG4gICAgICB0aGlzLl9tYXBzV3JhcHBlci5wYW5Ub0JvdW5kcyhib3VuZHMsIHBhZGRpbmcpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9tYXBzV3JhcHBlci5maXRCb3VuZHMoYm91bmRzLCBwYWRkaW5nKTtcbiAgfVxuXG4gIHByaXZhdGUgX2lzTGF0TG5nQm91bmRzTGl0ZXJhbChib3VuZHM6IGdvb2dsZS5tYXBzLkxhdExuZ0JvdW5kcyB8IGdvb2dsZS5tYXBzLkxhdExuZ0JvdW5kc0xpdGVyYWwpOiBib29sZWFuIHtcbiAgICByZXR1cm4gYm91bmRzICE9IG51bGwgJiYgKGJvdW5kcyBhcyBhbnkpLmV4dGVuZCA9PT0gdW5kZWZpbmVkO1xuICB9XG5cbiAgcHJpdmF0ZSBfaGFuZGxlTWFwQ2VudGVyQ2hhbmdlKCkge1xuICAgIGNvbnN0IHMgPSB0aGlzLl9tYXBzV3JhcHBlci5zdWJzY3JpYmVUb01hcEV2ZW50KCdjZW50ZXJfY2hhbmdlZCcpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLl9tYXBzV3JhcHBlci5nZXRDZW50ZXIoKS50aGVuKChjZW50ZXI6IGdvb2dsZS5tYXBzLkxhdExuZykgPT4ge1xuICAgICAgICB0aGlzLmxhdGl0dWRlID0gY2VudGVyLmxhdCgpO1xuICAgICAgICB0aGlzLmxvbmdpdHVkZSA9IGNlbnRlci5sbmcoKTtcbiAgICAgICAgdGhpcy5jZW50ZXJDaGFuZ2UuZW1pdCh7bGF0OiB0aGlzLmxhdGl0dWRlLCBsbmc6IHRoaXMubG9uZ2l0dWRlfSBhcyBnb29nbGUubWFwcy5MYXRMbmdMaXRlcmFsKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHRoaXMuX29ic2VydmFibGVTdWJzY3JpcHRpb25zLnB1c2gocyk7XG4gIH1cblxuICBwcml2YXRlIF9oYW5kbGVCb3VuZHNDaGFuZ2UoKSB7XG4gICAgY29uc3QgcyA9IHRoaXMuX21hcHNXcmFwcGVyLnN1YnNjcmliZVRvTWFwRXZlbnQoJ2JvdW5kc19jaGFuZ2VkJykuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMuX21hcHNXcmFwcGVyLmdldEJvdW5kcygpLnRoZW4oXG4gICAgICAgIChib3VuZHM6IGdvb2dsZS5tYXBzLkxhdExuZ0JvdW5kcykgPT4geyB0aGlzLmJvdW5kc0NoYW5nZS5lbWl0KGJvdW5kcyk7IH0pO1xuICAgIH0pO1xuICAgIHRoaXMuX29ic2VydmFibGVTdWJzY3JpcHRpb25zLnB1c2gocyk7XG4gIH1cblxuICBwcml2YXRlIF9oYW5kbGVNYXBUeXBlSWRDaGFuZ2UoKSB7XG4gICAgY29uc3QgcyA9IHRoaXMuX21hcHNXcmFwcGVyLnN1YnNjcmliZVRvTWFwRXZlbnQoJ21hcHR5cGVpZF9jaGFuZ2VkJykuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMuX21hcHNXcmFwcGVyLmdldE1hcFR5cGVJZCgpLnRoZW4oXG4gICAgICAgIChtYXBUeXBlSWQ6IGdvb2dsZS5tYXBzLk1hcFR5cGVJZCkgPT4geyB0aGlzLm1hcFR5cGVJZENoYW5nZS5lbWl0KG1hcFR5cGVJZCk7IH0pO1xuICAgIH0pO1xuICAgIHRoaXMuX29ic2VydmFibGVTdWJzY3JpcHRpb25zLnB1c2gocyk7XG4gIH1cblxuICBwcml2YXRlIF9oYW5kbGVNYXBab29tQ2hhbmdlKCkge1xuICAgIGNvbnN0IHMgPSB0aGlzLl9tYXBzV3JhcHBlci5zdWJzY3JpYmVUb01hcEV2ZW50KCd6b29tX2NoYW5nZWQnKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5fbWFwc1dyYXBwZXIuZ2V0Wm9vbSgpLnRoZW4oKHo6IG51bWJlcikgPT4ge1xuICAgICAgICB0aGlzLnpvb20gPSB6O1xuICAgICAgICB0aGlzLnpvb21DaGFuZ2UuZW1pdCh6KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHRoaXMuX29ic2VydmFibGVTdWJzY3JpcHRpb25zLnB1c2gocyk7XG4gIH1cblxuICBwcml2YXRlIF9oYW5kbGVJZGxlRXZlbnQoKSB7XG4gICAgY29uc3QgcyA9IHRoaXMuX21hcHNXcmFwcGVyLnN1YnNjcmliZVRvTWFwRXZlbnQoJ2lkbGUnKS5zdWJzY3JpYmUoXG4gICAgICAoKSA9PiB7IHRoaXMuaWRsZS5lbWl0KHZvaWQgMCk7IH0pO1xuICAgIHRoaXMuX29ic2VydmFibGVTdWJzY3JpcHRpb25zLnB1c2gocyk7XG4gIH1cblxuICBwcml2YXRlIF9oYW5kbGVUaWxlc0xvYWRlZEV2ZW50KCkge1xuICAgIGNvbnN0IHMgPSB0aGlzLl9tYXBzV3JhcHBlci5zdWJzY3JpYmVUb01hcEV2ZW50KCd0aWxlc2xvYWRlZCcpLnN1YnNjcmliZShcbiAgICAgICgpID0+IHRoaXMudGlsZXNMb2FkZWQuZW1pdCh2b2lkIDApLFxuICAgICk7XG4gICAgdGhpcy5fb2JzZXJ2YWJsZVN1YnNjcmlwdGlvbnMucHVzaChzKTtcbiAgfVxuXG4gIHByaXZhdGUgX2hhbmRsZU1hcE1vdXNlRXZlbnRzKCkge1xuICAgIHR5cGUgRXZlbnQgPSB7IG5hbWU6ICdyaWdodGNsaWNrJyB8ICdjbGljaycgfCAnZGJsY2xpY2snLCBlbWl0dGVyOiBFdmVudEVtaXR0ZXI8YW55PiB9O1xuXG4gICAgY29uc3QgZXZlbnRzOiBFdmVudFtdID0gW1xuICAgICAge25hbWU6ICdjbGljaycsIGVtaXR0ZXI6IHRoaXMubWFwQ2xpY2t9LFxuICAgICAge25hbWU6ICdyaWdodGNsaWNrJywgZW1pdHRlcjogdGhpcy5tYXBSaWdodENsaWNrfSxcbiAgICAgIHtuYW1lOiAnZGJsY2xpY2snLCBlbWl0dGVyOiB0aGlzLm1hcERibENsaWNrfSxcbiAgICBdO1xuXG4gICAgZXZlbnRzLmZvckVhY2goZSA9PiB7XG4gICAgICBjb25zdCBzID0gdGhpcy5fbWFwc1dyYXBwZXIuc3Vic2NyaWJlVG9NYXBFdmVudChlLm5hbWUpLnN1YnNjcmliZShcbiAgICAgICAgKFtldmVudF0pID0+IHtcbiAgICAgICAgICAvLyB0aGUgcGxhY2VJZCB3aWxsIGJlIHVuZGVmaW5lZCBpbiBjYXNlIHRoZSBldmVudCB3YXMgbm90IGFuIEljb25Nb3VzZUV2ZW50IChnb29nbGUgdHlwZXMpXG4gICAgICAgICAgaWYgKCAoZXZlbnQgYXMgZ29vZ2xlLm1hcHMuSWNvbk1vdXNlRXZlbnQpLnBsYWNlSWQgJiYgIXRoaXMuc2hvd0RlZmF1bHRJbmZvV2luZG93KSB7XG4gICAgICAgICAgICBldmVudC5zdG9wKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGUuZW1pdHRlci5lbWl0KGV2ZW50KTtcbiAgICAgICAgfSk7XG4gICAgICB0aGlzLl9vYnNlcnZhYmxlU3Vic2NyaXB0aW9ucy5wdXNoKHMpO1xuICAgIH0pO1xuICB9XG5cbiAgX2hhbmRsZUNvbnRyb2xDaGFuZ2UoKSB7XG4gICAgdGhpcy5fc2V0Q29udHJvbHMoKTtcbiAgICB0aGlzLm1hcENvbnRyb2xzLmNoYW5nZXMuc3Vic2NyaWJlKCgpID0+IHRoaXMuX3NldENvbnRyb2xzKCkpO1xuICB9XG5cbiAgX3NldENvbnRyb2xzKCkge1xuICAgIGNvbnN0IGNvbnRyb2xPcHRpb25zOiBQYXJ0aWFsPGdvb2dsZS5tYXBzLk1hcE9wdGlvbnM+ID0ge1xuICAgICAgZnVsbHNjcmVlbkNvbnRyb2w6ICF0aGlzLmRpc2FibGVEZWZhdWx0VUksXG4gICAgICBtYXBUeXBlQ29udHJvbDogZmFsc2UsXG4gICAgICBwYW5Db250cm9sOiBmYWxzZSxcbiAgICAgIHJvdGF0ZUNvbnRyb2w6IGZhbHNlLFxuICAgICAgc2NhbGVDb250cm9sOiBmYWxzZSxcbiAgICAgIHN0cmVldFZpZXdDb250cm9sOiAhdGhpcy5kaXNhYmxlRGVmYXVsdFVJLFxuICAgICAgem9vbUNvbnRyb2w6ICF0aGlzLmRpc2FibGVEZWZhdWx0VUksXG4gICAgfTtcbiAgICB0aGlzLm1hcENvbnRyb2xzLmZvckVhY2goY29udHJvbCA9PiBPYmplY3QuYXNzaWduKGNvbnRyb2xPcHRpb25zLCBjb250cm9sLmdldE9wdGlvbnMoKSkpO1xuICAgIHRoaXMuX21hcHNXcmFwcGVyLnNldE1hcE9wdGlvbnMoY29udHJvbE9wdGlvbnMpO1xuICB9XG59XG4iXX0=