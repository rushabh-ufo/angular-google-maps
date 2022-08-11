import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { PolygonManager } from '../services/managers/polygon-manager';
/**
 * AgmPolygon renders a polygon on a {@link AgmMap}
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
 *      <agm-polygon [paths]="paths">
 *      </agm-polygon>
 *    </agm-map>
 *  `
 * })
 * export class MyMapCmp {
 *   lat: number = 0;
 *   lng: number = 0;
 *   zoom: number = 10;
 *   paths: LatLngLiteral[] = [
 *     { lat: 0,  lng: 10 },
 *     { lat: 0,  lng: 20 },
 *     { lat: 10, lng: 20 },
 *     { lat: 10, lng: 10 },
 *     { lat: 0,  lng: 10 }
 *   ]
 *   // Nesting paths will create a hole where they overlap;
 *   nestedPaths: LatLngLiteral[][] = [[
 *     { lat: 0,  lng: 10 },
 *     { lat: 0,  lng: 20 },
 *     { lat: 10, lng: 20 },
 *     { lat: 10, lng: 10 },
 *     { lat: 0,  lng: 10 }
 *   ], [
 *     { lat: 0, lng: 15 },
 *     { lat: 0, lng: 20 },
 *     { lat: 5, lng: 20 },
 *     { lat: 5, lng: 15 },
 *     { lat: 0, lng: 15 }
 *   ]]
 * }
 * ```
 */
