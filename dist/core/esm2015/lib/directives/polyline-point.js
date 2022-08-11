import { Directive, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { map, startWith } from 'rxjs/operators';
import { FitBoundsAccessor } from '../services/fit-bounds';
/**
 * AgmPolylinePoint represents one element of a polyline within a  {@link
 * AgmPolyline}
 */
export class AgmPolylinePoint {
    constructor() {
        /**
         * This event emitter gets emitted when the position of the point changed.
         */
        this.positionChanged = new EventEmitter();
    }
    ngOnChanges(changes) {
        // tslint:disable: no-string-literal
        if (changes['latitude'] || changes['longitude']) {
            this.positionChanged.emit({
                lat: changes['latitude'] ? changes['latitude'].currentValue : this.latitude,
                lng: changes['longitude'] ? changes['longitude'].currentValue : this.longitude,
            });
        }
        // tslint:enable: no-string-literal
    }
    /** @internal */
    getFitBoundsDetails$() {
        return this.positionChanged.pipe(startWith({ lat: this.latitude, lng: this.longitude }), map(position => ({ latLng: position })));
    }
}
AgmPolylinePoint.decorators = [
    { type: Directive, args: [{
                selector: 'agm-polyline-point',
                providers: [
                    { provide: FitBoundsAccessor, useExisting: forwardRef(() => AgmPolylinePoint) },
                ],
            },] }
];
AgmPolylinePoint.ctorParameters = () => [];
AgmPolylinePoint.propDecorators = {
    latitude: [{ type: Input }],
    longitude: [{ type: Input }],
    positionChanged: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9seWxpbmUtcG9pbnQuanMiLCJzb3VyY2VSb290IjoiRDovQXV0b21hdGlvbi9hbmd1bGFyLWdvb2dsZS1tYXBzL3BhY2thZ2VzL2NvcmUvc3JjLyIsInNvdXJjZXMiOlsibGliL2RpcmVjdGl2ZXMvcG9seWxpbmUtcG9pbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBYSxNQUFNLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBRTdHLE9BQU8sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDaEQsT0FBTyxFQUFFLGlCQUFpQixFQUFvQixNQUFNLHdCQUF3QixDQUFDO0FBRTdFOzs7R0FHRztBQU9ILE1BQU0sT0FBTyxnQkFBZ0I7SUFnQjNCO1FBTEE7O1dBRUc7UUFDTyxvQkFBZSxHQUE0QyxJQUFJLFlBQVksRUFBNkIsQ0FBQztJQUVwRyxDQUFDO0lBRWhCLFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyxvQ0FBb0M7UUFDcEMsSUFBSSxPQUFPLENBQUMsVUFBVSxDQUFDLElBQUksT0FBTyxDQUFDLFdBQVcsQ0FBQyxFQUFFO1lBQy9DLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDO2dCQUN4QixHQUFHLEVBQUUsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUTtnQkFDM0UsR0FBRyxFQUFFLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVM7YUFDL0UsQ0FBQyxDQUFDO1NBQ0o7UUFDRCxtQ0FBbUM7SUFDckMsQ0FBQztJQUVELGdCQUFnQjtJQUNoQixvQkFBb0I7UUFDbEIsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FDOUIsU0FBUyxDQUFDLEVBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUMsQ0FBQyxFQUNwRCxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsTUFBTSxFQUFFLFFBQVEsRUFBQyxDQUFDLENBQUMsQ0FDdEMsQ0FBQztJQUNKLENBQUM7OztZQXpDRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLG9CQUFvQjtnQkFDOUIsU0FBUyxFQUFFO29CQUNULEVBQUMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsZ0JBQWdCLENBQUMsRUFBQztpQkFDOUU7YUFDRjs7Ozt1QkFLRSxLQUFLO3dCQUtMLEtBQUs7OEJBS0wsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRXZlbnRFbWl0dGVyLCBmb3J3YXJkUmVmLCBJbnB1dCwgT25DaGFuZ2VzLCBPdXRwdXQsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBtYXAsIHN0YXJ0V2l0aCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgRml0Qm91bmRzQWNjZXNzb3IsIEZpdEJvdW5kc0RldGFpbHMgfSBmcm9tICcuLi9zZXJ2aWNlcy9maXQtYm91bmRzJztcclxuXHJcbi8qKlxyXG4gKiBBZ21Qb2x5bGluZVBvaW50IHJlcHJlc2VudHMgb25lIGVsZW1lbnQgb2YgYSBwb2x5bGluZSB3aXRoaW4gYSAge0BsaW5rXHJcbiAqIEFnbVBvbHlsaW5lfVxyXG4gKi9cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdhZ20tcG9seWxpbmUtcG9pbnQnLFxyXG4gIHByb3ZpZGVyczogW1xyXG4gICAge3Byb3ZpZGU6IEZpdEJvdW5kc0FjY2Vzc29yLCB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBBZ21Qb2x5bGluZVBvaW50KX0sXHJcbiAgXSxcclxufSlcclxuZXhwb3J0IGNsYXNzIEFnbVBvbHlsaW5lUG9pbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMsIEZpdEJvdW5kc0FjY2Vzc29yIHtcclxuICAvKipcclxuICAgKiBUaGUgbGF0aXR1ZGUgcG9zaXRpb24gb2YgdGhlIHBvaW50LlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBsYXRpdHVkZTogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgbG9uZ2l0dWRlIHBvc2l0aW9uIG9mIHRoZSBwb2ludDtcclxuICAgKi9cclxuICBASW5wdXQoKSBwdWJsaWMgbG9uZ2l0dWRlOiBudW1iZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgZXZlbnQgZW1pdHRlciBnZXRzIGVtaXR0ZWQgd2hlbiB0aGUgcG9zaXRpb24gb2YgdGhlIHBvaW50IGNoYW5nZWQuXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIHBvc2l0aW9uQ2hhbmdlZDogRXZlbnRFbWl0dGVyPGdvb2dsZS5tYXBzLkxhdExuZ0xpdGVyYWw+ID0gbmV3IEV2ZW50RW1pdHRlcjxnb29nbGUubWFwcy5MYXRMbmdMaXRlcmFsPigpO1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHt9XHJcblxyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiBhbnkge1xyXG4gICAgLy8gdHNsaW50OmRpc2FibGU6IG5vLXN0cmluZy1saXRlcmFsXHJcbiAgICBpZiAoY2hhbmdlc1snbGF0aXR1ZGUnXSB8fCBjaGFuZ2VzWydsb25naXR1ZGUnXSkge1xyXG4gICAgICB0aGlzLnBvc2l0aW9uQ2hhbmdlZC5lbWl0KHtcclxuICAgICAgICBsYXQ6IGNoYW5nZXNbJ2xhdGl0dWRlJ10gPyBjaGFuZ2VzWydsYXRpdHVkZSddLmN1cnJlbnRWYWx1ZSA6IHRoaXMubGF0aXR1ZGUsXHJcbiAgICAgICAgbG5nOiBjaGFuZ2VzWydsb25naXR1ZGUnXSA/IGNoYW5nZXNbJ2xvbmdpdHVkZSddLmN1cnJlbnRWYWx1ZSA6IHRoaXMubG9uZ2l0dWRlLFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIC8vIHRzbGludDplbmFibGU6IG5vLXN0cmluZy1saXRlcmFsXHJcbiAgfVxyXG5cclxuICAvKiogQGludGVybmFsICovXHJcbiAgZ2V0Rml0Qm91bmRzRGV0YWlscyQoKTogT2JzZXJ2YWJsZTxGaXRCb3VuZHNEZXRhaWxzPiB7XHJcbiAgICByZXR1cm4gdGhpcy5wb3NpdGlvbkNoYW5nZWQucGlwZShcclxuICAgICAgc3RhcnRXaXRoKHtsYXQ6IHRoaXMubGF0aXR1ZGUsIGxuZzogdGhpcy5sb25naXR1ZGV9KSxcclxuICAgICAgbWFwKHBvc2l0aW9uID0+ICh7bGF0TG5nOiBwb3NpdGlvbn0pKVxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuIl19