import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { GoogleMapsAPIWrapper } from '../google-maps-api-wrapper';
export class RectangleManager {
    constructor(_apiWrapper, _zone) {
        this._apiWrapper = _apiWrapper;
        this._zone = _zone;
        this._rectangles = new Map();
    }
    addRectangle(rectangle) {
        this._rectangles.set(rectangle, this._apiWrapper.getNativeMap().then(() => this._apiWrapper.createRectangle({
            bounds: {
                north: rectangle.north,
                east: rectangle.east,
                south: rectangle.south,
                west: rectangle.west,
            },
            clickable: rectangle.clickable,
            draggable: rectangle.draggable,
            editable: rectangle.editable,
            fillColor: rectangle.fillColor,
            fillOpacity: rectangle.fillOpacity,
            strokeColor: rectangle.strokeColor,
            strokeOpacity: rectangle.strokeOpacity,
            strokePosition: google.maps.StrokePosition[rectangle.strokePosition],
            strokeWeight: rectangle.strokeWeight,
            visible: rectangle.visible,
            zIndex: rectangle.zIndex,
        })));
    }
    /**
     * Removes the given rectangle from the map.
     */
    removeRectangle(rectangle) {
        return this._rectangles.get(rectangle).then((r) => {
            r.setMap(null);
            this._rectangles.delete(rectangle);
        });
    }
    setOptions(rectangle, options) {
        return this._rectangles.get(rectangle).then((r) => {
            const actualStrokePosition = options.strokePosition;
            options.strokePosition = google.maps.StrokePosition[actualStrokePosition];
            r.setOptions(options);
        });
    }
    getBounds(rectangle) {
        return this._rectangles.get(rectangle).then((r) => r.getBounds());
    }
    setBounds(rectangle) {
        return this._rectangles.get(rectangle).then((r) => {
            return r.setBounds({
                north: rectangle.north,
                east: rectangle.east,
                south: rectangle.south,
                west: rectangle.west,
            });
        });
    }
    setEditable(rectangle) {
        return this._rectangles.get(rectangle).then((r) => {
            return r.setEditable(rectangle.editable);
        });
    }
    setDraggable(rectangle) {
        return this._rectangles.get(rectangle).then((r) => {
            return r.setDraggable(rectangle.draggable);
        });
    }
    setVisible(rectangle) {
        return this._rectangles.get(rectangle).then((r) => {
            return r.setVisible(rectangle.visible);
        });
    }
    createEventObservable(eventName, rectangle) {
        return new Observable((subsrciber) => {
            let listener = null;
            this._rectangles.get(rectangle).then((r) => {
                listener = r.addListener(eventName, (e) => this._zone.run(() => subsrciber.next(e)));
            });
            return () => {
                if (listener !== null) {
                    listener.remove();
                }
            };
        });
    }
}
RectangleManager.decorators = [
    { type: Injectable }
];
RectangleManager.ctorParameters = () => [
    { type: GoogleMapsAPIWrapper },
    { type: NgZone }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVjdGFuZ2xlLW1hbmFnZXIuanMiLCJzb3VyY2VSb290IjoiRDovQXV0b21hdGlvbi9hbmd1bGFyLWdvb2dsZS1tYXBzL3BhY2thZ2VzL2NvcmUvc3JjLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL21hbmFnZXJzL3JlY3RhbmdsZS1tYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRW5ELE9BQU8sRUFBRSxVQUFVLEVBQWMsTUFBTSxNQUFNLENBQUM7QUFHOUMsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFHbEUsTUFBTSxPQUFPLGdCQUFnQjtJQUkzQixZQUFvQixXQUFpQyxFQUFVLEtBQWE7UUFBeEQsZ0JBQVcsR0FBWCxXQUFXLENBQXNCO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBUTtRQUhwRSxnQkFBVyxHQUNmLElBQUksR0FBRyxFQUFnRCxDQUFDO0lBRW1CLENBQUM7SUFFaEYsWUFBWSxDQUFDLFNBQXVCO1FBQ2xDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxDQUFDLElBQUksQ0FBRSxHQUFHLEVBQUUsQ0FDekUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUM7WUFDL0IsTUFBTSxFQUFFO2dCQUNOLEtBQUssRUFBRSxTQUFTLENBQUMsS0FBSztnQkFDdEIsSUFBSSxFQUFFLFNBQVMsQ0FBQyxJQUFJO2dCQUNwQixLQUFLLEVBQUUsU0FBUyxDQUFDLEtBQUs7Z0JBQ3RCLElBQUksRUFBRSxTQUFTLENBQUMsSUFBSTthQUNyQjtZQUNELFNBQVMsRUFBRSxTQUFTLENBQUMsU0FBUztZQUM5QixTQUFTLEVBQUUsU0FBUyxDQUFDLFNBQVM7WUFDOUIsUUFBUSxFQUFFLFNBQVMsQ0FBQyxRQUFRO1lBQzVCLFNBQVMsRUFBRSxTQUFTLENBQUMsU0FBUztZQUM5QixXQUFXLEVBQUUsU0FBUyxDQUFDLFdBQVc7WUFDbEMsV0FBVyxFQUFFLFNBQVMsQ0FBQyxXQUFXO1lBQ2xDLGFBQWEsRUFBRSxTQUFTLENBQUMsYUFBYTtZQUN0QyxjQUFjLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQztZQUNwRSxZQUFZLEVBQUUsU0FBUyxDQUFDLFlBQVk7WUFDcEMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxPQUFPO1lBQzFCLE1BQU0sRUFBRSxTQUFTLENBQUMsTUFBTTtTQUN6QixDQUFDLENBQUMsQ0FDSixDQUFDO0lBQ0osQ0FBQztJQUVEOztPQUVHO0lBQ0gsZUFBZSxDQUFDLFNBQXVCO1FBQ3JDLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDaEQsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNmLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3JDLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELFVBQVUsQ0FBQyxTQUF1QixFQUFFLE9BQXFDO1FBQ3ZFLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDaEQsTUFBTSxvQkFBb0IsR0FBRyxPQUFPLENBQUMsY0FBZ0UsQ0FBQztZQUN0RyxPQUFPLENBQUMsY0FBYyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLG9CQUFvQixDQUFDLENBQUM7WUFDMUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN4QixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxTQUFTLENBQUMsU0FBdUI7UUFDL0IsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDO0lBQ3BFLENBQUM7SUFFRCxTQUFTLENBQUMsU0FBdUI7UUFDL0IsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUNoRCxPQUFPLENBQUMsQ0FBQyxTQUFTLENBQUM7Z0JBQ2pCLEtBQUssRUFBRSxTQUFTLENBQUMsS0FBSztnQkFDdEIsSUFBSSxFQUFFLFNBQVMsQ0FBQyxJQUFJO2dCQUNwQixLQUFLLEVBQUUsU0FBUyxDQUFDLEtBQUs7Z0JBQ3RCLElBQUksRUFBRSxTQUFTLENBQUMsSUFBSTthQUNyQixDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxXQUFXLENBQUMsU0FBdUI7UUFDakMsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUNoRCxPQUFPLENBQUMsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzNDLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELFlBQVksQ0FBQyxTQUF1QjtRQUNsQyxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQ2hELE9BQU8sQ0FBQyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDN0MsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsVUFBVSxDQUFDLFNBQXVCO1FBQ2hDLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDaEQsT0FBTyxDQUFDLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN6QyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxxQkFBcUIsQ0FBSSxTQUFpQixFQUFFLFNBQXVCO1FBQ2pFLE9BQU8sSUFBSSxVQUFVLENBQUMsQ0FBQyxVQUF5QixFQUFFLEVBQUU7WUFDbEQsSUFBSSxRQUFRLEdBQWtDLElBQUksQ0FBQztZQUNuRCxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtnQkFDekMsUUFBUSxHQUFHLENBQUMsQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMxRixDQUFDLENBQUMsQ0FBQztZQUVILE9BQU8sR0FBRyxFQUFFO2dCQUNWLElBQUksUUFBUSxLQUFLLElBQUksRUFBRTtvQkFDckIsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO2lCQUNuQjtZQUNILENBQUMsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7O1lBL0ZGLFVBQVU7OztZQUZGLG9CQUFvQjtZQUxSLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YnNjcmliZXIgfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7IEFnbVJlY3RhbmdsZSB9IGZyb20gJy4uLy4uL2RpcmVjdGl2ZXMvcmVjdGFuZ2xlJztcclxuaW1wb3J0IHsgR29vZ2xlTWFwc0FQSVdyYXBwZXIgfSBmcm9tICcuLi9nb29nbGUtbWFwcy1hcGktd3JhcHBlcic7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBSZWN0YW5nbGVNYW5hZ2VyIHtcclxuICBwcml2YXRlIF9yZWN0YW5nbGVzOiBNYXA8QWdtUmVjdGFuZ2xlLCBQcm9taXNlPGdvb2dsZS5tYXBzLlJlY3RhbmdsZT4+ID1cclxuICAgICAgbmV3IE1hcDxBZ21SZWN0YW5nbGUsIFByb21pc2U8Z29vZ2xlLm1hcHMuUmVjdGFuZ2xlPj4oKTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfYXBpV3JhcHBlcjogR29vZ2xlTWFwc0FQSVdyYXBwZXIsIHByaXZhdGUgX3pvbmU6IE5nWm9uZSkge31cclxuXHJcbiAgYWRkUmVjdGFuZ2xlKHJlY3RhbmdsZTogQWdtUmVjdGFuZ2xlKSB7XHJcbiAgICB0aGlzLl9yZWN0YW5nbGVzLnNldChyZWN0YW5nbGUsIHRoaXMuX2FwaVdyYXBwZXIuZ2V0TmF0aXZlTWFwKCkudGhlbiggKCkgPT5cclxuICAgICAgdGhpcy5fYXBpV3JhcHBlci5jcmVhdGVSZWN0YW5nbGUoe1xyXG4gICAgICAgIGJvdW5kczoge1xyXG4gICAgICAgICAgbm9ydGg6IHJlY3RhbmdsZS5ub3J0aCxcclxuICAgICAgICAgIGVhc3Q6IHJlY3RhbmdsZS5lYXN0LFxyXG4gICAgICAgICAgc291dGg6IHJlY3RhbmdsZS5zb3V0aCxcclxuICAgICAgICAgIHdlc3Q6IHJlY3RhbmdsZS53ZXN0LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2xpY2thYmxlOiByZWN0YW5nbGUuY2xpY2thYmxlLFxyXG4gICAgICAgIGRyYWdnYWJsZTogcmVjdGFuZ2xlLmRyYWdnYWJsZSxcclxuICAgICAgICBlZGl0YWJsZTogcmVjdGFuZ2xlLmVkaXRhYmxlLFxyXG4gICAgICAgIGZpbGxDb2xvcjogcmVjdGFuZ2xlLmZpbGxDb2xvcixcclxuICAgICAgICBmaWxsT3BhY2l0eTogcmVjdGFuZ2xlLmZpbGxPcGFjaXR5LFxyXG4gICAgICAgIHN0cm9rZUNvbG9yOiByZWN0YW5nbGUuc3Ryb2tlQ29sb3IsXHJcbiAgICAgICAgc3Ryb2tlT3BhY2l0eTogcmVjdGFuZ2xlLnN0cm9rZU9wYWNpdHksXHJcbiAgICAgICAgc3Ryb2tlUG9zaXRpb246IGdvb2dsZS5tYXBzLlN0cm9rZVBvc2l0aW9uW3JlY3RhbmdsZS5zdHJva2VQb3NpdGlvbl0sXHJcbiAgICAgICAgc3Ryb2tlV2VpZ2h0OiByZWN0YW5nbGUuc3Ryb2tlV2VpZ2h0LFxyXG4gICAgICAgIHZpc2libGU6IHJlY3RhbmdsZS52aXNpYmxlLFxyXG4gICAgICAgIHpJbmRleDogcmVjdGFuZ2xlLnpJbmRleCxcclxuICAgICAgfSkpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVtb3ZlcyB0aGUgZ2l2ZW4gcmVjdGFuZ2xlIGZyb20gdGhlIG1hcC5cclxuICAgKi9cclxuICByZW1vdmVSZWN0YW5nbGUocmVjdGFuZ2xlOiBBZ21SZWN0YW5nbGUpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIHJldHVybiB0aGlzLl9yZWN0YW5nbGVzLmdldChyZWN0YW5nbGUpLnRoZW4oKHIpID0+IHtcclxuICAgICAgci5zZXRNYXAobnVsbCk7XHJcbiAgICAgIHRoaXMuX3JlY3RhbmdsZXMuZGVsZXRlKHJlY3RhbmdsZSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHNldE9wdGlvbnMocmVjdGFuZ2xlOiBBZ21SZWN0YW5nbGUsIG9wdGlvbnM6IGdvb2dsZS5tYXBzLlJlY3RhbmdsZU9wdGlvbnMpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIHJldHVybiB0aGlzLl9yZWN0YW5nbGVzLmdldChyZWN0YW5nbGUpLnRoZW4oKHIpID0+IHtcclxuICAgICAgY29uc3QgYWN0dWFsU3Ryb2tlUG9zaXRpb24gPSBvcHRpb25zLnN0cm9rZVBvc2l0aW9uIGFzIGFueSBhcyBrZXlvZiB0eXBlb2YgZ29vZ2xlLm1hcHMuU3Ryb2tlUG9zaXRpb247XHJcbiAgICAgIG9wdGlvbnMuc3Ryb2tlUG9zaXRpb24gPSBnb29nbGUubWFwcy5TdHJva2VQb3NpdGlvblthY3R1YWxTdHJva2VQb3NpdGlvbl07XHJcbiAgICAgIHIuc2V0T3B0aW9ucyhvcHRpb25zKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZ2V0Qm91bmRzKHJlY3RhbmdsZTogQWdtUmVjdGFuZ2xlKTogUHJvbWlzZTxnb29nbGUubWFwcy5MYXRMbmdCb3VuZHM+IHtcclxuICAgIHJldHVybiB0aGlzLl9yZWN0YW5nbGVzLmdldChyZWN0YW5nbGUpLnRoZW4oKHIpID0+IHIuZ2V0Qm91bmRzKCkpO1xyXG4gIH1cclxuXHJcbiAgc2V0Qm91bmRzKHJlY3RhbmdsZTogQWdtUmVjdGFuZ2xlKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICByZXR1cm4gdGhpcy5fcmVjdGFuZ2xlcy5nZXQocmVjdGFuZ2xlKS50aGVuKChyKSA9PiB7XHJcbiAgICAgIHJldHVybiByLnNldEJvdW5kcyh7XHJcbiAgICAgICAgbm9ydGg6IHJlY3RhbmdsZS5ub3J0aCxcclxuICAgICAgICBlYXN0OiByZWN0YW5nbGUuZWFzdCxcclxuICAgICAgICBzb3V0aDogcmVjdGFuZ2xlLnNvdXRoLFxyXG4gICAgICAgIHdlc3Q6IHJlY3RhbmdsZS53ZXN0LFxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgc2V0RWRpdGFibGUocmVjdGFuZ2xlOiBBZ21SZWN0YW5nbGUpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIHJldHVybiB0aGlzLl9yZWN0YW5nbGVzLmdldChyZWN0YW5nbGUpLnRoZW4oKHIpID0+IHtcclxuICAgICAgcmV0dXJuIHIuc2V0RWRpdGFibGUocmVjdGFuZ2xlLmVkaXRhYmxlKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgc2V0RHJhZ2dhYmxlKHJlY3RhbmdsZTogQWdtUmVjdGFuZ2xlKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICByZXR1cm4gdGhpcy5fcmVjdGFuZ2xlcy5nZXQocmVjdGFuZ2xlKS50aGVuKChyKSA9PiB7XHJcbiAgICAgIHJldHVybiByLnNldERyYWdnYWJsZShyZWN0YW5nbGUuZHJhZ2dhYmxlKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgc2V0VmlzaWJsZShyZWN0YW5nbGU6IEFnbVJlY3RhbmdsZSk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX3JlY3RhbmdsZXMuZ2V0KHJlY3RhbmdsZSkudGhlbigocikgPT4ge1xyXG4gICAgICByZXR1cm4gci5zZXRWaXNpYmxlKHJlY3RhbmdsZS52aXNpYmxlKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlRXZlbnRPYnNlcnZhYmxlPFQ+KGV2ZW50TmFtZTogc3RyaW5nLCByZWN0YW5nbGU6IEFnbVJlY3RhbmdsZSk6IE9ic2VydmFibGU8VD4ge1xyXG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKChzdWJzcmNpYmVyOiBTdWJzY3JpYmVyPFQ+KSA9PiB7XHJcbiAgICAgIGxldCBsaXN0ZW5lcjogZ29vZ2xlLm1hcHMuTWFwc0V2ZW50TGlzdGVuZXIgPSBudWxsO1xyXG4gICAgICB0aGlzLl9yZWN0YW5nbGVzLmdldChyZWN0YW5nbGUpLnRoZW4oKHIpID0+IHtcclxuICAgICAgICBsaXN0ZW5lciA9IHIuYWRkTGlzdGVuZXIoZXZlbnROYW1lLCAoZTogVCkgPT4gdGhpcy5fem9uZS5ydW4oKCkgPT4gc3Vic3JjaWJlci5uZXh0KGUpKSk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgICBpZiAobGlzdGVuZXIgIT09IG51bGwpIHtcclxuICAgICAgICAgIGxpc3RlbmVyLnJlbW92ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=