export class AgmPolygon {
    constructor(_polygonManager) {
        this._polygonManager = _polygonManager;
        /**
         * Indicates whether this Polygon handles mouse events. Defaults to true.
         */
        this.clickable = true;
        /**
         * If set to true, the user can drag this shape over the map. The geodesic
         * property defines the mode of dragging. Defaults to false.
         */
        // tslint:disable-next-line:no-input-rename
        this.draggable = false;
        /**
         * If set to true, the user can edit this shape by dragging the control
         * points shown at the vertices and on each segment. Defaults to false.
         */
        this.editable = false;
        /**
         * When true, edges of the polygon are interpreted as geodesic and will
         * follow the curvature of the Earth. When false, edges of the polygon are
         * rendered as straight lines in screen space. Note that the shape of a
         * geodesic polygon may appear to change when dragged, as the dimensions
         * are maintained relative to the surface of the earth. Defaults to false.
         */
        this.geodesic = false;
        /**
         * The ordered sequence of coordinates that designates a closed loop.
         * Unlike polylines, a polygon may consist of one or more paths.
         *  As a result, the paths property may specify one or more arrays of
         * LatLng coordinates. Paths are closed automatically; do not repeat the
         * first vertex of the path as the last vertex. Simple polygons may be
         * defined using a single array of LatLngs. More complex polygons may
         * specify an array of arrays. Any simple arrays are converted into Arrays.
         * Inserting or removing LatLngs from the Array will automatically update
         * the polygon on the map.
         */
        this.paths = [];
        /**
         * This event is fired when the DOM click event is fired on the Polygon.
         */
        this.polyClick = new EventEmitter();
        /**
         * This event is fired when the DOM dblclick event is fired on the Polygon.
         */
        this.polyDblClick = new EventEmitter();
        /**
         * This event is repeatedly fired while the user drags the polygon.
         */
        this.polyDrag = new EventEmitter();
        /**
         * This event is fired when the user stops dragging the polygon.
         */
        this.polyDragEnd = new EventEmitter();
        /**
         * This event is fired when the user starts dragging the polygon.
         */
        this.polyDragStart = new EventEmitter();
        /**
         * This event is fired when the DOM mousedown event is fired on the Polygon.
         */
        this.polyMouseDown = new EventEmitter();
        /**
         * This event is fired when the DOM mousemove event is fired on the Polygon.
         */
        this.polyMouseMove = new EventEmitter();
        /**
         * This event is fired on Polygon mouseout.
         */
        this.polyMouseOut = new EventEmitter();
        /**
         * This event is fired on Polygon mouseover.
         */
        this.polyMouseOver = new EventEmitter();
        /**
         * This event is fired whe the DOM mouseup event is fired on the Polygon
         */
        this.polyMouseUp = new EventEmitter();
        /**
         * This event is fired when the Polygon is right-clicked on.
         */
        this.polyRightClick = new EventEmitter();
        /**
         * This event is fired after Polygon first path changes.
         */
        this.polyPathsChange = new EventEmitter();
        this._polygonAddedToManager = false;
        this._subscriptions = [];
    }
    /** @internal */
    ngAfterContentInit() {
        if (!this._polygonAddedToManager) {
            this._init();
        }
    }
    ngOnChanges(changes) {
        if (!this._polygonAddedToManager) {
            this._init();
            return;
        }
        this._polygonManager.setPolygonOptions(this, this._updatePolygonOptions(changes));
    }
    _init() {
        this._polygonManager.addPolygon(this);
        this._polygonAddedToManager = true;
        this._addEventListeners();
    }
    _addEventListeners() {
        const handlers = [
            { name: 'click', handler: (ev) => this.polyClick.emit(ev) },
            { name: 'dblclick', handler: (ev) => this.polyDblClick.emit(ev) },
            { name: 'drag', handler: (ev) => this.polyDrag.emit(ev) },
            { name: 'dragend', handler: (ev) => this.polyDragEnd.emit(ev) },
            { name: 'dragstart', handler: (ev) => this.polyDragStart.emit(ev) },
            { name: 'mousedown', handler: (ev) => this.polyMouseDown.emit(ev) },
            { name: 'mousemove', handler: (ev) => this.polyMouseMove.emit(ev) },
            { name: 'mouseout', handler: (ev) => this.polyMouseOut.emit(ev) },
            { name: 'mouseover', handler: (ev) => this.polyMouseOver.emit(ev) },
            { name: 'mouseup', handler: (ev) => this.polyMouseUp.emit(ev) },
            { name: 'rightclick', handler: (ev) => this.polyRightClick.emit(ev) },
        ];
        handlers.forEach((obj) => {
            const os = this._polygonManager.createEventObservable(obj.name, this).subscribe(obj.handler);
            this._subscriptions.push(os);
        });
        this._polygonManager.createPathEventObservable(this)
            .then(paths$ => {
            const os = paths$.subscribe(pathEvent => this.polyPathsChange.emit(pathEvent));
            this._subscriptions.push(os);
        });
    }
    _updatePolygonOptions(changes) {
        return Object.keys(changes)
            .filter(k => AgmPolygon._polygonOptionsAttributes.indexOf(k) !== -1)
            .reduce((obj, k) => {
            obj[k] = changes[k].currentValue;
            return obj;
        }, {});
    }
    /** @internal */
    id() { return this._id; }
    /** @internal */
    ngOnDestroy() {
        this._polygonManager.deletePolygon(this);
        // unsubscribe all registered observable subscriptions
        this._subscriptions.forEach((s) => s.unsubscribe());
    }
    getPath() {
        return this._polygonManager.getPath(this);
    }
    getPaths() {
        return this._polygonManager.getPaths(this);
    }
}
AgmPolygon._polygonOptionsAttributes = [
    'clickable', 'draggable', 'editable', 'fillColor', 'fillOpacity', 'geodesic', 'icon', 'map',
    'paths', 'strokeColor', 'strokeOpacity', 'strokeWeight', 'visible', 'zIndex', 'draggable',
    'editable', 'visible',
];
AgmPolygon.decorators = [
    { type: Directive, args: [{
                selector: 'agm-polygon',
            },] }
];
AgmPolygon.ctorParameters = () => [
    { type: PolygonManager }
];
AgmPolygon.propDecorators = {
    clickable: [{ type: Input }],
    draggable: [{ type: Input, args: ['polyDraggable',] }],
    editable: [{ type: Input }],
    fillColor: [{ type: Input }],
    fillOpacity: [{ type: Input }],
    geodesic: [{ type: Input }],
    paths: [{ type: Input }],
    strokeColor: [{ type: Input }],
    strokeOpacity: [{ type: Input }],
    strokeWeight: [{ type: Input }],
    visible: [{ type: Input }],
    zIndex: [{ type: Input }],
    polyClick: [{ type: Output }],
    polyDblClick: [{ type: Output }],
    polyDrag: [{ type: Output }],
    polyDragEnd: [{ type: Output }],
    polyDragStart: [{ type: Output }],
    polyMouseDown: [{ type: Output }],
    polyMouseMove: [{ type: Output }],
    polyMouseOut: [{ type: Output }],
    polyMouseOver: [{ type: Output }],
    polyMouseUp: [{ type: Output }],
    polyRightClick: [{ type: Output }],
    polyPathsChange: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9seWdvbi5qcyIsInNvdXJjZVJvb3QiOiJEOi9BdXRvbWF0aW9uL2FuZ3VsYXItZ29vZ2xlLW1hcHMvcGFja2FnZXMvY29yZS9zcmMvIiwic291cmNlcyI6WyJsaWIvZGlyZWN0aXZlcy9wb2x5Z29uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBb0IsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQXdCLE1BQU0sRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFHOUgsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBR3RFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnREc7QUFJSCxNQUFNLE9BQU8sVUFBVTtJQXNKckIsWUFBb0IsZUFBK0I7UUFBL0Isb0JBQWUsR0FBZixlQUFlLENBQWdCO1FBckpuRDs7V0FFRztRQUNNLGNBQVMsR0FBRyxJQUFJLENBQUM7UUFFMUI7OztXQUdHO1FBQ0gsMkNBQTJDO1FBQ25CLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFFMUM7OztXQUdHO1FBQ00sYUFBUSxHQUFHLEtBQUssQ0FBQztRQWExQjs7Ozs7O1dBTUc7UUFDTSxhQUFRLEdBQUcsS0FBSyxDQUFDO1FBRTFCOzs7Ozs7Ozs7O1dBVUc7UUFDTSxVQUFLLEdBRW9ELEVBQUUsQ0FBQztRQTRCckU7O1dBRUc7UUFDTyxjQUFTLEdBQTZDLElBQUksWUFBWSxFQUE4QixDQUFDO1FBRS9HOztXQUVHO1FBQ08saUJBQVksR0FBNkMsSUFBSSxZQUFZLEVBQThCLENBQUM7UUFFbEg7O1dBRUc7UUFDTyxhQUFRLEdBQXlDLElBQUksWUFBWSxFQUEwQixDQUFDO1FBRXRHOztXQUVHO1FBQ08sZ0JBQVcsR0FBeUMsSUFBSSxZQUFZLEVBQTBCLENBQUM7UUFFekc7O1dBRUc7UUFDTyxrQkFBYSxHQUF5QyxJQUFJLFlBQVksRUFBMEIsQ0FBQztRQUUzRzs7V0FFRztRQUNPLGtCQUFhLEdBQTZDLElB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LGFBQWE7YUFDeEI7OztZQXREUSxjQUFjOzs7d0JBMkRwQixLQUFLO3dCQU9MLEtBQUssU0FBQyxlQUFlO3VCQU1yQixLQUFLO3dCQU1MLEtBQUs7MEJBS0wsS0FBSzt1QkFTTCxLQUFLO29CQWFMLEtBQUs7MEJBUUwsS0FBSzs0QkFLTCxLQUFLOzJCQUtMLEtBQUs7c0JBS0wsS0FBSztxQkFLTCxLQUFLO3dCQUtMLE1BQU07MkJBS04sTUFBTTt1QkFLTixNQUFNOzBCQUtOLE1BQU07NEJBS04sTUFBTTs0QkFLTixNQUFNOzRCQUtOLE1BQU07MkJBS04sTUFBTTs0QkFLTixNQUFNOzBCQUtOLE1BQU07NkJBS04sTUFBTTs4QkFLTixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZ0ZXJDb250ZW50SW5pdCwgRGlyZWN0aXZlLCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgT3V0cHV0LCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHsgUG9seWdvbk1hbmFnZXIgfSBmcm9tICcuLi9zZXJ2aWNlcy9tYW5hZ2Vycy9wb2x5Z29uLW1hbmFnZXInO1xyXG5pbXBvcnQgeyBNVkNFdmVudCB9IGZyb20gJy4uL3V0aWxzL212Y2FycmF5LXV0aWxzJztcclxuXHJcbi8qKlxyXG4gKiBBZ21Qb2x5Z29uIHJlbmRlcnMgYSBwb2x5Z29uIG9uIGEge0BsaW5rIEFnbU1hcH1cclxuICpcclxuICogIyMjIEV4YW1wbGVcclxuICogYGBgdHlwZXNjcmlwdFxyXG4gKiBpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuICpcclxuICogQENvbXBvbmVudCh7XHJcbiAqICBzZWxlY3RvcjogJ215LW1hcC1jbXAnLFxyXG4gKiAgc3R5bGVzOiBbYFxyXG4gKiAgICBhZ20tbWFwIHtcclxuICogICAgICBoZWlnaHQ6IDMwMHB4O1xyXG4gKiAgICB9XHJcbiAqIGBdLFxyXG4gKiAgdGVtcGxhdGU6IGBcclxuICogICAgPGFnbS1tYXAgW2xhdGl0dWRlXT1cImxhdFwiIFtsb25naXR1ZGVdPVwibG5nXCIgW3pvb21dPVwiem9vbVwiPlxyXG4gKiAgICAgIDxhZ20tcG9seWdvbiBbcGF0aHNdPVwicGF0aHNcIj5cclxuICogICAgICA8L2FnbS1wb2x5Z29uPlxyXG4gKiAgICA8L2FnbS1tYXA+XHJcbiAqICBgXHJcbiAqIH0pXHJcbiAqIGV4cG9ydCBjbGFzcyBNeU1hcENtcCB7XHJcbiAqICAgbGF0OiBudW1iZXIgPSAwO1xyXG4gKiAgIGxuZzogbnVtYmVyID0gMDtcclxuICogICB6b29tOiBudW1iZXIgPSAxMDtcclxuICogICBwYXRoczogTGF0TG5nTGl0ZXJhbFtdID0gW1xyXG4gKiAgICAgeyBsYXQ6IDAsICBsbmc6IDEwIH0sXHJcbiAqICAgICB7IGxhdDogMCwgIGxuZzogMjAgfSxcclxuICogICAgIHsgbGF0OiAxMCwgbG5nOiAyMCB9LFxyXG4gKiAgICAgeyBsYXQ6IDEwLCBsbmc6IDEwIH0sXHJcbiAqICAgICB7IGxhdDogMCwgIGxuZzogMTAgfVxyXG4gKiAgIF1cclxuICogICAvLyBOZXN0aW5nIHBhdGhzIHdpbGwgY3JlYXRlIGEgaG9sZSB3aGVyZSB0aGV5IG92ZXJsYXA7XHJcbiAqICAgbmVzdGVkUGF0aHM6IExhdExuZ0xpdGVyYWxbXVtdID0gW1tcclxuICogICAgIHsgbGF0OiAwLCAgbG5nOiAxMCB9LFxyXG4gKiAgICAgeyBsYXQ6IDAsICBsbmc6IDIwIH0sXHJcbiAqICAgICB7IGxhdDogMTAsIGxuZzogMjAgfSxcclxuICogICAgIHsgbGF0OiAxMCwgbG5nOiAxMCB9LFxyXG4gKiAgICAgeyBsYXQ6IDAsICBsbmc6IDEwIH1cclxuICogICBdLCBbXHJcbiAqICAgICB7IGxhdDogMCwgbG5nOiAxNSB9LFxyXG4gKiAgICAgeyBsYXQ6IDAsIGxuZzogMjAgfSxcclxuICogICAgIHsgbGF0OiA1LCBsbmc6IDIwIH0sXHJcbiAqICAgICB7IGxhdDogNSwgbG5nOiAxNSB9LFxyXG4gKiAgICAgeyBsYXQ6IDAsIGxuZzogMTUgfVxyXG4gKiAgIF1dXHJcbiAqIH1cclxuICogYGBgXHJcbiAqL1xyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ2FnbS1wb2x5Z29uJyxcclxufSlcclxuZXhwb3J0IGNsYXNzIEFnbVBvbHlnb24gaW1wbGVtZW50cyBPbkRlc3Ryb3ksIE9uQ2hhbmdlcywgQWZ0ZXJDb250ZW50SW5pdCB7XHJcbiAgLyoqXHJcbiAgICogSW5kaWNhdGVzIHdoZXRoZXIgdGhpcyBQb2x5Z29uIGhhbmRsZXMgbW91c2UgZXZlbnRzLiBEZWZhdWx0cyB0byB0cnVlLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGNsaWNrYWJsZSA9IHRydWU7XHJcblxyXG4gIC8qKlxyXG4gICAqIElmIHNldCB0byB0cnVlLCB0aGUgdXNlciBjYW4gZHJhZyB0aGlzIHNoYXBlIG92ZXIgdGhlIG1hcC4gVGhlIGdlb2Rlc2ljXHJcbiAgICogcHJvcGVydHkgZGVmaW5lcyB0aGUgbW9kZSBvZiBkcmFnZ2luZy4gRGVmYXVsdHMgdG8gZmFsc2UuXHJcbiAgICovXHJcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWlucHV0LXJlbmFtZVxyXG4gIEBJbnB1dCgncG9seURyYWdnYWJsZScpIGRyYWdnYWJsZSA9IGZhbHNlO1xyXG5cclxuICAvKipcclxuICAgKiBJZiBzZXQgdG8gdHJ1ZSwgdGhlIHVzZXIgY2FuIGVkaXQgdGhpcyBzaGFwZSBieSBkcmFnZ2luZyB0aGUgY29udHJvbFxyXG4gICAqIHBvaW50cyBzaG93biBhdCB0aGUgdmVydGljZXMgYW5kIG9uIGVhY2ggc2VnbWVudC4gRGVmYXVsdHMgdG8gZmFsc2UuXHJcbiAgICovXHJcbiAgQElucHV0KCkgZWRpdGFibGUgPSBmYWxzZTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGZpbGwgY29sb3IuIEFsbCBDU1MzIGNvbG9ycyBhcmUgc3VwcG9ydGVkIGV4Y2VwdCBmb3IgZXh0ZW5kZWRcclxuICAgKiBuYW1lZCBjb2xvcnMuXHJcbiAgICovXHJcbiAgQElucHV0KCkgZmlsbENvbG9yOiBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBmaWxsIG9wYWNpdHkgYmV0d2VlbiAwLjAgYW5kIDEuMFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGZpbGxPcGFjaXR5OiBudW1iZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZW4gdHJ1ZSwgZWRnZXMgb2YgdGhlIHBvbHlnb24gYXJlIGludGVycHJldGVkIGFzIGdlb2Rlc2ljIGFuZCB3aWxsXHJcbiAgICogZm9sbG93IHRoZSBjdXJ2YXR1cmUgb2YgdGhlIEVhcnRoLiBXaGVuIGZhbHNlLCBlZGdlcyBvZiB0aGUgcG9seWdvbiBhcmVcclxuICAgKiByZW5kZXJlZCBhcyBzdHJhaWdodCBsaW5lcyBpbiBzY3JlZW4gc3BhY2UuIE5vdGUgdGhhdCB0aGUgc2hhcGUgb2YgYVxyXG4gICAqIGdlb2Rlc2ljIHBvbHlnb24gbWF5IGFwcGVhciB0byBjaGFuZ2Ugd2hlbiBkcmFnZ2VkLCBhcyB0aGUgZGltZW5zaW9uc1xyXG4gICAqIGFyZSBtYWludGFpbmVkIHJlbGF0aXZlIHRvIHRoZSBzdXJmYWNlIG9mIHRoZSBlYXJ0aC4gRGVmYXVsdHMgdG8gZmFsc2UuXHJcbiAgICovXHJcbiAgQElucHV0KCkgZ2VvZGVzaWMgPSBmYWxzZTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIG9yZGVyZWQgc2VxdWVuY2Ugb2YgY29vcmRpbmF0ZXMgdGhhdCBkZXNpZ25hdGVzIGEgY2xvc2VkIGxvb3AuXHJcbiAgICogVW5saWtlIHBvbHlsaW5lcywgYSBwb2x5Z29uIG1heSBjb25zaXN0IG9mIG9uZSBvciBtb3JlIHBhdGhzLlxyXG4gICAqICBBcyBhIHJlc3VsdCwgdGhlIHBhdGhzIHByb3BlcnR5IG1heSBzcGVjaWZ5IG9uZSBvciBtb3JlIGFycmF5cyBvZlxyXG4gICAqIExhdExuZyBjb29yZGluYXRlcy4gUGF0aHMgYXJlIGNsb3NlZCBhdXRvbWF0aWNhbGx5OyBkbyBub3QgcmVwZWF0IHRoZVxyXG4gICAqIGZpcnN0IHZlcnRleCBvZiB0aGUgcGF0aCBhcyB0aGUgbGFzdCB2ZXJ0ZXguIFNpbXBsZSBwb2x5Z29ucyBtYXkgYmVcclxuICAgKiBkZWZpbmVkIHVzaW5nIGEgc2luZ2xlIGFycmF5IG9mIExhdExuZ3MuIE1vcmUgY29tcGxleCBwb2x5Z29ucyBtYXlcclxuICAgKiBzcGVjaWZ5IGFuIGFycmF5IG9mIGFycmF5cy4gQW55IHNpbXBsZSBhcnJheXMgYXJlIGNvbnZlcnRlZCBpbnRvIEFycmF5cy5cclxuICAgKiBJbnNlcnRpbmcgb3IgcmVtb3ZpbmcgTGF0TG5ncyBmcm9tIHRoZSBBcnJheSB3aWxsIGF1dG9tYXRpY2FsbHkgdXBkYXRlXHJcbiAgICogdGhlIHBvbHlnb24gb24gdGhlIG1hcC5cclxuICAgKi9cclxuICBASW5wdXQoKSBwYXRoczogZ29vZ2xlLm1hcHMuTGF0TG5nW10gfCBnb29nbGUubWFwcy5MYXRMbmdbXVtdIHxcclxuICAgICAgZ29vZ2xlLm1hcHMuTVZDQXJyYXk8Z29vZ2xlLm1hcHMuTGF0TG5nPiB8IGdvb2dsZS5tYXBzLk1WQ0FycmF5PGdvb2dsZS5tYXBzLk1WQ0FycmF5PGdvb2dsZS5tYXBzLkxhdExuZz4+IHxcclxuICAgICAgZ29vZ2xlLm1hcHMuTGF0TG5nTGl0ZXJhbFtdIHwgZ29vZ2xlLm1hcHMuTGF0TG5nTGl0ZXJhbFtdW10gPSBbXTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIHN0cm9rZSBjb2xvci4gQWxsIENTUzMgY29sb3JzIGFyZSBzdXBwb3J0ZWQgZXhjZXB0IGZvciBleHRlbmRlZFxyXG4gICAqIG5hbWVkIGNvbG9ycy5cclxuICAgKi9cclxuICBASW5wdXQoKSBzdHJva2VDb2xvcjogc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgc3Ryb2tlIG9wYWNpdHkgYmV0d2VlbiAwLjAgYW5kIDEuMFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHN0cm9rZU9wYWNpdHk6IG51bWJlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIHN0cm9rZSB3aWR0aCBpbiBwaXhlbHMuXHJcbiAgICovXHJcbiAgQElucHV0KCkgc3Ryb2tlV2VpZ2h0OiBudW1iZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZXRoZXIgdGhpcyBwb2x5Z29uIGlzIHZpc2libGUgb24gdGhlIG1hcC4gRGVmYXVsdHMgdG8gdHJ1ZS5cclxuICAgKi9cclxuICBASW5wdXQoKSB2aXNpYmxlOiBib29sZWFuO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgekluZGV4IGNvbXBhcmVkIHRvIG90aGVyIHBvbHlzLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHpJbmRleDogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIERPTSBjbGljayBldmVudCBpcyBmaXJlZCBvbiB0aGUgUG9seWdvbi5cclxuICAgKi9cclxuICBAT3V0cHV0KCkgcG9seUNsaWNrOiBFdmVudEVtaXR0ZXI8Z29vZ2xlLm1hcHMuUG9seU1vdXNlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxnb29nbGUubWFwcy5Qb2x5TW91c2VFdmVudD4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSBET00gZGJsY2xpY2sgZXZlbnQgaXMgZmlyZWQgb24gdGhlIFBvbHlnb24uXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIHBvbHlEYmxDbGljazogRXZlbnRFbWl0dGVyPGdvb2dsZS5tYXBzLlBvbHlNb3VzZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8Z29vZ2xlLm1hcHMuUG9seU1vdXNlRXZlbnQ+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgZXZlbnQgaXMgcmVwZWF0ZWRseSBmaXJlZCB3aGlsZSB0aGUgdXNlciBkcmFncyB0aGUgcG9seWdvbi5cclxuICAgKi9cclxuICBAT3V0cHV0KCkgcG9seURyYWc6IEV2ZW50RW1pdHRlcjxnb29nbGUubWFwcy5Nb3VzZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8Z29vZ2xlLm1hcHMuTW91c2VFdmVudD4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSB1c2VyIHN0b3BzIGRyYWdnaW5nIHRoZSBwb2x5Z29uLlxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBwb2x5RHJhZ0VuZDogRXZlbnRFbWl0dGVyPGdvb2dsZS5tYXBzLk1vdXNlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxnb29nbGUubWFwcy5Nb3VzZUV2ZW50PigpO1xyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIHVzZXIgc3RhcnRzIGRyYWdnaW5nIHRoZSBwb2x5Z29uLlxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBwb2x5RHJhZ1N0YXJ0OiBFdmVudEVtaXR0ZXI8Z29vZ2xlLm1hcHMuTW91c2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPGdvb2dsZS5tYXBzLk1vdXNlRXZlbnQ+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgRE9NIG1vdXNlZG93biBldmVudCBpcyBmaXJlZCBvbiB0aGUgUG9seWdvbi5cclxuICAgKi9cclxuICBAT3V0cHV0KCkgcG9seU1vdXNlRG93bjogRXZlbnRFbWl0dGVyPGdvb2dsZS5tYXBzLlBvbHlNb3VzZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8Z29vZ2xlLm1hcHMuUG9seU1vdXNlRXZlbnQ+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgRE9NIG1vdXNlbW92ZSBldmVudCBpcyBmaXJlZCBvbiB0aGUgUG9seWdvbi5cclxuICAgKi9cclxuICBAT3V0cHV0KCkgcG9seU1vdXNlTW92ZTogRXZlbnRFbWl0dGVyPGdvb2dsZS5tYXBzLlBvbHlNb3VzZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8Z29vZ2xlLm1hcHMuUG9seU1vdXNlRXZlbnQ+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgb24gUG9seWdvbiBtb3VzZW91dC5cclxuICAgKi9cclxuICBAT3V0cHV0KCkgcG9seU1vdXNlT3V0OiBFdmVudEVtaXR0ZXI8Z29vZ2xlLm1hcHMuUG9seU1vdXNlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxnb29nbGUubWFwcy5Qb2x5TW91c2VFdmVudD4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBldmVudCBpcyBmaXJlZCBvbiBQb2x5Z29uIG1vdXNlb3Zlci5cclxuICAgKi9cclxuICBAT3V0cHV0KCkgcG9seU1vdXNlT3ZlcjogRXZlbnRFbWl0dGVyPGdvb2dsZS5tYXBzLlBvbHlNb3VzZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8Z29vZ2xlLm1hcHMuUG9seU1vdXNlRXZlbnQ+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlIHRoZSBET00gbW91c2V1cCBldmVudCBpcyBmaXJlZCBvbiB0aGUgUG9seWdvblxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBwb2x5TW91c2VVcDogRXZlbnRFbWl0dGVyPGdvb2dsZS5tYXBzLlBvbHlNb3VzZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8Z29vZ2xlLm1hcHMuUG9seU1vdXNlRXZlbnQ+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgUG9seWdvbiBpcyByaWdodC1jbGlja2VkIG9uLlxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBwb2x5UmlnaHRDbGljazogRXZlbnRFbWl0dGVyPGdvb2dsZS5tYXBzLlBvbHlNb3VzZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8Z29vZ2xlLm1hcHMuUG9seU1vdXNlRXZlbnQ+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgYWZ0ZXIgUG9seWdvbiBmaXJzdCBwYXRoIGNoYW5nZXMuXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIHBvbHlQYXRoc0NoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8TVZDRXZlbnQ8Z29vZ2xlLm1hcHMuTGF0TG5nW10gfCBnb29nbGUubWFwcy5MYXRMbmdMaXRlcmFsW10+PigpO1xyXG5cclxuICBwcml2YXRlIHN0YXRpYyBfcG9seWdvbk9wdGlvbnNBdHRyaWJ1dGVzOiBzdHJpbmdbXSA9IFtcclxuICAgICdjbGlja2FibGUnLCAnZHJhZ2dhYmxlJywgJ2VkaXRhYmxlJywgJ2ZpbGxDb2xvcicsICdmaWxsT3BhY2l0eScsICdnZW9kZXNpYycsICdpY29uJywgJ21hcCcsXHJcbiAgICAncGF0aHMnLCAnc3Ryb2tlQ29sb3InLCAnc3Ryb2tlT3BhY2l0eScsICdzdHJva2VXZWlnaHQnLCAndmlzaWJsZScsICd6SW5kZXgnLCAnZHJhZ2dhYmxlJyxcclxuICAgICdlZGl0YWJsZScsICd2aXNpYmxlJyxcclxuICBdO1xyXG5cclxuICBwcml2YXRlIF9pZDogc3RyaW5nO1xyXG4gIHByaXZhdGUgX3BvbHlnb25BZGRlZFRvTWFuYWdlciA9IGZhbHNlO1xyXG4gIHByaXZhdGUgX3N1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3BvbHlnb25NYW5hZ2VyOiBQb2x5Z29uTWFuYWdlcikgeyB9XHJcblxyXG4gIC8qKiBAaW50ZXJuYWwgKi9cclxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XHJcbiAgICBpZiAoIXRoaXMuX3BvbHlnb25BZGRlZFRvTWFuYWdlcikge1xyXG4gICAgICB0aGlzLl9pbml0KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogYW55IHtcclxuICAgIGlmICghdGhpcy5fcG9seWdvbkFkZGVkVG9NYW5hZ2VyKSB7XHJcbiAgICAgIHRoaXMuX2luaXQoKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX3BvbHlnb25NYW5hZ2VyLnNldFBvbHlnb25PcHRpb25zKHRoaXMsIHRoaXMuX3VwZGF0ZVBvbHlnb25PcHRpb25zKGNoYW5nZXMpKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2luaXQoKSB7XHJcbiAgICB0aGlzLl9wb2x5Z29uTWFuYWdlci5hZGRQb2x5Z29uKHRoaXMpO1xyXG4gICAgdGhpcy5fcG9seWdvbkFkZGVkVG9NYW5hZ2VyID0gdHJ1ZTtcclxuICAgIHRoaXMuX2FkZEV2ZW50TGlzdGVuZXJzKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9hZGRFdmVudExpc3RlbmVycygpIHtcclxuICAgIGNvbnN0IGhhbmRsZXJzID0gW1xyXG4gICAgICB7IG5hbWU6ICdjbGljaycsIGhhbmRsZXI6IChldjogZ29vZ2xlLm1hcHMuUG9seU1vdXNlRXZlbnQpID0+IHRoaXMucG9seUNsaWNrLmVtaXQoZXYpIH0sXHJcbiAgICAgIHsgbmFtZTogJ2RibGNsaWNrJywgaGFuZGxlcjogKGV2OiBnb29nbGUubWFwcy5Qb2x5TW91c2VFdmVudCkgPT4gdGhpcy5wb2x5RGJsQ2xpY2suZW1pdChldikgfSxcclxuICAgICAgeyBuYW1lOiAnZHJhZycsIGhhbmRsZXI6IChldjogZ29vZ2xlLm1hcHMuTW91c2VFdmVudCkgPT4gdGhpcy5wb2x5RHJhZy5lbWl0KGV2KSB9LFxyXG4gICAgICB7IG5hbWU6ICdkcmFnZW5kJywgaGFuZGxlcjogKGV2OiBnb29nbGUubWFwcy5Nb3VzZUV2ZW50KSA9PiB0aGlzLnBvbHlEcmFnRW5kLmVtaXQoZXYpIH0sXHJcbiAgICAgIHsgbmFtZTogJ2RyYWdzdGFydCcsIGhhbmRsZXI6IChldjogZ29vZ2xlLm1hcHMuTW91c2VFdmVudCkgPT4gdGhpcy5wb2x5RHJhZ1N0YXJ0LmVtaXQoZXYpIH0sXHJcbiAgICAgIHsgbmFtZTogJ21vdXNlZG93bicsIGhhbmRsZXI6IChldjogZ29vZ2xlLm1hcHMuUG9seU1vdXNlRXZlbnQpID0+IHRoaXMucG9seU1vdXNlRG93bi5lbWl0KGV2KSB9LFxyXG4gICAgICB7IG5hbWU6ICdtb3VzZW1vdmUnLCBoYW5kbGVyOiAoZXY6IGdvb2dsZS5tYXBzLlBvbHlNb3VzZUV2ZW50KSA9PiB0aGlzLnBvbHlNb3VzZU1vdmUuZW1pdChldikgfSxcclxuICAgICAgeyBuYW1lOiAnbW91c2VvdXQnLCBoYW5kbGVyOiAoZXY6IGdvb2dsZS5tYXBzLlBvbHlNb3VzZUV2ZW50KSA9PiB0aGlzLnBvbHlNb3VzZU91dC5lbWl0KGV2KSB9LFxyXG4gICAgICB7IG5hbWU6ICdtb3VzZW92ZXInLCBoYW5kbGVyOiAoZXY6IGdvb2dsZS5tYXBzLlBvbHlNb3VzZUV2ZW50KSA9PiB0aGlzLnBvbHlNb3VzZU92ZXIuZW1pdChldikgfSxcclxuICAgICAgeyBuYW1lOiAnbW91c2V1cCcsIGhhbmRsZXI6IChldjogZ29vZ2xlLm1hcHMuUG9seU1vdXNlRXZlbnQpID0+IHRoaXMucG9seU1vdXNlVXAuZW1pdChldikgfSxcclxuICAgICAgeyBuYW1lOiAncmlnaHRjbGljaycsIGhhbmRsZXI6IChldjogZ29vZ2xlLm1hcHMuUG9seU1vdXNlRXZlbnQpID0+IHRoaXMucG9seVJpZ2h0Q2xpY2suZW1pdChldikgfSxcclxuICAgIF07XHJcbiAgICBoYW5kbGVycy5mb3JFYWNoKChvYmopID0+IHtcclxuICAgICAgY29uc3Qgb3MgPSB0aGlzLl9wb2x5Z29uTWFuYWdlci5jcmVhdGVFdmVudE9ic2VydmFibGUob2JqLm5hbWUsIHRoaXMpLnN1YnNjcmliZShvYmouaGFuZGxlcik7XHJcbiAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMucHVzaChvcyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLl9wb2x5Z29uTWFuYWdlci5jcmVhdGVQYXRoRXZlbnRPYnNlcnZhYmxlKHRoaXMpXHJcbiAgICAudGhlbihwYXRocyQgPT4ge1xyXG4gICAgICBjb25zdCBvcyA9IHBhdGhzJC5zdWJzY3JpYmUocGF0aEV2ZW50ID0+IHRoaXMucG9seVBhdGhzQ2hhbmdlLmVtaXQocGF0aEV2ZW50KSk7XHJcbiAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMucHVzaChvcyk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX3VwZGF0ZVBvbHlnb25PcHRpb25zKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiBnb29nbGUubWFwcy5Qb2x5Z29uT3B0aW9ucyB7XHJcbiAgICByZXR1cm4gT2JqZWN0LmtleXMoY2hhbmdlcylcclxuICAgICAgLmZpbHRlcihrID0+IEFnbVBvbHlnb24uX3BvbHlnb25PcHRpb25zQXR0cmlidXRlcy5pbmRleE9mKGspICE9PSAtMSlcclxuICAgICAgLnJlZHVjZSgob2JqOiBhbnksIGs6IHN0cmluZykgPT4ge1xyXG4gICAgICAgIG9ialtrXSA9IGNoYW5nZXNba10uY3VycmVudFZhbHVlO1xyXG4gICAgICAgIHJldHVybiBvYmo7XHJcbiAgICAgIH0sIHt9KTtcclxuICB9XHJcblxyXG4gIC8qKiBAaW50ZXJuYWwgKi9cclxuICBpZCgpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5faWQ7IH1cclxuXHJcbiAgLyoqIEBpbnRlcm5hbCAqL1xyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgdGhpcy5fcG9seWdvbk1hbmFnZXIuZGVsZXRlUG9seWdvbih0aGlzKTtcclxuICAgIC8vIHVuc3Vic2NyaWJlIGFsbCByZWdpc3RlcmVkIG9ic2VydmFibGUgc3Vic2NyaXB0aW9uc1xyXG4gICAgdGhpcy5fc3Vic2NyaXB0aW9ucy5mb3JFYWNoKChzKSA9PiBzLnVuc3Vic2NyaWJlKCkpO1xyXG4gIH1cclxuXHJcbiAgZ2V0UGF0aCgpOiBQcm9taXNlPGdvb2dsZS5tYXBzLkxhdExuZ1tdPiB7XHJcbiAgICByZXR1cm4gdGhpcy5fcG9seWdvbk1hbmFnZXIuZ2V0UGF0aCh0aGlzKTtcclxuICB9XHJcblxyXG4gIGdldFBhdGhzKCk6IFByb21pc2U8Z29vZ2xlLm1hcHMuTGF0TG5nW11bXT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX3BvbHlnb25NYW5hZ2VyLmdldFBhdGhzKHRoaXMpO1xyXG4gIH1cclxufVxyXG4iXX0=