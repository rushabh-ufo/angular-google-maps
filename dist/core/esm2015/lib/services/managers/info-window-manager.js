import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { GoogleMapsAPIWrapper } from '../google-maps-api-wrapper';
import { MarkerManager } from './marker-manager';
export class InfoWindowManager {
    constructor(_mapsWrapper, _zone, _markerManager) {
        this._mapsWrapper = _mapsWrapper;
        this._zone = _zone;
        this._markerManager = _markerManager;
        this._infoWindows = new Map();
    }
    deleteInfoWindow(infoWindow) {
        const iWindow = this._infoWindows.get(infoWindow);
        if (iWindow == null) {
            // info window already deleted
            return Promise.resolve();
        }
        return iWindow.then((i) => {
            return this._zone.run(() => {
                i.close();
                this._infoWindows.delete(infoWindow);
            });
        });
    }
    setPosition(infoWindow) {
        return this._infoWindows.get(infoWindow).then((i) => i.setPosition({
            lat: infoWindow.latitude,
            lng: infoWindow.longitude,
        }));
    }
    setZIndex(infoWindow) {
        return this._infoWindows.get(infoWindow)
            .then((i) => i.setZIndex(infoWindow.zIndex));
    }
    open(infoWindow) {
        return this._infoWindows.get(infoWindow).then((w) => {
            if (infoWindow.hostMarker != null) {
                return this._markerManager.getNativeMarker(infoWindow.hostMarker).then((marker) => {
                    return this._mapsWrapper.getNativeMap().then((map) => w.open(map, marker));
                });
            }
            return this._mapsWrapper.getNativeMap().then((map) => w.open(map));
        });
    }
    close(infoWindow) {
        return this._infoWindows.get(infoWindow).then((w) => w.close());
    }
    setOptions(infoWindow, options) {
        return this._infoWindows.get(infoWindow).then((i) => i.setOptions(options));
    }
    addInfoWindow(infoWindow) {
        const options = {
            content: infoWindow.content,
            maxWidth: infoWindow.maxWidth,
            zIndex: infoWindow.zIndex,
            disableAutoPan: infoWindow.disableAutoPan,
        };
        if (typeof infoWindow.latitude === 'number' && typeof infoWindow.longitude === 'number') {
            options.position = { lat: infoWindow.latitude, lng: infoWindow.longitude };
        }
        const infoWindowPromise = this._mapsWrapper.createInfoWindow(options);
        this._infoWindows.set(infoWindow, infoWindowPromise);
    }
    /**
     * Creates a Google Maps event listener for the given InfoWindow as an Observable
     */
    createEventObservable(eventName, infoWindow) {
        return new Observable((observer) => {
            this._infoWindows.get(infoWindow).then((i) => {
                i.addListener(eventName, (e) => this._zone.run(() => observer.next(e)));
            });
        });
    }
}
InfoWindowManager.decorators = [
    { type: Injectable }
];
InfoWindowManager.ctorParameters = () => [
    { type: GoogleMapsAPIWrapper },
    { type: NgZone },
    { type: MarkerManager }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mby13aW5kb3ctbWFuYWdlci5qcyIsInNvdXJjZVJvb3QiOiJEOi9BdXRvbWF0aW9uL2FuZ3VsYXItZ29vZ2xlLW1hcHMvcGFja2FnZXMvY29yZS9zcmMvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvbWFuYWdlcnMvaW5mby13aW5kb3ctbWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEVBQUUsVUFBVSxFQUFZLE1BQU0sTUFBTSxDQUFDO0FBSTVDLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUdqRCxNQUFNLE9BQU8saUJBQWlCO0lBSTVCLFlBQ1ksWUFBa0MsRUFBVSxLQUFhLEVBQ3pELGNBQTZCO1FBRDdCLGlCQUFZLEdBQVosWUFBWSxDQUFzQjtRQUFVLFVBQUssR0FBTCxLQUFLLENBQVE7UUFDekQsbUJBQWMsR0FBZCxjQUFjLENBQWU7UUFMakMsaUJBQVksR0FDaEIsSUFBSSxHQUFHLEVBQWtELENBQUM7SUFJbEIsQ0FBQztJQUU3QyxnQkFBZ0IsQ0FBQyxVQUF5QjtRQUN4QyxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNsRCxJQUFJLE9BQU8sSUFBSSxJQUFJLEVBQUU7WUFDbkIsOEJBQThCO1lBQzlCLE9BQU8sT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQzFCO1FBQ0QsT0FBTyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBeUIsRUFBRSxFQUFFO1lBQ2hELE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFO2dCQUN6QixDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQ1YsSUFBSSxDQUFDLFlBQVksQ0FB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SSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLGlCQUFpQixDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUVBOztPQUVHO0lBQ0oscUJBQXFCLENBQUksU0FBaUIsRUFBRSxVQUF5QjtRQUNuRSxPQUFPLElBQUksVUFBVSxDQUFDLENBQUMsUUFBcUIsRUFBRSxFQUFFO1lBQzlDLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQXlCLEVBQUUsRUFBRTtnQkFDbkUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzdFLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDOzs7WUE3RUYsVUFBVTs7O1lBSEYsb0JBQW9CO1lBTFIsTUFBTTtZQU1sQixhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUsIE9ic2VydmVyIH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQgeyBBZ21JbmZvV2luZG93IH0gZnJvbSAnLi4vLi4vZGlyZWN0aXZlcy9pbmZvLXdpbmRvdyc7XHJcblxyXG5pbXBvcnQgeyBHb29nbGVNYXBzQVBJV3JhcHBlciB9IGZyb20gJy4uL2dvb2dsZS1tYXBzLWFwaS13cmFwcGVyJztcclxuaW1wb3J0IHsgTWFya2VyTWFuYWdlciB9IGZyb20gJy4vbWFya2VyLW1hbmFnZXInO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgSW5mb1dpbmRvd01hbmFnZXIge1xyXG4gIHByaXZhdGUgX2luZm9XaW5kb3dzOiBNYXA8QWdtSW5mb1dpbmRvdywgUHJvbWlzZTxnb29nbGUubWFwcy5JbmZvV2luZG93Pj4gPVxyXG4gICAgICBuZXcgTWFwPEFnbUluZm9XaW5kb3csIFByb21pc2U8Z29vZ2xlLm1hcHMuSW5mb1dpbmRvdz4+KCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgICBwcml2YXRlIF9tYXBzV3JhcHBlcjogR29vZ2xlTWFwc0FQSVdyYXBwZXIsIHByaXZhdGUgX3pvbmU6IE5nWm9uZSxcclxuICAgICAgcHJpdmF0ZSBfbWFya2VyTWFuYWdlcjogTWFya2VyTWFuYWdlcikge31cclxuXHJcbiAgZGVsZXRlSW5mb1dpbmRvdyhpbmZvV2luZG93OiBBZ21JbmZvV2luZG93KTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICBjb25zdCBpV2luZG93ID0gdGhpcy5faW5mb1dpbmRvd3MuZ2V0KGluZm9XaW5kb3cpO1xyXG4gICAgaWYgKGlXaW5kb3cgPT0gbnVsbCkge1xyXG4gICAgICAvLyBpbmZvIHdpbmRvdyBhbHJlYWR5IGRlbGV0ZWRcclxuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGlXaW5kb3cudGhlbigoaTogZ29vZ2xlLm1hcHMuSW5mb1dpbmRvdykgPT4ge1xyXG4gICAgICByZXR1cm4gdGhpcy5fem9uZS5ydW4oKCkgPT4ge1xyXG4gICAgICAgIGkuY2xvc2UoKTtcclxuICAgICAgICB0aGlzLl9pbmZvV2luZG93cy5kZWxldGUoaW5mb1dpbmRvdyk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBzZXRQb3NpdGlvbihpbmZvV2luZG93OiBBZ21JbmZvV2luZG93KTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICByZXR1cm4gdGhpcy5faW5mb1dpbmRvd3MuZ2V0KGluZm9XaW5kb3cpLnRoZW4oKGk6IGdvb2dsZS5tYXBzLkluZm9XaW5kb3cpID0+IGkuc2V0UG9zaXRpb24oe1xyXG4gICAgICBsYXQ6IGluZm9XaW5kb3cubGF0aXR1ZGUsXHJcbiAgICAgIGxuZzogaW5mb1dpbmRvdy5sb25naXR1ZGUsXHJcbiAgICB9KSk7XHJcbiAgfVxyXG5cclxuICBzZXRaSW5kZXgoaW5mb1dpbmRvdzogQWdtSW5mb1dpbmRvdyk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX2luZm9XaW5kb3dzLmdldChpbmZvV2luZG93KVxyXG4gICAgICAgIC50aGVuKChpOiBnb29nbGUubWFwcy5JbmZvV2luZG93KSA9PiBpLnNldFpJbmRleChpbmZvV2luZG93LnpJbmRleCkpO1xyXG4gIH1cclxuXHJcbiAgb3BlbihpbmZvV2luZG93OiBBZ21JbmZvV2luZG93KTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICByZXR1cm4gdGhpcy5faW5mb1dpbmRvd3MuZ2V0KGluZm9XaW5kb3cpLnRoZW4oKHcpID0+IHtcclxuICAgICAgaWYgKGluZm9XaW5kb3cuaG9zdE1hcmtlciAhPSBudWxsKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcmtlck1hbmFnZXIuZ2V0TmF0aXZlTWFya2VyKGluZm9XaW5kb3cuaG9zdE1hcmtlcikudGhlbigobWFya2VyKSA9PiB7XHJcbiAgICAgICAgICByZXR1cm4gdGhpcy5fbWFwc1dyYXBwZXIuZ2V0TmF0aXZlTWFwKCkudGhlbigobWFwKSA9PiB3Lm9wZW4obWFwLCBtYXJrZXIpKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdGhpcy5fbWFwc1dyYXBwZXIuZ2V0TmF0aXZlTWFwKCkudGhlbigobWFwKSA9PiB3Lm9wZW4obWFwKSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGNsb3NlKGluZm9XaW5kb3c6IEFnbUluZm9XaW5kb3cpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIHJldHVybiB0aGlzLl9pbmZvV2luZG93cy5nZXQoaW5mb1dpbmRvdykudGhlbigodykgPT4gdy5jbG9zZSgpKTtcclxuICB9XHJcblxyXG4gIHNldE9wdGlvbnMoaW5mb1dpbmRvdzogQWdtSW5mb1dpbmRvdywgb3B0aW9uczogZ29vZ2xlLm1hcHMuSW5mb1dpbmRvd09wdGlvbnMpIHtcclxuICAgIHJldHVybiB0aGlzLl9pbmZvV2luZG93cy5nZXQoaW5mb1dpbmRvdykudGhlbigoaTogZ29vZ2xlLm1hcHMuSW5mb1dpbmRvdykgPT4gaS5zZXRPcHRpb25zKG9wdGlvbnMpKTtcclxuICB9XHJcblxyXG4gIGFkZEluZm9XaW5kb3coaW5mb1dpbmRvdzogQWdtSW5mb1dpbmRvdykge1xyXG4gICAgY29uc3Qgb3B0aW9uczogZ29vZ2xlLm1hcHMuSW5mb1dpbmRvd09wdGlvbnMgPSB7XHJcbiAgICAgIGNvbnRlbnQ6IGluZm9XaW5kb3cuY29udGVudCxcclxuICAgICAgbWF4V2lkdGg6IGluZm9XaW5kb3cubWF4V2lkdGgsXHJcbiAgICAgIHpJbmRleDogaW5mb1dpbmRvdy56SW5kZXgsXHJcbiAgICAgIGRpc2FibGVBdXRvUGFuOiBpbmZvV2luZG93LmRpc2FibGVBdXRvUGFuLFxyXG4gICAgfTtcclxuICAgIGlmICh0eXBlb2YgaW5mb1dpbmRvdy5sYXRpdHVkZSA9PT0gJ251bWJlcicgJiYgdHlwZW9mIGluZm9XaW5kb3cubG9uZ2l0dWRlID09PSAnbnVtYmVyJykge1xyXG4gICAgICBvcHRpb25zLnBvc2l0aW9uID0ge2xhdDogaW5mb1dpbmRvdy5sYXRpdHVkZSwgbG5nOiBpbmZvV2luZG93LmxvbmdpdHVkZX07XHJcbiAgICB9XHJcbiAgICBjb25zdCBpbmZvV2luZG93UHJvbWlzZSA9IHRoaXMuX21hcHNXcmFwcGVyLmNyZWF0ZUluZm9XaW5kb3cob3B0aW9ucyk7XHJcbiAgICB0aGlzLl9pbmZvV2luZG93cy5zZXQoaW5mb1dpbmRvdywgaW5mb1dpbmRvd1Byb21pc2UpO1xyXG4gIH1cclxuXHJcbiAgIC8qKlxyXG4gICAgKiBDcmVhdGVzIGEgR29vZ2xlIE1hcHMgZXZlbnQgbGlzdGVuZXIgZm9yIHRoZSBnaXZlbiBJbmZvV2luZG93IGFzIGFuIE9ic2VydmFibGVcclxuICAgICovXHJcbiAgY3JlYXRlRXZlbnRPYnNlcnZhYmxlPFQ+KGV2ZW50TmFtZTogc3RyaW5nLCBpbmZvV2luZG93OiBBZ21JbmZvV2luZG93KTogT2JzZXJ2YWJsZTxUPiB7XHJcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoKG9ic2VydmVyOiBPYnNlcnZlcjxUPikgPT4ge1xyXG4gICAgICB0aGlzLl9pbmZvV2luZG93cy5nZXQoaW5mb1dpbmRvdykudGhlbigoaTogZ29vZ2xlLm1hcHMuSW5mb1dpbmRvdykgPT4ge1xyXG4gICAgICAgIGkuYWRkTGlzdGVuZXIoZXZlbnROYW1lLCAoZTogVCkgPT4gdGhpcy5fem9uZS5ydW4oKCkgPT4gb2JzZXJ2ZXIubmV4dChlKSkpO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=