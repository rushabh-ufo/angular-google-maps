import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { GoogleMapsAPIWrapper } from './../google-maps-api-wrapper';
/**
 * Manages all Data Layers for a Google Map instance.
 */
export class DataLayerManager {
    constructor(_wrapper, _zone) {
        this._wrapper = _wrapper;
        this._zone = _zone;
        this._layers = new Map();
    }
    /**
     * Adds a new Data Layer to the map.
     */
    addDataLayer(layer) {
        const newLayer = this._wrapper.createDataLayer({
            style: layer.style,
        })
            .then(d => {
            if (layer.geoJson) {
                // NOTE: accessing "features" on google.maps.Data is undocumented
                this.getDataFeatures(d, layer.geoJson).then(features => d.features = features);
            }
            return d;
        });
        this._layers.set(layer, newLayer);
    }
    deleteDataLayer(layer) {
        this._layers.get(layer).then(l => {
            l.setMap(null);
            this._layers.delete(layer);
        });
    }
    updateGeoJson(layer, geoJson) {
        this._layers.get(layer).then(l => {
            l.forEach(feature => {
                l.remove(feature);
                // NOTE: accessing "features" on google.maps.Data is undocumented
                const index = l.features.indexOf(feature, 0);
                if (index > -1) {
                    l.features.splice(index, 1);
                }
            });
            this.getDataFeatures(l, geoJson).then(features => l.features = features);
        });
    }
    setDataOptions(layer, options) {
        this._layers.get(layer).then(l => {
            l.setControlPosition(options.controlPosition);
            l.setControls(options.controls);
            l.setDrawingMode(options.drawingMode);
            l.setStyle(options.style);
        });
    }
    /**
     * Creates a Google Maps event listener for the given DataLayer as an Observable
     */
    createEventObservable(eventName, layer) {
        return new Observable((observer) => {
            this._layers.get(layer).then((d) => {
                d.addListener(eventName, (e) => this._zone.run(() => observer.next(e)));
            });
        });
    }
    /**
     * Extract features from a geoJson using google.maps Data Class
     * @param d : google.maps.Data class instance
     * @param geoJson : url or geojson object
     */
    getDataFeatures(d, geoJson) {
        return new Promise((resolve, reject) => {
            if (typeof geoJson === 'object') {
                try {
                    const features = d.addGeoJson(geoJson);
                    resolve(features);
                }
                catch (e) {
                    reject(e);
                }
            }
            else if (typeof geoJson === 'string') {
                d.loadGeoJson(geoJson, null, resolve);
            }
            else {
                reject(`Impossible to extract features from geoJson: wrong argument type`);
            }
        });
    }
}
DataLayerManager.decorators = [
    { type: Injectable }
];
DataLayerManager.ctorParameters = () => [
    { type: GoogleMapsAPIWrapper },
    { type: NgZone }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS1sYXllci1tYW5hZ2VyLmpzIiwic291cmNlUm9vdCI6IkQ6L0F1dG9tYXRpb24vYW5ndWxhci1nb29nbGUtbWFwcy9wYWNrYWdlcy9jb3JlL3NyYy8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9tYW5hZ2Vycy9kYXRhLWxheWVyLW1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxFQUFFLFVBQVUsRUFBWSxNQUFNLE1BQU0sQ0FBQztBQUc1QyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUVwRTs7R0FFRztBQUVILE1BQU0sT0FBTyxnQkFBZ0I7SUFJM0IsWUFBb0IsUUFBOEIsRUFBVSxLQUFhO1FBQXJELGFBQVEsR0FBUixRQUFRLENBQXNCO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBUTtRQUhqRSxZQUFPLEdBQ2YsSUFBSSxHQUFHLEVBQTJDLENBQUM7SUFFMEIsQ0FBQztJQUU5RTs7T0FFRztJQUNILFlBQVksQ0FBQyxLQUFtQjtRQUM5QixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQztZQUM3QyxLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUs7U0FDYSxDQUFDO2FBQ2pDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNSLElBQUksS0FBSyxDQUFDLE9BQU8sRUFBRTtnQkFDakIsaUVBQWlFO2dCQUNqRSxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUUsQ0FBUyxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUMsQ0FBQzthQUN6RjtZQUNELE9BQU8sQ0FBQyxDQUFDO1FBQ1gsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxL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LE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDWDthQUNGO2lCQUFNLElBQUksT0FBTyxPQUFPLEtBQUssUUFBUSxFQUFFO2dCQUN0QyxDQUFDLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7YUFDdkM7aUJBQU07Z0JBQ0wsTUFBTSxDQUFDLGtFQUFrRSxDQUFDLENBQUM7YUFDNUU7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7OztZQXZGRixVQUFVOzs7WUFMRixvQkFBb0I7WUFKUixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUsIE9ic2VydmVyIH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQgeyBBZ21EYXRhTGF5ZXIgfSBmcm9tICcuLy4uLy4uL2RpcmVjdGl2ZXMvZGF0YS1sYXllcic7XHJcbmltcG9ydCB7IEdvb2dsZU1hcHNBUElXcmFwcGVyIH0gZnJvbSAnLi8uLi9nb29nbGUtbWFwcy1hcGktd3JhcHBlcic7XHJcblxyXG4vKipcclxuICogTWFuYWdlcyBhbGwgRGF0YSBMYXllcnMgZm9yIGEgR29vZ2xlIE1hcCBpbnN0YW5jZS5cclxuICovXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIERhdGFMYXllck1hbmFnZXIge1xyXG4gIHByaXZhdGUgX2xheWVyczogTWFwPEFnbURhdGFMYXllciwgUHJvbWlzZTxnb29nbGUubWFwcy5EYXRhPj4gPVxyXG4gIG5ldyBNYXA8QWdtRGF0YUxheWVyLCBQcm9taXNlPGdvb2dsZS5tYXBzLkRhdGE+PigpO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF93cmFwcGVyOiBHb29nbGVNYXBzQVBJV3JhcHBlciwgcHJpdmF0ZSBfem9uZTogTmdab25lKSB7IH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkcyBhIG5ldyBEYXRhIExheWVyIHRvIHRoZSBtYXAuXHJcbiAgICovXHJcbiAgYWRkRGF0YUxheWVyKGxheWVyOiBBZ21EYXRhTGF5ZXIpIHtcclxuICAgIGNvbnN0IG5ld0xheWVyID0gdGhpcy5fd3JhcHBlci5jcmVhdGVEYXRhTGF5ZXIoe1xyXG4gICAgICBzdHlsZTogbGF5ZXIuc3R5bGUsXHJcbiAgICB9IGFzIGdvb2dsZS5tYXBzLkRhdGEuRGF0YU9wdGlvbnMpXHJcbiAgICAudGhlbihkID0+IHtcclxuICAgICAgaWYgKGxheWVyLmdlb0pzb24pIHtcclxuICAgICAgICAvLyBOT1RFOiBhY2Nlc3NpbmcgXCJmZWF0dXJlc1wiIG9uIGdvb2dsZS5tYXBzLkRhdGEgaXMgdW5kb2N1bWVudGVkXHJcbiAgICAgICAgdGhpcy5nZXREYXRhRmVhdHVyZXMoZCwgbGF5ZXIuZ2VvSnNvbikudGhlbihmZWF0dXJlcyA9PiAoZCBhcyBhbnkpLmZlYXR1cmVzID0gZmVhdHVyZXMpO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBkO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLl9sYXllcnMuc2V0KGxheWVyLCBuZXdMYXllcik7XHJcbiAgfVxyXG5cclxuICBkZWxldGVEYXRhTGF5ZXIobGF5ZXI6IEFnbURhdGFMYXllcikge1xyXG4gICAgdGhpcy5fbGF5ZXJzLmdldChsYXllcikudGhlbihsID0+IHtcclxuICAgICAgbC5zZXRNYXAobnVsbCk7XHJcbiAgICAgIHRoaXMuX2xheWVycy5kZWxldGUobGF5ZXIpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVHZW9Kc29uKGxheWVyOiBBZ21EYXRhTGF5ZXIsIGdlb0pzb246IG9iamVjdCB8IHN0cmluZykge1xyXG4gICAgdGhpcy5fbGF5ZXJzLmdldChsYXllcikudGhlbihsID0+IHtcclxuICAgICAgbC5mb3JFYWNoKGZlYXR1cmUgPT4ge1xyXG4gICAgICAgIGwucmVtb3ZlKGZlYXR1cmUpO1xyXG5cclxuICAgICAgICAvLyBOT1RFOiBhY2Nlc3NpbmcgXCJmZWF0dXJlc1wiIG9uIGdvb2dsZS5tYXBzLkRhdGEgaXMgdW5kb2N1bWVudGVkXHJcbiAgICAgICAgY29uc3QgaW5kZXggPSAobCBhcyBhbnkpLmZlYXR1cmVzLmluZGV4T2YoZmVhdHVyZSwgMCk7XHJcbiAgICAgICAgaWYgKGluZGV4ID4gLTEpIHtcclxuICAgICAgICAgIChsIGFzIGFueSkuZmVhdHVyZXMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGlzLmdldERhdGFGZWF0dXJlcyhsLCBnZW9Kc29uKS50aGVuKGZlYXR1cmVzID0+IChsIGFzIGFueSkuZmVhdHVyZXMgPSBmZWF0dXJlcyk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHNldERhdGFPcHRpb25zKGxheWVyOiBBZ21EYXRhTGF5ZXIsIG9wdGlvbnM6IGdvb2dsZS5tYXBzLkRhdGEuRGF0YU9wdGlvbnMpXHJcbiAge1xyXG4gICAgdGhpcy5fbGF5ZXJzLmdldChsYXllcikudGhlbihsID0+IHtcclxuICAgICAgbC5zZXRDb250cm9sUG9zaXRpb24ob3B0aW9ucy5jb250cm9sUG9zaXRpb24pO1xyXG4gICAgICBsLnNldENvbnRyb2xzKG9wdGlvbnMuY29udHJvbHMpO1xyXG4gICAgICBsLnNldERyYXdpbmdNb2RlKG9wdGlvbnMuZHJhd2luZ01vZGUpO1xyXG4gICAgICBsLnNldFN0eWxlKG9wdGlvbnMuc3R5bGUpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDcmVhdGVzIGEgR29vZ2xlIE1hcHMgZXZlbnQgbGlzdGVuZXIgZm9yIHRoZSBnaXZlbiBEYXRhTGF5ZXIgYXMgYW4gT2JzZXJ2YWJsZVxyXG4gICAqL1xyXG4gIGNyZWF0ZUV2ZW50T2JzZXJ2YWJsZTxUPihldmVudE5hbWU6IHN0cmluZywgbGF5ZXI6IEFnbURhdGFMYXllcik6IE9ic2VydmFibGU8VD4ge1xyXG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKChvYnNlcnZlcjogT2JzZXJ2ZXI8VD4pID0+IHtcclxuICAgICAgdGhpcy5fbGF5ZXJzLmdldChsYXllcikudGhlbigoZDogZ29vZ2xlLm1hcHMuRGF0YSkgPT4ge1xyXG4gICAgICAgIGQuYWRkTGlzdGVuZXIoZXZlbnROYW1lLCAoZTogVCkgPT4gdGhpcy5fem9uZS5ydW4oKCkgPT4gb2JzZXJ2ZXIubmV4dChlKSkpO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRXh0cmFjdCBmZWF0dXJlcyBmcm9tIGEgZ2VvSnNvbiB1c2luZyBnb29nbGUubWFwcyBEYXRhIENsYXNzXHJcbiAgICogQHBhcmFtIGQgOiBnb29nbGUubWFwcy5EYXRhIGNsYXNzIGluc3RhbmNlXHJcbiAgICogQHBhcmFtIGdlb0pzb24gOiB1cmwgb3IgZ2VvanNvbiBvYmplY3RcclxuICAgKi9cclxuICBnZXREYXRhRmVhdHVyZXMoZDogZ29vZ2xlLm1hcHMuRGF0YSwgZ2VvSnNvbjogb2JqZWN0IHwgc3RyaW5nKTogUHJvbWlzZTxnb29nbGUubWFwcy5EYXRhLkZlYXR1cmVbXT4ge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPGdvb2dsZS5tYXBzLkRhdGEuRmVhdHVyZVtdPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBnZW9Kc29uID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3QgZmVhdHVyZXMgPSBkLmFkZEdlb0pzb24oZ2VvSnNvbik7XHJcbiAgICAgICAgICAgIHJlc29sdmUoZmVhdHVyZXMpO1xyXG4gICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICByZWplY3QoZSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgZ2VvSnNvbiA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgIGQubG9hZEdlb0pzb24oZ2VvSnNvbiwgbnVsbCwgcmVzb2x2ZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHJlamVjdChgSW1wb3NzaWJsZSB0byBleHRyYWN0IGZlYXR1cmVzIGZyb20gZ2VvSnNvbjogd3JvbmcgYXJndW1lbnQgdHlwZWApO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==