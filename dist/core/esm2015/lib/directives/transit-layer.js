import { Directive, Input } from '@angular/core';
import { LayerManager } from '../services/managers/layer-manager';
let layerId = 0;
/*
 * This directive adds a transit layer to a google map instance
 * <agm-transit-layer [visible]="true|false"> <agm-transit-layer>
 * */
export class AgmTransitLayer {
    constructor(_manager) {
        this._manager = _manager;
        this._addedToManager = false;
        this._id = (layerId++).toString();
        /**
         * Hide/show transit layer
         */
        this.visible = true;
    }
    ngOnInit() {
        if (this._addedToManager) {
            return;
        }
        this._manager.addTransitLayer(this);
        this._addedToManager = true;
    }
    /** @internal */
    id() { return this._id; }
    /** @internal */
    toString() { return `AgmTransitLayer-${this._id.toString()}`; }
    /** @internal */
    ngOnDestroy() {
        this._manager.deleteLayer(this);
    }
}
AgmTransitLayer.decorators = [
    { type: Directive, args: [{
                selector: 'agm-transit-layer',
            },] }
];
AgmTransitLayer.ctorParameters = () => [
    { type: LayerManager }
];
AgmTransitLayer.propDecorators = {
    visible: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNpdC1sYXllci5qcyIsInNvdXJjZVJvb3QiOiJEOi9BdXRvbWF0aW9uL2FuZ3VsYXItZ29vZ2xlLW1hcHMvcGFja2FnZXMvY29yZS9zcmMvIiwic291cmNlcyI6WyJsaWIvZGlyZWN0aXZlcy90cmFuc2l0LWxheWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFxQixNQUFNLGVBQWUsQ0FBQztBQUNwRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFFbEUsSUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDO0FBRWhCOzs7S0FHSztBQUlMLE1BQU0sT0FBTyxlQUFlO0lBU3hCLFlBQXFCLFFBQXNCO1FBQXRCLGFBQVEsR0FBUixRQUFRLENBQWM7UUFSbkMsb0JBQWUsR0FBRyxLQUFLLENBQUM7UUFDeEIsUUFBRyxHQUFXLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUU3Qzs7V0FFRztRQUNNLFlBQU8sR0FBRyxJQUFJLENBQUM7SUFFdUIsQ0FBQztJQUVoRCxRQUFRO1FBQ0osSUFBSSxJQUFJLENBQUMsZUFBZSxFQUFFO1lBQ3RCLE9BQU87U0FDVjtRQUNELElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO0lBQ2hDLENBQUM7SUFFRCxnQkFBZ0I7SUFDaEIsRUFBRSxLQUFhLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFFakMsZ0JBQWdCO0lBQ2hCLFFBQVEsS0FBYSxPQUFPLG1CQUFtQixJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBRXZFLGdCQUFnQjtJQUNoQixXQUFXO1FBQ1AsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEMsQ0FBQzs7O1lBL0JKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsbUJBQW1CO2FBQ2hDOzs7WUFWUSxZQUFZOzs7c0JBa0JoQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTGF5ZXJNYW5hZ2VyIH0gZnJvbSAnLi4vc2VydmljZXMvbWFuYWdlcnMvbGF5ZXItbWFuYWdlcic7XHJcblxyXG5sZXQgbGF5ZXJJZCA9IDA7XHJcblxyXG4vKlxyXG4gKiBUaGlzIGRpcmVjdGl2ZSBhZGRzIGEgdHJhbnNpdCBsYXllciB0byBhIGdvb2dsZSBtYXAgaW5zdGFuY2VcclxuICogPGFnbS10cmFuc2l0LWxheWVyIFt2aXNpYmxlXT1cInRydWV8ZmFsc2VcIj4gPGFnbS10cmFuc2l0LWxheWVyPlxyXG4gKiAqL1xyXG5ARGlyZWN0aXZlKHtcclxuICAgIHNlbGVjdG9yOiAnYWdtLXRyYW5zaXQtbGF5ZXInLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgQWdtVHJhbnNpdExheWVyIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3l7XHJcbiAgICBwcml2YXRlIF9hZGRlZFRvTWFuYWdlciA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBfaWQ6IHN0cmluZyA9IChsYXllcklkKyspLnRvU3RyaW5nKCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIaWRlL3Nob3cgdHJhbnNpdCBsYXllclxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSB2aXNpYmxlID0gdHJ1ZTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvciggcHJpdmF0ZSBfbWFuYWdlcjogTGF5ZXJNYW5hZ2VyICkge31cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICBpZiAodGhpcy5fYWRkZWRUb01hbmFnZXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9tYW5hZ2VyLmFkZFRyYW5zaXRMYXllcih0aGlzKTtcclxuICAgICAgICB0aGlzLl9hZGRlZFRvTWFuYWdlciA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIEBpbnRlcm5hbCAqL1xyXG4gICAgaWQoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuX2lkOyB9XHJcblxyXG4gICAgLyoqIEBpbnRlcm5hbCAqL1xyXG4gICAgdG9TdHJpbmcoKTogc3RyaW5nIHsgcmV0dXJuIGBBZ21UcmFuc2l0TGF5ZXItJHt0aGlzLl9pZC50b1N0cmluZygpfWA7IH1cclxuXHJcbiAgICAvKiogQGludGVybmFsICovXHJcbiAgICBuZ09uRGVzdHJveSgpIHtcclxuICAgICAgICB0aGlzLl9tYW5hZ2VyLmRlbGV0ZUxheWVyKHRoaXMpO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=