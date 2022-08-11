import { Directive, Input } from '@angular/core';
import { LayerManager } from '../services/managers/layer-manager';
let layerId = 0;
/*
 * This directive adds a bicycling layer to a google map instance
 * <agm-bicycling-layer [visible]="true|false"> <agm-bicycling-layer>
 * */
export class AgmBicyclingLayer {
    constructor(_manager) {
        this._manager = _manager;
        this._addedToManager = false;
        this._id = (layerId++).toString();
        /**
         * Hide/show bicycling layer
         */
        this.visible = true;
    }
    ngOnInit() {
        if (this._addedToManager) {
            return;
        }
        this._manager.addBicyclingLayer(this);
        this._addedToManager = true;
    }
    /** @internal */
    id() { return this._id; }
    /** @internal */
    toString() { return `AgmBicyclingLayer-${this._id.toString()}`; }
    /** @internal */
    ngOnDestroy() {
        this._manager.deleteLayer(this);
    }
}
AgmBicyclingLayer.decorators = [
    { type: Directive, args: [{
                selector: 'agm-bicycling-layer',
            },] }
];
AgmBicyclingLayer.ctorParameters = () => [
    { type: LayerManager }
];
AgmBicyclingLayer.propDecorators = {
    visible: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmljeWNsaW5nLWxheWVyLmpzIiwic291cmNlUm9vdCI6IkQ6L0F1dG9tYXRpb24vYW5ndWxhci1nb29nbGUtbWFwcy9wYWNrYWdlcy9jb3JlL3NyYy8iLCJzb3VyY2VzIjpbImxpYi9kaXJlY3RpdmVzL2JpY3ljbGluZy1sYXllci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBcUIsTUFBTSxlQUFlLENBQUM7QUFDcEUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBRWxFLElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQztBQUVoQjs7O0tBR0s7QUFJTCxNQUFNLE9BQU8saUJBQWlCO0lBUzFCLFlBQXFCLFFBQXNCO1FBQXRCLGFBQVEsR0FBUixRQUFRLENBQWM7UUFSbkMsb0JBQWUsR0FBRyxLQUFLLENBQUM7UUFDeEIsUUFBRyxHQUFXLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUU3Qzs7V0FFRztRQUNNLFlBQU8sR0FBRyxJQUFJLENBQUM7SUFFdUIsQ0FBQztJQUVoRCxRQUFRO1FBQ0osSUFBSSxJQUFJLENBQUMsZUFBZSxFQUFFO1lBQ3RCLE9BQU87U0FDVjtRQUNELElBQUksQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdEMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7SUFDaEMsQ0FBQztJQUVELGdCQUFnQjtJQUNoQixFQUFFLEtBQWEsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUVqQyxnQkFBZ0I7SUFDaEIsUUFBUSxLQUFhLE9BQU8scUJBQXFCLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFFekUsZ0JBQWdCO0lBQ2hCLFdBQVc7UUFDUCxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNwQyxDQUFDOzs7WUEvQkosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxxQkFBcUI7YUFDbEM7OztZQVZRLFlBQVk7OztzQkFrQmhCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBMYXllck1hbmFnZXIgfSBmcm9tICcuLi9zZXJ2aWNlcy9tYW5hZ2Vycy9sYXllci1tYW5hZ2VyJztcclxuXHJcbmxldCBsYXllcklkID0gMDtcclxuXHJcbi8qXHJcbiAqIFRoaXMgZGlyZWN0aXZlIGFkZHMgYSBiaWN5Y2xpbmcgbGF5ZXIgdG8gYSBnb29nbGUgbWFwIGluc3RhbmNlXHJcbiAqIDxhZ20tYmljeWNsaW5nLWxheWVyIFt2aXNpYmxlXT1cInRydWV8ZmFsc2VcIj4gPGFnbS1iaWN5Y2xpbmctbGF5ZXI+XHJcbiAqICovXHJcbkBEaXJlY3RpdmUoe1xyXG4gICAgc2VsZWN0b3I6ICdhZ20tYmljeWNsaW5nLWxheWVyJyxcclxufSlcclxuZXhwb3J0IGNsYXNzIEFnbUJpY3ljbGluZ0xheWVyIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3l7XHJcbiAgICBwcml2YXRlIF9hZGRlZFRvTWFuYWdlciA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBfaWQ6IHN0cmluZyA9IChsYXllcklkKyspLnRvU3RyaW5nKCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIaWRlL3Nob3cgYmljeWNsaW5nIGxheWVyXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIHZpc2libGUgPSB0cnVlO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCBwcml2YXRlIF9tYW5hZ2VyOiBMYXllck1hbmFnZXIgKSB7fVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9hZGRlZFRvTWFuYWdlcikge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX21hbmFnZXIuYWRkQmljeWNsaW5nTGF5ZXIodGhpcyk7XHJcbiAgICAgICAgdGhpcy5fYWRkZWRUb01hbmFnZXIgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBAaW50ZXJuYWwgKi9cclxuICAgIGlkKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLl9pZDsgfVxyXG5cclxuICAgIC8qKiBAaW50ZXJuYWwgKi9cclxuICAgIHRvU3RyaW5nKCk6IHN0cmluZyB7IHJldHVybiBgQWdtQmljeWNsaW5nTGF5ZXItJHt0aGlzLl9pZC50b1N0cmluZygpfWA7IH1cclxuXHJcbiAgICAvKiogQGludGVybmFsICovXHJcbiAgICBuZ09uRGVzdHJveSgpIHtcclxuICAgICAgICB0aGlzLl9tYW5hZ2VyLmRlbGV0ZUxheWVyKHRoaXMpO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=