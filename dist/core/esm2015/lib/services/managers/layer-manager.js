import { Injectable } from '@angular/core';
import { GoogleMapsAPIWrapper } from '../google-maps-api-wrapper';
/**
 * This class manages Transit and Bicycling Layers for a Google Map instance.
 */
export class LayerManager {
    constructor(_wrapper) {
        this._wrapper = _wrapper;
        this._layers = new Map();
    }
    /**
     * Adds a transit layer to a map instance.
     * @param layer - a TransitLayer object
     * @param _options - TransitLayerOptions options
     * @returns void
     */
    addTransitLayer(layer) {
        const newLayer = this._wrapper.createTransitLayer();
        this._layers.set(layer, newLayer);
    }
    /**
     * Adds a bicycling layer to a map instance.
     * @param layer - a bicycling layer object
     * @param _options - BicyclingLayer options
     * @returns void
     */
    addBicyclingLayer(layer) {
        const newLayer = this._wrapper.createBicyclingLayer();
        this._layers.set(layer, newLayer);
    }
    /**
     * Deletes a map layer
     * @param layer - the layer to delete
     */
    deleteLayer(layer) {
        return this._layers.get(layer).then(currentLayer => {
            currentLayer.setMap(null);
            this._layers.delete(layer);
        });
    }
}
LayerManager.decorators = [
    { type: Injectable }
];
LayerManager.ctorParameters = () => [
    { type: GoogleMapsAPIWrapper }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5ZXItbWFuYWdlci5qcyIsInNvdXJjZVJvb3QiOiJEOi9BdXRvbWF0aW9uL2FuZ3VsYXItZ29vZ2xlLW1hcHMvcGFja2FnZXMvY29yZS9zcmMvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvbWFuYWdlcnMvbGF5ZXItbWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRzNDLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBRWxFOztHQUVHO0FBR0gsTUFBTSxPQUFPLFlBQVk7SUFJckIsWUFBb0IsUUFBOEI7UUFBOUIsYUFBUSxHQUFSLFFBQVEsQ0FBc0I7UUFIMUMsWUFBTyxHQUNYLElBQUksR0FBRyxFQUF1RyxDQUFDO0lBRTlELENBQUM7SUFFdEQ7Ozs7O09BS0c7SUFDSCxlQUFlLENBQUMsS0FBc0I7UUFDbEMsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBQ3BELElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxpQkFBaUIsQ0FBQyxLQUF3QjtRQUN0QyxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLG9CQUFvQixFQUFFLENBQUM7UUFDdEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFFRDs7O09BR0c7SUFDSCxXQUFXLENBQUMsS0FBMEM7UUFDbEQsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUU7WUFDL0MsWUFBWSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMxQixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMvQixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7OztZQXRDSixVQUFVOzs7WUFORixvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEFnbUJpY3ljbGluZ0xheWVyIH0gZnJvbSAnLi4vLi4vZGlyZWN0aXZlcy9iaWN5Y2xpbmctbGF5ZXInO1xyXG5pbXBvcnQgeyBBZ21UcmFuc2l0TGF5ZXIgfSBmcm9tICcuLi8uLi9kaXJlY3RpdmVzL3RyYW5zaXQtbGF5ZXInO1xyXG5pbXBvcnQgeyBHb29nbGVNYXBzQVBJV3JhcHBlciB9IGZyb20gJy4uL2dvb2dsZS1tYXBzLWFwaS13cmFwcGVyJztcclxuXHJcbi8qKlxyXG4gKiBUaGlzIGNsYXNzIG1hbmFnZXMgVHJhbnNpdCBhbmQgQmljeWNsaW5nIExheWVycyBmb3IgYSBHb29nbGUgTWFwIGluc3RhbmNlLlxyXG4gKi9cclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIExheWVyTWFuYWdlciB7XHJcbiAgICBwcml2YXRlIF9sYXllcnM6IE1hcDxBZ21UcmFuc2l0TGF5ZXIgfCBBZ21CaWN5Y2xpbmdMYXllciwgUHJvbWlzZTxnb29nbGUubWFwcy5UcmFuc2l0TGF5ZXIgfCBnb29nbGUubWFwcy5CaWN5Y2xpbmdMYXllcj4+ID1cclxuICAgICAgICBuZXcgTWFwPEFnbVRyYW5zaXRMYXllciB8IEFnbUJpY3ljbGluZ0xheWVyLCBQcm9taXNlPGdvb2dsZS5tYXBzLlRyYW5zaXRMYXllciB8IGdvb2dsZS5tYXBzLkJpY3ljbGluZ0xheWVyPj4oKTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF93cmFwcGVyOiBHb29nbGVNYXBzQVBJV3JhcHBlcikge31cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgYSB0cmFuc2l0IGxheWVyIHRvIGEgbWFwIGluc3RhbmNlLlxyXG4gICAgICogQHBhcmFtIGxheWVyIC0gYSBUcmFuc2l0TGF5ZXIgb2JqZWN0XHJcbiAgICAgKiBAcGFyYW0gX29wdGlvbnMgLSBUcmFuc2l0TGF5ZXJPcHRpb25zIG9wdGlvbnNcclxuICAgICAqIEByZXR1cm5zIHZvaWRcclxuICAgICAqL1xyXG4gICAgYWRkVHJhbnNpdExheWVyKGxheWVyOiBBZ21UcmFuc2l0TGF5ZXIpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBuZXdMYXllciA9IHRoaXMuX3dyYXBwZXIuY3JlYXRlVHJhbnNpdExheWVyKCk7XHJcbiAgICAgICAgdGhpcy5fbGF5ZXJzLnNldChsYXllciwgbmV3TGF5ZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBhIGJpY3ljbGluZyBsYXllciB0byBhIG1hcCBpbnN0YW5jZS5cclxuICAgICAqIEBwYXJhbSBsYXllciAtIGEgYmljeWNsaW5nIGxheWVyIG9iamVjdFxyXG4gICAgICogQHBhcmFtIF9vcHRpb25zIC0gQmljeWNsaW5nTGF5ZXIgb3B0aW9uc1xyXG4gICAgICogQHJldHVybnMgdm9pZFxyXG4gICAgICovXHJcbiAgICBhZGRCaWN5Y2xpbmdMYXllcihsYXllcjogQWdtQmljeWNsaW5nTGF5ZXIpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBuZXdMYXllciA9IHRoaXMuX3dyYXBwZXIuY3JlYXRlQmljeWNsaW5nTGF5ZXIoKTtcclxuICAgICAgICB0aGlzLl9sYXllcnMuc2V0KGxheWVyLCBuZXdMYXllcik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWxldGVzIGEgbWFwIGxheWVyXHJcbiAgICAgKiBAcGFyYW0gbGF5ZXIgLSB0aGUgbGF5ZXIgdG8gZGVsZXRlXHJcbiAgICAgKi9cclxuICAgIGRlbGV0ZUxheWVyKGxheWVyOiBBZ21UcmFuc2l0TGF5ZXIgfCBBZ21CaWN5Y2xpbmdMYXllcik6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9sYXllcnMuZ2V0KGxheWVyKS50aGVuKGN1cnJlbnRMYXllciA9PiB7XHJcbiAgICAgICAgICAgIGN1cnJlbnRMYXllci5zZXRNYXAobnVsbCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2xheWVycy5kZWxldGUobGF5ZXIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==