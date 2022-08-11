import { ContentChildren, Directive, EventEmitter, forwardRef, Input, Output, QueryList } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { FitBoundsAccessor } from '../services/fit-bounds';
import { MarkerManager } from '../services/managers/marker-manager';
import { AgmInfoWindow } from './info-window';
let markerId = 0;
/**
 * AgmMarker renders a map marker inside a {@link AgmMap}.
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
 *      <agm-marker [latitude]="lat" [longitude]="lng" [label]="'M'">
 *      </agm-marker>
 *    </agm-map>
 *  `
 * })
 * ```
 */
export class AgmMarker {
    constructor(_markerManager) {
        this._markerManager = _markerManager;
        /**
         * If true, the marker can be dragged. Default value is false.
         */
        // tslint:disable-next-line:no-input-rename
        this.draggable = false;
        /**
         * If true, the marker is visible
         */
        this.visible = true;
        /**
         * Whether to automatically open the child info window when the marker is clicked.
         */
        this.openInfoWindow = true;
        /**
         * The marker's opacity between 0.0 and 1.0.
         */
        this.opacity = 1;
        /**
         * All markers are displayed on the map in order of their zIndex, with higher values displaying in
         * front of markers with lower values. By default, markers are displayed according to their
         * vertical position on screen, with lower markers appearing in front of markers further up the
         * screen.
         */
        this.zIndex = 1;
        /**
         * If true, the marker can be clicked. Default value is true.
         */
        // tslint:disable-next-line:no-input-rename
        this.clickable = true;
        /**
         * This event is fired when the marker's animation property changes.
         */
        this.animationChange = new EventEmitter();
        /**
         * This event emitter gets emitted when the user clicks on the marker.
         */
        this.markerClick = new EventEmitter();
        /**
         * This event emitter gets emitted when the user clicks twice on the marker.
         */
        this.markerDblClick = new EventEmitter();
        /**
         * This event is fired when the user rightclicks on the marker.
         */
        this.markerRightClick = new EventEmitter();
        /**
         * This event is fired when the user starts dragging the marker.
         */
        this.dragStart = new EventEmitter();
        /**
         * This event is repeatedly fired while the user drags the marker.
         */
        // tslint:disable-next-line: no-output-native
        this.drag = new EventEmitter();
        /**
         * This event is fired when the user stops dragging the marker.
         */
        this.dragEnd = new EventEmitter();
        /**
         * This event is fired when the user mouses over the marker.
         */
        this.mouseOver = new EventEmitter();
        /**
         * This event is fired when the user mouses outside the marker.
         */
        this.mouseOut = new EventEmitter();
        /** @internal */
        this.infoWindow = new QueryList();
        this._markerAddedToManger = false;
        this._observableSubscriptions = [];
        this._fitBoundsDetails$ = new ReplaySubject(1);
        this._id = (markerId++).toString();
    }
    /* @internal */
    ngAfterContentInit() {
        this.handleInfoWindowUpdate();
        this.infoWindow.changes.subscribe(() => this.handleInfoWindowUpdate());
    }
    handleInfoWindowUpdate() {
        if (this.infoWindow.length > 1) {
            throw new Error('Expected no more than one info window.');
        }
        this.infoWindow.forEach(marker => {
            marker.hostMarker = this;
        });
    }
    /** @internal */
    ngOnChanges(changes) {
        if (typeof this.latitude === 'string') {
            this.latitude = Number(this.latitude);
        }
        if (typeof this.longitude === 'string') {
            this.longitude = Number(this.longitude);
        }
        if (typeof this.latitude !== 'number' || typeof this.longitude !== 'number') {
            return;
        }
        if (!this._markerAddedToManger) {
            this._markerManager.addMarker(this);
            this._updateFitBoundsDetails();
            this._markerAddedToManger = true;
            this._addEventListeners();
            return;
        }
        // tslint:disable: no-string-literal
        if (changes['latitude'] || changes['longitude']) {
            this._markerManager.updateMarkerPosition(this);
            this._updateFitBoundsDetails();
        }
        if (changes['title']) {
            this._markerManager.updateTitle(this);
        }
        if (changes['label']) {
            this._markerManager.updateLabel(this);
        }
        if (changes['draggable']) {
            this._markerManager.updateDraggable(this);
        }
        if (changes['iconUrl']) {
            this._markerManager.updateIcon(this);
        }
        if (changes['opacity']) {
            this._markerManager.updateOpacity(this);
        }
        if (changes['visible']) {
            this._markerManager.updateVisible(this);
        }
        if (changes['zIndex']) {
            this._markerManager.updateZIndex(this);
        }
        if (changes['clickable']) {
            this._markerManager.updateClickable(this);
        }
        if (changes['animation']) {
            this._markerManager.updateAnimation(this);
        }
        // tslint:enable: no-string-literal
    }
    /** @internal */
    getFitBoundsDetails$() {
        return this._fitBoundsDetails$.asObservable();
    }
    _updateFitBoundsDetails() {
        this._fitBoundsDetails$.next({ latLng: { lat: this.latitude, lng: this.longitude } });
    }
    _addEventListeners() {
        const cs = this._markerManager.createEventObservable('click', this).subscribe(() => {
            if (this.openInfoWindow) {
                this.infoWindow.forEach(infoWindow => infoWindow.open());
            }
            this.markerClick.emit(this);
        });
        this._observableSubscriptions.push(cs);
        const dcs = this._markerManager.createEventObservable('dblclick', this).subscribe(() => {
            this.markerDblClick.emit(null);
        });
        this._observableSubscriptions.push(dcs);
        const rc = this._markerManager.createEventObservable('rightclick', this).subscribe(() => {
            this.markerRightClick.emit(null);
        });
        this._observableSubscriptions.push(rc);
        const ds = this._markerManager.createEventObservable('dragstart', this)
            .subscribe(e => this.dragStart.emit(e));
        this._observableSubscriptions.push(ds);
        const d = this._markerManager.createEventObservable('drag', this)
            .subscribe(e => this.drag.emit(e));
        this._observableSubscriptions.push(d);
        const de = this._markerManager.createEventObservable('dragend', this)
            .subscribe(e => this.dragEnd.emit(e));
        this._observableSubscriptions.push(de);
        const mover = this._markerManager.createEventObservable('mouseover', this)
            .subscribe(e => this.mouseOver.emit(e));
        this._observableSubscriptions.push(mover);
        const mout = this._markerManager.createEventObservable('mouseout', this)
            .subscribe(e => this.mouseOut.emit(e));
        this._observableSubscriptions.push(mout);
        const anChng = this._markerManager.createEventObservable('animation_changed', this)
            .subscribe(() => {
            this.animationChange.emit(this.animation);
        });
        this._observableSubscriptions.push(anChng);
    }
    /** @internal */
    id() { return this._id; }
    /** @internal */
    toString() { return 'AgmMarker-' + this._id.toString(); }
    /** @internal */
    ngOnDestroy() {
        this._markerManager.deleteMarker(this);
        // unsubscribe all registered observable subscriptions
        this._observableSubscriptions.forEach((s) => s.unsubscribe());
    }
}
AgmMarker.decorators = [
    { type: Directive, args: [{
                selector: 'agm-marker',
                providers: [
                    { provide: FitBoundsAccessor, useExisting: forwardRef(() => AgmMarker) },
                ],
            },] }
];
AgmMarker.ctorParameters = () => [
    { type: MarkerManager }
];
AgmMarker.propDecorators = {
    latitude: [{ type: Input }],
    longitude: [{ type: Input }],
    title: [{ type: Input }],
    label: [{ type: Input }],
    draggable: [{ type: Input, args: ['markerDraggable',] }],
    iconUrl: [{ type: Input }],
    visible: [{ type: Input }],
    openInfoWindow: [{ type: Input }],
    opacity: [{ type: Input }],
    zIndex: [{ type: Input }],
    clickable: [{ type: Input, args: ['markerClickable',] }],
    animation: [{ type: Input }],
    animationChange: [{ type: Output }],
    markerClick: [{ type: Output }],
    markerDblClick: [{ type: Output }],
    markerRightClick: [{ type: Output }],
    dragStart: [{ type: Output }],
    drag: [{ type: Output }],
    dragEnd: [{ type: Output }],
    mouseOver: [{ type: Output }],
    mouseOut: [{ type: Output }],
    infoWindow: [{ type: ContentChildren, args: [AgmInfoWindow,] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2VyLmpzIiwic291cmNlUm9vdCI6IkQ6L0F1dG9tYXRpb24vYW5ndWxhci1nb29nbGUtbWFwcy9wYWNrYWdlcy9jb3JlL3NyYy8iLCJzb3VyY2VzIjpbImxpYi9kaXJlY3RpdmVzL21hcmtlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQW9CLGVBQWUsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQXdCLE1BQU0sRUFBRSxTQUFTLEVBQWdCLE1BQU0sZUFBZSxDQUFDO0FBQ3JLLE9BQU8sRUFBYyxhQUFhLEVBQWdCLE1BQU0sTUFBTSxDQUFDO0FBQy9ELE9BQU8sRUFBRSxpQkFBaUIsRUFBb0IsTUFBTSx3QkFBd0IsQ0FBQztBQUM3RSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDcEUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUU5QyxJQUFJLFFBQVEsR0FBRyxDQUFDLENBQUM7QUFFakI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FzQkc7QUFPSCxNQUFNLE9BQU8sU0FBUztJQTBIcEIsWUFBb0IsY0FBNkI7UUFBN0IsbUJBQWMsR0FBZCxjQUFjLENBQWU7UUFyR2pEOztXQUVHO1FBQ0gsMkNBQTJDO1FBQ2pCLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFPNUM7O1dBRUc7UUFDTSxZQUFPLEdBQUcsSUFBSSxDQUFDO1FBRXhCOztXQUVHO1FBQ00sbUJBQWMsR0FBRyxJQUFJLENBQUM7UUFFL0I7O1dBRUc7UUFDTSxZQUFPLEdBQUcsQ0FBQyxDQUFDO1FBRXJCOzs7OztXQUtHO1FBQ00sV0FBTSxHQUFHLENBQUMsQ0FBQztRQUVwQjs7V0FFRztRQUNILDJDQUEyQztRQUNqQixjQUFTLEdBQUcsSUFBSSxDQUFDO1FBUTNDOztXQUVHO1FBQ08sb0JBQWUsR0FBRyxJQUFJLFlBQVksRUFBc0MsQ0FBQztRQUVuRjs7V0FFRztRQUNPLGdCQUFXLEdBQTRCLElB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Q0FBQyxFQUFFLENBQUMsQ0FBQztRQUV2QyxNQUFNLEVBQUUsR0FDSixJQUFJLENBQUMsY0FBYyxDQUFDLHFCQUFxQixDQUF5QixXQUFXLEVBQUUsSUFBSSxDQUFDO2FBQy9FLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDaEQsSUFBSSxDQUFDLHdCQUF3QixDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUV2QyxNQUFNLENBQUMsR0FDSCxJQUFJLENBQUMsY0FBYyxDQUFDLHFCQUFxQixDQUF5QixNQUFNLEVBQUUsSUFBSSxDQUFDO2FBQzVFLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUV0QyxNQUFNLEVBQUUsR0FDSixJQUFJLENBQUMsY0FBYyxDQUFDLHFCQUFxQixDQUF5QixTQUFTLEVBQUUsSUFBSSxDQUFDO2FBQy9FLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDNUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUV2QyxNQUFNLEtBQUssR0FDUCxJQUFJLENBQUMsY0FBYyxDQUFDLHFCQUFxQixDQUF5QixXQUFXLEVBQUUsSUFBSSxDQUFDO2FBQ2pGLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDOUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUUxQyxNQUFNLElBQUksR0FDTixJQUFJLENBQUMsY0FBYyxDQUFDLHFCQUFxQixDQUF5QixVQUFVLEVBQUUsSUFBSSxDQUFDO2FBQ2hGLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDN0MsSUFBSSxDQUFDLHdCQUF3QixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUV6QyxNQUFNLE1BQU0sR0FDVixJQUFJLENBQUMsY0FBYyxDQUFDLHFCQUFxQixDQUFPLG1CQUFtQixFQUFFLElBQUksQ0FBQzthQUN2RSxTQUFTLENBQUMsR0FBRyxFQUFFO1lBQ2QsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzVDLENBQUMsQ0FBQyxDQUFDO1FBQ1AsSUFBSSxDQUFDLHdCQUF3QixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBRUQsZ0JBQWdCO0lBQ2hCLEVBQUUsS0FBYSxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBRWpDLGdCQUFnQjtJQUNoQixRQUFRLEtBQWEsT0FBTyxZQUFZLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFFakUsZ0JBQWdCO0lBQ2hCLFdBQVc7UUFDVCxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2QyxzREFBc0Q7UUFDdEQsSUFBSSxDQUFDLHdCQUF3QixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7SUFDaEUsQ0FBQzs7O1lBL1FGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsWUFBWTtnQkFDdEIsU0FBUyxFQUFFO29CQUNULEVBQUUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsU0FBUyxDQUFDLEVBQUU7aUJBQ3pFO2FBQ0Y7OztZQWpDUSxhQUFhOzs7dUJBc0NuQixLQUFLO3dCQUtMLEtBQUs7b0JBS0wsS0FBSztvQkFLTCxLQUFLO3dCQU1MLEtBQUssU0FBQyxpQkFBaUI7c0JBS3ZCLEtBQUs7c0JBS0wsS0FBSzs2QkFLTCxLQUFLO3NCQUtMLEtBQUs7cUJBUUwsS0FBSzt3QkFNTCxLQUFLLFNBQUMsaUJBQWlCO3dCQU12QixLQUFLOzhCQUtMLE1BQU07MEJBS04sTUFBTTs2QkFLTixNQUFNOytCQUtOLE1BQU07d0JBS04sTUFBTTttQkFNTixNQUFNO3NCQUtOLE1BQU07d0JBS04sTUFBTTt1QkFLTixNQUFNO3lCQUdOLGVBQWUsU0FBQyxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZ0ZXJDb250ZW50SW5pdCwgQ29udGVudENoaWxkcmVuLCBEaXJlY3RpdmUsIEV2ZW50RW1pdHRlciwgZm9yd2FyZFJlZiwgSW5wdXQsIE9uQ2hhbmdlcywgT25EZXN0cm95LCBPdXRwdXQsIFF1ZXJ5TGlzdCwgU2ltcGxlQ2hhbmdlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUsIFJlcGxheVN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBGaXRCb3VuZHNBY2Nlc3NvciwgRml0Qm91bmRzRGV0YWlscyB9IGZyb20gJy4uL3NlcnZpY2VzL2ZpdC1ib3VuZHMnO1xyXG5pbXBvcnQgeyBNYXJrZXJNYW5hZ2VyIH0gZnJvbSAnLi4vc2VydmljZXMvbWFuYWdlcnMvbWFya2VyLW1hbmFnZXInO1xyXG5pbXBvcnQgeyBBZ21JbmZvV2luZG93IH0gZnJvbSAnLi9pbmZvLXdpbmRvdyc7XHJcblxyXG5sZXQgbWFya2VySWQgPSAwO1xyXG5cclxuLyoqXHJcbiAqIEFnbU1hcmtlciByZW5kZXJzIGEgbWFwIG1hcmtlciBpbnNpZGUgYSB7QGxpbmsgQWdtTWFwfS5cclxuICpcclxuICogIyMjIEV4YW1wbGVcclxuICogYGBgdHlwZXNjcmlwdFxyXG4gKiBpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuICpcclxuICogQENvbXBvbmVudCh7XHJcbiAqICBzZWxlY3RvcjogJ215LW1hcC1jbXAnLFxyXG4gKiAgc3R5bGVzOiBbYFxyXG4gKiAgICAuYWdtLW1hcC1jb250YWluZXIge1xyXG4gKiAgICAgIGhlaWdodDogMzAwcHg7XHJcbiAqICAgIH1cclxuICogYF0sXHJcbiAqICB0ZW1wbGF0ZTogYFxyXG4gKiAgICA8YWdtLW1hcCBbbGF0aXR1ZGVdPVwibGF0XCIgW2xvbmdpdHVkZV09XCJsbmdcIiBbem9vbV09XCJ6b29tXCI+XHJcbiAqICAgICAgPGFnbS1tYXJrZXIgW2xhdGl0dWRlXT1cImxhdFwiIFtsb25naXR1ZGVdPVwibG5nXCIgW2xhYmVsXT1cIidNJ1wiPlxyXG4gKiAgICAgIDwvYWdtLW1hcmtlcj5cclxuICogICAgPC9hZ20tbWFwPlxyXG4gKiAgYFxyXG4gKiB9KVxyXG4gKiBgYGBcclxuICovXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnYWdtLW1hcmtlcicsXHJcbiAgcHJvdmlkZXJzOiBbXHJcbiAgICB7IHByb3ZpZGU6IEZpdEJvdW5kc0FjY2Vzc29yLCB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBBZ21NYXJrZXIpIH0sXHJcbiAgXSxcclxufSlcclxuZXhwb3J0IGNsYXNzIEFnbU1hcmtlciBpbXBsZW1lbnRzIE9uRGVzdHJveSwgT25DaGFuZ2VzLCBBZnRlckNvbnRlbnRJbml0LCBGaXRCb3VuZHNBY2Nlc3NvciB7XHJcbiAgLyoqXHJcbiAgICogVGhlIGxhdGl0dWRlIHBvc2l0aW9uIG9mIHRoZSBtYXJrZXIuXHJcbiAgICovXHJcbiAgQElucHV0KCkgbGF0aXR1ZGU6IG51bWJlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGxvbmdpdHVkZSBwb3NpdGlvbiBvZiB0aGUgbWFya2VyLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGxvbmdpdHVkZTogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgdGl0bGUgb2YgdGhlIG1hcmtlci5cclxuICAgKi9cclxuICBASW5wdXQoKSB0aXRsZTogc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgbGFiZWwgKGEgc2luZ2xlIHVwcGVyY2FzZSBjaGFyYWN0ZXIpIGZvciB0aGUgbWFya2VyLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGxhYmVsOiBzdHJpbmcgfCBnb29nbGUubWFwcy5NYXJrZXJMYWJlbDtcclxuXHJcbiAgLyoqXHJcbiAgICogSWYgdHJ1ZSwgdGhlIG1hcmtlciBjYW4gYmUgZHJhZ2dlZC4gRGVmYXVsdCB2YWx1ZSBpcyBmYWxzZS5cclxuICAgKi9cclxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8taW5wdXQtcmVuYW1lXHJcbiAgQElucHV0KCdtYXJrZXJEcmFnZ2FibGUnKSBkcmFnZ2FibGUgPSBmYWxzZTtcclxuXHJcbiAgLyoqXHJcbiAgICogSWNvbiAodGhlIFVSTCBvZiB0aGUgaW1hZ2UpIGZvciB0aGUgZm9yZWdyb3VuZC5cclxuICAgKi9cclxuICBASW5wdXQoKSBpY29uVXJsOiBzdHJpbmcgfCBnb29nbGUubWFwcy5JY29uIHwgZ29vZ2xlLm1hcHMuU3ltYm9sO1xyXG5cclxuICAvKipcclxuICAgKiBJZiB0cnVlLCB0aGUgbWFya2VyIGlzIHZpc2libGVcclxuICAgKi9cclxuICBASW5wdXQoKSB2aXNpYmxlID0gdHJ1ZTtcclxuXHJcbiAgLyoqXHJcbiAgICogV2hldGhlciB0byBhdXRvbWF0aWNhbGx5IG9wZW4gdGhlIGNoaWxkIGluZm8gd2luZG93IHdoZW4gdGhlIG1hcmtlciBpcyBjbGlja2VkLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG9wZW5JbmZvV2luZG93ID0gdHJ1ZTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIG1hcmtlcidzIG9wYWNpdHkgYmV0d2VlbiAwLjAgYW5kIDEuMC5cclxuICAgKi9cclxuICBASW5wdXQoKSBvcGFjaXR5ID0gMTtcclxuXHJcbiAgLyoqXHJcbiAgICogQWxsIG1hcmtlcnMgYXJlIGRpc3BsYXllZCBvbiB0aGUgbWFwIGluIG9yZGVyIG9mIHRoZWlyIHpJbmRleCwgd2l0aCBoaWdoZXIgdmFsdWVzIGRpc3BsYXlpbmcgaW5cclxuICAgKiBmcm9udCBvZiBtYXJrZXJzIHdpdGggbG93ZXIgdmFsdWVzLiBCeSBkZWZhdWx0LCBtYXJrZXJzIGFyZSBkaXNwbGF5ZWQgYWNjb3JkaW5nIHRvIHRoZWlyXHJcbiAgICogdmVydGljYWwgcG9zaXRpb24gb24gc2NyZWVuLCB3aXRoIGxvd2VyIG1hcmtlcnMgYXBwZWFyaW5nIGluIGZyb250IG9mIG1hcmtlcnMgZnVydGhlciB1cCB0aGVcclxuICAgKiBzY3JlZW4uXHJcbiAgICovXHJcbiAgQElucHV0KCkgekluZGV4ID0gMTtcclxuXHJcbiAgLyoqXHJcbiAgICogSWYgdHJ1ZSwgdGhlIG1hcmtlciBjYW4gYmUgY2xpY2tlZC4gRGVmYXVsdCB2YWx1ZSBpcyB0cnVlLlxyXG4gICAqL1xyXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1pbnB1dC1yZW5hbWVcclxuICBASW5wdXQoJ21hcmtlckNsaWNrYWJsZScpIGNsaWNrYWJsZSA9IHRydWU7XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoaWNoIGFuaW1hdGlvbiB0byBwbGF5IHdoZW4gbWFya2VyIGlzIGFkZGVkIHRvIGEgbWFwLlxyXG4gICAqIFRoaXMgY2FuIGJlICdCT1VOQ0UnIG9yICdEUk9QJ1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGFuaW1hdGlvbjoga2V5b2YgdHlwZW9mIGdvb2dsZS5tYXBzLkFuaW1hdGlvbjtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSBtYXJrZXIncyBhbmltYXRpb24gcHJvcGVydHkgY2hhbmdlcy5cclxuICAgKi9cclxuICBAT3V0cHV0KCkgYW5pbWF0aW9uQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxrZXlvZiB0eXBlb2YgZ29vZ2xlLm1hcHMuQW5pbWF0aW9uPigpO1xyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGV2ZW50IGVtaXR0ZXIgZ2V0cyBlbWl0dGVkIHdoZW4gdGhlIHVzZXIgY2xpY2tzIG9uIHRoZSBtYXJrZXIuXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIG1hcmtlckNsaWNrOiBFdmVudEVtaXR0ZXI8QWdtTWFya2VyPiA9IG5ldyBFdmVudEVtaXR0ZXI8QWdtTWFya2VyPigpO1xyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGV2ZW50IGVtaXR0ZXIgZ2V0cyBlbWl0dGVkIHdoZW4gdGhlIHVzZXIgY2xpY2tzIHR3aWNlIG9uIHRoZSBtYXJrZXIuXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIG1hcmtlckRibENsaWNrOiBFdmVudEVtaXR0ZXI8QWdtTWFya2VyPiA9IG5ldyBFdmVudEVtaXR0ZXI8QWdtTWFya2VyPigpO1xyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIHVzZXIgcmlnaHRjbGlja3Mgb24gdGhlIG1hcmtlci5cclxuICAgKi9cclxuICBAT3V0cHV0KCkgbWFya2VyUmlnaHRDbGljazogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIHVzZXIgc3RhcnRzIGRyYWdnaW5nIHRoZSBtYXJrZXIuXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIGRyYWdTdGFydDogRXZlbnRFbWl0dGVyPGdvb2dsZS5tYXBzLk1vdXNlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxnb29nbGUubWFwcy5Nb3VzZUV2ZW50PigpO1xyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGV2ZW50IGlzIHJlcGVhdGVkbHkgZmlyZWQgd2hpbGUgdGhlIHVzZXIgZHJhZ3MgdGhlIG1hcmtlci5cclxuICAgKi9cclxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLW91dHB1dC1uYXRpdmVcclxuICBAT3V0cHV0KCkgZHJhZzogRXZlbnRFbWl0dGVyPGdvb2dsZS5tYXBzLk1vdXNlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxnb29nbGUubWFwcy5Nb3VzZUV2ZW50PigpO1xyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIHVzZXIgc3RvcHMgZHJhZ2dpbmcgdGhlIG1hcmtlci5cclxuICAgKi9cclxuICBAT3V0cHV0KCkgZHJhZ0VuZDogRXZlbnRFbWl0dGVyPGdvb2dsZS5tYXBzLk1vdXNlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxnb29nbGUubWFwcy5Nb3VzZUV2ZW50PigpO1xyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIHVzZXIgbW91c2VzIG92ZXIgdGhlIG1hcmtlci5cclxuICAgKi9cclxuICBAT3V0cHV0KCkgbW91c2VPdmVyOiBFdmVudEVtaXR0ZXI8Z29vZ2xlLm1hcHMuTW91c2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPGdvb2dsZS5tYXBzLk1vdXNlRXZlbnQ+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgdXNlciBtb3VzZXMgb3V0c2lkZSB0aGUgbWFya2VyLlxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBtb3VzZU91dDogRXZlbnRFbWl0dGVyPGdvb2dsZS5tYXBzLk1vdXNlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxnb29nbGUubWFwcy5Nb3VzZUV2ZW50PigpO1xyXG5cclxuICAvKiogQGludGVybmFsICovXHJcbiAgQENvbnRlbnRDaGlsZHJlbihBZ21JbmZvV2luZG93KSBpbmZvV2luZG93OiBRdWVyeUxpc3Q8QWdtSW5mb1dpbmRvdz4gPSBuZXcgUXVlcnlMaXN0PEFnbUluZm9XaW5kb3c+KCk7XHJcblxyXG4gIHByaXZhdGUgX21hcmtlckFkZGVkVG9NYW5nZXIgPSBmYWxzZTtcclxuICBwcml2YXRlIF9pZDogc3RyaW5nO1xyXG4gIHByaXZhdGUgX29ic2VydmFibGVTdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xyXG5cclxuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX2ZpdEJvdW5kc0RldGFpbHMkOiBSZXBsYXlTdWJqZWN0PEZpdEJvdW5kc0RldGFpbHM+ID0gbmV3IFJlcGxheVN1YmplY3Q8Rml0Qm91bmRzRGV0YWlscz4oMSk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX21hcmtlck1hbmFnZXI6IE1hcmtlck1hbmFnZXIpIHsgdGhpcy5faWQgPSAobWFya2VySWQrKykudG9TdHJpbmcoKTsgfVxyXG5cclxuICAvKiBAaW50ZXJuYWwgKi9cclxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XHJcbiAgICB0aGlzLmhhbmRsZUluZm9XaW5kb3dVcGRhdGUoKTtcclxuICAgIHRoaXMuaW5mb1dpbmRvdy5jaGFuZ2VzLnN1YnNjcmliZSgoKSA9PiB0aGlzLmhhbmRsZUluZm9XaW5kb3dVcGRhdGUoKSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGhhbmRsZUluZm9XaW5kb3dVcGRhdGUoKSB7XHJcbiAgICBpZiAodGhpcy5pbmZvV2luZG93Lmxlbmd0aCA+IDEpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdFeHBlY3RlZCBubyBtb3JlIHRoYW4gb25lIGluZm8gd2luZG93LicpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5pbmZvV2luZG93LmZvckVhY2gobWFya2VyID0+IHtcclxuICAgICAgbWFya2VyLmhvc3RNYXJrZXIgPSB0aGlzO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKiogQGludGVybmFsICovXHJcbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogeyBba2V5OiBzdHJpbmddOiBTaW1wbGVDaGFuZ2UgfSkge1xyXG4gICAgaWYgKHR5cGVvZiB0aGlzLmxhdGl0dWRlID09PSAnc3RyaW5nJykge1xyXG4gICAgICB0aGlzLmxhdGl0dWRlID0gTnVtYmVyKHRoaXMubGF0aXR1ZGUpO1xyXG4gICAgfVxyXG4gICAgaWYgKHR5cGVvZiB0aGlzLmxvbmdpdHVkZSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgdGhpcy5sb25naXR1ZGUgPSBOdW1iZXIodGhpcy5sb25naXR1ZGUpO1xyXG4gICAgfVxyXG4gICAgaWYgKHR5cGVvZiB0aGlzLmxhdGl0dWRlICE9PSAnbnVtYmVyJyB8fCB0eXBlb2YgdGhpcy5sb25naXR1ZGUgIT09ICdudW1iZXInKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmICghdGhpcy5fbWFya2VyQWRkZWRUb01hbmdlcikge1xyXG4gICAgICB0aGlzLl9tYXJrZXJNYW5hZ2VyLmFkZE1hcmtlcih0aGlzKTtcclxuICAgICAgdGhpcy5fdXBkYXRlRml0Qm91bmRzRGV0YWlscygpO1xyXG4gICAgICB0aGlzLl9tYXJrZXJBZGRlZFRvTWFuZ2VyID0gdHJ1ZTtcclxuICAgICAgdGhpcy5fYWRkRXZlbnRMaXN0ZW5lcnMoKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgLy8gdHNsaW50OmRpc2FibGU6IG5vLXN0cmluZy1saXRlcmFsXHJcbiAgICBpZiAoY2hhbmdlc1snbGF0aXR1ZGUnXSB8fCBjaGFuZ2VzWydsb25naXR1ZGUnXSkge1xyXG4gICAgICB0aGlzLl9tYXJrZXJNYW5hZ2VyLnVwZGF0ZU1hcmtlclBvc2l0aW9uKHRoaXMpO1xyXG4gICAgICB0aGlzLl91cGRhdGVGaXRCb3VuZHNEZXRhaWxzKCk7XHJcbiAgICB9XHJcbiAgICBpZiAoY2hhbmdlc1sndGl0bGUnXSkge1xyXG4gICAgICB0aGlzLl9tYXJrZXJNYW5hZ2VyLnVwZGF0ZVRpdGxlKHRoaXMpO1xyXG4gICAgfVxyXG4gICAgaWYgKGNoYW5nZXNbJ2xhYmVsJ10pIHtcclxuICAgICAgdGhpcy5fbWFya2VyTWFuYWdlci51cGRhdGVMYWJlbCh0aGlzKTtcclxuICAgIH1cclxuICAgIGlmIChjaGFuZ2VzWydkcmFnZ2FibGUnXSkge1xyXG4gICAgICB0aGlzLl9tYXJrZXJNYW5hZ2VyLnVwZGF0ZURyYWdnYWJsZSh0aGlzKTtcclxuICAgIH1cclxuICAgIGlmIChjaGFuZ2VzWydpY29uVXJsJ10pIHtcclxuICAgICAgdGhpcy5fbWFya2VyTWFuYWdlci51cGRhdGVJY29uKHRoaXMpO1xyXG4gICAgfVxyXG4gICAgaWYgKGNoYW5nZXNbJ29wYWNpdHknXSkge1xyXG4gICAgICB0aGlzLl9tYXJrZXJNYW5hZ2VyLnVwZGF0ZU9wYWNpdHkodGhpcyk7XHJcbiAgICB9XHJcbiAgICBpZiAoY2hhbmdlc1sndmlzaWJsZSddKSB7XHJcbiAgICAgIHRoaXMuX21hcmtlck1hbmFnZXIudXBkYXRlVmlzaWJsZSh0aGlzKTtcclxuICAgIH1cclxuICAgIGlmIChjaGFuZ2VzWyd6SW5kZXgnXSkge1xyXG4gICAgICB0aGlzLl9tYXJrZXJNYW5hZ2VyLnVwZGF0ZVpJbmRleCh0aGlzKTtcclxuICAgIH1cclxuICAgIGlmIChjaGFuZ2VzWydjbGlja2FibGUnXSkge1xyXG4gICAgICB0aGlzLl9tYXJrZXJNYW5hZ2VyLnVwZGF0ZUNsaWNrYWJsZSh0aGlzKTtcclxuICAgIH1cclxuICAgIGlmIChjaGFuZ2VzWydhbmltYXRpb24nXSkge1xyXG4gICAgICB0aGlzLl9tYXJrZXJNYW5hZ2VyLnVwZGF0ZUFuaW1hdGlvbih0aGlzKTtcclxuICAgIH1cclxuICAgIC8vIHRzbGludDplbmFibGU6IG5vLXN0cmluZy1saXRlcmFsXHJcblxyXG4gIH1cclxuXHJcbiAgLyoqIEBpbnRlcm5hbCAqL1xyXG4gIGdldEZpdEJvdW5kc0RldGFpbHMkKCk6IE9ic2VydmFibGU8Rml0Qm91bmRzRGV0YWlscz4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX2ZpdEJvdW5kc0RldGFpbHMkLmFzT2JzZXJ2YWJsZSgpO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIF91cGRhdGVGaXRCb3VuZHNEZXRhaWxzKCkge1xyXG4gICAgdGhpcy5fZml0Qm91bmRzRGV0YWlscyQubmV4dCh7IGxhdExuZzogeyBsYXQ6IHRoaXMubGF0aXR1ZGUsIGxuZzogdGhpcy5sb25naXR1ZGUgfSB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2FkZEV2ZW50TGlzdGVuZXJzKCkge1xyXG4gICAgY29uc3QgY3MgPSB0aGlzLl9tYXJrZXJNYW5hZ2VyLmNyZWF0ZUV2ZW50T2JzZXJ2YWJsZSgnY2xpY2snLCB0aGlzKS5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICBpZiAodGhpcy5vcGVuSW5mb1dpbmRvdykge1xyXG4gICAgICAgIHRoaXMuaW5mb1dpbmRvdy5mb3JFYWNoKGluZm9XaW5kb3cgPT4gaW5mb1dpbmRvdy5vcGVuKCkpO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMubWFya2VyQ2xpY2suZW1pdCh0aGlzKTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5fb2JzZXJ2YWJsZVN1YnNjcmlwdGlvbnMucHVzaChjcyk7XHJcblxyXG4gICAgY29uc3QgZGNzID0gdGhpcy5fbWFya2VyTWFuYWdlci5jcmVhdGVFdmVudE9ic2VydmFibGUoJ2RibGNsaWNrJywgdGhpcykuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgdGhpcy5tYXJrZXJEYmxDbGljay5lbWl0KG51bGwpO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLl9vYnNlcnZhYmxlU3Vic2NyaXB0aW9ucy5wdXNoKGRjcyk7XHJcblxyXG4gICAgY29uc3QgcmMgPSB0aGlzLl9tYXJrZXJNYW5hZ2VyLmNyZWF0ZUV2ZW50T2JzZXJ2YWJsZSgncmlnaHRjbGljaycsIHRoaXMpLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgIHRoaXMubWFya2VyUmlnaHRDbGljay5lbWl0KG51bGwpO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLl9vYnNlcnZhYmxlU3Vic2NyaXB0aW9ucy5wdXNoKHJjKTtcclxuXHJcbiAgICBjb25zdCBkcyA9XHJcbiAgICAgICAgdGhpcy5fbWFya2VyTWFuYWdlci5jcmVhdGVFdmVudE9ic2VydmFibGU8Z29vZ2xlLm1hcHMuTW91c2VFdmVudD4oJ2RyYWdzdGFydCcsIHRoaXMpXHJcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoZSA9PiB0aGlzLmRyYWdTdGFydC5lbWl0KGUpKTtcclxuICAgIHRoaXMuX29ic2VydmFibGVTdWJzY3JpcHRpb25zLnB1c2goZHMpO1xyXG5cclxuICAgIGNvbnN0IGQgPVxyXG4gICAgICAgIHRoaXMuX21hcmtlck1hbmFnZXIuY3JlYXRlRXZlbnRPYnNlcnZhYmxlPGdvb2dsZS5tYXBzLk1vdXNlRXZlbnQ+KCdkcmFnJywgdGhpcylcclxuICAgICAgICAgIC5zdWJzY3JpYmUoZSA9PiB0aGlzLmRyYWcuZW1pdChlKSk7XHJcbiAgICB0aGlzLl9vYnNlcnZhYmxlU3Vic2NyaXB0aW9ucy5wdXNoKGQpO1xyXG5cclxuICAgIGNvbnN0IGRlID1cclxuICAgICAgICB0aGlzLl9tYXJrZXJNYW5hZ2VyLmNyZWF0ZUV2ZW50T2JzZXJ2YWJsZTxnb29nbGUubWFwcy5Nb3VzZUV2ZW50PignZHJhZ2VuZCcsIHRoaXMpXHJcbiAgICAgICAgICAuc3Vic2NyaWJlKGUgPT4gdGhpcy5kcmFnRW5kLmVtaXQoZSkpO1xyXG4gICAgdGhpcy5fb2JzZXJ2YWJsZVN1YnNjcmlwdGlvbnMucHVzaChkZSk7XHJcblxyXG4gICAgY29uc3QgbW92ZXIgPVxyXG4gICAgICAgIHRoaXMuX21hcmtlck1hbmFnZXIuY3JlYXRlRXZlbnRPYnNlcnZhYmxlPGdvb2dsZS5tYXBzLk1vdXNlRXZlbnQ+KCdtb3VzZW92ZXInLCB0aGlzKVxyXG4gICAgICAgICAgLnN1YnNjcmliZShlID0+IHRoaXMubW91c2VPdmVyLmVtaXQoZSkpO1xyXG4gICAgdGhpcy5fb2JzZXJ2YWJsZVN1YnNjcmlwdGlvbnMucHVzaChtb3Zlcik7XHJcblxyXG4gICAgY29uc3QgbW91dCA9XHJcbiAgICAgICAgdGhpcy5fbWFya2VyTWFuYWdlci5jcmVhdGVFdmVudE9ic2VydmFibGU8Z29vZ2xlLm1hcHMuTW91c2VFdmVudD4oJ21vdXNlb3V0JywgdGhpcylcclxuICAgICAgICAgIC5zdWJzY3JpYmUoZSA9PiB0aGlzLm1vdXNlT3V0LmVtaXQoZSkpO1xyXG4gICAgdGhpcy5fb2JzZXJ2YWJsZVN1YnNjcmlwdGlvbnMucHVzaChtb3V0KTtcclxuXHJcbiAgICBjb25zdCBhbkNobmcgPVxyXG4gICAgICB0aGlzLl9tYXJrZXJNYW5hZ2VyLmNyZWF0ZUV2ZW50T2JzZXJ2YWJsZTx2b2lkPignYW5pbWF0aW9uX2NoYW5nZWQnLCB0aGlzKVxyXG4gICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5hbmltYXRpb25DaGFuZ2UuZW1pdCh0aGlzLmFuaW1hdGlvbik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB0aGlzLl9vYnNlcnZhYmxlU3Vic2NyaXB0aW9ucy5wdXNoKGFuQ2huZyk7XHJcbiAgfVxyXG5cclxuICAvKiogQGludGVybmFsICovXHJcbiAgaWQoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuX2lkOyB9XHJcblxyXG4gIC8qKiBAaW50ZXJuYWwgKi9cclxuICB0b1N0cmluZygpOiBzdHJpbmcgeyByZXR1cm4gJ0FnbU1hcmtlci0nICsgdGhpcy5faWQudG9TdHJpbmcoKTsgfVxyXG5cclxuICAvKiogQGludGVybmFsICovXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLl9tYXJrZXJNYW5hZ2VyLmRlbGV0ZU1hcmtlcih0aGlzKTtcclxuICAgIC8vIHVuc3Vic2NyaWJlIGFsbCByZWdpc3RlcmVkIG9ic2VydmFibGUgc3Vic2NyaXB0aW9uc1xyXG4gICAgdGhpcy5fb2JzZXJ2YWJsZVN1YnNjcmlwdGlvbnMuZm9yRWFjaCgocykgPT4gcy51bnN1YnNjcmliZSgpKTtcclxuICB9XHJcbn1cclxuIl19