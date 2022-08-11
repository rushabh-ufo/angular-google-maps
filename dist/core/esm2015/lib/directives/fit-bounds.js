import { Directive, Input, Self } from '@angular/core';
import { Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { FitBoundsAccessor, FitBoundsService } from '../services/fit-bounds';
/**
 * Adds the given directive to the auto fit bounds feature when the value is true.
 * To make it work with you custom AGM component, you also have to implement the {@link FitBoundsAccessor} abstract class.
 * @example
 * <agm-marker [agmFitBounds]="true"></agm-marker>
 */
export class AgmFitBounds {
    constructor(_fitBoundsAccessor, _fitBoundsService) {
        this._fitBoundsAccessor = _fitBoundsAccessor;
        this._fitBoundsService = _fitBoundsService;
        /**
         * If the value is true, the element gets added to the bounds of the map.
         * Default: true.
         */
        this.agmFitBounds = true;
        this._destroyed$ = new Subject();
        this._latestFitBoundsDetails = null;
    }
    /**
     * @internal
     */
    ngOnChanges() {
        this._updateBounds();
    }
    /**
     * @internal
     */
    ngOnInit() {
        this._fitBoundsAccessor
            .getFitBoundsDetails$()
            .pipe(distinctUntilChanged((x, y) => x.latLng.lat === y.latLng.lat && x.latLng.lng === y.latLng.lng), takeUntil(this._destroyed$))
            .subscribe(details => this._updateBounds(details));
    }
    /*
     Either the location changed, or visible status changed.
     Possible state changes are
     invisible -> visible
     visible -> invisible
     visible -> visible (new location)
    */
    _updateBounds(newFitBoundsDetails) {
        // either visibility will change, or location, so remove the old one anyway
        if (this._latestFitBoundsDetails) {
            this._fitBoundsService.removeFromBounds(this._latestFitBoundsDetails.latLng);
            // don't set latestFitBoundsDetails to null, because we can toggle visibility from
            // true -> false -> true, in which case we still need old value cached here
        }
        if (newFitBoundsDetails) {
            this._latestFitBoundsDetails = newFitBoundsDetails;
        }
        if (!this._latestFitBoundsDetails) {
            return;
        }
        if (this.agmFitBounds === true) {
            this._fitBoundsService.addToBounds(this._latestFitBoundsDetails.latLng);
        }
    }
    /**
     * @internal
     */
    ngOnDestroy() {
        this._destroyed$.next();
        this._destroyed$.complete();
        if (this._latestFitBoundsDetails !== null) {
            this._fitBoundsService.removeFromBounds(this._latestFitBoundsDetails.latLng);
        }
    }
}
AgmFitBounds.decorators = [
    { type: Directive, args: [{
                selector: '[agmFitBounds]',
            },] }
];
AgmFitBounds.ctorParameters = () => [
    { type: FitBoundsAccessor, decorators: [{ type: Self }] },
    { type: FitBoundsService }
];
AgmFitBounds.propDecorators = {
    agmFitBounds: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZml0LWJvdW5kcy5qcyIsInNvdXJjZVJvb3QiOiJEOi9BdXRvbWF0aW9uL2FuZ3VsYXItZ29vZ2xlLW1hcHMvcGFja2FnZXMvY29yZS9zcmMvIiwic291cmNlcyI6WyJsaWIvZGlyZWN0aXZlcy9maXQtYm91bmRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFnQyxJQUFJLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDckYsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvQixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFakUsT0FBTyxFQUFFLGlCQUFpQixFQUFvQixnQkFBZ0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRS9GOzs7OztHQUtHO0FBSUgsTUFBTSxPQUFPLFlBQVk7SUFVdkIsWUFDMkIsa0JBQXFDLEVBQzdDLGlCQUFtQztRQUQzQix1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW1CO1FBQzdDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFYdEQ7OztXQUdHO1FBQ00saUJBQVksR0FBRyxJQUFJLENBQUM7UUFFckIsZ0JBQVcsR0FBa0IsSUFBSSxPQUFPLEVBQVEsQ0FBQztRQUNqRCw0QkFBdUIsR0FBNEIsSUFBSSxDQUFDO0lBSzdELENBQUM7SUFFSjs7T0FFRztJQUNILFdBQVc7UUFDVCxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUVEOztPQUVHO0lBQ0gsUUFBUTtRQUNOLElBQUksQ0FBQyxrQkFBa0I7YUFDcEIsb0JBQW9CLEVBQUU7YUFDdEIsSUFBSSxDQUNILG9CQUFvQixDQUNsQixDQUFDLENBQW1CLEVBQUUsQ0FBbUIsRUFBRSxFQUFFLENBQzNDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUNqRSxFQUNELFNBQVMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQzVCO2FBQ0EsU0FBUyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFFRDs7Ozs7O01BTUU7SUFDTSxhQUFhLENBQUMsbUJBQXNDO1FBQzFELDJFQUEyRTtRQUMzRSxJQUFJLElBQUksQ0FBQyx1QkFBdUIsRUFBRTtZQUNoQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzdFLGtGQUFrRjtZQUNsRiwyRUFBMkU7U0FDNUU7UUFFRCxJQUFJLG1CQUFtQixFQUFFO1lBQ3ZCLElBQUksQ0FBQyx1QkFBdUIsR0FBRyxtQkFBbUIsQ0FBQztTQUNwRDtRQUNELElBQUksQ0FBQyxJQUFJLENBQUMsdUJBQXVCLEVBQUU7WUFDakMsT0FBTztTQUNSO1FBQ0QsSUFBSSxJQUFJLENBQUMsWUFBWSxLQUFLLElBQUksRUFBRTtZQUM5QixJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUN6RTtJQUNILENBQUM7SUFFRDs7T0FFRztJQUNILFdBQVc7UUFDVCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDNUIsSUFBSSxJQUFJLENBQUMsdUJBQXVCLEtBQUssSUFBSSxFQUFFO1lBQ3pDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDOUU7SUFDSCxDQUFDOzs7WUE1RUYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxnQkFBZ0I7YUFDM0I7OztZQVZRLGlCQUFpQix1QkFzQnJCLElBQUk7WUF0QnFDLGdCQUFnQjs7OzJCQWdCM0QsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIE9uQ2hhbmdlcywgT25EZXN0cm95LCBPbkluaXQsIFNlbGYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBkaXN0aW5jdFVudGlsQ2hhbmdlZCwgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuaW1wb3J0IHsgRml0Qm91bmRzQWNjZXNzb3IsIEZpdEJvdW5kc0RldGFpbHMsIEZpdEJvdW5kc1NlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9maXQtYm91bmRzJztcclxuXHJcbi8qKlxyXG4gKiBBZGRzIHRoZSBnaXZlbiBkaXJlY3RpdmUgdG8gdGhlIGF1dG8gZml0IGJvdW5kcyBmZWF0dXJlIHdoZW4gdGhlIHZhbHVlIGlzIHRydWUuXHJcbiAqIFRvIG1ha2UgaXQgd29yayB3aXRoIHlvdSBjdXN0b20gQUdNIGNvbXBvbmVudCwgeW91IGFsc28gaGF2ZSB0byBpbXBsZW1lbnQgdGhlIHtAbGluayBGaXRCb3VuZHNBY2Nlc3Nvcn0gYWJzdHJhY3QgY2xhc3MuXHJcbiAqIEBleGFtcGxlXHJcbiAqIDxhZ20tbWFya2VyIFthZ21GaXRCb3VuZHNdPVwidHJ1ZVwiPjwvYWdtLW1hcmtlcj5cclxuICovXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW2FnbUZpdEJvdW5kc10nLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgQWdtRml0Qm91bmRzIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIE9uQ2hhbmdlcyB7XHJcbiAgLyoqXHJcbiAgICogSWYgdGhlIHZhbHVlIGlzIHRydWUsIHRoZSBlbGVtZW50IGdldHMgYWRkZWQgdG8gdGhlIGJvdW5kcyBvZiB0aGUgbWFwLlxyXG4gICAqIERlZmF1bHQ6IHRydWUuXHJcbiAgICovXHJcbiAgQElucHV0KCkgYWdtRml0Qm91bmRzID0gdHJ1ZTtcclxuXHJcbiAgcHJpdmF0ZSBfZGVzdHJveWVkJDogU3ViamVjdDx2b2lkPiA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XHJcbiAgcHJpdmF0ZSBfbGF0ZXN0Rml0Qm91bmRzRGV0YWlsczogRml0Qm91bmRzRGV0YWlscyB8IG51bGwgPSBudWxsO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIEBTZWxmKCkgcHJpdmF0ZSByZWFkb25seSBfZml0Qm91bmRzQWNjZXNzb3I6IEZpdEJvdW5kc0FjY2Vzc29yLFxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfZml0Qm91bmRzU2VydmljZTogRml0Qm91bmRzU2VydmljZSxcclxuICApIHt9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIG5nT25DaGFuZ2VzKCkge1xyXG4gICAgdGhpcy5fdXBkYXRlQm91bmRzKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMuX2ZpdEJvdW5kc0FjY2Vzc29yXHJcbiAgICAgIC5nZXRGaXRCb3VuZHNEZXRhaWxzJCgpXHJcbiAgICAgIC5waXBlKFxyXG4gICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKFxyXG4gICAgICAgICAgKHg6IEZpdEJvdW5kc0RldGFpbHMsIHk6IEZpdEJvdW5kc0RldGFpbHMpID0+XHJcbiAgICAgICAgICAgIHgubGF0TG5nLmxhdCA9PT0geS5sYXRMbmcubGF0ICYmIHgubGF0TG5nLmxuZyA9PT0geS5sYXRMbmcubG5nLFxyXG4gICAgICAgICksXHJcbiAgICAgICAgdGFrZVVudGlsKHRoaXMuX2Rlc3Ryb3llZCQpLFxyXG4gICAgICApXHJcbiAgICAgIC5zdWJzY3JpYmUoZGV0YWlscyA9PiB0aGlzLl91cGRhdGVCb3VuZHMoZGV0YWlscykpO1xyXG4gIH1cclxuXHJcbiAgLypcclxuICAgRWl0aGVyIHRoZSBsb2NhdGlvbiBjaGFuZ2VkLCBvciB2aXNpYmxlIHN0YXR1cyBjaGFuZ2VkLlxyXG4gICBQb3NzaWJsZSBzdGF0ZSBjaGFuZ2VzIGFyZVxyXG4gICBpbnZpc2libGUgLT4gdmlzaWJsZVxyXG4gICB2aXNpYmxlIC0+IGludmlzaWJsZVxyXG4gICB2aXNpYmxlIC0+IHZpc2libGUgKG5ldyBsb2NhdGlvbilcclxuICAqL1xyXG4gIHByaXZhdGUgX3VwZGF0ZUJvdW5kcyhuZXdGaXRCb3VuZHNEZXRhaWxzPzogRml0Qm91bmRzRGV0YWlscykge1xyXG4gICAgLy8gZWl0aGVyIHZpc2liaWxpdHkgd2lsbCBjaGFuZ2UsIG9yIGxvY2F0aW9uLCBzbyByZW1vdmUgdGhlIG9sZCBvbmUgYW55d2F5XHJcbiAgICBpZiAodGhpcy5fbGF0ZXN0Rml0Qm91bmRzRGV0YWlscykge1xyXG4gICAgICB0aGlzLl9maXRCb3VuZHNTZXJ2aWNlLnJlbW92ZUZyb21Cb3VuZHModGhpcy5fbGF0ZXN0Rml0Qm91bmRzRGV0YWlscy5sYXRMbmcpO1xyXG4gICAgICAvLyBkb24ndCBzZXQgbGF0ZXN0Rml0Qm91bmRzRGV0YWlscyB0byBudWxsLCBiZWNhdXNlIHdlIGNhbiB0b2dnbGUgdmlzaWJpbGl0eSBmcm9tXHJcbiAgICAgIC8vIHRydWUgLT4gZmFsc2UgLT4gdHJ1ZSwgaW4gd2hpY2ggY2FzZSB3ZSBzdGlsbCBuZWVkIG9sZCB2YWx1ZSBjYWNoZWQgaGVyZVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChuZXdGaXRCb3VuZHNEZXRhaWxzKSB7XHJcbiAgICAgIHRoaXMuX2xhdGVzdEZpdEJvdW5kc0RldGFpbHMgPSBuZXdGaXRCb3VuZHNEZXRhaWxzO1xyXG4gICAgfVxyXG4gICAgaWYgKCF0aGlzLl9sYXRlc3RGaXRCb3VuZHNEZXRhaWxzKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLmFnbUZpdEJvdW5kcyA9PT0gdHJ1ZSkge1xyXG4gICAgICB0aGlzLl9maXRCb3VuZHNTZXJ2aWNlLmFkZFRvQm91bmRzKHRoaXMuX2xhdGVzdEZpdEJvdW5kc0RldGFpbHMubGF0TG5nKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgdGhpcy5fZGVzdHJveWVkJC5uZXh0KCk7XHJcbiAgICB0aGlzLl9kZXN0cm95ZWQkLmNvbXBsZXRlKCk7XHJcbiAgICBpZiAodGhpcy5fbGF0ZXN0Rml0Qm91bmRzRGV0YWlscyAhPT0gbnVsbCkge1xyXG4gICAgICB0aGlzLl9maXRCb3VuZHNTZXJ2aWNlLnJlbW92ZUZyb21Cb3VuZHModGhpcy5fbGF0ZXN0Rml0Qm91bmRzRGV0YWlscy5sYXRMbmcpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=