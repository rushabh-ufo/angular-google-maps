import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { DataLayerManager } from './../services/managers/data-layer-manager';
let layerId = 0;
/**
 * AgmDataLayer enables the user to add data layers to the map.
 *
 * ### Example
 * ```typescript
 * import { Component } from 'angular2/core';
 * import { AgmMap, AgmDataLayer } from
 * 'angular-google-maps/core';
 *
 * @Component({
 *  selector: 'my-map-cmp',
 *  directives: [AgmMap, AgmDataLayer],
 *  styles: [`
 *    .agm-container {
 *      height: 300px;
 *    }
 * `],
 *  template: `
 * <agm-map [latitude]="lat" [longitude]="lng" [zoom]="zoom">
 * 	  <agm-data-layer [geoJson]="geoJsonObject" (layerClick)="clicked($event)" [style]="styleFunc">
 * 	  </agm-data-layer>
 * </agm-map>
 *  `
 * })
 * export class MyMapCmp {
 *   lat: number = -25.274449;
 *   lng: number = 133.775060;
 *   zoom: number = 5;
 *
 * clicked(clickEvent) {
 *    console.log(clickEvent);
 *  }
 *
 *  styleFunc(feature) {
 *    return ({
 *      clickable: false,
 *      fillColor: feature.getProperty('color'),
 *      strokeWeight: 1
 *    });
 *  }
 *
 *  geoJsonObject: Object = {
 *    "type": "FeatureCollection",
 *    "features": [
 *      {
 *        "type": "Feature",
 *        "properties": {
 *          "letter": "G",
 *          "color": "blue",
 *          "rank": "7",
 *          "ascii": "71"
 *        },
 *        "geometry": {
 *          "type": "Polygon",
 *          "coordinates": [
 *            [
 *              [123.61, -22.14], [122.38, -21.73], [121.06, -21.69], [119.66, -22.22], [119.00, -23.40],
 *              [118.65, -24.76], [118.43, -26.07], [118.78, -27.56], [119.22, -28.57], [120.23, -29.49],
 *              [121.77, -29.87], [123.57, -29.64], [124.45, -29.03], [124.71, -27.95], [124.80, -26.70],
 *              [124.80, -25.60], [123.61, -25.64], [122.56, -25.64], [121.72, -25.72], [121.81, -26.62],
 *              [121.86, -26.98], [122.60, -26.90], [123.57, -27.05], [123.57, -27.68], [123.35, -28.18],
 *              [122.51, -28.38], [121.77, -28.26], [121.02, -27.91], [120.49, -27.21], [120.14, -26.50],
 *              [120.10, -25.64], [120.27, -24.52], [120.67, -23.68], [121.72, -23.32], [122.43, -23.48],
 *              [123.04, -24.04], [124.54, -24.28], [124.58, -23.20], [123.61, -22.14]
 *            ]
 *          ]
 *        }
 *      },
 *      {
 *        "type": "Feature",
 *        "properties": {
 *          "letter": "o",
 *          "color": "red",
 *          "rank": "15",
 *          "ascii": "111"
 *        },
 *        "geometry": {
 *          "type": "Polygon",
 *          "coordinates": [
 *            [
 *              [128.84, -25.76], [128.18, -25.60], [127.96, -25.52], [127.88, -25.52], [127.70, -25.60],
 *              [127.26, -25.79], [126.60, -26.11], [126.16, -26.78], [126.12, -27.68], [126.21, -28.42],
 *              [126.69, -29.49], [127.74, -29.80], [128.80, -29.72], [129.41, -29.03], [129.72, -27.95],
 *              [129.68, -27.21], [129.33, -26.23], [128.84, -25.76]
 *            ],
 *            [
 *              [128.45, -27.44], [128.32, -26.94], [127.70, -26.82], [127.35, -27.05], [127.17, -27.80],
 *              [127.57, -28.22], [128.10, -28.42], [128.49, -27.80], [128.45, -27.44]
 *            ]
 *          ]
 *        }
 *      },
 *      {
 *        "type": "Feature",
 *        "properties": {
 *          "letter": "o",
 *          "color": "yellow",
 *          "rank": "15",
 *          "ascii": "111"
 *        },
 *        "geometry": {
 *          "type": "Polygon",
 *          "coordinates": [
 *            [
 *              [131.87, -25.76], [131.35, -26.07], [130.95, -26.78], [130.82, -27.64], [130.86, -28.53],
 *              [131.26, -29.22], [131.92, -29.76], [132.45, -29.87], [133.06, -29.76], [133.72, -29.34],
 *              [134.07, -28.80], [134.20, -27.91], [134.07, -27.21], [133.81, -26.31], [133.37, -25.83],
 *              [132.71, -25.64], [131.87, -25.76]
 *            ],
 *            [
 *              [133.15, -27.17], [132.71, -26.86], [132.09, -26.90], [131.74, -27.56], [131.79, -28.26],
 *              [132.36, -28.45], [132.93, -28.34], [133.15, -27.76], [133.15, -27.17]
 *            ]
 *          ]
 *        }
 *      },
 *      {
 *        "type": "Feature",
 *        "properties": {
 *          "letter": "g",
 *          "color": "blue",
 *          "rank": "7",
 *          "ascii": "103"
 *        },
 *        "geometry": {
 *          "type": "Polygon",
 *          "coordinates": [
 *            [
 *              [138.12, -25.04], [136.84, -25.16], [135.96, -25.36], [135.26, -25.99], [135, -26.90],
 *              [135.04, -27.91], [135.26, -28.88], [136.05, -29.45], [137.02, -29.49], [137.81, -29.49],
 *              [137.94, -29.99], [137.90, -31.20], [137.85, -32.24], [136.88, -32.69], [136.45, -32.36],
 *              [136.27, -31.80], [134.95, -31.84], [135.17, -32.99], [135.52, -33.43], [136.14, -33.76],
 *              [137.06, -33.83], [138.12, -33.65], [138.86, -33.21], [139.30, -32.28], [139.30, -31.24],
 *              [139.30, -30.14], [139.21, -28.96], [139.17, -28.22], [139.08, -27.41], [139.08, -26.47],
 *              [138.99, -25.40], [138.73, -25.00], [138.12, -25.04]
 *            ],
 *            [
 *              [137.50, -26.54], [136.97, -26.47], [136.49, -26.58], [136.31, -27.13], [136.31, -27.72],
 *              [136.58, -27.99], [137.50, -28.03], [137.68, -27.68], [137.59, -26.78], [137.50, -26.54]
 *            ]
 *          ]
 *        }
 *      },
 *      {
 *        "type": "Feature",
 *        "properties": {
 *          "letter": "l",
 *          "color": "green",
 *          "rank": "12",
 *          "ascii": "108"
 *        },
 *        "geometry": {
 *          "type": "Polygon",
 *          "coordinates": [
 *            [
 *              [140.14, -21.04], [140.31, -29.42], [141.67, -29.49], [141.59, -20.92], [140.14, -21.04]
 *            ]
 *          ]
 *        }
 *      },
 *      {
 *        "type": "Feature",
 *        "properties": {
 *          "letter": "e",
 *          "color": "red",
 *          "rank": "5",
 *          "ascii": "101"
 *        },
 *        "geometry": {
 *          "type": "Polygon",
 *          "coordinates": [
 *            [
 *              [144.14, -27.41], [145.67, -27.52], [146.86, -27.09], [146.82, -25.64], [146.25, -25.04],
 *              [145.45, -24.68], [144.66, -24.60], [144.09, -24.76], [143.43, -25.08], [142.99, -25.40],
 *              [142.64, -26.03], [142.64, -27.05], [142.64, -28.26], [143.30, -29.11], [144.18, -29.57],
 *              [145.41, -29.64], [146.46, -29.19], [146.64, -28.72], [146.82, -28.14], [144.84, -28.42],
 *              [144.31, -28.26], [144.14, -27.41]
 *            ],
 *            [
 *              [144.18, -26.39], [144.53, -26.58], [145.19, -26.62], [145.72, -26.35], [145.81, -25.91],
 *              [145.41, -25.68], [144.97, -25.68], [144.49, -25.64], [144, -25.99], [144.18, -26.39]
 *            ]
 *          ]
 *        }
 *      }
 *    ]
 *  };
 * }
 * ```
 */
