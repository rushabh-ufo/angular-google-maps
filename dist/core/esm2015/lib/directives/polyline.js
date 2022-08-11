import { ContentChildren, Directive, EventEmitter, Input, Output } from '@angular/core';
import { PolylineManager } from '../services/managers/polyline-manager';
import { AgmPolylineIcon } from './polyline-icon';
import { AgmPolylinePoint } from './polyline-point';
let polylineId = 0;
/**
 * AgmPolyline renders a polyline on a {@link AgmMap}
 *
 * ### Example
 * ```typescript
 * import { Component } from '@angular/core';
 *
 * @Component({
 *  selector: 'my-map-cmp',
 *  styles: [`
 *    .agm-map-container {
 *      height: 300px;
 *    }
 * `],
 *  template: `
 *    <agm-map [latitude]="lat" [longitude]="lng" [zoom]="zoom">
 *      <agm-polyline>
 *          <agm-polyline-point [latitude]="latA" [longitude]="lngA">
 *          </agm-polyline-point>
 *          <agm-polyline-point [latitude]="latB" [longitude]="lngB">
 *          </agm-polyline-point>
 *      </agm-polyline>
 *    </agm-map>
 *  `
 * })
 * ```
 */
export class AgmPolyline {
    constructor(_polylineManager) {
        this._polylineManager = _polylineManager;
        /**
         * Indicates whether this Polyline handles mouse events. Defaults to true.
         */
        this.clickable = true;
        /**
         * If set to true, the user can drag this shape over the map. The geodesic property defines the
         * mode of dragging. Defaults to false.
         */
        // tslint:disable-next-line:no-input-rename
        this.draggable = false;
        /**
         * If set to true, the user can edit this shape by dragging the control points shown at the
         * vertices and on each segment. Defaults to false.
         */
        this.editable = false;
        /**
         * When true, edges of the polygon are interpreted as geodesic and will follow the curvature of
         * the Earth. When false, edges of the polygon are rendered as straight lines in screen space.
         * Note that the shape of a geodesic polygon may appear to change when dragged, as the dimensions
         * are maintained relative to the surface of the earth. Defaults to false.
         */
        this.geodesic = false;
        /**
         * Whether this polyline is visible on the map. Defaults to true.
         */
        this.visible = true;
        /**
         * This event is fired when the DOM click event is fired on the Polyline.
         */
        this.lineClick = new EventEmitter();
        /**
         * This event is fired when the DOM dblclick event is fired on the Polyline.
         */
        this.lineDblClick = new EventEmitter();
        /**
         * This event is repeatedly fired while the user drags the polyline.
         */
        this.lineDrag = new EventEmitter();
        /**
         * This event is fired when the user stops dragging the polyline.
         */
        this.lineDragEnd = new EventEmitter();
        /**
         * This event is fired when the user starts dragging the polyline.
         */
        this.lineDragStart = new EventEmitter();
        /**
         * This event is fired when the DOM mousedown event is fired on the Polyline.
         */
        this.lineMouseDown = new EventEmitter();
        /**
         * This event is fired when the DOM mousemove event is fired on the Polyline.
         */
        this.lineMouseMove = new EventEmitter();
        /**
         * This event is fired on Polyline mouseout.
         */
        this.lineMouseOut = new EventEmitter();
        /**
         * This event is fired on Polyline mouseover.
         */
        this.lineMouseOver = new EventEmitter();
        /**
         * This event is fired whe the DOM mouseup event is fired on the Polyline
         */
        this.lineMouseUp = new EventEmitter();
        /**
         * This event is fired when the Polyline is right-clicked on.
         */
        this.lineRightClick = new EventEmitter();
        /**
         * This event is fired after Polyline's path changes.
         */
        this.polyPathChange = new EventEmitter();
        this._polylineAddedToManager = false;
        this._subscriptions = [];
        this._id = (polylineId++).toString();
    }
    /** @internal */
    ngAfterContentInit() {
        if (this.points.length) {
            this.points.forEach((point) => {
                const s = point.positionChanged.subscribe(() => { this._polylineManager.updatePolylinePoints(this); });
                this._subscriptions.push(s);
            });
        }
        if (!this._polylineAddedToManager) {
            this._init();
        }
        const pointSub = this.points.changes.subscribe(() => this._polylineManager.updatePolylinePoints(this));
        this._subscriptions.push(pointSub);
        this._polylineManager.updatePolylinePoints(this);
        const iconSub = this.iconSequences.changes.subscribe(() => this._polylineManager.updateIconSequences(this));
        this._subscriptions.push(iconSub);
    }
    ngOnChanges(changes) {
        if (!this._polylineAddedToManager) {
            this._init();
            return;
        }
        const options = {};
        const optionKeys = Object.keys(changes).filter(k => AgmPolyline._polylineOptionsAttributes.indexOf(k) !== -1);
        optionKeys.forEach(k => options[k] = changes[k].currentValue);
        this._polylineManager.setPolylineOptions(this, options);
    }
    getPath() {
        return this._polylineManager.getPath(this);
    }
    _init() {
        this._polylineManager.addPolyline(this);
        this._polylineAddedToManager = true;
        this._addEventListeners();
    }
    _addEventListeners() {
        const handlers = [
            { name: 'click', handler: (ev) => this.lineClick.emit(ev) },
            { name: 'dblclick', handler: (ev) => this.lineDblClick.emit(ev) },
            { name: 'drag', handler: (ev) => this.lineDrag.emit(ev) },
            { name: 'dragend', handler: (ev) => this.lineDragEnd.emit(ev) },
            { name: 'dragstart', handler: (ev) => this.lineDragStart.emit(ev) },
            { name: 'mousedown', handler: (ev) => this.lineMouseDown.emit(ev) },
            { name: 'mousemove', handler: (ev) => this.lineMouseMove.emit(ev) },
            { name: 'mouseout', handler: (ev) => this.lineMouseOut.emit(ev) },
            { name: 'mouseover', handler: (ev) => this.lineMouseOver.emit(ev) },
            { name: 'mouseup', handler: (ev) => this.lineMouseUp.emit(ev) },
            { name: 'rightclick', handler: (ev) => this.lineRightClick.emit(ev) },
        ];
        handlers.forEach((obj) => {
            const os = this._polylineManager.createEventObservable(obj.name, this).subscribe(obj.handler);
            this._subscriptions.push(os);
        });
        this._polylineManager.createPathEventObservable(this).then((ob$) => {
            const os = ob$.subscribe(pathEvent => this.polyPathChange.emit(pathEvent));
            this._subscriptions.push(os);
        });
    }
    /** @internal */
    _getPoints() {
        if (this.points) {
            return this.points.toArray();
        }
        return [];
    }
    _getIcons() {
        if (this.iconSequences) {
            return this.iconSequences.toArray();
        }
        return [];
    }
    /** @internal */
    id() { return this._id; }
    /** @internal */
    ngOnDestroy() {
        this._polylineManager.deletePolyline(this);
        // unsubscribe all registered observable subscriptions
        this._subscriptions.forEach((s) => s.unsubscribe());
    }
}
AgmPolyline._polylineOptionsAttributes = [
    'draggable', 'editable', 'visible', 'geodesic', 'strokeColor', 'strokeOpacity', 'strokeWeight',
    'zIndex',
];
AgmPolyline.decorators = [
    { type: Directive, args: [{
                selector: 'agm-polyline',
            },] }
];
AgmPolyline.ctorParameters = () => [
    { type: PolylineManager }
];
AgmPolyline.propDecorators = {
    clickable: [{ type: Input }],
    draggable: [{ type: Input, args: ['polylineDraggable',] }],
    editable: [{ type: Input }],
    geodesic: [{ type: Input }],
    strokeColor: [{ type: Input }],
    strokeOpacity: [{ type: Input }],
    strokeWeight: [{ type: Input }],
    visible: [{ type: Input }],
    zIndex: [{ type: Input }],
    lineClick: [{ type: Output }],
    lineDblClick: [{ type: Output }],
    lineDrag: [{ type: Output }],
    lineDragEnd: [{ type: Output }],
    lineDragStart: [{ type: Output }],
    lineMouseDown: [{ type: Output }],
    lineMouseMove: [{ type: Output }],
    lineMouseOut: [{ type: Output }],
    lineMouseOver: [{ type: Output }],
    lineMouseUp: [{ type: Output }],
    lineRightClick: [{ type: Output }],
    polyPathChange: [{ type: Output }],
    points: [{ type: ContentChildren, args: [AgmPolylinePoint,] }],
    iconSequences: [{ type: ContentChildren, args: [AgmPolylineIcon,] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9seWxpbmUuanMiLCJzb3VyY2VSb290IjoiRDovQXV0b21hdGlvbi9hbmd1bGFyLWdvb2dsZS1tYXBzL3BhY2thZ2VzL2NvcmUvc3JjLyIsInNvdXJjZXMiOlsibGliL2RpcmVjdGl2ZXMvcG9seWxpbmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFvQixlQUFlLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQXdCLE1BQU0sRUFBNEIsTUFBTSxlQUFlLENBQUM7QUFHMUosT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBRXhFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNsRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUVwRCxJQUFJLFVBQVUsR0FBRyxDQUFDLENBQUM7QUFDbkI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMEJHO0FBSUgsTUFBTSxPQUFPLFdBQVc7SUFnSXRCLFlBQW9CLGdCQUFpQztRQUFqQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWlCO1FBL0hyRDs7V0FFRztRQUNNLGNBQVMsR0FBRyxJQUFJLENBQUM7UUFFMUI7OztXQUdHO1FBQ0gsMkNBQTJDO1FBQ2YsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUU5Qzs7O1dBR0c7UUFDTSxhQUFRLEdBQUcsS0FBSyxDQUFDO1FBRTFCOzs7OztXQUtHO1FBQ00sYUFBUSxHQUFHLEtBQUssQ0FBQztRQWlCMUI7O1dBRUc7UUFDTSxZQUFPLEdBQUcsSUFBSSxDQUFDO1FBT3hCOztXQUVHO1FBQ08sY0FBUyxHQUE2QyxJQUFJLFlBQVksRUFBOEIsQ0FBQztRQUUvRzs7V0FFRztRQUNPLGlCQUFZLEdBQTZDLElBQUksWUFBWSxFQUE4QixDQUFDO1FBRWxIOztXQUVHO1FBQ08sYUFBUSxHQUF5QyxJQUFJLFlBQVksRUFBMEIsQ0FBQztRQUV0Rzs7V0FFRztRQUNPLGdCQUFXLEdBQXlD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Q0FBQzs7WUE3SEgsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxjQUFjO2FBQ3pCOzs7WUFuQ1EsZUFBZTs7O3dCQXdDckIsS0FBSzt3QkFPTCxLQUFLLFNBQUMsbUJBQW1CO3VCQU16QixLQUFLO3VCQVFMLEtBQUs7MEJBS0wsS0FBSzs0QkFLTCxLQUFLOzJCQUtMLEtBQUs7c0JBS0wsS0FBSztxQkFLTCxLQUFLO3dCQUtMLE1BQU07MkJBS04sTUFBTTt1QkFLTixNQUFNOzBCQUtOLE1BQU07NEJBS04sTUFBTTs0QkFLTixNQUFNOzRCQUtOLE1BQU07MkJBS04sTUFBTTs0QkFLTixNQUFNOzBCQUtOLE1BQU07NkJBS04sTUFBTTs2QkFLTixNQUFNO3FCQUtOLGVBQWUsU0FBQyxnQkFBZ0I7NEJBRWhDLGVBQWUsU0FBQyxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZ0ZXJDb250ZW50SW5pdCwgQ29udGVudENoaWxkcmVuLCBEaXJlY3RpdmUsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uQ2hhbmdlcywgT25EZXN0cm95LCBPdXRwdXQsIFF1ZXJ5TGlzdCwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7IFBvbHlsaW5lTWFuYWdlciB9IGZyb20gJy4uL3NlcnZpY2VzL21hbmFnZXJzL3BvbHlsaW5lLW1hbmFnZXInO1xyXG5pbXBvcnQgeyBNVkNFdmVudCB9IGZyb20gJy4uL3V0aWxzL212Y2FycmF5LXV0aWxzJztcclxuaW1wb3J0IHsgQWdtUG9seWxpbmVJY29uIH0gZnJvbSAnLi9wb2x5bGluZS1pY29uJztcclxuaW1wb3J0IHsgQWdtUG9seWxpbmVQb2ludCB9IGZyb20gJy4vcG9seWxpbmUtcG9pbnQnO1xyXG5cclxubGV0IHBvbHlsaW5lSWQgPSAwO1xyXG4vKipcclxuICogQWdtUG9seWxpbmUgcmVuZGVycyBhIHBvbHlsaW5lIG9uIGEge0BsaW5rIEFnbU1hcH1cclxuICpcclxuICogIyMjIEV4YW1wbGVcclxuICogYGBgdHlwZXNjcmlwdFxyXG4gKiBpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuICpcclxuICogQENvbXBvbmVudCh7XHJcbiAqICBzZWxlY3RvcjogJ215LW1hcC1jbXAnLFxyXG4gKiAgc3R5bGVzOiBbYFxyXG4gKiAgICAuYWdtLW1hcC1jb250YWluZXIge1xyXG4gKiAgICAgIGhlaWdodDogMzAwcHg7XHJcbiAqICAgIH1cclxuICogYF0sXHJcbiAqICB0ZW1wbGF0ZTogYFxyXG4gKiAgICA8YWdtLW1hcCBbbGF0aXR1ZGVdPVwibGF0XCIgW2xvbmdpdHVkZV09XCJsbmdcIiBbem9vbV09XCJ6b29tXCI+XHJcbiAqICAgICAgPGFnbS1wb2x5bGluZT5cclxuICogICAgICAgICAgPGFnbS1wb2x5bGluZS1wb2ludCBbbGF0aXR1ZGVdPVwibGF0QVwiIFtsb25naXR1ZGVdPVwibG5nQVwiPlxyXG4gKiAgICAgICAgICA8L2FnbS1wb2x5bGluZS1wb2ludD5cclxuICogICAgICAgICAgPGFnbS1wb2x5bGluZS1wb2ludCBbbGF0aXR1ZGVdPVwibGF0QlwiIFtsb25naXR1ZGVdPVwibG5nQlwiPlxyXG4gKiAgICAgICAgICA8L2FnbS1wb2x5bGluZS1wb2ludD5cclxuICogICAgICA8L2FnbS1wb2x5bGluZT5cclxuICogICAgPC9hZ20tbWFwPlxyXG4gKiAgYFxyXG4gKiB9KVxyXG4gKiBgYGBcclxuICovXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnYWdtLXBvbHlsaW5lJyxcclxufSlcclxuZXhwb3J0IGNsYXNzIEFnbVBvbHlsaW5lIGltcGxlbWVudHMgT25EZXN0cm95LCBPbkNoYW5nZXMsIEFmdGVyQ29udGVudEluaXQge1xyXG4gIC8qKlxyXG4gICAqIEluZGljYXRlcyB3aGV0aGVyIHRoaXMgUG9seWxpbmUgaGFuZGxlcyBtb3VzZSBldmVudHMuIERlZmF1bHRzIHRvIHRydWUuXHJcbiAgICovXHJcbiAgQElucHV0KCkgY2xpY2thYmxlID0gdHJ1ZTtcclxuXHJcbiAgLyoqXHJcbiAgICogSWYgc2V0IHRvIHRydWUsIHRoZSB1c2VyIGNhbiBkcmFnIHRoaXMgc2hhcGUgb3ZlciB0aGUgbWFwLiBUaGUgZ2VvZGVzaWMgcHJvcGVydHkgZGVmaW5lcyB0aGVcclxuICAgKiBtb2RlIG9mIGRyYWdnaW5nLiBEZWZhdWx0cyB0byBmYWxzZS5cclxuICAgKi9cclxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8taW5wdXQtcmVuYW1lXHJcbiAgQElucHV0KCdwb2x5bGluZURyYWdnYWJsZScpIGRyYWdnYWJsZSA9IGZhbHNlO1xyXG5cclxuICAvKipcclxuICAgKiBJZiBzZXQgdG8gdHJ1ZSwgdGhlIHVzZXIgY2FuIGVkaXQgdGhpcyBzaGFwZSBieSBkcmFnZ2luZyB0aGUgY29udHJvbCBwb2ludHMgc2hvd24gYXQgdGhlXHJcbiAgICogdmVydGljZXMgYW5kIG9uIGVhY2ggc2VnbWVudC4gRGVmYXVsdHMgdG8gZmFsc2UuXHJcbiAgICovXHJcbiAgQElucHV0KCkgZWRpdGFibGUgPSBmYWxzZTtcclxuXHJcbiAgLyoqXHJcbiAgICogV2hlbiB0cnVlLCBlZGdlcyBvZiB0aGUgcG9seWdvbiBhcmUgaW50ZXJwcmV0ZWQgYXMgZ2VvZGVzaWMgYW5kIHdpbGwgZm9sbG93IHRoZSBjdXJ2YXR1cmUgb2ZcclxuICAgKiB0aGUgRWFydGguIFdoZW4gZmFsc2UsIGVkZ2VzIG9mIHRoZSBwb2x5Z29uIGFyZSByZW5kZXJlZCBhcyBzdHJhaWdodCBsaW5lcyBpbiBzY3JlZW4gc3BhY2UuXHJcbiAgICogTm90ZSB0aGF0IHRoZSBzaGFwZSBvZiBhIGdlb2Rlc2ljIHBvbHlnb24gbWF5IGFwcGVhciB0byBjaGFuZ2Ugd2hlbiBkcmFnZ2VkLCBhcyB0aGUgZGltZW5zaW9uc1xyXG4gICAqIGFyZSBtYWludGFpbmVkIHJlbGF0aXZlIHRvIHRoZSBzdXJmYWNlIG9mIHRoZSBlYXJ0aC4gRGVmYXVsdHMgdG8gZmFsc2UuXHJcbiAgICovXHJcbiAgQElucHV0KCkgZ2VvZGVzaWMgPSBmYWxzZTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIHN0cm9rZSBjb2xvci4gQWxsIENTUzMgY29sb3JzIGFyZSBzdXBwb3J0ZWQgZXhjZXB0IGZvciBleHRlbmRlZCBuYW1lZCBjb2xvcnMuXHJcbiAgICovXHJcbiAgQElucHV0KCkgc3Ryb2tlQ29sb3I6IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIHN0cm9rZSBvcGFjaXR5IGJldHdlZW4gMC4wIGFuZCAxLjAuXHJcbiAgICovXHJcbiAgQElucHV0KCkgc3Ryb2tlT3BhY2l0eTogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgc3Ryb2tlIHdpZHRoIGluIHBpeGVscy5cclxuICAgKi9cclxuICBASW5wdXQoKSBzdHJva2VXZWlnaHQ6IG51bWJlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogV2hldGhlciB0aGlzIHBvbHlsaW5lIGlzIHZpc2libGUgb24gdGhlIG1hcC4gRGVmYXVsdHMgdG8gdHJ1ZS5cclxuICAgKi9cclxuICBASW5wdXQoKSB2aXNpYmxlID0gdHJ1ZTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIHpJbmRleCBjb21wYXJlZCB0byBvdGhlciBwb2x5cy5cclxuICAgKi9cclxuICBASW5wdXQoKSB6SW5kZXg6IG51bWJlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSBET00gY2xpY2sgZXZlbnQgaXMgZmlyZWQgb24gdGhlIFBvbHlsaW5lLlxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBsaW5lQ2xpY2s6IEV2ZW50RW1pdHRlcjxnb29nbGUubWFwcy5Qb2x5TW91c2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPGdvb2dsZS5tYXBzLlBvbHlNb3VzZUV2ZW50PigpO1xyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIERPTSBkYmxjbGljayBldmVudCBpcyBmaXJlZCBvbiB0aGUgUG9seWxpbmUuXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIGxpbmVEYmxDbGljazogRXZlbnRFbWl0dGVyPGdvb2dsZS5tYXBzLlBvbHlNb3VzZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8Z29vZ2xlLm1hcHMuUG9seU1vdXNlRXZlbnQ+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgZXZlbnQgaXMgcmVwZWF0ZWRseSBmaXJlZCB3aGlsZSB0aGUgdXNlciBkcmFncyB0aGUgcG9seWxpbmUuXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIGxpbmVEcmFnOiBFdmVudEVtaXR0ZXI8Z29vZ2xlLm1hcHMuTW91c2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPGdvb2dsZS5tYXBzLk1vdXNlRXZlbnQ+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgdXNlciBzdG9wcyBkcmFnZ2luZyB0aGUgcG9seWxpbmUuXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIGxpbmVEcmFnRW5kOiBFdmVudEVtaXR0ZXI8Z29vZ2xlLm1hcHMuTW91c2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPGdvb2dsZS5tYXBzLk1vdXNlRXZlbnQ+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgdXNlciBzdGFydHMgZHJhZ2dpbmcgdGhlIHBvbHlsaW5lLlxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBsaW5lRHJhZ1N0YXJ0OiBFdmVudEVtaXR0ZXI8Z29vZ2xlLm1hcHMuTW91c2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPGdvb2dsZS5tYXBzLk1vdXNlRXZlbnQ+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgRE9NIG1vdXNlZG93biBldmVudCBpcyBmaXJlZCBvbiB0aGUgUG9seWxpbmUuXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIGxpbmVNb3VzZURvd246IEV2ZW50RW1pdHRlcjxnb29nbGUubWFwcy5Qb2x5TW91c2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPGdvb2dsZS5tYXBzLlBvbHlNb3VzZUV2ZW50PigpO1xyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIERPTSBtb3VzZW1vdmUgZXZlbnQgaXMgZmlyZWQgb24gdGhlIFBvbHlsaW5lLlxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBsaW5lTW91c2VNb3ZlOiBFdmVudEVtaXR0ZXI8Z29vZ2xlLm1hcHMuUG9seU1vdXNlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxnb29nbGUubWFwcy5Qb2x5TW91c2VFdmVudD4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBldmVudCBpcyBmaXJlZCBvbiBQb2x5bGluZSBtb3VzZW91dC5cclxuICAgKi9cclxuICBAT3V0cHV0KCkgbGluZU1vdXNlT3V0OiBFdmVudEVtaXR0ZXI8Z29vZ2xlLm1hcHMuUG9seU1vdXNlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxnb29nbGUubWFwcy5Qb2x5TW91c2VFdmVudD4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBldmVudCBpcyBmaXJlZCBvbiBQb2x5bGluZSBtb3VzZW92ZXIuXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIGxpbmVNb3VzZU92ZXI6IEV2ZW50RW1pdHRlcjxnb29nbGUubWFwcy5Qb2x5TW91c2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPGdvb2dsZS5tYXBzLlBvbHlNb3VzZUV2ZW50PigpO1xyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZSB0aGUgRE9NIG1vdXNldXAgZXZlbnQgaXMgZmlyZWQgb24gdGhlIFBvbHlsaW5lXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIGxpbmVNb3VzZVVwOiBFdmVudEVtaXR0ZXI8Z29vZ2xlLm1hcHMuUG9seU1vdXNlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxnb29nbGUubWFwcy5Qb2x5TW91c2VFdmVudD4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSBQb2x5bGluZSBpcyByaWdodC1jbGlja2VkIG9uLlxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBsaW5lUmlnaHRDbGljazogRXZlbnRFbWl0dGVyPGdvb2dsZS5tYXBzLlBvbHlNb3VzZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8Z29vZ2xlLm1hcHMuUG9seU1vdXNlRXZlbnQ+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgYWZ0ZXIgUG9seWxpbmUncyBwYXRoIGNoYW5nZXMuXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIHBvbHlQYXRoQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxNVkNFdmVudDxnb29nbGUubWFwcy5MYXRMbmc+PigpO1xyXG5cclxuICAvKipcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBAQ29udGVudENoaWxkcmVuKEFnbVBvbHlsaW5lUG9pbnQpIHBvaW50czogUXVlcnlMaXN0PEFnbVBvbHlsaW5lUG9pbnQ+O1xyXG5cclxuICBAQ29udGVudENoaWxkcmVuKEFnbVBvbHlsaW5lSWNvbikgaWNvblNlcXVlbmNlczogUXVlcnlMaXN0PEFnbVBvbHlsaW5lSWNvbj47XHJcblxyXG4gIHByaXZhdGUgc3RhdGljIF9wb2x5bGluZU9wdGlvbnNBdHRyaWJ1dGVzOiBzdHJpbmdbXSA9IFtcclxuICAgICdkcmFnZ2FibGUnLCAnZWRpdGFibGUnLCAndmlzaWJsZScsICdnZW9kZXNpYycsICdzdHJva2VDb2xvcicsICdzdHJva2VPcGFjaXR5JywgJ3N0cm9rZVdlaWdodCcsXHJcbiAgICAnekluZGV4JyxcclxuICBdO1xyXG5cclxuICBwcml2YXRlIF9pZDogc3RyaW5nO1xyXG4gIHByaXZhdGUgX3BvbHlsaW5lQWRkZWRUb01hbmFnZXIgPSBmYWxzZTtcclxuICBwcml2YXRlIF9zdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9wb2x5bGluZU1hbmFnZXI6IFBvbHlsaW5lTWFuYWdlcikgeyB0aGlzLl9pZCA9IChwb2x5bGluZUlkKyspLnRvU3RyaW5nKCk7IH1cclxuXHJcbiAgLyoqIEBpbnRlcm5hbCAqL1xyXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcclxuICAgIGlmICh0aGlzLnBvaW50cy5sZW5ndGgpIHtcclxuICAgICAgdGhpcy5wb2ludHMuZm9yRWFjaCgocG9pbnQ6IEFnbVBvbHlsaW5lUG9pbnQpID0+IHtcclxuICAgICAgICBjb25zdCBzID0gcG9pbnQucG9zaXRpb25DaGFuZ2VkLnN1YnNjcmliZShcclxuICAgICAgICAgICAgKCkgPT4geyB0aGlzLl9wb2x5bGluZU1hbmFnZXIudXBkYXRlUG9seWxpbmVQb2ludHModGhpcyk7IH0pO1xyXG4gICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMucHVzaChzKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBpZiAoIXRoaXMuX3BvbHlsaW5lQWRkZWRUb01hbmFnZXIpIHtcclxuICAgICAgdGhpcy5faW5pdCgpO1xyXG4gICAgfVxyXG4gICAgY29uc3QgcG9pbnRTdWIgPSB0aGlzLnBvaW50cy5jaGFuZ2VzLnN1YnNjcmliZSgoKSA9PiB0aGlzLl9wb2x5bGluZU1hbmFnZXIudXBkYXRlUG9seWxpbmVQb2ludHModGhpcykpO1xyXG4gICAgdGhpcy5fc3Vic2NyaXB0aW9ucy5wdXNoKHBvaW50U3ViKTtcclxuICAgIHRoaXMuX3BvbHlsaW5lTWFuYWdlci51cGRhdGVQb2x5bGluZVBvaW50cyh0aGlzKTtcclxuXHJcbiAgICBjb25zdCBpY29uU3ViID0gdGhpcy5pY29uU2VxdWVuY2VzLmNoYW5nZXMuc3Vic2NyaWJlKCgpID0+IHRoaXMuX3BvbHlsaW5lTWFuYWdlci51cGRhdGVJY29uU2VxdWVuY2VzKHRoaXMpKTtcclxuICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMucHVzaChpY29uU3ViKTtcclxuICB9XHJcblxyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiBhbnkge1xyXG4gICAgaWYgKCF0aGlzLl9wb2x5bGluZUFkZGVkVG9NYW5hZ2VyKSB7XHJcbiAgICAgIHRoaXMuX2luaXQoKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG9wdGlvbnM6IHtbcHJvcE5hbWU6IHN0cmluZ106IGFueX0gPSB7fTtcclxuICAgIGNvbnN0IG9wdGlvbktleXMgPSBPYmplY3Qua2V5cyhjaGFuZ2VzKS5maWx0ZXIoXHJcbiAgICAgICAgayA9PiBBZ21Qb2x5bGluZS5fcG9seWxpbmVPcHRpb25zQXR0cmlidXRlcy5pbmRleE9mKGspICE9PSAtMSk7XHJcbiAgICBvcHRpb25LZXlzLmZvckVhY2goayA9PiBvcHRpb25zW2tdID0gY2hhbmdlc1trXS5jdXJyZW50VmFsdWUpO1xyXG4gICAgdGhpcy5fcG9seWxpbmVNYW5hZ2VyLnNldFBvbHlsaW5lT3B0aW9ucyh0aGlzLCBvcHRpb25zKTtcclxuICB9XHJcblxyXG4gIGdldFBhdGgoKTogUHJvbWlzZTxnb29nbGUubWFwcy5MYXRMbmdbXT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX3BvbHlsaW5lTWFuYWdlci5nZXRQYXRoKHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfaW5pdCgpIHtcclxuICAgIHRoaXMuX3BvbHlsaW5lTWFuYWdlci5hZGRQb2x5bGluZSh0aGlzKTtcclxuICAgIHRoaXMuX3BvbHlsaW5lQWRkZWRUb01hbmFnZXIgPSB0cnVlO1xyXG4gICAgdGhpcy5fYWRkRXZlbnRMaXN0ZW5lcnMoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2FkZEV2ZW50TGlzdGVuZXJzKCkge1xyXG4gICAgY29uc3QgaGFuZGxlcnMgPSBbXHJcbiAgICAgIHtuYW1lOiAnY2xpY2snLCBoYW5kbGVyOiAoZXY6IGdvb2dsZS5tYXBzLlBvbHlNb3VzZUV2ZW50KSA9PiB0aGlzLmxpbmVDbGljay5lbWl0KGV2KX0sXHJcbiAgICAgIHtuYW1lOiAnZGJsY2xpY2snLCBoYW5kbGVyOiAoZXY6IGdvb2dsZS5tYXBzLlBvbHlNb3VzZUV2ZW50KSA9PiB0aGlzLmxpbmVEYmxDbGljay5lbWl0KGV2KX0sXHJcbiAgICAgIHtuYW1lOiAnZHJhZycsIGhhbmRsZXI6IChldjogZ29vZ2xlLm1hcHMuTW91c2VFdmVudCkgPT4gdGhpcy5saW5lRHJhZy5lbWl0KGV2KX0sXHJcbiAgICAgIHtuYW1lOiAnZHJhZ2VuZCcsIGhhbmRsZXI6IChldjogZ29vZ2xlLm1hcHMuTW91c2VFdmVudCkgPT4gdGhpcy5saW5lRHJhZ0VuZC5lbWl0KGV2KX0sXHJcbiAgICAgIHtuYW1lOiAnZHJhZ3N0YXJ0JywgaGFuZGxlcjogKGV2OiBnb29nbGUubWFwcy5Nb3VzZUV2ZW50KSA9PiB0aGlzLmxpbmVEcmFnU3RhcnQuZW1pdChldil9LFxyXG4gICAgICB7bmFtZTogJ21vdXNlZG93bicsIGhhbmRsZXI6IChldjogZ29vZ2xlLm1hcHMuUG9seU1vdXNlRXZlbnQpID0+IHRoaXMubGluZU1vdXNlRG93bi5lbWl0KGV2KX0sXHJcbiAgICAgIHtuYW1lOiAnbW91c2Vtb3ZlJywgaGFuZGxlcjogKGV2OiBnb29nbGUubWFwcy5Qb2x5TW91c2VFdmVudCkgPT4gdGhpcy5saW5lTW91c2VNb3ZlLmVtaXQoZXYpfSxcclxuICAgICAge25hbWU6ICdtb3VzZW91dCcsIGhhbmRsZXI6IChldjogZ29vZ2xlLm1hcHMuUG9seU1vdXNlRXZlbnQpID0+IHRoaXMubGluZU1vdXNlT3V0LmVtaXQoZXYpfSxcclxuICAgICAge25hbWU6ICdtb3VzZW92ZXInLCBoYW5kbGVyOiAoZXY6IGdvb2dsZS5tYXBzLlBvbHlNb3VzZUV2ZW50KSA9PiB0aGlzLmxpbmVNb3VzZU92ZXIuZW1pdChldil9LFxyXG4gICAgICB7bmFtZTogJ21vdXNldXAnLCBoYW5kbGVyOiAoZXY6IGdvb2dsZS5tYXBzLlBvbHlNb3VzZUV2ZW50KSA9PiB0aGlzLmxpbmVNb3VzZVVwLmVtaXQoZXYpfSxcclxuICAgICAge25hbWU6ICdyaWdodGNsaWNrJywgaGFuZGxlcjogKGV2OiBnb29nbGUubWFwcy5Qb2x5TW91c2VFdmVudCkgPT4gdGhpcy5saW5lUmlnaHRDbGljay5lbWl0KGV2KX0sXHJcbiAgICBdO1xyXG4gICAgaGFuZGxlcnMuZm9yRWFjaCgob2JqKSA9PiB7XHJcbiAgICAgIGNvbnN0IG9zID0gdGhpcy5fcG9seWxpbmVNYW5hZ2VyLmNyZWF0ZUV2ZW50T2JzZXJ2YWJsZShvYmoubmFtZSwgdGhpcykuc3Vic2NyaWJlKG9iai5oYW5kbGVyKTtcclxuICAgICAgdGhpcy5fc3Vic2NyaXB0aW9ucy5wdXNoKG9zKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuX3BvbHlsaW5lTWFuYWdlci5jcmVhdGVQYXRoRXZlbnRPYnNlcnZhYmxlKHRoaXMpLnRoZW4oKG9iJCkgPT4ge1xyXG4gICAgICBjb25zdCBvcyA9IG9iJC5zdWJzY3JpYmUocGF0aEV2ZW50ID0+IHRoaXMucG9seVBhdGhDaGFuZ2UuZW1pdChwYXRoRXZlbnQpKTtcclxuICAgICAgdGhpcy5fc3Vic2NyaXB0aW9ucy5wdXNoKG9zKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqIEBpbnRlcm5hbCAqL1xyXG4gIF9nZXRQb2ludHMoKTogQWdtUG9seWxpbmVQb2ludFtdIHtcclxuICAgIGlmICh0aGlzLnBvaW50cykge1xyXG4gICAgICByZXR1cm4gdGhpcy5wb2ludHMudG9BcnJheSgpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFtdO1xyXG4gIH1cclxuXHJcbiAgX2dldEljb25zKCk6IEFycmF5PEFnbVBvbHlsaW5lSWNvbj4ge1xyXG4gICAgaWYgKHRoaXMuaWNvblNlcXVlbmNlcykge1xyXG4gICAgICByZXR1cm4gdGhpcy5pY29uU2VxdWVuY2VzLnRvQXJyYXkoKTtcclxuICAgIH1cclxuICAgIHJldHVybiBbXTtcclxuICB9XHJcblxyXG4gIC8qKiBAaW50ZXJuYWwgKi9cclxuICBpZCgpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5faWQ7IH1cclxuXHJcbiAgLyoqIEBpbnRlcm5hbCAqL1xyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgdGhpcy5fcG9seWxpbmVNYW5hZ2VyLmRlbGV0ZVBvbHlsaW5lKHRoaXMpO1xyXG4gICAgLy8gdW5zdWJzY3JpYmUgYWxsIHJlZ2lzdGVyZWQgb2JzZXJ2YWJsZSBzdWJzY3JpcHRpb25zXHJcbiAgICB0aGlzLl9zdWJzY3JpcHRpb25zLmZvckVhY2goKHMpID0+IHMudW5zdWJzY3JpYmUoKSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==