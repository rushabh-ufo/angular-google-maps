import { __awaiter } from "tslib";
import { GoogleMapsAPIWrapper, MarkerManager } from '@agm/core';
import { Injectable, NgZone } from '@angular/core';
import MarkerClusterer from '@google/markerclustererplus';
import { Observable } from 'rxjs';
export class ClusterManager extends MarkerManager {
    constructor(_mapsWrapper, _zone) {
        super(_mapsWrapper, _zone);
        this._mapsWrapper = _mapsWrapper;
        this._zone = _zone;
        this._clustererInstance = new Promise((resolver) => {
            this._resolver = resolver;
        });
    }
    init(options) {
        this._mapsWrapper.getNativeMap().then(map => {
            const clusterer = new MarkerClusterer(map, [], options);
            this._resolver(clusterer);
        });
    }
    getClustererInstance() {
        return this._clustererInstance;
    }
    addMarker(markerDirective) {
        const clusterPromise = this.getClustererInstance();
        const markerPromise = this._mapsWrapper
            .createMarker({
            position: {
                lat: markerDirective.latitude,
                lng: markerDirective.longitude,
            },
            label: markerDirective.label,
            draggable: markerDirective.draggable,
            icon: markerDirective.iconUrl,
            opacity: markerDirective.opacity,
            visible: markerDirective.visible,
            zIndex: markerDirective.zIndex,
            title: markerDirective.title,
            clickable: markerDirective.clickable,
        }, false);
        Promise
            .all([clusterPromise, markerPromise])
            .then(([cluster, marker]) => cluster.addMarker(marker));
        this._markers.set(markerDirective, markerPromise);
    }
    deleteMarker(marker) {
        const markerPromise = this._markers.get(marker);
        if (markerPromise == null) {
            // marker already deleted
            return Promise.resolve();
        }
        return markerPromise.then((m) => {
            this._zone.run(() => {
                m.setMap(null);
                this.getClustererInstance().then(cluster => {
                    cluster.removeMarker(m);
                    this._markers.delete(marker);
                });
            });
        });
    }
    clearMarkers() {
        return this.getClustererInstance().then(cluster => {
            cluster.clearMarkers();
        });
    }
    setGridSize(c) {
        this.getClustererInstance().then(cluster => {
            cluster.setGridSize(c.gridSize);
        });
    }
    setMaxZoom(c) {
        this.getClustererInstance().then(cluster => {
            cluster.setMaxZoom(c.maxZoom);
        });
    }
    setStyles(c) {
        this.getClustererInstance().then(cluster => {
            cluster.setStyles(c.styles);
        });
    }
    setZoomOnClick(c) {
        this.getClustererInstance().then(cluster => {
            if (c.zoomOnClick !== undefined) {
                cluster.setZoomOnClick(c.zoomOnClick);
            }
        });
    }
    setAverageCenter(c) {
        this.getClustererInstance().then(cluster => {
            if (c.averageCenter !== undefined) {
                cluster.setAverageCenter(c.averageCenter);
            }
        });
    }
    setImagePath(c) {
        this.getClustererInstance().then(cluster => {
            if (c.imagePath !== undefined) {
                cluster.setImagePath(c.imagePath);
            }
        });
    }
    setMinimumClusterSize(c) {
        this.getClustererInstance().then(cluster => {
            if (c.minimumClusterSize !== undefined) {
                cluster.setMinimumClusterSize(c.minimumClusterSize);
            }
        });
    }
    setImageExtension(c) {
        this.getClustererInstance().then(cluster => {
            if (c.imageExtension !== undefined) {
                cluster.setImageExtension(c.imageExtension);
            }
        });
    }
    createClusterEventObservable(eventName) {
        return new Observable((subscriber) => {
            this._zone.runOutsideAngular(() => {
                this._clustererInstance.then((m) => {
                    m.addListener(eventName, (e) => this._zone.run(() => subscriber.next(e)));
                });
            });
        });
    }
    setCalculator(c) {
        this.getClustererInstance().then(cluster => {
            if (typeof c.calculator === 'function') {
                cluster.setCalculator(c.calculator);
            }
        });
    }
    setClusterClass(c) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof c.clusterClass !== 'undefined') {
                const instance = yield this.getClustererInstance();
                instance.setClusterClass(c.clusterClass);
            }
        });
    }
    setEnableRetinaIcons(c) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof c.enableRetinaIcons !== 'undefined') {
                const instance = yield this.getClustererInstance();
                instance.setEnableRetinaIcons(c.enableRetinaIcons);
            }
        });
    }
    setIgnoreHidden(c) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof c.ignoreHidden !== 'undefined') {
                const instance = yield this.getClustererInstance();
                instance.setIgnoreHidden(c.ignoreHidden);
            }
        });
    }
    setImageSizes(c) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof c.imageSizes !== 'undefined') {
                const instance = yield this.getClustererInstance();
                instance.setImageSizes(c.imageSizes);
            }
        });
    }
    setTitle(c) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof c.title !== 'undefined') {
                const instance = yield this.getClustererInstance();
                instance.setTitle(c.title);
            }
        });
    }
}
ClusterManager.decorators = [
    { type: Injectable }
];
ClusterManager.ctorParameters = () => [
    { type: GoogleMapsAPIWrapper },
    { type: NgZone }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2x1c3Rlci1tYW5hZ2VyLmpzIiwic291cmNlUm9vdCI6IkQ6L0F1dG9tYXRpb24vYW5ndWxhci1nb29nbGUtbWFwcy9wYWNrYWdlcy9tYXJrZXJjbHVzdGVyZXIvc3JjLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL21hbmFnZXJzL2NsdXN0ZXItbWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFhLG9CQUFvQixFQUFFLGFBQWEsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUMzRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVuRCxPQUFPLGVBQWUsTUFBTSw2QkFBNkIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsVUFBVSxFQUFjLE1BQU0sTUFBTSxDQUFDO0FBSTlDLE1BQU0sT0FBTyxjQUFlLFNBQVEsYUFBYTtJQUkvQyxZQUFzQixZQUFrQyxFQUFZLEtBQWE7UUFDL0UsS0FBSyxDQUFDLFlBQVksRUFBRSxLQUFLLENBQUMsQ0FBQztRQURQLGlCQUFZLEdBQVosWUFBWSxDQUFzQjtRQUFZLFVBQUssR0FBTCxLQUFLLENBQVE7UUFFL0UsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksT0FBTyxDQUFrQixDQUFDLFFBQVEsRUFBRSxFQUFFO1lBQ2xFLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO1FBQzVCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELElBQUksQ0FBQyxPQUErQjtRQUNsQyxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUMxQyxNQUFNLFNBQVMsR0FBRyxJQUFJLGVBQWUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQ3hELElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDNUIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsb0JBQW9C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QUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUM1QjtRQUNILENBQUM7S0FBQTs7O1lBbkxGLFVBQVU7OztZQVBTLG9CQUFvQjtZQUNuQixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWdtTWFya2VyLCBHb29nbGVNYXBzQVBJV3JhcHBlciwgTWFya2VyTWFuYWdlciB9IGZyb20gJ0BhZ20vY29yZSc7XHJcbmltcG9ydCB7IEluamVjdGFibGUsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBNYXJrZXJDbHVzdGVyZXJPcHRpb25zIH0gZnJvbSAnQGdvb2dsZS9tYXJrZXJjbHVzdGVyZXJwbHVzJztcclxuaW1wb3J0IE1hcmtlckNsdXN0ZXJlciBmcm9tICdAZ29vZ2xlL21hcmtlcmNsdXN0ZXJlcnBsdXMnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJzY3JpYmVyIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IEFnbU1hcmtlckNsdXN0ZXIgfSBmcm9tICcuLi8uLi9kaXJlY3RpdmVzL21hcmtlci1jbHVzdGVyJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIENsdXN0ZXJNYW5hZ2VyIGV4dGVuZHMgTWFya2VyTWFuYWdlciB7XHJcbiAgcHJpdmF0ZSBfY2x1c3RlcmVySW5zdGFuY2U6IFByb21pc2U8TWFya2VyQ2x1c3RlcmVyPjtcclxuICBwcml2YXRlIF9yZXNvbHZlcjogKGNsdXN0ZXI6IE1hcmtlckNsdXN0ZXJlcikgPT4gdm9pZDtcclxuXHJcbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIF9tYXBzV3JhcHBlcjogR29vZ2xlTWFwc0FQSVdyYXBwZXIsIHByb3RlY3RlZCBfem9uZTogTmdab25lKSB7XHJcbiAgICBzdXBlcihfbWFwc1dyYXBwZXIsIF96b25lKTtcclxuICAgIHRoaXMuX2NsdXN0ZXJlckluc3RhbmNlID0gbmV3IFByb21pc2U8TWFya2VyQ2x1c3RlcmVyPigocmVzb2x2ZXIpID0+IHtcclxuICAgICAgdGhpcy5fcmVzb2x2ZXIgPSByZXNvbHZlcjtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgaW5pdChvcHRpb25zOiBNYXJrZXJDbHVzdGVyZXJPcHRpb25zKTogdm9pZCB7XHJcbiAgICB0aGlzLl9tYXBzV3JhcHBlci5nZXROYXRpdmVNYXAoKS50aGVuKG1hcCA9PiB7XHJcbiAgICAgIGNvbnN0IGNsdXN0ZXJlciA9IG5ldyBNYXJrZXJDbHVzdGVyZXIobWFwLCBbXSwgb3B0aW9ucyk7XHJcbiAgICAgIHRoaXMuX3Jlc29sdmVyKGNsdXN0ZXJlcik7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGdldENsdXN0ZXJlckluc3RhbmNlKCk6IFByb21pc2U8TWFya2VyQ2x1c3RlcmVyPiB7XHJcbiAgICByZXR1cm4gdGhpcy5fY2x1c3RlcmVySW5zdGFuY2U7XHJcbiAgfVxyXG5cclxuICBhZGRNYXJrZXIobWFya2VyRGlyZWN0aXZlOiBBZ21NYXJrZXIpOiB2b2lkIHtcclxuICAgIGNvbnN0IGNsdXN0ZXJQcm9taXNlOiBQcm9taXNlPE1hcmtlckNsdXN0ZXJlcj4gPSB0aGlzLmdldENsdXN0ZXJlckluc3RhbmNlKCk7XHJcbiAgICBjb25zdCBtYXJrZXJQcm9taXNlID0gdGhpcy5fbWFwc1dyYXBwZXJcclxuICAgICAgLmNyZWF0ZU1hcmtlcih7XHJcbiAgICAgICAgcG9zaXRpb246IHtcclxuICAgICAgICAgIGxhdDogbWFya2VyRGlyZWN0aXZlLmxhdGl0dWRlLFxyXG4gICAgICAgICAgbG5nOiBtYXJrZXJEaXJlY3RpdmUubG9uZ2l0dWRlLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbGFiZWw6IG1hcmtlckRpcmVjdGl2ZS5sYWJlbCxcclxuICAgICAgICBkcmFnZ2FibGU6IG1hcmtlckRpcmVjdGl2ZS5kcmFnZ2FibGUsXHJcbiAgICAgICAgaWNvbjogbWFya2VyRGlyZWN0aXZlLmljb25VcmwsXHJcbiAgICAgICAgb3BhY2l0eTogbWFya2VyRGlyZWN0aXZlLm9wYWNpdHksXHJcbiAgICAgICAgdmlzaWJsZTogbWFya2VyRGlyZWN0aXZlLnZpc2libGUsXHJcbiAgICAgICAgekluZGV4OiBtYXJrZXJEaXJlY3RpdmUuekluZGV4LFxyXG4gICAgICAgIHRpdGxlOiBtYXJrZXJEaXJlY3RpdmUudGl0bGUsXHJcbiAgICAgICAgY2xpY2thYmxlOiBtYXJrZXJEaXJlY3RpdmUuY2xpY2thYmxlLFxyXG4gICAgICB9LCBmYWxzZSk7XHJcblxyXG4gICAgUHJvbWlzZVxyXG4gICAgICAuYWxsKFtjbHVzdGVyUHJvbWlzZSwgbWFya2VyUHJvbWlzZV0pXHJcbiAgICAgIC50aGVuKChbY2x1c3RlciwgbWFya2VyXSkgPT4gY2x1c3Rlci5hZGRNYXJrZXIobWFya2VyKSk7XHJcbiAgICB0aGlzLl9tYXJrZXJzLnNldChtYXJrZXJEaXJlY3RpdmUsIG1hcmtlclByb21pc2UpO1xyXG4gIH1cclxuXHJcbiAgZGVsZXRlTWFya2VyKG1hcmtlcjogQWdtTWFya2VyKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICBjb25zdCBtYXJrZXJQcm9taXNlID0gdGhpcy5fbWFya2Vycy5nZXQobWFya2VyKTtcclxuICAgIGlmIChtYXJrZXJQcm9taXNlID09IG51bGwpIHtcclxuICAgICAgLy8gbWFya2VyIGFscmVhZHkgZGVsZXRlZFxyXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbWFya2VyUHJvbWlzZS50aGVuKChtOiBnb29nbGUubWFwcy5NYXJrZXIpID0+IHtcclxuICAgICAgdGhpcy5fem9uZS5ydW4oKCkgPT4ge1xyXG4gICAgICAgIG0uc2V0TWFwKG51bGwpO1xyXG4gICAgICAgIHRoaXMuZ2V0Q2x1c3RlcmVySW5zdGFuY2UoKS50aGVuKGNsdXN0ZXIgPT4ge1xyXG4gICAgICAgICAgY2x1c3Rlci5yZW1vdmVNYXJrZXIobSk7XHJcbiAgICAgICAgICB0aGlzLl9tYXJrZXJzLmRlbGV0ZShtYXJrZXIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgY2xlYXJNYXJrZXJzKCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgcmV0dXJuIHRoaXMuZ2V0Q2x1c3RlcmVySW5zdGFuY2UoKS50aGVuKGNsdXN0ZXIgPT4ge1xyXG4gICAgICBjbHVzdGVyLmNsZWFyTWFya2VycygpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBzZXRHcmlkU2l6ZShjOiBBZ21NYXJrZXJDbHVzdGVyKTogdm9pZCB7XHJcbiAgICB0aGlzLmdldENsdXN0ZXJlckluc3RhbmNlKCkudGhlbihjbHVzdGVyID0+IHtcclxuICAgICAgY2x1c3Rlci5zZXRHcmlkU2l6ZShjLmdyaWRTaXplKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgc2V0TWF4Wm9vbShjOiBBZ21NYXJrZXJDbHVzdGVyKTogdm9pZCB7XHJcbiAgICB0aGlzLmdldENsdXN0ZXJlckluc3RhbmNlKCkudGhlbihjbHVzdGVyID0+IHtcclxuICAgICAgY2x1c3Rlci5zZXRNYXhab29tKGMubWF4Wm9vbSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHNldFN0eWxlcyhjOiBBZ21NYXJrZXJDbHVzdGVyKTogdm9pZCB7XHJcbiAgICB0aGlzLmdldENsdXN0ZXJlckluc3RhbmNlKCkudGhlbihjbHVzdGVyID0+IHtcclxuICAgICAgY2x1c3Rlci5zZXRTdHlsZXMoYy5zdHlsZXMpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBzZXRab29tT25DbGljayhjOiBBZ21NYXJrZXJDbHVzdGVyKTogdm9pZCB7XHJcbiAgICB0aGlzLmdldENsdXN0ZXJlckluc3RhbmNlKCkudGhlbihjbHVzdGVyID0+IHtcclxuICAgICAgaWYgKGMuem9vbU9uQ2xpY2sgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGNsdXN0ZXIuc2V0Wm9vbU9uQ2xpY2soYy56b29tT25DbGljayk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgc2V0QXZlcmFnZUNlbnRlcihjOiBBZ21NYXJrZXJDbHVzdGVyKTogdm9pZCB7XHJcbiAgICB0aGlzLmdldENsdXN0ZXJlckluc3RhbmNlKCkudGhlbihjbHVzdGVyID0+IHtcclxuICAgICAgaWYgKGMuYXZlcmFnZUNlbnRlciAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgY2x1c3Rlci5zZXRBdmVyYWdlQ2VudGVyKGMuYXZlcmFnZUNlbnRlcik7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgc2V0SW1hZ2VQYXRoKGM6IEFnbU1hcmtlckNsdXN0ZXIpOiB2b2lkIHtcclxuICAgIHRoaXMuZ2V0Q2x1c3RlcmVySW5zdGFuY2UoKS50aGVuKGNsdXN0ZXIgPT4ge1xyXG4gICAgICBpZiAoYy5pbWFnZVBhdGggIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGNsdXN0ZXIuc2V0SW1hZ2VQYXRoKGMuaW1hZ2VQYXRoKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBzZXRNaW5pbXVtQ2x1c3RlclNpemUoYzogQWdtTWFya2VyQ2x1c3Rlcik6IHZvaWQge1xyXG4gICAgdGhpcy5nZXRDbHVzdGVyZXJJbnN0YW5jZSgpLnRoZW4oY2x1c3RlciA9PiB7XHJcbiAgICAgIGlmIChjLm1pbmltdW1DbHVzdGVyU2l6ZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgY2x1c3Rlci5zZXRNaW5pbXVtQ2x1c3RlclNpemUoYy5taW5pbXVtQ2x1c3RlclNpemUpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHNldEltYWdlRXh0ZW5zaW9uKGM6IEFnbU1hcmtlckNsdXN0ZXIpOiB2b2lkIHtcclxuICAgIHRoaXMuZ2V0Q2x1c3RlcmVySW5zdGFuY2UoKS50aGVuKGNsdXN0ZXIgPT4ge1xyXG4gICAgICBpZiAoYy5pbWFnZUV4dGVuc2lvbiAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgY2x1c3Rlci5zZXRJbWFnZUV4dGVuc2lvbihjLmltYWdlRXh0ZW5zaW9uKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBjcmVhdGVDbHVzdGVyRXZlbnRPYnNlcnZhYmxlPFQ+KGV2ZW50TmFtZTogc3RyaW5nKTogT2JzZXJ2YWJsZTxUPiB7XHJcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoKHN1YnNjcmliZXI6IFN1YnNjcmliZXI8VD4pID0+IHtcclxuICAgICAgdGhpcy5fem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5fY2x1c3RlcmVySW5zdGFuY2UudGhlbigobTogTWFya2VyQ2x1c3RlcmVyKSA9PiB7XHJcbiAgICAgICAgICBtLmFkZExpc3RlbmVyKGV2ZW50TmFtZSwgKGU6IFQpID0+IHRoaXMuX3pvbmUucnVuKCgpID0+IHN1YnNjcmliZXIubmV4dChlKSkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgc2V0Q2FsY3VsYXRvcihjOiBBZ21NYXJrZXJDbHVzdGVyKTogdm9pZCB7XHJcbiAgICB0aGlzLmdldENsdXN0ZXJlckluc3RhbmNlKCkudGhlbihjbHVzdGVyID0+IHtcclxuICAgICAgaWYgKHR5cGVvZiBjLmNhbGN1bGF0b3IgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICBjbHVzdGVyLnNldENhbGN1bGF0b3IoYy5jYWxjdWxhdG9yKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBhc3luYyBzZXRDbHVzdGVyQ2xhc3MoYzogQWdtTWFya2VyQ2x1c3Rlcikge1xyXG4gICAgaWYgKHR5cGVvZiBjLmNsdXN0ZXJDbGFzcyAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgY29uc3QgaW5zdGFuY2UgPSBhd2FpdCB0aGlzLmdldENsdXN0ZXJlckluc3RhbmNlKCk7XHJcbiAgICAgIGluc3RhbmNlLnNldENsdXN0ZXJDbGFzcyhjLmNsdXN0ZXJDbGFzcyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhc3luYyBzZXRFbmFibGVSZXRpbmFJY29ucyhjOiBBZ21NYXJrZXJDbHVzdGVyKSB7XHJcbiAgICBpZiAodHlwZW9mIGMuZW5hYmxlUmV0aW5hSWNvbnMgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgIGNvbnN0IGluc3RhbmNlID0gYXdhaXQgdGhpcy5nZXRDbHVzdGVyZXJJbnN0YW5jZSgpO1xyXG4gICAgICBpbnN0YW5jZS5zZXRFbmFibGVSZXRpbmFJY29ucyhjLmVuYWJsZVJldGluYUljb25zKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFzeW5jIHNldElnbm9yZUhpZGRlbihjOiBBZ21NYXJrZXJDbHVzdGVyKSB7XHJcbiAgICBpZiAodHlwZW9mIGMuaWdub3JlSGlkZGVuICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICBjb25zdCBpbnN0YW5jZSA9IGF3YWl0IHRoaXMuZ2V0Q2x1c3RlcmVySW5zdGFuY2UoKTtcclxuICAgICAgaW5zdGFuY2Uuc2V0SWdub3JlSGlkZGVuKGMuaWdub3JlSGlkZGVuKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFzeW5jIHNldEltYWdlU2l6ZXMoYzogQWdtTWFya2VyQ2x1c3Rlcikge1xyXG4gICAgaWYgKHR5cGVvZiBjLmltYWdlU2l6ZXMgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgIGNvbnN0IGluc3RhbmNlID0gYXdhaXQgdGhpcy5nZXRDbHVzdGVyZXJJbnN0YW5jZSgpO1xyXG4gICAgICBpbnN0YW5jZS5zZXRJbWFnZVNpemVzKGMuaW1hZ2VTaXplcyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhc3luYyBzZXRUaXRsZShjOiBBZ21NYXJrZXJDbHVzdGVyKSB7XHJcbiAgICBpZiAodHlwZW9mIGMudGl0bGUgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgIGNvbnN0IGluc3RhbmNlID0gYXdhaXQgdGhpcy5nZXRDbHVzdGVyZXJJbnN0YW5jZSgpO1xyXG4gICAgICBpbnN0YW5jZS5zZXRUaXRsZShjLnRpdGxlKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19