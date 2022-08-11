import { Directive, EventEmitter, Input, Output, } from '@angular/core';
import { RectangleManager } from '../services/managers/rectangle-manager';
export class AgmRectangle {
    constructor(_manager) {
        this._manager = _manager;
        /**
         * Indicates whether this Rectangle handles mouse events. Defaults to true.
         */
        this.clickable = true;
        /**
         * If set to true, the user can drag this rectangle over the map. Defaults to false.
         */
        // tslint:disable-next-line:no-input-rename
        this.draggable = false;
        /**
         * If set to true, the user can edit this rectangle by dragging the control points shown at
         * the center and around the circumference of the rectangle. Defaults to false.
         */
        this.editable = false;
        /**
         * The stroke position. Defaults to CENTER.
         * This property is not supported on Internet Explorer 8 and earlier.
         */
        this.strokePosition = 'CENTER';
        /**
         * The stroke width in pixels.
         */
        this.strokeWeight = 0;
        /**
         * Whether this rectangle is visible on the map. Defaults to true.
         */
        this.visible = true;
        /**
         * This event is fired when the rectangle's is changed.
         */
        this.boundsChange = new EventEmitter();
        /**
         * This event emitter gets emitted when the user clicks on the rectangle.
         */
        this.rectangleClick = new EventEmitter();
        /**
         * This event emitter gets emitted when the user clicks on the rectangle.
         */
        this.rectangleDblClick = new EventEmitter();
        /**
         * This event is repeatedly fired while the user drags the rectangle.
         */
        // tslint:disable-next-line: no-output-native
        this.drag = new EventEmitter();
        /**
         * This event is fired when the user stops dragging the rectangle.
         */
        this.dragEnd = new EventEmitter();
        /**
         * This event is fired when the user starts dragging the rectangle.
         */
        this.dragStart = new EventEmitter();
        /**
         * This event is fired when the DOM mousedown event is fired on the rectangle.
         */
        this.mouseDown = new EventEmitter();
        /**
         * This event is fired when the DOM mousemove event is fired on the rectangle.
         */
        this.mouseMove = new EventEmitter();
        /**
         * This event is fired on rectangle mouseout.
         */
        this.mouseOut = new EventEmitter();
        /**
         * This event is fired on rectangle mouseover.
         */
        this.mouseOver = new EventEmitter();
        /**
         * This event is fired when the DOM mouseup event is fired on the rectangle.
         */
        this.mouseUp = new EventEmitter();
        /**
         * This event is fired when the rectangle is right-clicked on.
         */
        this.rightClick = new EventEmitter();
        this._rectangleAddedToManager = false;
        this._eventSubscriptions = [];
    }
    /** @internal */
    ngOnInit() {
        this._manager.addRectangle(this);
        this._rectangleAddedToManager = true;
        this._registerEventListeners();
    }
    /** @internal */
    ngOnChanges(changes) {
        if (!this._rectangleAddedToManager) {
            return;
        }
        // tslint:disable: no-string-literal
        if (changes['north'] ||
            changes['east'] ||
            changes['south'] ||
            changes['west']) {
            this._manager.setBounds(this);
        }
        if (changes['editable']) {
            this._manager.setEditable(this);
        }
        if (changes['draggable']) {
            this._manager.setDraggable(this);
        }
        if (changes['visible']) {
            this._manager.setVisible(this);
        }
        // tslint:enable: no-string-literal
        this._updateRectangleOptionsChanges(changes);
    }
    _updateRectangleOptionsChanges(changes) {
        const options = {};
        const optionKeys = Object.keys(changes).filter(k => AgmRectangle._mapOptions.indexOf(k) !== -1);
        optionKeys.forEach(k => {
            options[k] = changes[k].currentValue;
        });
        if (optionKeys.length > 0) {
            this._manager.setOptions(this, options);
        }
    }
    _registerEventListeners() {
        const events = new Map();
        events.set('bounds_changed', this.boundsChange);
        events.set('click', this.rectangleClick);
        events.set('dblclick', this.rectangleDblClick);
        events.set('drag', this.drag);
        events.set('dragend', this.dragEnd);
        events.set('dragStart', this.dragStart);
        events.set('mousedown', this.mouseDown);
        events.set('mousemove', this.mouseMove);
        events.set('mouseout', this.mouseOut);
        events.set('mouseover', this.mouseOver);
        events.set('mouseup', this.mouseUp);
        events.set('rightclick', this.rightClick);
        events.forEach((eventEmitter, eventName) => {
            this._eventSubscriptions.push(this._manager
                .createEventObservable(eventName, this)
                .subscribe(value => {
                switch (eventName) {
                    case 'bounds_changed':
                        this._manager.getBounds(this).then(bounds => eventEmitter.emit({
                            north: bounds.getNorthEast().lat(),
                            east: bounds.getNorthEast().lng(),
                            south: bounds.getSouthWest().lat(),
                            west: bounds.getSouthWest().lng(),
                        }));
                        break;
                    default:
                        eventEmitter.emit(value);
                }
            }));
        });
    }
    /** @internal */
    ngOnDestroy() {
        this._eventSubscriptions.forEach(s => s.unsubscribe());
        this._eventSubscriptions = null;
        this._manager.removeRectangle(this);
    }
    /**
     * Gets the LatLngBounds of this Rectangle.
     */
    getBounds() {
        return this._manager.getBounds(this);
    }
}
AgmRectangle._mapOptions = [
    'fillColor',
    'fillOpacity',
    'strokeColor',
    'strokeOpacity',
    'strokePosition',
    'strokeWeight',
    'visible',
    'zIndex',
    'clickable',
];
AgmRectangle.decorators = [
    { type: Directive, args: [{
                selector: 'agm-rectangle',
            },] }
];
AgmRectangle.ctorParameters = () => [
    { type: RectangleManager }
];
AgmRectangle.propDecorators = {
    north: [{ type: Input }],
    east: [{ type: Input }],
    south: [{ type: Input }],
    west: [{ type: Input }],
    clickable: [{ type: Input }],
    draggable: [{ type: Input, args: ['rectangleDraggable',] }],
    editable: [{ type: Input }],
    fillColor: [{ type: Input }],
    fillOpacity: [{ type: Input }],
    strokeColor: [{ type: Input }],
    strokeOpacity: [{ type: Input }],
    strokePosition: [{ type: Input }],
    strokeWeight: [{ type: Input }],
    visible: [{ type: Input }],
    zIndex: [{ type: Input }],
    boundsChange: [{ type: Output }],
    rectangleClick: [{ type: Output }],
    rectangleDblClick: [{ type: Output }],
    drag: [{ type: Output }],
    dragEnd: [{ type: Output }],
    dragStart: [{ type: Output }],
    mouseDown: [{ type: Output }],
    mouseMove: [{ type: Output }],
    mouseOut: [{ type: Output }],
    mouseOver: [{ type: Output }],
    mouseUp: [{ type: Output }],
    rightClick: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVjdGFuZ2xlLmpzIiwic291cmNlUm9vdCI6IkQ6L0F1dG9tYXRpb24vYW5ndWxhci1nb29nbGUtbWFwcy9wYWNrYWdlcy9jb3JlL3NyYy8iLCJzb3VyY2VzIjpbImxpYi9kaXJlY3RpdmVzL3JlY3RhbmdsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBSUwsTUFBTSxHQUVQLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBSzFFLE1BQU0sT0FBTyxZQUFZO0lBc0t2QixZQUFvQixRQUEwQjtRQUExQixhQUFRLEdBQVIsUUFBUSxDQUFrQjtRQWpKOUM7O1dBRUc7UUFDTSxjQUFTLEdBQUcsSUFBSSxDQUFDO1FBRTFCOztXQUVHO1FBQ0gsMkNBQTJDO1FBQ2QsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUUvQzs7O1dBR0c7UUFDTSxhQUFRLEdBQUcsS0FBSyxDQUFDO1FBc0IxQjs7O1dBR0c7UUFDTSxtQkFBYyxHQUE0QyxRQUFRLENBQUM7UUFFNUU7O1dBRUc7UUFDTSxpQkFBWSxHQUFHLENBQUMsQ0FBQztRQUUxQjs7V0FFRztRQUNNLFlBQU8sR0FBRyxJQUFJLENBQUM7UUFPeEI7O1dBRUc7UUFFSCxpQkFBWSxHQUFrRCxJQUFJLFlBQVksRUFFM0UsQ0FBQztRQUVKOztXQUVHO1FBRUgsbUJBQWMsR0FBeUMsSUFBSSxZQUFZLEVBQTBCLENBQUM7UUFFbEc7O1dBRUc7UUFFSCxzQkFBaUIsR0FBeUMsSUFBSSxZQUFZLEVBQTBCLENBQUM7UUFFckc7O1dBRUc7UUFDSCw2Q0FBNkM7UUFDbkMsU0FBSSxHQUF5QyxJQUFJLFlBQVksRUFBMEIsQ0FBQztRQUVsRzs7V0FFRztRQUNPLFlBQU8sR0FBeUMsSUFBSSxZQUFZLEVBQTBCLENBQUM7UUFFckc7O1dBRUc7UUFFSCxjQUFTLEdBQXlDLElBQUksWUFBWSxFQUEwQixDQUFDO1FBRTdGOztXQUVHO1FBRUgsY0FBUyxHQUF5QyxJQUFJLFlBQVksRUFBMEIsQ0FBQztRQUU3Rjs7V0FFRztRQUVILGNBQVMsR0FBeUMsSUFBSSxZQUFZLEVBQTBCLENBQUM7UUFFN0Y7O1dBRUc7UUFDTyxhQUFRLEdBQXlDLElBQUksWUFBWSxFQUEwQixDQUFDO1FBRXRHOztXQUVHO1FBRUgsY0FBUyxHQUF5QyxJQUFJLFlBQVksRUFBMEIsQ0FBQztRQUU3Rjs7V0FFRztRQUNPLFlBQU8sR0FBeUMsSUFBSSxZQUFZLEVBQTBCLENBQUM7UUFFckc7O1dBRUc7UUFFSCxlQUFVLEdBQXlDLElBQUksWUFBWSxFQUEwQixDQUFDO1FBRXRGLDZCQUF3QixHQUFHLEtBQUssQ0FBQztRQWNqQyx3QkFBbUIsR0FBbUIsRUFBRSxDQUFDO0lBRUEsQ0FBQztJQUVsRCxnQkFBZ0I7SUFDaEIsUUFBUTtRQUNOLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pDLElBQUksQ0FBQyx3QkFBd0IsR0FBRyxJQUFJLENBQUM7UUFDckMsSUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQUM7SUFDakMsQ0FBQztJQUVELGdCQUFnQjtJQUNoQixXQUFXLENBQUMsT0FBd0M7UUFDbEQsSUFBSSxDQUFDLElBQUksQ0FBQyx3QkFBd0IsRUFBRTtZQUNsQyxPQUFPO1NBQ1I7UUFDRCxvQ0FBb0M7UUFDcEMsSUFDRSxPQUFPLENBQUMsT0FBTyxDQUFDO1lBQ2hCLE9BQU8sQ0FBQyxNQUFNLENBQUM7WUFDZixPQUFPLENBQUMsT0FBTyxDQUFDO1lBQ2hCLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFDZjtZQUNBLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQy9CO1FBQ0QsSUFBSSxPQUFPLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDdkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDakM7UUFDRCxJQUFJLE9BQU8sQ0FBQyxXQUFXLENBQUMsRUFBRTtZQUN4QixJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNsQztRQUNELElBQUksT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFO1lBQ3RCLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ2hDO1FBQ0QsbUNBQW1DO1FBQ25DLElBQUksQ0FBQyw4QkFBOEIsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRU8sOEJBQThCLENBQUMsT0FFdEM7UUFDQyxNQUFNLE9BQU8sR0FBaUMsRUFBRSxDQUFDO1FBQ2pELE1BQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUM1QyxDQUFDLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUNoRCxDQUFDO1FBQ0YsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNyQixPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQztRQUN2QyxDQUFDLENBQUMsQ0FBQztRQUVILElBQUksVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDekIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1NBQ3pDO0lBQ0gsQ0FBQztJQUVPLHVCQUF1QjtRQUM3QixNQUFNLE1BQU0sR0FBbUMsSUFBSSxHQUFHLEVBR25ELENBQUM7UUFDSixNQUFNLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNoRCxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDekMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDL0MsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzlCLE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNwQyxNQUFNLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDeEMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3hDLE1BQU0sQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN4QyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDdEMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3hDLE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNwQyxNQUFNLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFMUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFlBQVksRUFBRSxTQUFTLEVBQUUsRUFBRTtZQUN6QyxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUMzQixJQUFJLENBQUMsUUFBUTtpQkFDVixxQkFBcUIsQ0FBeUIsU0FBUyxFQUFFLElBQUksQ0FBQztpQkFDOUQsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUNqQixRQUFRLFNBQVMsRUFBRTtvQkFDakIsS0FBSyxnQkFBZ0I7d0JBQ25CLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUMxQyxZQUFZLENBQUMsSUFBSSxDQUFDOzRCQUNoQixLQUFLLEVBQUUsTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFDLEdBQUcsRUFBRTs0QkFDbEMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxZQUFZLEVBQUUsQ0FBQyxHQUFHLEVBQUU7NEJBQ2pDLEtBQUssRUFBRSxNQUFNLENBQUMsWUFBWSxFQUFFLENBQUMsR0FBRyxFQUFFOzRCQUNsQyxJQUFJLEVBQUUsTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFDLEdBQUcsRUFBRTt5QkFDQyxDQUFDLENBQ3RDLENBQUM7d0JBQ0YsTUFBTTtvQkFDUjt3QkFDRSxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUM1QjtZQUNILENBQUMsQ0FBQyxDQUNMLENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxnQkFBZ0I7SUFDaEIsV0FBVztRQUNULElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztRQUN2RCxJQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFFRDs7T0FFRztJQUNILFNBQVM7UUFDUCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7O0FBeEhjLHdCQUFXLEdBQWE7SUFDckMsV0FBVztJQUNYLGFBQWE7SUFDYixhQUFhO0lBQ2IsZUFBZTtJQUNmLGdCQUFnQjtJQUNoQixjQUFjO0lBQ2QsU0FBUztJQUNULFFBQVE7SUFDUixXQUFXO0NBQ1osQ0FBQzs7WUFyS0gsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxlQUFlO2FBQzFCOzs7WUFKUSxnQkFBZ0I7OztvQkFTdEIsS0FBSzttQkFLTCxLQUFLO29CQUtMLEtBQUs7bUJBS0wsS0FBSzt3QkFLTCxLQUFLO3dCQU1MLEtBQUssU0FBQyxvQkFBb0I7dUJBTTFCLEtBQUs7d0JBS0wsS0FBSzswQkFLTCxLQUFLOzBCQUtMLEtBQUs7NEJBS0wsS0FBSzs2QkFNTCxLQUFLOzJCQUtMLEtBQUs7c0JBS0wsS0FBSztxQkFLTCxLQUFLOzJCQUtMLE1BQU07NkJBUU4sTUFBTTtnQ0FNTixNQUFNO21CQU9OLE1BQU07c0JBS04sTUFBTTt3QkFLTixNQUFNO3dCQU1OLE1BQU07d0JBTU4sTUFBTTt1QkFNTixNQUFNO3dCQUtOLE1BQU07c0JBTU4sTUFBTTt5QkFLTixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBEaXJlY3RpdmUsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIElucHV0LFxyXG4gIE9uQ2hhbmdlcyxcclxuICBPbkRlc3Ryb3ksXHJcbiAgT25Jbml0LFxyXG4gIE91dHB1dCxcclxuICBTaW1wbGVDaGFuZ2UsXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBSZWN0YW5nbGVNYW5hZ2VyIH0gZnJvbSAnLi4vc2VydmljZXMvbWFuYWdlcnMvcmVjdGFuZ2xlLW1hbmFnZXInO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdhZ20tcmVjdGFuZ2xlJyxcclxufSlcclxuZXhwb3J0IGNsYXNzIEFnbVJlY3RhbmdsZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xyXG4gIC8qKlxyXG4gICAqIFRoZSBub3J0aCBwb3NpdGlvbiBvZiB0aGUgcmVjdGFuZ2xlIChyZXF1aXJlZCkuXHJcbiAgICovXHJcbiAgQElucHV0KCkgbm9ydGg6IG51bWJlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGVhc3QgcG9zaXRpb24gb2YgdGhlIHJlY3RhbmdsZSAocmVxdWlyZWQpLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGVhc3Q6IG51bWJlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIHNvdXRoIHBvc2l0aW9uIG9mIHRoZSByZWN0YW5nbGUgKHJlcXVpcmVkKS5cclxuICAgKi9cclxuICBASW5wdXQoKSBzb3V0aDogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgd2VzdCBwb3NpdGlvbiBvZiB0aGUgcmVjdGFuZ2xlIChyZXF1aXJlZCkuXHJcbiAgICovXHJcbiAgQElucHV0KCkgd2VzdDogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBJbmRpY2F0ZXMgd2hldGhlciB0aGlzIFJlY3RhbmdsZSBoYW5kbGVzIG1vdXNlIGV2ZW50cy4gRGVmYXVsdHMgdG8gdHJ1ZS5cclxuICAgKi9cclxuICBASW5wdXQoKSBjbGlja2FibGUgPSB0cnVlO1xyXG5cclxuICAvKipcclxuICAgKiBJZiBzZXQgdG8gdHJ1ZSwgdGhlIHVzZXIgY2FuIGRyYWcgdGhpcyByZWN0YW5nbGUgb3ZlciB0aGUgbWFwLiBEZWZhdWx0cyB0byBmYWxzZS5cclxuICAgKi9cclxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8taW5wdXQtcmVuYW1lXHJcbiAgQElucHV0KCdyZWN0YW5nbGVEcmFnZ2FibGUnKSBkcmFnZ2FibGUgPSBmYWxzZTtcclxuXHJcbiAgLyoqXHJcbiAgICogSWYgc2V0IHRvIHRydWUsIHRoZSB1c2VyIGNhbiBlZGl0IHRoaXMgcmVjdGFuZ2xlIGJ5IGRyYWdnaW5nIHRoZSBjb250cm9sIHBvaW50cyBzaG93biBhdFxyXG4gICAqIHRoZSBjZW50ZXIgYW5kIGFyb3VuZCB0aGUgY2lyY3VtZmVyZW5jZSBvZiB0aGUgcmVjdGFuZ2xlLiBEZWZhdWx0cyB0byBmYWxzZS5cclxuICAgKi9cclxuICBASW5wdXQoKSBlZGl0YWJsZSA9IGZhbHNlO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgZmlsbCBjb2xvci4gQWxsIENTUzMgY29sb3JzIGFyZSBzdXBwb3J0ZWQgZXhjZXB0IGZvciBleHRlbmRlZCBuYW1lZCBjb2xvcnMuXHJcbiAgICovXHJcbiAgQElucHV0KCkgZmlsbENvbG9yOiBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBmaWxsIG9wYWNpdHkgYmV0d2VlbiAwLjAgYW5kIDEuMC5cclxuICAgKi9cclxuICBASW5wdXQoKSBmaWxsT3BhY2l0eTogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgc3Ryb2tlIGNvbG9yLiBBbGwgQ1NTMyBjb2xvcnMgYXJlIHN1cHBvcnRlZCBleGNlcHQgZm9yIGV4dGVuZGVkIG5hbWVkIGNvbG9ycy5cclxuICAgKi9cclxuICBASW5wdXQoKSBzdHJva2VDb2xvcjogc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgc3Ryb2tlIG9wYWNpdHkgYmV0d2VlbiAwLjAgYW5kIDEuMFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHN0cm9rZU9wYWNpdHk6IG51bWJlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIHN0cm9rZSBwb3NpdGlvbi4gRGVmYXVsdHMgdG8gQ0VOVEVSLlxyXG4gICAqIFRoaXMgcHJvcGVydHkgaXMgbm90IHN1cHBvcnRlZCBvbiBJbnRlcm5ldCBFeHBsb3JlciA4IGFuZCBlYXJsaWVyLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHN0cm9rZVBvc2l0aW9uOiBrZXlvZiB0eXBlb2YgZ29vZ2xlLm1hcHMuU3Ryb2tlUG9zaXRpb24gPSAnQ0VOVEVSJztcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIHN0cm9rZSB3aWR0aCBpbiBwaXhlbHMuXHJcbiAgICovXHJcbiAgQElucHV0KCkgc3Ryb2tlV2VpZ2h0ID0gMDtcclxuXHJcbiAgLyoqXHJcbiAgICogV2hldGhlciB0aGlzIHJlY3RhbmdsZSBpcyB2aXNpYmxlIG9uIHRoZSBtYXAuIERlZmF1bHRzIHRvIHRydWUuXHJcbiAgICovXHJcbiAgQElucHV0KCkgdmlzaWJsZSA9IHRydWU7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSB6SW5kZXggY29tcGFyZWQgdG8gb3RoZXIgcG9seXMuXHJcbiAgICovXHJcbiAgQElucHV0KCkgekluZGV4OiBudW1iZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgcmVjdGFuZ2xlJ3MgaXMgY2hhbmdlZC5cclxuICAgKi9cclxuICBAT3V0cHV0KClcclxuICBib3VuZHNDaGFuZ2U6IEV2ZW50RW1pdHRlcjxnb29nbGUubWFwcy5MYXRMbmdCb3VuZHNMaXRlcmFsPiA9IG5ldyBFdmVudEVtaXR0ZXI8XHJcbiAgICBnb29nbGUubWFwcy5MYXRMbmdCb3VuZHNMaXRlcmFsXHJcbiAgPigpO1xyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGV2ZW50IGVtaXR0ZXIgZ2V0cyBlbWl0dGVkIHdoZW4gdGhlIHVzZXIgY2xpY2tzIG9uIHRoZSByZWN0YW5nbGUuXHJcbiAgICovXHJcbiAgQE91dHB1dCgpXHJcbiAgcmVjdGFuZ2xlQ2xpY2s6IEV2ZW50RW1pdHRlcjxnb29nbGUubWFwcy5Nb3VzZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8Z29vZ2xlLm1hcHMuTW91c2VFdmVudD4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBldmVudCBlbWl0dGVyIGdldHMgZW1pdHRlZCB3aGVuIHRoZSB1c2VyIGNsaWNrcyBvbiB0aGUgcmVjdGFuZ2xlLlxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKVxyXG4gIHJlY3RhbmdsZURibENsaWNrOiBFdmVudEVtaXR0ZXI8Z29vZ2xlLm1hcHMuTW91c2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPGdvb2dsZS5tYXBzLk1vdXNlRXZlbnQ+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgZXZlbnQgaXMgcmVwZWF0ZWRseSBmaXJlZCB3aGlsZSB0aGUgdXNlciBkcmFncyB0aGUgcmVjdGFuZ2xlLlxyXG4gICAqL1xyXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8tb3V0cHV0LW5hdGl2ZVxyXG4gIEBPdXRwdXQoKSBkcmFnOiBFdmVudEVtaXR0ZXI8Z29vZ2xlLm1hcHMuTW91c2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPGdvb2dsZS5tYXBzLk1vdXNlRXZlbnQ+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgdXNlciBzdG9wcyBkcmFnZ2luZyB0aGUgcmVjdGFuZ2xlLlxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBkcmFnRW5kOiBFdmVudEVtaXR0ZXI8Z29vZ2xlLm1hcHMuTW91c2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPGdvb2dsZS5tYXBzLk1vdXNlRXZlbnQ+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgdXNlciBzdGFydHMgZHJhZ2dpbmcgdGhlIHJlY3RhbmdsZS5cclxuICAgKi9cclxuICBAT3V0cHV0KClcclxuICBkcmFnU3RhcnQ6IEV2ZW50RW1pdHRlcjxnb29nbGUubWFwcy5Nb3VzZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8Z29vZ2xlLm1hcHMuTW91c2VFdmVudD4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSBET00gbW91c2Vkb3duIGV2ZW50IGlzIGZpcmVkIG9uIHRoZSByZWN0YW5nbGUuXHJcbiAgICovXHJcbiAgQE91dHB1dCgpXHJcbiAgbW91c2VEb3duOiBFdmVudEVtaXR0ZXI8Z29vZ2xlLm1hcHMuTW91c2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPGdvb2dsZS5tYXBzLk1vdXNlRXZlbnQ+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgRE9NIG1vdXNlbW92ZSBldmVudCBpcyBmaXJlZCBvbiB0aGUgcmVjdGFuZ2xlLlxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKVxyXG4gIG1vdXNlTW92ZTogRXZlbnRFbWl0dGVyPGdvb2dsZS5tYXBzLk1vdXNlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxnb29nbGUubWFwcy5Nb3VzZUV2ZW50PigpO1xyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIG9uIHJlY3RhbmdsZSBtb3VzZW91dC5cclxuICAgKi9cclxuICBAT3V0cHV0KCkgbW91c2VPdXQ6IEV2ZW50RW1pdHRlcjxnb29nbGUubWFwcy5Nb3VzZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8Z29vZ2xlLm1hcHMuTW91c2VFdmVudD4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBldmVudCBpcyBmaXJlZCBvbiByZWN0YW5nbGUgbW91c2VvdmVyLlxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKVxyXG4gIG1vdXNlT3ZlcjogRXZlbnRFbWl0dGVyPGdvb2dsZS5tYXBzLk1vdXNlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxnb29nbGUubWFwcy5Nb3VzZUV2ZW50PigpO1xyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIERPTSBtb3VzZXVwIGV2ZW50IGlzIGZpcmVkIG9uIHRoZSByZWN0YW5nbGUuXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIG1vdXNlVXA6IEV2ZW50RW1pdHRlcjxnb29nbGUubWFwcy5Nb3VzZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8Z29vZ2xlLm1hcHMuTW91c2VFdmVudD4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSByZWN0YW5nbGUgaXMgcmlnaHQtY2xpY2tlZCBvbi5cclxuICAgKi9cclxuICBAT3V0cHV0KClcclxuICByaWdodENsaWNrOiBFdmVudEVtaXR0ZXI8Z29vZ2xlLm1hcHMuTW91c2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPGdvb2dsZS5tYXBzLk1vdXNlRXZlbnQ+KCk7XHJcblxyXG4gIHByaXZhdGUgX3JlY3RhbmdsZUFkZGVkVG9NYW5hZ2VyID0gZmFsc2U7XHJcblxyXG4gIHByaXZhdGUgc3RhdGljIF9tYXBPcHRpb25zOiBzdHJpbmdbXSA9IFtcclxuICAgICdmaWxsQ29sb3InLFxyXG4gICAgJ2ZpbGxPcGFjaXR5JyxcclxuICAgICdzdHJva2VDb2xvcicsXHJcbiAgICAnc3Ryb2tlT3BhY2l0eScsXHJcbiAgICAnc3Ryb2tlUG9zaXRpb24nLFxyXG4gICAgJ3N0cm9rZVdlaWdodCcsXHJcbiAgICAndmlzaWJsZScsXHJcbiAgICAnekluZGV4JyxcclxuICAgICdjbGlja2FibGUnLFxyXG4gIF07XHJcblxyXG4gIHByaXZhdGUgX2V2ZW50U3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfbWFuYWdlcjogUmVjdGFuZ2xlTWFuYWdlcikge31cclxuXHJcbiAgLyoqIEBpbnRlcm5hbCAqL1xyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5fbWFuYWdlci5hZGRSZWN0YW5nbGUodGhpcyk7XHJcbiAgICB0aGlzLl9yZWN0YW5nbGVBZGRlZFRvTWFuYWdlciA9IHRydWU7XHJcbiAgICB0aGlzLl9yZWdpc3RlckV2ZW50TGlzdGVuZXJzKCk7XHJcbiAgfVxyXG5cclxuICAvKiogQGludGVybmFsICovXHJcbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogeyBba2V5OiBzdHJpbmddOiBTaW1wbGVDaGFuZ2UgfSkge1xyXG4gICAgaWYgKCF0aGlzLl9yZWN0YW5nbGVBZGRlZFRvTWFuYWdlcikge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZTogbm8tc3RyaW5nLWxpdGVyYWxcclxuICAgIGlmIChcclxuICAgICAgY2hhbmdlc1snbm9ydGgnXSB8fFxyXG4gICAgICBjaGFuZ2VzWydlYXN0J10gfHxcclxuICAgICAgY2hhbmdlc1snc291dGgnXSB8fFxyXG4gICAgICBjaGFuZ2VzWyd3ZXN0J11cclxuICAgICkge1xyXG4gICAgICB0aGlzLl9tYW5hZ2VyLnNldEJvdW5kcyh0aGlzKTtcclxuICAgIH1cclxuICAgIGlmIChjaGFuZ2VzWydlZGl0YWJsZSddKSB7XHJcbiAgICAgIHRoaXMuX21hbmFnZXIuc2V0RWRpdGFibGUodGhpcyk7XHJcbiAgICB9XHJcbiAgICBpZiAoY2hhbmdlc1snZHJhZ2dhYmxlJ10pIHtcclxuICAgICAgdGhpcy5fbWFuYWdlci5zZXREcmFnZ2FibGUodGhpcyk7XHJcbiAgICB9XHJcbiAgICBpZiAoY2hhbmdlc1sndmlzaWJsZSddKSB7XHJcbiAgICAgIHRoaXMuX21hbmFnZXIuc2V0VmlzaWJsZSh0aGlzKTtcclxuICAgIH1cclxuICAgIC8vIHRzbGludDplbmFibGU6IG5vLXN0cmluZy1saXRlcmFsXHJcbiAgICB0aGlzLl91cGRhdGVSZWN0YW5nbGVPcHRpb25zQ2hhbmdlcyhjaGFuZ2VzKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX3VwZGF0ZVJlY3RhbmdsZU9wdGlvbnNDaGFuZ2VzKGNoYW5nZXM6IHtcclxuICAgIFtwcm9wTmFtZTogc3RyaW5nXTogU2ltcGxlQ2hhbmdlO1xyXG4gIH0pIHtcclxuICAgIGNvbnN0IG9wdGlvbnM6IGdvb2dsZS5tYXBzLlJlY3RhbmdsZU9wdGlvbnMgPSB7fTtcclxuICAgIGNvbnN0IG9wdGlvbktleXMgPSBPYmplY3Qua2V5cyhjaGFuZ2VzKS5maWx0ZXIoXHJcbiAgICAgIGsgPT4gQWdtUmVjdGFuZ2xlLl9tYXBPcHRpb25zLmluZGV4T2YoaykgIT09IC0xLFxyXG4gICAgKTtcclxuICAgIG9wdGlvbktleXMuZm9yRWFjaChrID0+IHtcclxuICAgICAgb3B0aW9uc1trXSA9IGNoYW5nZXNba10uY3VycmVudFZhbHVlO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKG9wdGlvbktleXMubGVuZ3RoID4gMCkge1xyXG4gICAgICB0aGlzLl9tYW5hZ2VyLnNldE9wdGlvbnModGhpcywgb3B0aW9ucyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9yZWdpc3RlckV2ZW50TGlzdGVuZXJzKCkge1xyXG4gICAgY29uc3QgZXZlbnRzOiBNYXA8c3RyaW5nLCBFdmVudEVtaXR0ZXI8YW55Pj4gPSBuZXcgTWFwPFxyXG4gICAgICBzdHJpbmcsXHJcbiAgICAgIEV2ZW50RW1pdHRlcjxhbnk+XHJcbiAgICA+KCk7XHJcbiAgICBldmVudHMuc2V0KCdib3VuZHNfY2hhbmdlZCcsIHRoaXMuYm91bmRzQ2hhbmdlKTtcclxuICAgIGV2ZW50cy5zZXQoJ2NsaWNrJywgdGhpcy5yZWN0YW5nbGVDbGljayk7XHJcbiAgICBldmVudHMuc2V0KCdkYmxjbGljaycsIHRoaXMucmVjdGFuZ2xlRGJsQ2xpY2spO1xyXG4gICAgZXZlbnRzLnNldCgnZHJhZycsIHRoaXMuZHJhZyk7XHJcbiAgICBldmVudHMuc2V0KCdkcmFnZW5kJywgdGhpcy5kcmFnRW5kKTtcclxuICAgIGV2ZW50cy5zZXQoJ2RyYWdTdGFydCcsIHRoaXMuZHJhZ1N0YXJ0KTtcclxuICAgIGV2ZW50cy5zZXQoJ21vdXNlZG93bicsIHRoaXMubW91c2VEb3duKTtcclxuICAgIGV2ZW50cy5zZXQoJ21vdXNlbW92ZScsIHRoaXMubW91c2VNb3ZlKTtcclxuICAgIGV2ZW50cy5zZXQoJ21vdXNlb3V0JywgdGhpcy5tb3VzZU91dCk7XHJcbiAgICBldmVudHMuc2V0KCdtb3VzZW92ZXInLCB0aGlzLm1vdXNlT3Zlcik7XHJcbiAgICBldmVudHMuc2V0KCdtb3VzZXVwJywgdGhpcy5tb3VzZVVwKTtcclxuICAgIGV2ZW50cy5zZXQoJ3JpZ2h0Y2xpY2snLCB0aGlzLnJpZ2h0Q2xpY2spO1xyXG5cclxuICAgIGV2ZW50cy5mb3JFYWNoKChldmVudEVtaXR0ZXIsIGV2ZW50TmFtZSkgPT4ge1xyXG4gICAgICB0aGlzLl9ldmVudFN1YnNjcmlwdGlvbnMucHVzaChcclxuICAgICAgICB0aGlzLl9tYW5hZ2VyXHJcbiAgICAgICAgICAuY3JlYXRlRXZlbnRPYnNlcnZhYmxlPGdvb2dsZS5tYXBzLk1vdXNlRXZlbnQ+KGV2ZW50TmFtZSwgdGhpcylcclxuICAgICAgICAgIC5zdWJzY3JpYmUodmFsdWUgPT4ge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKGV2ZW50TmFtZSkge1xyXG4gICAgICAgICAgICAgIGNhc2UgJ2JvdW5kc19jaGFuZ2VkJzpcclxuICAgICAgICAgICAgICAgIHRoaXMuX21hbmFnZXIuZ2V0Qm91bmRzKHRoaXMpLnRoZW4oYm91bmRzID0+XHJcbiAgICAgICAgICAgICAgICAgIGV2ZW50RW1pdHRlci5lbWl0KHtcclxuICAgICAgICAgICAgICAgICAgICBub3J0aDogYm91bmRzLmdldE5vcnRoRWFzdCgpLmxhdCgpLFxyXG4gICAgICAgICAgICAgICAgICAgIGVhc3Q6IGJvdW5kcy5nZXROb3J0aEVhc3QoKS5sbmcoKSxcclxuICAgICAgICAgICAgICAgICAgICBzb3V0aDogYm91bmRzLmdldFNvdXRoV2VzdCgpLmxhdCgpLFxyXG4gICAgICAgICAgICAgICAgICAgIHdlc3Q6IGJvdW5kcy5nZXRTb3V0aFdlc3QoKS5sbmcoKSxcclxuICAgICAgICAgICAgICAgICAgfSBhcyBnb29nbGUubWFwcy5MYXRMbmdCb3VuZHNMaXRlcmFsKSxcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgZXZlbnRFbWl0dGVyLmVtaXQodmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KSxcclxuICAgICAgKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqIEBpbnRlcm5hbCAqL1xyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgdGhpcy5fZXZlbnRTdWJzY3JpcHRpb25zLmZvckVhY2gocyA9PiBzLnVuc3Vic2NyaWJlKCkpO1xyXG4gICAgdGhpcy5fZXZlbnRTdWJzY3JpcHRpb25zID0gbnVsbDtcclxuICAgIHRoaXMuX21hbmFnZXIucmVtb3ZlUmVjdGFuZ2xlKHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0cyB0aGUgTGF0TG5nQm91bmRzIG9mIHRoaXMgUmVjdGFuZ2xlLlxyXG4gICAqL1xyXG4gIGdldEJvdW5kcygpOiBQcm9taXNlPGdvb2dsZS5tYXBzLkxhdExuZ0JvdW5kcz4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX21hbmFnZXIuZ2V0Qm91bmRzKHRoaXMpO1xyXG4gIH1cclxufVxyXG4iXX0=