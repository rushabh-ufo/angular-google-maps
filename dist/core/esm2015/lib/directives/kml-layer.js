import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { KmlLayerManager } from './../services/managers/kml-layer-manager';
let layerId = 0;
export class AgmKmlLayer {
    constructor(_manager) {
        this._manager = _manager;
        this._addedToManager = false;
        this._id = (layerId++).toString();
        this._subscriptions = [];
        /**
         * If true, the layer receives mouse events. Default value is true.
         */
        this.clickable = true;
        /**
         * By default, the input map is centered and zoomed to the bounding box of the contents of the
         * layer.
         * If this option is set to true, the viewport is left unchanged, unless the map's center and zoom
         * were never set.
         */
        this.preserveViewport = false;
        /**
         * Whether to render the screen overlays. Default true.
         */
        this.screenOverlays = true;
        /**
         * Suppress the rendering of info windows when layer features are clicked.
         */
        this.suppressInfoWindows = false;
        /**
         * The URL of the KML document to display.
         */
        this.url = null;
        /**
         * The z-index of the layer.
         */
        this.zIndex = null;
        /**
         * This event is fired when a feature in the layer is clicked.
         */
        this.layerClick = new EventEmitter();
        /**
         * This event is fired when the KML layers default viewport has changed.
         */
        this.defaultViewportChange = new EventEmitter();
        /**
         * This event is fired when the KML layer has finished loading.
         * At this point it is safe to read the status property to determine if the layer loaded
         * successfully.
         */
        this.statusChange = new EventEmitter();
    }
    ngOnInit() {
        if (this._addedToManager) {
            return;
        }
        this._manager.addKmlLayer(this);
        this._addedToManager = true;
        this._addEventListeners();
    }
    ngOnChanges(changes) {
        if (!this._addedToManager) {
            return;
        }
        this._updatePolygonOptions(changes);
    }
    _updatePolygonOptions(changes) {
        const options = Object.keys(changes)
            .filter(k => AgmKmlLayer._kmlLayerOptions.indexOf(k) !== -1)
            .reduce((obj, k) => {
            obj[k] = changes[k].currentValue;
            return obj;
        }, {});
        if (Object.keys(options).length > 0) {
            this._manager.setOptions(this, options);
        }
    }
    _addEventListeners() {
        const listeners = [
            { name: 'click', handler: (ev) => this.layerClick.emit(ev) },
            { name: 'defaultviewport_changed', handler: () => this.defaultViewportChange.emit() },
            { name: 'status_changed', handler: () => this.statusChange.emit() },
        ];
        listeners.forEach((obj) => {
            const os = this._manager.createEventObservable(obj.name, this).subscribe(obj.handler);
            this._subscriptions.push(os);
        });
    }
    /** @internal */
    id() { return this._id; }
    /** @internal */
    toString() { return `AgmKmlLayer-${this._id.toString()}`; }
    /** @internal */
    ngOnDestroy() {
        this._manager.deleteKmlLayer(this);
        // unsubscribe all registered observable subscriptions
        this._subscriptions.forEach(s => s.unsubscribe());
    }
}
AgmKmlLayer._kmlLayerOptions = ['clickable', 'preserveViewport', 'screenOverlays', 'suppressInfoWindows', 'url', 'zIndex'];
AgmKmlLayer.decorators = [
    { type: Directive, args: [{
                selector: 'agm-kml-layer',
            },] }
];
AgmKmlLayer.ctorParameters = () => [
    { type: KmlLayerManager }
];
AgmKmlLayer.propDecorators = {
    clickable: [{ type: Input }],
    preserveViewport: [{ type: Input }],
    screenOverlays: [{ type: Input }],
    suppressInfoWindows: [{ type: Input }],
    url: [{ type: Input }],
    zIndex: [{ type: Input }],
    layerClick: [{ type: Output }],
    defaultViewportChange: [{ type: Output }],
    statusChange: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia21sLWxheWVyLmpzIiwic291cmNlUm9vdCI6IkQ6L0F1dG9tYXRpb24vYW5ndWxhci1nb29nbGUtbWFwcy9wYWNrYWdlcy9jb3JlL3NyYy8iLCJzb3VyY2VzIjpbImxpYi9kaXJlY3RpdmVzL2ttbC1sYXllci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQWdDLE1BQU0sRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFHcEgsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBRTNFLElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQztBQUtoQixNQUFNLE9BQU8sV0FBVztJQXlEdEIsWUFBb0IsUUFBeUI7UUFBekIsYUFBUSxHQUFSLFFBQVEsQ0FBaUI7UUF4RHJDLG9CQUFlLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLFFBQUcsR0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDckMsbUJBQWMsR0FBbUIsRUFBRSxDQUFDO1FBSTVDOztXQUVHO1FBQ00sY0FBUyxHQUFHLElBQUksQ0FBQztRQUUxQjs7Ozs7V0FLRztRQUNNLHFCQUFnQixHQUFHLEtBQUssQ0FBQztRQUVsQzs7V0FFRztRQUNNLG1CQUFjLEdBQUcsSUFBSSxDQUFDO1FBRS9COztXQUVHO1FBQ00sd0JBQW1CLEdBQUcsS0FBSyxDQUFDO1FBRXJDOztXQUVHO1FBQ00sUUFBRyxHQUFXLElBQUksQ0FBQztRQUU1Qjs7V0FFRztRQUNNLFdBQU0sR0FBa0IsSUFBSSxDQUFDO1FBRXRDOztXQUVHO1FBQ08sZUFBVSxHQUE0QyxJQUFJLFlBQVksRUFBNkIsQ0FBQztRQUU5Rzs7V0FFRztRQUNPLDBCQUFxQixHQUF1QixJQUFJLFlBQVksRUFBUSxDQUFDO1FBRS9FOzs7O1dBSUc7UUFDTyxpQkFBWSxHQUF1QixJQUFJLFlBQVksRUFBUSxDQUFDO0lBRXRCLENBQUM7SUFFakQsUUFBUTtRQUNO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OztZQVJqRyxTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGVBQWU7YUFDMUI7OztZQU5RLGVBQWU7Ozt3QkFpQnJCLEtBQUs7K0JBUUwsS0FBSzs2QkFLTCxLQUFLO2tDQUtMLEtBQUs7a0JBS0wsS0FBSztxQkFLTCxLQUFLO3lCQUtMLE1BQU07b0NBS04sTUFBTTsyQkFPTixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgT25Jbml0LCBPdXRwdXQsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQgeyBLbWxMYXllck1hbmFnZXIgfSBmcm9tICcuLy4uL3NlcnZpY2VzL21hbmFnZXJzL2ttbC1sYXllci1tYW5hZ2VyJztcclxuXHJcbmxldCBsYXllcklkID0gMDtcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnYWdtLWttbC1sYXllcicsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBZ21LbWxMYXllciBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBPbkNoYW5nZXMge1xyXG4gIHByaXZhdGUgX2FkZGVkVG9NYW5hZ2VyID0gZmFsc2U7XHJcbiAgcHJpdmF0ZSBfaWQ6IHN0cmluZyA9IChsYXllcklkKyspLnRvU3RyaW5nKCk7XHJcbiAgcHJpdmF0ZSBfc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcclxuICBwcml2YXRlIHN0YXRpYyBfa21sTGF5ZXJPcHRpb25zOiBzdHJpbmdbXSA9XHJcbiAgICAgIFsnY2xpY2thYmxlJywgJ3ByZXNlcnZlVmlld3BvcnQnLCAnc2NyZWVuT3ZlcmxheXMnLCAnc3VwcHJlc3NJbmZvV2luZG93cycsICd1cmwnLCAnekluZGV4J107XHJcblxyXG4gIC8qKlxyXG4gICAqIElmIHRydWUsIHRoZSBsYXllciByZWNlaXZlcyBtb3VzZSBldmVudHMuIERlZmF1bHQgdmFsdWUgaXMgdHJ1ZS5cclxuICAgKi9cclxuICBASW5wdXQoKSBjbGlja2FibGUgPSB0cnVlO1xyXG5cclxuICAvKipcclxuICAgKiBCeSBkZWZhdWx0LCB0aGUgaW5wdXQgbWFwIGlzIGNlbnRlcmVkIGFuZCB6b29tZWQgdG8gdGhlIGJvdW5kaW5nIGJveCBvZiB0aGUgY29udGVudHMgb2YgdGhlXHJcbiAgICogbGF5ZXIuXHJcbiAgICogSWYgdGhpcyBvcHRpb24gaXMgc2V0IHRvIHRydWUsIHRoZSB2aWV3cG9ydCBpcyBsZWZ0IHVuY2hhbmdlZCwgdW5sZXNzIHRoZSBtYXAncyBjZW50ZXIgYW5kIHpvb21cclxuICAgKiB3ZXJlIG5ldmVyIHNldC5cclxuICAgKi9cclxuICBASW5wdXQoKSBwcmVzZXJ2ZVZpZXdwb3J0ID0gZmFsc2U7XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZXRoZXIgdG8gcmVuZGVyIHRoZSBzY3JlZW4gb3ZlcmxheXMuIERlZmF1bHQgdHJ1ZS5cclxuICAgKi9cclxuICBASW5wdXQoKSBzY3JlZW5PdmVybGF5cyA9IHRydWU7XHJcblxyXG4gIC8qKlxyXG4gICAqIFN1cHByZXNzIHRoZSByZW5kZXJpbmcgb2YgaW5mbyB3aW5kb3dzIHdoZW4gbGF5ZXIgZmVhdHVyZXMgYXJlIGNsaWNrZWQuXHJcbiAgICovXHJcbiAgQElucHV0KCkgc3VwcHJlc3NJbmZvV2luZG93cyA9IGZhbHNlO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgVVJMIG9mIHRoZSBLTUwgZG9jdW1lbnQgdG8gZGlzcGxheS5cclxuICAgKi9cclxuICBASW5wdXQoKSB1cmw6IHN0cmluZyA9IG51bGw7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSB6LWluZGV4IG9mIHRoZSBsYXllci5cclxuICAgKi9cclxuICBASW5wdXQoKSB6SW5kZXg6IG51bWJlciB8IG51bGwgPSBudWxsO1xyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gYSBmZWF0dXJlIGluIHRoZSBsYXllciBpcyBjbGlja2VkLlxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBsYXllckNsaWNrOiBFdmVudEVtaXR0ZXI8Z29vZ2xlLm1hcHMuS21sTW91c2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPGdvb2dsZS5tYXBzLkttbE1vdXNlRXZlbnQ+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgS01MIGxheWVycyBkZWZhdWx0IHZpZXdwb3J0IGhhcyBjaGFuZ2VkLlxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBkZWZhdWx0Vmlld3BvcnRDaGFuZ2U6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSBLTUwgbGF5ZXIgaGFzIGZpbmlzaGVkIGxvYWRpbmcuXHJcbiAgICogQXQgdGhpcyBwb2ludCBpdCBpcyBzYWZlIHRvIHJlYWQgdGhlIHN0YXR1cyBwcm9wZXJ0eSB0byBkZXRlcm1pbmUgaWYgdGhlIGxheWVyIGxvYWRlZFxyXG4gICAqIHN1Y2Nlc3NmdWxseS5cclxuICAgKi9cclxuICBAT3V0cHV0KCkgc3RhdHVzQ2hhbmdlOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX21hbmFnZXI6IEttbExheWVyTWFuYWdlcikge31cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICBpZiAodGhpcy5fYWRkZWRUb01hbmFnZXIpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdGhpcy5fbWFuYWdlci5hZGRLbWxMYXllcih0aGlzKTtcclxuICAgIHRoaXMuX2FkZGVkVG9NYW5hZ2VyID0gdHJ1ZTtcclxuICAgIHRoaXMuX2FkZEV2ZW50TGlzdGVuZXJzKCk7XHJcbiAgfVxyXG5cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XHJcbiAgICBpZiAoIXRoaXMuX2FkZGVkVG9NYW5hZ2VyKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHRoaXMuX3VwZGF0ZVBvbHlnb25PcHRpb25zKGNoYW5nZXMpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfdXBkYXRlUG9seWdvbk9wdGlvbnMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xyXG4gICAgY29uc3Qgb3B0aW9ucyA9IE9iamVjdC5rZXlzKGNoYW5nZXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maWx0ZXIoayA9PiBBZ21LbWxMYXllci5fa21sTGF5ZXJPcHRpb25zLmluZGV4T2YoaykgIT09IC0xKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVkdWNlKChvYmo6IGFueSwgazogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqW2tdID0gY2hhbmdlc1trXS5jdXJyZW50VmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9iajtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwge30pO1xyXG4gICAgaWYgKE9iamVjdC5rZXlzKG9wdGlvbnMpLmxlbmd0aCA+IDApIHtcclxuICAgICAgdGhpcy5fbWFuYWdlci5zZXRPcHRpb25zKHRoaXMsIG9wdGlvbnMpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfYWRkRXZlbnRMaXN0ZW5lcnMoKSB7XHJcbiAgICBjb25zdCBsaXN0ZW5lcnMgPSBbXHJcbiAgICAgIHtuYW1lOiAnY2xpY2snLCBoYW5kbGVyOiAoZXY6IGdvb2dsZS5tYXBzLkttbE1vdXNlRXZlbnQpID0+IHRoaXMubGF5ZXJDbGljay5lbWl0KGV2KX0sXHJcbiAgICAgIHtuYW1lOiAnZGVmYXVsdHZpZXdwb3J0X2NoYW5nZWQnLCBoYW5kbGVyOiAoKSA9PiB0aGlzLmRlZmF1bHRWaWV3cG9ydENoYW5nZS5lbWl0KCl9LFxyXG4gICAgICB7bmFtZTogJ3N0YXR1c19jaGFuZ2VkJywgaGFuZGxlcjogKCkgPT4gdGhpcy5zdGF0dXNDaGFuZ2UuZW1pdCgpfSxcclxuICAgIF07XHJcbiAgICBsaXN0ZW5lcnMuZm9yRWFjaCgob2JqKSA9PiB7XHJcbiAgICAgIGNvbnN0IG9zID0gdGhpcy5fbWFuYWdlci5jcmVhdGVFdmVudE9ic2VydmFibGUob2JqLm5hbWUsIHRoaXMpLnN1YnNjcmliZShvYmouaGFuZGxlcik7XHJcbiAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMucHVzaChvcyk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKiBAaW50ZXJuYWwgKi9cclxuICBpZCgpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5faWQ7IH1cclxuXHJcbiAgLyoqIEBpbnRlcm5hbCAqL1xyXG4gIHRvU3RyaW5nKCk6IHN0cmluZyB7IHJldHVybiBgQWdtS21sTGF5ZXItJHt0aGlzLl9pZC50b1N0cmluZygpfWA7IH1cclxuXHJcbiAgLyoqIEBpbnRlcm5hbCAqL1xyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgdGhpcy5fbWFuYWdlci5kZWxldGVLbWxMYXllcih0aGlzKTtcclxuICAgIC8vIHVuc3Vic2NyaWJlIGFsbCByZWdpc3RlcmVkIG9ic2VydmFibGUgc3Vic2NyaXB0aW9uc1xyXG4gICAgdGhpcy5fc3Vic2NyaXB0aW9ucy5mb3JFYWNoKHMgPT4gcy51bnN1YnNjcmliZSgpKTtcclxuICB9XHJcbn1cclxuIl19