export class AgmDataLayer {
    constructor(_manager) {
        this._manager = _manager;
        this._addedToManager = false;
        this._id = (layerId++).toString();
        this._subscriptions = [];
        /**
         * This event is fired when a feature in the layer is clicked.
         */
        this.layerClick = new EventEmitter();
        /**
         * The geoJson to be displayed
         */
        this.geoJson = null;
    }
    ngOnInit() {
        if (this._addedToManager) {
            return;
        }
        this._manager.addDataLayer(this);
        this._addedToManager = true;
        this._addEventListeners();
    }
    _addEventListeners() {
        const listeners = [
            { name: 'click', handler: (ev) => this.layerClick.emit(ev) },
        ];
        listeners.forEach((obj) => {
            const os = this._manager.createEventObservable(obj.name, this).subscribe(obj.handler);
            this._subscriptions.push(os);
        });
    }
    /** @internal */
    id() { return this._id; }
    /** @internal */
    toString() { return `AgmDataLayer-${this._id.toString()}`; }
    /** @internal */
    ngOnDestroy() {
        this._manager.deleteDataLayer(this);
        // unsubscribe all registered observable subscriptions
        this._subscriptions.forEach(s => s.unsubscribe());
    }
    /** @internal */
    ngOnChanges(changes) {
        if (!this._addedToManager) {
            return;
        }
        // tslint:disable-next-line: no-string-literal
        const geoJsonChange = changes['geoJson'];
        if (geoJsonChange) {
            this._manager.updateGeoJson(this, geoJsonChange.currentValue);
        }
        const dataOptions = AgmDataLayer._dataOptionsAttributes.reduce((options, k) => options[k] = changes.hasOwnProperty(k) ? changes[k].currentValue : this[k], {});
        this._manager.setDataOptions(this, dataOptions);
    }
}
AgmDataLayer._dataOptionsAttributes = ['style'];
AgmDataLayer.decorators = [
    { type: Directive, args: [{
                selector: 'agm-data-layer',
            },] }
];
AgmDataLayer.ctorParameters = () => [
    { type: DataLayerManager }
];
AgmDataLayer.propDecorators = {
    layerClick: [{ type: Output }],
    geoJson: [{ type: Input }],
    style: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS1sYXllci5qcyIsInNvdXJjZVJvb3QiOiJEOi9BdXRvbWF0aW9uL2FuZ3VsYXItZ29vZ2xlLW1hcHMvcGFja2FnZXMvY29yZS9zcmMvIiwic291cmNlcyI6WyJsaWIvZGlyZWN0aXZlcy9kYXRhLWxheWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBZ0MsTUFBTSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUdwSCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUU3RSxJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUM7QUFFaEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTZMRztBQUlILE1BQU0sT0FBTyxZQUFZO0lBc0J2QixZQUFvQixRQUEwQjtRQUExQixhQUFRLEdBQVIsUUFBUSxDQUFrQjtRQW5CdEMsb0JBQWUsR0FBRyxLQUFLLENBQUM7UUFDeEIsUUFBRyxHQUFXLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNyQyxtQkFBYyxHQUFtQixFQUFFLENBQUM7UUFFNUM7O1dBRUc7UUFDTyxlQUFVLEdBQThDLElBQUksWUFBWSxFQUErQixDQUFDO1FBRWxIOztXQUVHO1FBQ00sWUFBTyxHQUEyQixJQUFJLENBQUM7SUFPRSxDQUFDO0lBRW5ELFFBQVE7UUFDTixJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDeEIsT0FBTztTQUNSO1FBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDakMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7UUFDNUIsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7SUFDNUIsQ0FBQztJQUVPLGtCQUFrQjtRQUN4QixNQUFNLFNBQVMsR0FBRztZQUNoQixFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBK0IsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUU7U0FDMUYsQ0FBQztRQUNGLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUN4QixNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLHFCQUFxQixDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN0RixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUMvQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxnQkFBZ0I7SUFDaEIsRUFBRSxLQUFhLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFFakMsZ0JBQWdCO0lBQ2hCLFFBQVEsS0FBYSxPQUFPLGdCQUFnQixJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBRXBFLGdCQUFnQjtJQUNoQixXQUFXO1FBQ1QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDcEMsc0RBQXNEO1FBQ3RELElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUVELGdCQUFnQjtJQUNoQixXQUFXLENBQUMsT0FBc0I7UUFDaEMsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDekIsT0FBTztTQUNSO1FBRUQsOENBQThDO1FBQzlDLE1BQU0sYUFBYSxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN6QyxJQUFJLGFBQWEsRUFBRTtZQUNqQixJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsYUFBYSxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQy9EO1FBRUQsTUFBTSxXQUFXLEdBQUcsWUFBWSxDQUFDLHNCQUFzQixDQUFDLE1BQU0sQ0FBK0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FDMUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFFLElBQVksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUUzRixJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFDbEQsQ0FBQzs7QUF2RWMsbUNBQXNCLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQzs7WUFKbkQsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxnQkFBZ0I7YUFDM0I7OztZQXBNUSxnQkFBZ0I7Ozt5QkErTXRCLE1BQU07c0JBS04sS0FBSztvQkFLTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgT25Jbml0LCBPdXRwdXQsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQgeyBEYXRhTGF5ZXJNYW5hZ2VyIH0gZnJvbSAnLi8uLi9zZXJ2aWNlcy9tYW5hZ2Vycy9kYXRhLWxheWVyLW1hbmFnZXInO1xyXG5cclxubGV0IGxheWVySWQgPSAwO1xyXG5cclxuLyoqXHJcbiAqIEFnbURhdGFMYXllciBlbmFibGVzIHRoZSB1c2VyIHRvIGFkZCBkYXRhIGxheWVycyB0byB0aGUgbWFwLlxyXG4gKlxyXG4gKiAjIyMgRXhhbXBsZVxyXG4gKiBgYGB0eXBlc2NyaXB0XHJcbiAqIGltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xyXG4gKiBpbXBvcnQgeyBBZ21NYXAsIEFnbURhdGFMYXllciB9IGZyb21cclxuICogJ2FuZ3VsYXItZ29vZ2xlLW1hcHMvY29yZSc7XHJcbiAqXHJcbiAqIEBDb21wb25lbnQoe1xyXG4gKiAgc2VsZWN0b3I6ICdteS1tYXAtY21wJyxcclxuICogIGRpcmVjdGl2ZXM6IFtBZ21NYXAsIEFnbURhdGFMYXllcl0sXHJcbiAqICBzdHlsZXM6IFtgXHJcbiAqICAgIC5hZ20tY29udGFpbmVyIHtcclxuICogICAgICBoZWlnaHQ6IDMwMHB4O1xyXG4gKiAgICB9XHJcbiAqIGBdLFxyXG4gKiAgdGVtcGxhdGU6IGBcclxuICogPGFnbS1tYXAgW2xhdGl0dWRlXT1cImxhdFwiIFtsb25naXR1ZGVdPVwibG5nXCIgW3pvb21dPVwiem9vbVwiPlxyXG4gKiBcdCAgPGFnbS1kYXRhLWxheWVyIFtnZW9Kc29uXT1cImdlb0pzb25PYmplY3RcIiAobGF5ZXJDbGljayk9XCJjbGlja2VkKCRldmVudClcIiBbc3R5bGVdPVwic3R5bGVGdW5jXCI+XHJcbiAqIFx0ICA8L2FnbS1kYXRhLWxheWVyPlxyXG4gKiA8L2FnbS1tYXA+XHJcbiAqICBgXHJcbiAqIH0pXHJcbiAqIGV4cG9ydCBjbGFzcyBNeU1hcENtcCB7XHJcbiAqICAgbGF0OiBudW1iZXIgPSAtMjUuMjc0NDQ5O1xyXG4gKiAgIGxuZzogbnVtYmVyID0gMTMzLjc3NTA2MDtcclxuICogICB6b29tOiBudW1iZXIgPSA1O1xyXG4gKlxyXG4gKiBjbGlja2VkKGNsaWNrRXZlbnQpIHtcclxuICogICAgY29uc29sZS5sb2coY2xpY2tFdmVudCk7XHJcbiAqICB9XHJcbiAqXHJcbiAqICBzdHlsZUZ1bmMoZmVhdHVyZSkge1xyXG4gKiAgICByZXR1cm4gKHtcclxuICogICAgICBjbGlja2FibGU6IGZhbHNlLFxyXG4gKiAgICAgIGZpbGxDb2xvcjogZmVhdHVyZS5nZXRQcm9wZXJ0eSgnY29sb3InKSxcclxuICogICAgICBzdHJva2VXZWlnaHQ6IDFcclxuICogICAgfSk7XHJcbiAqICB9XHJcbiAqXHJcbiAqICBnZW9Kc29uT2JqZWN0OiBPYmplY3QgPSB7XHJcbiAqICAgIFwidHlwZVwiOiBcIkZlYXR1cmVDb2xsZWN0aW9uXCIsXHJcbiAqICAgIFwiZmVhdHVyZXNcIjogW1xyXG4gKiAgICAgIHtcclxuICogICAgICAgIFwidHlwZVwiOiBcIkZlYXR1cmVcIixcclxuICogICAgICAgIFwicHJvcGVydGllc1wiOiB7XHJcbiAqICAgICAgICAgIFwibGV0dGVyXCI6IFwiR1wiLFxyXG4gKiAgICAgICAgICBcImNvbG9yXCI6IFwiYmx1ZVwiLFxyXG4gKiAgICAgICAgICBcInJhbmtcIjogXCI3XCIsXHJcbiAqICAgICAgICAgIFwiYXNjaWlcIjogXCI3MVwiXHJcbiAqICAgICAgICB9LFxyXG4gKiAgICAgICAgXCJnZW9tZXRyeVwiOiB7XHJcbiAqICAgICAgICAgIFwidHlwZVwiOiBcIlBvbHlnb25cIixcclxuICogICAgICAgICAgXCJjb29yZGluYXRlc1wiOiBbXHJcbiAqICAgICAgICAgICAgW1xyXG4gKiAgICAgICAgICAgICAgWzEyMy42MSwgLTIyLjE0XSwgWzEyMi4zOCwgLTIxLjczXSwgWzEyMS4wNiwgLTIxLjY5XSwgWzExOS42NiwgLTIyLjIyXSwgWzExOS4wMCwgLTIzLjQwXSxcclxuICogICAgICAgICAgICAgIFsxMTguNjUsIC0yNC43Nl0sIFsxMTguNDMsIC0yNi4wN10sIFsxMTguNzgsIC0yNy41Nl0sIFsxMTkuMjIsIC0yOC41N10sIFsxMjAuMjMsIC0yOS40OV0sXHJcbiAqICAgICAgICAgICAgICBbMTIxLjc3LCAtMjkuODddLCBbMTIzLjU3LCAtMjkuNjRdLCBbMTI0LjQ1LCAtMjkuMDNdLCBbMTI0LjcxLCAtMjcuOTVdLCBbMTI0LjgwLCAtMjYuNzBdLFxyXG4gKiAgICAgICAgICAgICAgWzEyNC44MCwgLTI1LjYwXSwgWzEyMy42MSwgLTI1LjY0XSwgWzEyMi41NiwgLTI1LjY0XSwgWzEyMS43MiwgLTI1LjcyXSwgWzEyMS44MSwgLTI2LjYyXSxcclxuICogICAgICAgICAgICAgIFsxMjEuODYsIC0yNi45OF0sIFsxMjIuNjAsIC0yNi45MF0sIFsxMjMuNTcsIC0yNy4wNV0sIFsxMjMuNTcsIC0yNy42OF0sIFsxMjMuMzUsIC0yOC4xOF0sXHJcbiAqICAgICAgICAgICAgICBbMTIyLjUxLCAtMjguMzhdLCBbMTIxLjc3LCAtMjguMjZdLCBbMTIxLjAyLCAtMjcuOTFdLCBbMTIwLjQ5LCAtMjcuMjFdLCBbMTIwLjE0LCAtMjYuNTBdLFxyXG4gKiAgICAgICAgICAgICAgWzEyMC4xMCwgLTI1LjY0XSwgWzEyMC4yNywgLTI0LjUyXSwgWzEyMC42NywgLTIzLjY4XSwgWzEyMS43MiwgLTIzLjMyXSwgWzEyMi40MywgLTIzLjQ4XSxcclxuICogICAgICAgICAgICAgIFsxMjMuMDQsIC0yNC4wNF0sIFsxMjQuNTQsIC0yNC4yOF0sIFsxMjQuNTgsIC0yMy4yMF0sIFsxMjMuNjEsIC0yMi4xNF1cclxuICogICAgICAgICAgICBdXHJcbiAqICAgICAgICAgIF1cclxuICogICAgICAgIH1cclxuICogICAgICB9LFxyXG4gKiAgICAgIHtcclxuICogICAgICAgIFwidHlwZVwiOiBcIkZlYXR1cmVcIixcclxuICogICAgICAgIFwicHJvcGVydGllc1wiOiB7XHJcbiAqICAgICAgICAgIFwibGV0dGVyXCI6IFwib1wiLFxyXG4gKiAgICAgICAgICBcImNvbG9yXCI6IFwicmVkXCIsXHJcbiAqICAgICAgICAgIFwicmFua1wiOiBcIjE1XCIsXHJcbiAqICAgICAgICAgIFwiYXNjaWlcIjogXCIxMTFcIlxyXG4gKiAgICAgICAgfSxcclxuICogICAgICAgIFwiZ2VvbWV0cnlcIjoge1xyXG4gKiAgICAgICAgICBcInR5cGVcIjogXCJQb2x5Z29uXCIsXHJcbiAqICAgICAgICAgIFwiY29vcmRpbmF0ZXNcIjogW1xyXG4gKiAgICAgICAgICAgIFtcclxuICogICAgICAgICAgICAgIFsxMjguODQsIC0yNS43Nl0sIFsxMjguMTgsIC0yNS42MF0sIFsxMjcuOTYsIC0yNS41Ml0sIFsxMjcuODgsIC0yNS41Ml0sIFsxMjcuNzAsIC0yNS42MF0sXHJcbiAqICAgICAgICAgICAgICBbMTI3LjI2LCAtMjUuNzldLCBbMTI2LjYwLCAtMjYuMTFdLCBbMTI2LjE2LCAtMjYuNzhdLCBbMTI2LjEyLCAtMjcuNjhdLCBbMTI2LjIxLCAtMjguNDJdLFxyXG4gKiAgICAgICAgICAgICAgWzEyNi42OSwgLTI5LjQ5XSwgWzEyNy43NCwgLTI5LjgwXSwgWzEyOC44MCwgLTI5LjcyXSwgWzEyOS40MSwgLTI5LjAzXSwgWzEyOS43MiwgLTI3Ljk1XSxcclxuICogICAgICAgICAgICAgIFsxMjkuNjgsIC0yNy4yMV0sIFsxMjkuMzMsIC0yNi4yM10sIFsxMjguODQsIC0yNS43Nl1cclxuICogICAgICAgICAgICBdLFxyXG4gKiAgICAgICAgICAgIFtcclxuICogICAgICAgICAgICAgIFsxMjguNDUsIC0yNy40NF0sIFsxMjguMzIsIC0yNi45NF0sIFsxMjcuNzAsIC0yNi44Ml0sIFsxMjcuMzUsIC0yNy4wNV0sIFsxMjcuMTcsIC0yNy44MF0sXHJcbiAqICAgICAgICAgICAgICBbMTI3LjU3LCAtMjguMjJdLCBbMTI4LjEwLCAtMjguNDJdLCBbMTI4LjQ5LCAtMjcuODBdLCBbMTI4LjQ1LCAtMjcuNDRdXHJcbiAqICAgICAgICAgICAgXVxyXG4gKiAgICAgICAgICBdXHJcbiAqICAgICAgICB9XHJcbiAqICAgICAgfSxcclxuICogICAgICB7XHJcbiAqICAgICAgICBcInR5cGVcIjogXCJGZWF0dXJlXCIsXHJcbiAqICAgICAgICBcInByb3BlcnRpZXNcIjoge1xyXG4gKiAgICAgICAgICBcImxldHRlclwiOiBcIm9cIixcclxuICogICAgICAgICAgXCJjb2xvclwiOiBcInllbGxvd1wiLFxyXG4gKiAgICAgICAgICBcInJhbmtcIjogXCIxNVwiLFxyXG4gKiAgICAgICAgICBcImFzY2lpXCI6IFwiMTExXCJcclxuICogICAgICAgIH0sXHJcbiAqICAgICAgICBcImdlb21ldHJ5XCI6IHtcclxuICogICAgICAgICAgXCJ0eXBlXCI6IFwiUG9seWdvblwiLFxyXG4gKiAgICAgICAgICBcImNvb3JkaW5hdGVzXCI6IFtcclxuICogICAgICAgICAgICBbXHJcbiAqICAgICAgICAgICAgICBbMTMxLjg3LCAtMjUuNzZdLCBbMTMxLjM1LCAtMjYuMDddLCBbMTMwLjk1LCAtMjYuNzhdLCBbMTMwLjgyLCAtMjcuNjRdLCBbMTMwLjg2LCAtMjguNTNdLFxyXG4gKiAgICAgICAgICAgICAgWzEzMS4yNiwgLTI5LjIyXSwgWzEzMS45MiwgLTI5Ljc2XSwgWzEzMi40NSwgLTI5Ljg3XSwgWzEzMy4wNiwgLTI5Ljc2XSwgWzEzMy43MiwgLTI5LjM0XSxcclxuICogICAgICAgICAgICAgIFsxMzQuMDcsIC0yOC44MF0sIFsxMzQuMjAsIC0yNy45MV0sIFsxMzQuMDcsIC0yNy4yMV0sIFsxMzMuODEsIC0yNi4zMV0sIFsxMzMuMzcsIC0yNS44M10sXHJcbiAqICAgICAgICAgICAgICBbMTMyLjcxLCAtMjUuNjRdLCBbMTMxLjg3LCAtMjUuNzZdXHJcbiAqICAgICAgICAgICAgXSxcclxuICogICAgICAgICAgICBbXHJcbiAqICAgICAgICAgICAgICBbMTMzLjE1LCAtMjcuMTddLCBbMTMyLjcxLCAtMjYuODZdLCBbMTMyLjA5LCAtMjYuOTBdLCBbMTMxLjc0LCAtMjcuNTZdLCBbMTMxLjc5LCAtMjguMjZdLFxyXG4gKiAgICAgICAgICAgICAgWzEzMi4zNiwgLTI4LjQ1XSwgWzEzMi45MywgLTI4LjM0XSwgWzEzMy4xNSwgLTI3Ljc2XSwgWzEzMy4xNSwgLTI3LjE3XVxyXG4gKiAgICAgICAgICAgIF1cclxuICogICAgICAgICAgXVxyXG4gKiAgICAgICAgfVxyXG4gKiAgICAgIH0sXHJcbiAqICAgICAge1xyXG4gKiAgICAgICAgXCJ0eXBlXCI6IFwiRmVhdHVyZVwiLFxyXG4gKiAgICAgICAgXCJwcm9wZXJ0aWVzXCI6IHtcclxuICogICAgICAgICAgXCJsZXR0ZXJcIjogXCJnXCIsXHJcbiAqICAgICAgICAgIFwiY29sb3JcIjogXCJibHVlXCIsXHJcbiAqICAgICAgICAgIFwicmFua1wiOiBcIjdcIixcclxuICogICAgICAgICAgXCJhc2NpaVwiOiBcIjEwM1wiXHJcbiAqICAgICAgICB9LFxyXG4gKiAgICAgICAgXCJnZW9tZXRyeVwiOiB7XHJcbiAqICAgICAgICAgIFwidHlwZVwiOiBcIlBvbHlnb25cIixcclxuICogICAgICAgICAgXCJjb29yZGluYXRlc1wiOiBbXHJcbiAqICAgICAgICAgICAgW1xyXG4gKiAgICAgICAgICAgICAgWzEzOC4xMiwgLTI1LjA0XSwgWzEzNi44NCwgLTI1LjE2XSwgWzEzNS45NiwgLTI1LjM2XSwgWzEzNS4yNiwgLTI1Ljk5XSwgWzEzNSwgLTI2LjkwXSxcclxuICogICAgICAgICAgICAgIFsxMzUuMDQsIC0yNy45MV0sIFsxMzUuMjYsIC0yOC44OF0sIFsxMzYuMDUsIC0yOS40NV0sIFsxMzcuMDIsIC0yOS40OV0sIFsxMzcuODEsIC0yOS40OV0sXHJcbiAqICAgICAgICAgICAgICBbMTM3Ljk0LCAtMjkuOTldLCBbMTM3LjkwLCAtMzEuMjBdLCBbMTM3Ljg1LCAtMzIuMjRdLCBbMTM2Ljg4LCAtMzIuNjldLCBbMTM2LjQ1LCAtMzIuMzZdLFxyXG4gKiAgICAgICAgICAgICAgWzEzNi4yNywgLTMxLjgwXSwgWzEzNC45NSwgLTMxLjg0XSwgWzEzNS4xNywgLTMyLjk5XSwgWzEzNS41MiwgLTMzLjQzXSwgWzEzNi4xNCwgLTMzLjc2XSxcclxuICogICAgICAgICAgICAgIFsxMzcuMDYsIC0zMy44M10sIFsxMzguMTIsIC0zMy42NV0sIFsxMzguODYsIC0zMy4yMV0sIFsxMzkuMzAsIC0zMi4yOF0sIFsxMzkuMzAsIC0zMS4yNF0sXHJcbiAqICAgICAgICAgICAgICBbMTM5LjMwLCAtMzAuMTRdLCBbMTM5LjIxLCAtMjguOTZdLCBbMTM5LjE3LCAtMjguMjJdLCBbMTM5LjA4LCAtMjcuNDFdLCBbMTM5LjA4LCAtMjYuNDddLFxyXG4gKiAgICAgICAgICAgICAgWzEzOC45OSwgLTI1LjQwXSwgWzEzOC43MywgLTI1LjAwXSwgWzEzOC4xMiwgLTI1LjA0XVxyXG4gKiAgICAgICAgICAgIF0sXHJcbiAqICAgICAgICAgICAgW1xyXG4gKiAgICAgICAgICAgICAgWzEzNy41MCwgLTI2LjU0XSwgWzEzNi45NywgLTI2LjQ3XSwgWzEzNi40OSwgLTI2LjU4XSwgWzEzNi4zMSwgLTI3LjEzXSwgWzEzNi4zMSwgLTI3LjcyXSxcclxuICogICAgICAgICAgICAgIFsxMzYuNTgsIC0yNy45OV0sIFsxMzcuNTAsIC0yOC4wM10sIFsxMzcuNjgsIC0yNy42OF0sIFsxMzcuNTksIC0yNi43OF0sIFsxMzcuNTAsIC0yNi41NF1cclxuICogICAgICAgICAgICBdXHJcbiAqICAgICAgICAgIF1cclxuICogICAgICAgIH1cclxuICogICAgICB9LFxyXG4gKiAgICAgIHtcclxuICogICAgICAgIFwidHlwZVwiOiBcIkZlYXR1cmVcIixcclxuICogICAgICAgIFwicHJvcGVydGllc1wiOiB7XHJcbiAqICAgICAgICAgIFwibGV0dGVyXCI6IFwibFwiLFxyXG4gKiAgICAgICAgICBcImNvbG9yXCI6IFwiZ3JlZW5cIixcclxuICogICAgICAgICAgXCJyYW5rXCI6IFwiMTJcIixcclxuICogICAgICAgICAgXCJhc2NpaVwiOiBcIjEwOFwiXHJcbiAqICAgICAgICB9LFxyXG4gKiAgICAgICAgXCJnZW9tZXRyeVwiOiB7XHJcbiAqICAgICAgICAgIFwidHlwZVwiOiBcIlBvbHlnb25cIixcclxuICogICAgICAgICAgXCJjb29yZGluYXRlc1wiOiBbXHJcbiAqICAgICAgICAgICAgW1xyXG4gKiAgICAgICAgICAgICAgWzE0MC4xNCwgLTIxLjA0XSwgWzE0MC4zMSwgLTI5LjQyXSwgWzE0MS42NywgLTI5LjQ5XSwgWzE0MS41OSwgLTIwLjkyXSwgWzE0MC4xNCwgLTIxLjA0XVxyXG4gKiAgICAgICAgICAgIF1cclxuICogICAgICAgICAgXVxyXG4gKiAgICAgICAgfVxyXG4gKiAgICAgIH0sXHJcbiAqICAgICAge1xyXG4gKiAgICAgICAgXCJ0eXBlXCI6IFwiRmVhdHVyZVwiLFxyXG4gKiAgICAgICAgXCJwcm9wZXJ0aWVzXCI6IHtcclxuICogICAgICAgICAgXCJsZXR0ZXJcIjogXCJlXCIsXHJcbiAqICAgICAgICAgIFwiY29sb3JcIjogXCJyZWRcIixcclxuICogICAgICAgICAgXCJyYW5rXCI6IFwiNVwiLFxyXG4gKiAgICAgICAgICBcImFzY2lpXCI6IFwiMTAxXCJcclxuICogICAgICAgIH0sXHJcbiAqICAgICAgICBcImdlb21ldHJ5XCI6IHtcclxuICogICAgICAgICAgXCJ0eXBlXCI6IFwiUG9seWdvblwiLFxyXG4gKiAgICAgICAgICBcImNvb3JkaW5hdGVzXCI6IFtcclxuICogICAgICAgICAgICBbXHJcbiAqICAgICAgICAgICAgICBbMTQ0LjE0LCAtMjcuNDFdLCBbMTQ1LjY3LCAtMjcuNTJdLCBbMTQ2Ljg2LCAtMjcuMDldLCBbMTQ2LjgyLCAtMjUuNjRdLCBbMTQ2LjI1LCAtMjUuMDRdLFxyXG4gKiAgICAgICAgICAgICAgWzE0NS40NSwgLTI0LjY4XSwgWzE0NC42NiwgLTI0LjYwXSwgWzE0NC4wOSwgLTI0Ljc2XSwgWzE0My40MywgLTI1LjA4XSwgWzE0Mi45OSwgLTI1LjQwXSxcclxuICogICAgICAgICAgICAgIFsxNDIuNjQsIC0yNi4wM10sIFsxNDIuNjQsIC0yNy4wNV0sIFsxNDIuNjQsIC0yOC4yNl0sIFsxNDMuMzAsIC0yOS4xMV0sIFsxNDQuMTgsIC0yOS41N10sXHJcbiAqICAgICAgICAgICAgICBbMTQ1LjQxLCAtMjkuNjRdLCBbMTQ2LjQ2LCAtMjkuMTldLCBbMTQ2LjY0LCAtMjguNzJdLCBbMTQ2LjgyLCAtMjguMTRdLCBbMTQ0Ljg0LCAtMjguNDJdLFxyXG4gKiAgICAgICAgICAgICAgWzE0NC4zMSwgLTI4LjI2XSwgWzE0NC4xNCwgLTI3LjQxXVxyXG4gKiAgICAgICAgICAgIF0sXHJcbiAqICAgICAgICAgICAgW1xyXG4gKiAgICAgICAgICAgICAgWzE0NC4xOCwgLTI2LjM5XSwgWzE0NC41MywgLTI2LjU4XSwgWzE0NS4xOSwgLTI2LjYyXSwgWzE0NS43MiwgLTI2LjM1XSwgWzE0NS44MSwgLTI1LjkxXSxcclxuICogICAgICAgICAgICAgIFsxNDUuNDEsIC0yNS42OF0sIFsxNDQuOTcsIC0yNS42OF0sIFsxNDQuNDksIC0yNS42NF0sIFsxNDQsIC0yNS45OV0sIFsxNDQuMTgsIC0yNi4zOV1cclxuICogICAgICAgICAgICBdXHJcbiAqICAgICAgICAgIF1cclxuICogICAgICAgIH1cclxuICogICAgICB9XHJcbiAqICAgIF1cclxuICogIH07XHJcbiAqIH1cclxuICogYGBgXHJcbiAqL1xyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ2FnbS1kYXRhLWxheWVyJyxcclxufSlcclxuZXhwb3J0IGNsYXNzIEFnbURhdGFMYXllciBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBPbkNoYW5nZXMge1xyXG4gIHByaXZhdGUgc3RhdGljIF9kYXRhT3B0aW9uc0F0dHJpYnV0ZXMgPSBbJ3N0eWxlJ107XHJcblxyXG4gIHByaXZhdGUgX2FkZGVkVG9NYW5hZ2VyID0gZmFsc2U7XHJcbiAgcHJpdmF0ZSBfaWQ6IHN0cmluZyA9IChsYXllcklkKyspLnRvU3RyaW5nKCk7XHJcbiAgcHJpdmF0ZSBfc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIGEgZmVhdHVyZSBpbiB0aGUgbGF5ZXIgaXMgY2xpY2tlZC5cclxuICAgKi9cclxuICBAT3V0cHV0KCkgbGF5ZXJDbGljazogRXZlbnRFbWl0dGVyPGdvb2dsZS5tYXBzLkRhdGEuTW91c2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPGdvb2dsZS5tYXBzLkRhdGEuTW91c2VFdmVudD4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGdlb0pzb24gdG8gYmUgZGlzcGxheWVkXHJcbiAgICovXHJcbiAgQElucHV0KCkgZ2VvSnNvbjogb2JqZWN0IHwgc3RyaW5nIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBsYXllcidzIHN0eWxlIGZ1bmN0aW9uLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHN0eWxlOiAocGFyYW06IGdvb2dsZS5tYXBzLkRhdGEuRmVhdHVyZSkgPT4gZ29vZ2xlLm1hcHMuRGF0YS5TdHlsZU9wdGlvbnM7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX21hbmFnZXI6IERhdGFMYXllck1hbmFnZXIpIHsgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIGlmICh0aGlzLl9hZGRlZFRvTWFuYWdlcikge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB0aGlzLl9tYW5hZ2VyLmFkZERhdGFMYXllcih0aGlzKTtcclxuICAgIHRoaXMuX2FkZGVkVG9NYW5hZ2VyID0gdHJ1ZTtcclxuICAgIHRoaXMuX2FkZEV2ZW50TGlzdGVuZXJzKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9hZGRFdmVudExpc3RlbmVycygpIHtcclxuICAgIGNvbnN0IGxpc3RlbmVycyA9IFtcclxuICAgICAgeyBuYW1lOiAnY2xpY2snLCBoYW5kbGVyOiAoZXY6IGdvb2dsZS5tYXBzLkRhdGEuTW91c2VFdmVudCkgPT4gdGhpcy5sYXllckNsaWNrLmVtaXQoZXYpIH0sXHJcbiAgICBdO1xyXG4gICAgbGlzdGVuZXJzLmZvckVhY2goKG9iaikgPT4ge1xyXG4gICAgICBjb25zdCBvcyA9IHRoaXMuX21hbmFnZXIuY3JlYXRlRXZlbnRPYnNlcnZhYmxlKG9iai5uYW1lLCB0aGlzKS5zdWJzY3JpYmUob2JqLmhhbmRsZXIpO1xyXG4gICAgICB0aGlzLl9zdWJzY3JpcHRpb25zLnB1c2gob3MpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKiogQGludGVybmFsICovXHJcbiAgaWQoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuX2lkOyB9XHJcblxyXG4gIC8qKiBAaW50ZXJuYWwgKi9cclxuICB0b1N0cmluZygpOiBzdHJpbmcgeyByZXR1cm4gYEFnbURhdGFMYXllci0ke3RoaXMuX2lkLnRvU3RyaW5nKCl9YDsgfVxyXG5cclxuICAvKiogQGludGVybmFsICovXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLl9tYW5hZ2VyLmRlbGV0ZURhdGFMYXllcih0aGlzKTtcclxuICAgIC8vIHVuc3Vic2NyaWJlIGFsbCByZWdpc3RlcmVkIG9ic2VydmFibGUgc3Vic2NyaXB0aW9uc1xyXG4gICAgdGhpcy5fc3Vic2NyaXB0aW9ucy5mb3JFYWNoKHMgPT4gcy51bnN1YnNjcmliZSgpKTtcclxuICB9XHJcblxyXG4gIC8qKiBAaW50ZXJuYWwgKi9cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XHJcbiAgICBpZiAoIXRoaXMuX2FkZGVkVG9NYW5hZ2VyKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLXN0cmluZy1saXRlcmFsXHJcbiAgICBjb25zdCBnZW9Kc29uQ2hhbmdlID0gY2hhbmdlc1snZ2VvSnNvbiddO1xyXG4gICAgaWYgKGdlb0pzb25DaGFuZ2UpIHtcclxuICAgICAgdGhpcy5fbWFuYWdlci51cGRhdGVHZW9Kc29uKHRoaXMsIGdlb0pzb25DaGFuZ2UuY3VycmVudFZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBkYXRhT3B0aW9ucyA9IEFnbURhdGFMYXllci5fZGF0YU9wdGlvbnNBdHRyaWJ1dGVzLnJlZHVjZTxnb29nbGUubWFwcy5EYXRhLkRhdGFPcHRpb25zPigob3B0aW9ucywgaykgPT5cclxuICAgICAgb3B0aW9uc1trXSA9IGNoYW5nZXMuaGFzT3duUHJvcGVydHkoaykgPyBjaGFuZ2VzW2tdLmN1cnJlbnRWYWx1ZSA6ICh0aGlzIGFzIGFueSlba10sIHt9KTtcclxuXHJcbiAgICB0aGlzLl9tYW5hZ2VyLnNldERhdGFPcHRpb25zKHRoaXMsIGRhdGFPcHRpb25zKTtcclxuICB9XHJcbn1cclxuIl19