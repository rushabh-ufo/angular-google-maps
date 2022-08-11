import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { InfoWindowManager, MarkerManager } from '@agm/core';
import { ClusterManager } from '../services/managers/cluster-manager';
// tslint:disable: jsdoc-format
/**
 * AgmMarkerCluster clusters map marker if they are near together
 *
 * ### Example
```typescript
import { Component } from '@angular/core';

@Component({
 selector: 'my-map-cmp',
 styles: [`
   agm-map {
     height: 300px;
   }
 `],
 template: `
   <agm-map [latitude]="lat" [longitude]="lng" [zoom]="zoom">
     <agm-marker-cluster>
       <agm-marker [latitude]="lat" [longitude]="lng" [label]="'M'">
       </agm-marker>
       <agm-marker [latitude]="lat2" [longitude]="lng2" [label]="'N'">
       </agm-marker>
     </agm-marker-cluster>
   </agm-map>
 `
})
```
 */
// tslint:enable: jsdoc-format
export class AgmMarkerCluster {
    constructor(_clusterManager) {
        this._clusterManager = _clusterManager;
        this.clusterClick = new EventEmitter();
        this._observableSubscriptions = [];
    }
    /** @internal */
    ngOnDestroy() {
        this._clusterManager.clearMarkers();
        this._observableSubscriptions.forEach((s) => s.unsubscribe());
    }
    /** @internal */
    ngOnChanges(changes) {
        // tslint:disable: no-string-literal
        if (changes['gridSize']) {
            this._clusterManager.setGridSize(this);
        }
        if (changes['maxZoom']) {
            this._clusterManager.setMaxZoom(this);
        }
        if (changes['zoomOnClick']) {
            this._clusterManager.setZoomOnClick(this);
        }
        if (changes['averageCenter']) {
            this._clusterManager.setAverageCenter(this);
        }
        if (changes['minimumClusterSize']) {
            this._clusterManager.setMinimumClusterSize(this);
        }
        if (changes['imagePath']) {
            this._clusterManager.setImagePath(this);
        }
        if (changes['imageExtension']) {
            this._clusterManager.setImageExtension(this);
        }
        if (changes['calculator']) {
            this._clusterManager.setCalculator(this);
        }
        if (changes['styles']) {
            this._clusterManager.setStyles(this);
        }
        if (changes['clusterClass']) {
            this._clusterManager.setClusterClass(this);
        }
        if (changes['enableRetinaIcons']) {
            this._clusterManager.setEnableRetinaIcons(this);
        }
        if (changes['ignoreHidden']) {
            this._clusterManager.setIgnoreHidden(this);
        }
        if (changes['imageSizes']) {
            this._clusterManager.setImageSizes(this);
        }
        if (changes['title']) {
            this._clusterManager.setTitle(this);
        }
        // tslint:enable: no-string-literal
    }
    _addEventListeners() {
        const handlers = [
            {
                name: 'clusterclick',
                handler: () => this.clusterClick.emit(),
            },
        ];
        handlers.forEach((obj) => {
            const os = this._clusterManager.createClusterEventObservable(obj.name).subscribe(obj.handler);
            this._observableSubscriptions.push(os);
        });
    }
    /** @internal */
    ngOnInit() {
        this._addEventListeners();
        this._clusterManager.init({
            averageCenter: this.averageCenter,
            calculator: this.calculator,
            clusterClass: this.clusterClass,
            enableRetinaIcons: this.enableRetinaIcons,
            gridSize: this.gridSize,
            ignoreHidden: this.ignoreHidden,
            imageExtension: this.imageExtension,
            imagePath: this.imagePath,
            imageSizes: this.imageSizes,
            maxZoom: this.maxZoom,
            minimumClusterSize: this.minimumClusterSize,
            styles: this.styles,
            title: this.title,
            zoomOnClick: this.zoomOnClick,
        });
    }
}
AgmMarkerCluster.decorators = [
    { type: Directive, args: [{
                selector: 'agm-marker-cluster',
                providers: [
                    ClusterManager,
                    { provide: MarkerManager, useExisting: ClusterManager },
                    InfoWindowManager,
                ],
            },] }
];
AgmMarkerCluster.ctorParameters = () => [
    { type: ClusterManager }
];
AgmMarkerCluster.propDecorators = {
    gridSize: [{ type: Input }],
    maxZoom: [{ type: Input }],
    zoomOnClick: [{ type: Input }],
    averageCenter: [{ type: Input }],
    minimumClusterSize: [{ type: Input }],
    styles: [{ type: Input }],
    calculator: [{ type: Input }],
    imagePath: [{ type: Input }],
    imageExtension: [{ type: Input }],
    clusterClass: [{ type: Input }],
    enableRetinaIcons: [{ type: Input }],
    ignoreHidden: [{ type: Input }],
    imageSizes: [{ type: Input }],
    title: [{ type: Input }],
    clusterClick: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2VyLWNsdXN0ZXIuanMiLCJzb3VyY2VSb290IjoiRDovQXV0b21hdGlvbi9hbmd1bGFyLWdvb2dsZS1tYXBzL3BhY2thZ2VzL21hcmtlcmNsdXN0ZXJlci9zcmMvIiwic291cmNlcyI6WyJsaWIvZGlyZWN0aXZlcy9tYXJrZXItY2x1c3Rlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQWdDLE1BQU0sRUFBZ0IsTUFBTSxlQUFlLENBQUM7QUFJbkgsT0FBTyxFQUFFLGlCQUFpQixFQUFFLGFBQWEsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUc3RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFFdEUsK0JBQStCO0FBQy9COzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTBCRztBQUNILDhCQUE4QjtBQVM5QixNQUFNLE9BQU8sZ0JBQWdCO0lBNkYzQixZQUFvQixlQUErQjtRQUEvQixvQkFBZSxHQUFmLGVBQWUsQ0FBZ0I7UUFKekMsaUJBQVksR0FBdUIsSUFBSSxZQUFZLEVBQVEsQ0FBQztRQUU5RCw2QkFBd0IsR0FBbUIsRUFBRSxDQUFDO0lBRUMsQ0FBQztJQUV4RCxnQkFBZ0I7SUFDaEIsV0FBVztRQUNULElBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDcEMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7SUFDaEUsQ0FBQztJQUVELGdCQUFnQjtJQUNoQixXQUFXLENBQUMsT0FBd0M7UUFDbEQsb0NBQW9DO1FBQ3BDLElBQUksT0FBTyxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3hDO1FBQ0QsSUFBSSxPQUFPLENBQUMsU0FBUyxD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QUFpQjtZQUN6QyxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDdkIsWUFBWSxFQUFFLElBQUksQ0FBQyxZQUFZO1lBQy9CLGNBQWMsRUFBRSxJQUFJLENBQUMsY0FBYztZQUNuQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVM7WUFDekIsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVO1lBQzNCLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTztZQUNyQixrQkFBa0IsRUFBRSxJQUFJLENBQUMsa0JBQWtCO1lBQzNDLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtZQUNuQixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7WUFDakIsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXO1NBQzlCLENBQUMsQ0FBQztJQUNMLENBQUM7OztZQTlMRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLG9CQUFvQjtnQkFDOUIsU0FBUyxFQUFFO29CQUNULGNBQWM7b0JBQ2QsRUFBRSxPQUFPLEVBQUUsYUFBYSxFQUFFLFdBQVcsRUFBRSxjQUFjLEVBQUU7b0JBQ3ZELGlCQUFpQjtpQkFDbEI7YUFDRjs7O1lBdENRLGNBQWM7Ozt1QkEyQ3BCLEtBQUs7c0JBS0wsS0FBSzswQkFLTCxLQUFLOzRCQUtMLEtBQUs7aUNBS0wsS0FBSztxQkFLTCxLQUFLO3lCQUtMLEtBQUs7d0JBRUwsS0FBSzs2QkFDTCxLQUFLOzJCQVNMLEtBQUs7Z0NBV0wsS0FBSzsyQkFZTCxLQUFLO3lCQVNMLEtBQUs7b0JBU0wsS0FBSzsyQkFFTCxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgT25Jbml0LCBPdXRwdXQsIFNpbXBsZUNoYW5nZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQgeyBJbmZvV2luZG93TWFuYWdlciwgTWFya2VyTWFuYWdlciB9IGZyb20gJ0BhZ20vY29yZSc7XHJcbmltcG9ydCB7IENsdXN0ZXJJY29uU3R5bGUsIE1hcmtlckNsdXN0ZXJlck9wdGlvbnMgfSBmcm9tICdAZ29vZ2xlL21hcmtlcmNsdXN0ZXJlcnBsdXMnO1xyXG5pbXBvcnQgeyBDYWxjdWxhdG9yIH0gZnJvbSAnQGdvb2dsZS9tYXJrZXJjbHVzdGVyZXJwbHVzL2Rpc3QvbWFya2VyY2x1c3RlcmVyJztcclxuaW1wb3J0IHsgQ2x1c3Rlck1hbmFnZXIgfSBmcm9tICcuLi9zZXJ2aWNlcy9tYW5hZ2Vycy9jbHVzdGVyLW1hbmFnZXInO1xyXG5cclxuLy8gdHNsaW50OmRpc2FibGU6IGpzZG9jLWZvcm1hdFxyXG4vKipcclxuICogQWdtTWFya2VyQ2x1c3RlciBjbHVzdGVycyBtYXAgbWFya2VyIGlmIHRoZXkgYXJlIG5lYXIgdG9nZXRoZXJcclxuICpcclxuICogIyMjIEV4YW1wbGVcclxuYGBgdHlwZXNjcmlwdFxyXG5pbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gc2VsZWN0b3I6ICdteS1tYXAtY21wJyxcclxuIHN0eWxlczogW2BcclxuICAgYWdtLW1hcCB7XHJcbiAgICAgaGVpZ2h0OiAzMDBweDtcclxuICAgfVxyXG4gYF0sXHJcbiB0ZW1wbGF0ZTogYFxyXG4gICA8YWdtLW1hcCBbbGF0aXR1ZGVdPVwibGF0XCIgW2xvbmdpdHVkZV09XCJsbmdcIiBbem9vbV09XCJ6b29tXCI+XHJcbiAgICAgPGFnbS1tYXJrZXItY2x1c3Rlcj5cclxuICAgICAgIDxhZ20tbWFya2VyIFtsYXRpdHVkZV09XCJsYXRcIiBbbG9uZ2l0dWRlXT1cImxuZ1wiIFtsYWJlbF09XCInTSdcIj5cclxuICAgICAgIDwvYWdtLW1hcmtlcj5cclxuICAgICAgIDxhZ20tbWFya2VyIFtsYXRpdHVkZV09XCJsYXQyXCIgW2xvbmdpdHVkZV09XCJsbmcyXCIgW2xhYmVsXT1cIidOJ1wiPlxyXG4gICAgICAgPC9hZ20tbWFya2VyPlxyXG4gICAgIDwvYWdtLW1hcmtlci1jbHVzdGVyPlxyXG4gICA8L2FnbS1tYXA+XHJcbiBgXHJcbn0pXHJcbmBgYFxyXG4gKi9cclxuLy8gdHNsaW50OmVuYWJsZToganNkb2MtZm9ybWF0XHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnYWdtLW1hcmtlci1jbHVzdGVyJyxcclxuICBwcm92aWRlcnM6IFtcclxuICAgIENsdXN0ZXJNYW5hZ2VyLFxyXG4gICAgeyBwcm92aWRlOiBNYXJrZXJNYW5hZ2VyLCB1c2VFeGlzdGluZzogQ2x1c3Rlck1hbmFnZXIgfSxcclxuICAgIEluZm9XaW5kb3dNYW5hZ2VyLFxyXG4gIF0sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBZ21NYXJrZXJDbHVzdGVyIGltcGxlbWVudHMgT25EZXN0cm95LCBPbkNoYW5nZXMsIE9uSW5pdCwgTWFya2VyQ2x1c3RlcmVyT3B0aW9ucyB7XHJcbiAgLyoqXHJcbiAgICogVGhlIGdyaWQgc2l6ZSBvZiBhIGNsdXN0ZXIgaW4gcGl4ZWxzXHJcbiAgICovXHJcbiAgQElucHV0KCkgZ3JpZFNpemU6IG51bWJlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIG1heGltdW0gem9vbSBsZXZlbCB0aGF0IGEgbWFya2VyIGNhbiBiZSBwYXJ0IG9mIGEgY2x1c3Rlci5cclxuICAgKi9cclxuICBASW5wdXQoKSBtYXhab29tOiBudW1iZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZXRoZXIgdGhlIGRlZmF1bHQgYmVoYXZpb3VyIG9mIGNsaWNraW5nIG9uIGEgY2x1c3RlciBpcyB0byB6b29tIGludG8gaXQuXHJcbiAgICovXHJcbiAgQElucHV0KCkgem9vbU9uQ2xpY2s6IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZXRoZXIgdGhlIGNlbnRlciBvZiBlYWNoIGNsdXN0ZXIgc2hvdWxkIGJlIHRoZSBhdmVyYWdlIG9mIGFsbCBtYXJrZXJzIGluIHRoZSBjbHVzdGVyLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGF2ZXJhZ2VDZW50ZXI6IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBtaW5pbXVtIG51bWJlciBvZiBtYXJrZXJzIHRvIGJlIGluIGEgY2x1c3RlciBiZWZvcmUgdGhlIG1hcmtlcnMgYXJlIGhpZGRlbiBhbmQgYSBjb3VudCBpcyBzaG93bi5cclxuICAgKi9cclxuICBASW5wdXQoKSBtaW5pbXVtQ2x1c3RlclNpemU6IG51bWJlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogQW4gb2JqZWN0IHRoYXQgaGFzIHN0eWxlIHByb3BlcnRpZXMuXHJcbiAgICovXHJcbiAgQElucHV0KCkgc3R5bGVzOiBDbHVzdGVySWNvblN0eWxlW107XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgZnVuY3Rpb24gdGhhdCBjYWxjdWxhdGVzIHRoZSBjbHVzdGVyIHN0eWxlIGFuZCB0ZXh0IGJhc2VkIG9uIHRoZSBtYXJrZXJzIGluIHRoZSBjbHVzdGVyLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGNhbGN1bGF0b3I6IENhbGN1bGF0b3I7XHJcblxyXG4gIEBJbnB1dCgpIGltYWdlUGF0aDogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIGltYWdlRXh0ZW5zaW9uOiBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBuYW1lIG9mIHRoZSBDU1MgY2xhc3MgZGVmaW5pbmcgZ2VuZXJhbCBzdHlsZXMgZm9yIHRoZSBjbHVzdGVyIG1hcmtlcnMuXHJcbiAgICogVXNlIHRoaXMgY2xhc3MgdG8gZGVmaW5lIENTUyBzdHlsZXMgdGhhdCBhcmUgbm90IHNldCB1cCBieSB0aGUgY29kZSB0aGF0XHJcbiAgICogcHJvY2Vzc2VzIHRoZSBgc3R5bGVzYCBhcnJheS5cclxuICAgKlxyXG4gICAqIEBkZWZhdWx0VmFsdWUgJ2NsdXN0ZXInXHJcbiAgICovXHJcbiAgQElucHV0KCkgY2x1c3RlckNsYXNzOiBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZXRoZXIgdG8gYWxsb3cgdGhlIHVzZSBvZiBjbHVzdGVyIGljb25zIHRoYXQgaGF2ZSBzaXplcyB0aGF0IGFyZSBzb21lXHJcbiAgICogbXVsdGlwbGUgKHR5cGljYWxseSBkb3VibGUpIG9mIHRoZWlyIGFjdHVhbCBkaXNwbGF5IHNpemUuIEljb25zIHN1Y2ggYXNcclxuICAgKiB0aGVzZSBsb29rIGJldHRlciB3aGVuIHZpZXdlZCBvbiBoaWdoLXJlc29sdXRpb24gbW9uaXRvcnMgc3VjaCBhcyBBcHBsZSdzXHJcbiAgICogUmV0aW5hIGRpc3BsYXlzLiBOb3RlOiBpZiB0aGlzIHByb3BlcnR5IGlzIGB0cnVlYCwgc3ByaXRlcyBjYW5ub3QgYmUgdXNlZFxyXG4gICAqIGFzIGNsdXN0ZXIgaWNvbnMuXHJcbiAgICpcclxuICAgKiBAZGVmYXVsdFZhbHVlIGZhbHNlXHJcbiAgICovXHJcbiAgQElucHV0KCkgZW5hYmxlUmV0aW5hSWNvbnM6IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZXRoZXIgdG8gaWdub3JlIGhpZGRlbiBtYXJrZXJzIGluIGNsdXN0ZXJzLiBZb3UgbWF5IHdhbnQgdG8gc2V0IHRoaXMgdG9cclxuICAgKiBgdHJ1ZWAgdG8gZW5zdXJlIHRoYXQgaGlkZGVuIG1hcmtlcnMgYXJlIG5vdCBpbmNsdWRlZCBpbiB0aGUgbWFya2VyIGNvdW50XHJcbiAgICogdGhhdCBhcHBlYXJzIG9uIGEgY2x1c3RlciBtYXJrZXIgKHRoaXMgY291bnQgaXMgdGhlIHZhbHVlIG9mIHRoZSBgdGV4dGBcclxuICAgKiBwcm9wZXJ0eSBvZiB0aGUgcmVzdWx0IHJldHVybmVkIGJ5IHRoZSBkZWZhdWx0IGBjYWxjdWxhdG9yYCkuIElmIHNldCB0b1xyXG4gICAqIGB0cnVlYCBhbmQgeW91IGNoYW5nZSB0aGUgdmlzaWJpbGl0eSBvZiBhIG1hcmtlciBiZWluZyBjbHVzdGVyZWQsIGJlIHN1cmVcclxuICAgKiB0byBhbHNvIGNhbGwgYE1hcmtlckNsdXN0ZXJlci5yZXBhaW50KClgLlxyXG4gICAqXHJcbiAgICogQGRlZmF1bHRWYWx1ZSBmYWxzZVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGlnbm9yZUhpZGRlbjogYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICogQW4gYXJyYXkgb2YgbnVtYmVycyBjb250YWluaW5nIHRoZSB3aWR0aHMgb2YgdGhlIGdyb3VwIG9mXHJcbiAgICogYDxpbWFnZVBhdGg+PG4+LjxpbWFnZUV4dGVuc2lvbj5gIGltYWdlIGZpbGVzLiAoVGhlIGltYWdlcyBhcmUgYXNzdW1lZCB0b1xyXG4gICAqIGJlIHNxdWFyZS4pXHJcbiAgICpcclxuICAgKiBAZGVmYXVsdFZhbHVlIFs1MywgNTYsIDY2LCA3OCwgOTBdXHJcbiAgICovXHJcbiAgQElucHV0KCkgaW1hZ2VTaXplczogbnVtYmVyW107XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSB0b29sdGlwIHRvIGRpc3BsYXkgd2hlbiB0aGUgbW91c2UgbW92ZXMgb3ZlciBhIGNsdXN0ZXIgbWFya2VyLlxyXG4gICAqIChBbHRlcm5hdGl2ZWx5LCB5b3UgY2FuIHVzZSBhIGN1c3RvbSBgY2FsY3VsYXRvcmAgZnVuY3Rpb24gdG8gc3BlY2lmeSBhXHJcbiAgICogZGlmZmVyZW50IHRvb2x0aXAgZm9yIGVhY2ggY2x1c3RlciBtYXJrZXIuKVxyXG4gICAqXHJcbiAgICogQGRlZmF1bHRWYWx1ZSAnJ1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHRpdGxlOiBzdHJpbmc7XHJcblxyXG4gIEBPdXRwdXQoKSBjbHVzdGVyQ2xpY2s6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcclxuXHJcbiAgcHJpdmF0ZSBfb2JzZXJ2YWJsZVN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2NsdXN0ZXJNYW5hZ2VyOiBDbHVzdGVyTWFuYWdlcikgeyB9XHJcblxyXG4gIC8qKiBAaW50ZXJuYWwgKi9cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMuX2NsdXN0ZXJNYW5hZ2VyLmNsZWFyTWFya2VycygpO1xyXG4gICAgdGhpcy5fb2JzZXJ2YWJsZVN1YnNjcmlwdGlvbnMuZm9yRWFjaCgocykgPT4gcy51bnN1YnNjcmliZSgpKTtcclxuICB9XHJcblxyXG4gIC8qKiBAaW50ZXJuYWwgKi9cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiB7IFtrZXk6IHN0cmluZ106IFNpbXBsZUNoYW5nZSB9KSB7XHJcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZTogbm8tc3RyaW5nLWxpdGVyYWxcclxuICAgIGlmIChjaGFuZ2VzWydncmlkU2l6ZSddKSB7XHJcbiAgICAgIHRoaXMuX2NsdXN0ZXJNYW5hZ2VyLnNldEdyaWRTaXplKHRoaXMpO1xyXG4gICAgfVxyXG4gICAgaWYgKGNoYW5nZXNbJ21heFpvb20nXSkge1xyXG4gICAgICB0aGlzLl9jbHVzdGVyTWFuYWdlci5zZXRNYXhab29tKHRoaXMpO1xyXG4gICAgfVxyXG4gICAgaWYgKGNoYW5nZXNbJ3pvb21PbkNsaWNrJ10pIHtcclxuICAgICAgdGhpcy5fY2x1c3Rlck1hbmFnZXIuc2V0Wm9vbU9uQ2xpY2sodGhpcyk7XHJcbiAgICB9XHJcbiAgICBpZiAoY2hhbmdlc1snYXZlcmFnZUNlbnRlciddKSB7XHJcbiAgICAgIHRoaXMuX2NsdXN0ZXJNYW5hZ2VyLnNldEF2ZXJhZ2VDZW50ZXIodGhpcyk7XHJcbiAgICB9XHJcbiAgICBpZiAoY2hhbmdlc1snbWluaW11bUNsdXN0ZXJTaXplJ10pIHtcclxuICAgICAgdGhpcy5fY2x1c3Rlck1hbmFnZXIuc2V0TWluaW11bUNsdXN0ZXJTaXplKHRoaXMpO1xyXG4gICAgfVxyXG4gICAgaWYgKGNoYW5nZXNbJ2ltYWdlUGF0aCddKSB7XHJcbiAgICAgIHRoaXMuX2NsdXN0ZXJNYW5hZ2VyLnNldEltYWdlUGF0aCh0aGlzKTtcclxuICAgIH1cclxuICAgIGlmIChjaGFuZ2VzWydpbWFnZUV4dGVuc2lvbiddKSB7XHJcbiAgICAgIHRoaXMuX2NsdXN0ZXJNYW5hZ2VyLnNldEltYWdlRXh0ZW5zaW9uKHRoaXMpO1xyXG4gICAgfVxyXG4gICAgaWYgKGNoYW5nZXNbJ2NhbGN1bGF0b3InXSkge1xyXG4gICAgICB0aGlzLl9jbHVzdGVyTWFuYWdlci5zZXRDYWxjdWxhdG9yKHRoaXMpO1xyXG4gICAgfVxyXG4gICAgaWYgKGNoYW5nZXNbJ3N0eWxlcyddKSB7XHJcbiAgICAgIHRoaXMuX2NsdXN0ZXJNYW5hZ2VyLnNldFN0eWxlcyh0aGlzKTtcclxuICAgIH1cclxuICAgIGlmIChjaGFuZ2VzWydjbHVzdGVyQ2xhc3MnXSkge1xyXG4gICAgICB0aGlzLl9jbHVzdGVyTWFuYWdlci5zZXRDbHVzdGVyQ2xhc3ModGhpcyk7XHJcbiAgICB9XHJcbiAgICBpZiAoY2hhbmdlc1snZW5hYmxlUmV0aW5hSWNvbnMnXSkge1xyXG4gICAgICB0aGlzLl9jbHVzdGVyTWFuYWdlci5zZXRFbmFibGVSZXRpbmFJY29ucyh0aGlzKTtcclxuICAgIH1cclxuICAgIGlmIChjaGFuZ2VzWydpZ25vcmVIaWRkZW4nXSkge1xyXG4gICAgICB0aGlzLl9jbHVzdGVyTWFuYWdlci5zZXRJZ25vcmVIaWRkZW4odGhpcyk7XHJcbiAgICB9XHJcbiAgICBpZiAoY2hhbmdlc1snaW1hZ2VTaXplcyddKSB7XHJcbiAgICAgIHRoaXMuX2NsdXN0ZXJNYW5hZ2VyLnNldEltYWdlU2l6ZXModGhpcyk7XHJcbiAgICB9XHJcbiAgICBpZiAoY2hhbmdlc1sndGl0bGUnXSkge1xyXG4gICAgICB0aGlzLl9jbHVzdGVyTWFuYWdlci5zZXRUaXRsZSh0aGlzKTtcclxuICAgIH1cclxuICAgIC8vIHRzbGludDplbmFibGU6IG5vLXN0cmluZy1saXRlcmFsXHJcblxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfYWRkRXZlbnRMaXN0ZW5lcnMoKSB7XHJcbiAgICBjb25zdCBoYW5kbGVycyA9IFtcclxuICAgICAge1xyXG4gICAgICAgIG5hbWU6ICdjbHVzdGVyY2xpY2snLFxyXG4gICAgICAgIGhhbmRsZXI6ICgpID0+IHRoaXMuY2x1c3RlckNsaWNrLmVtaXQoKSxcclxuICAgICAgfSxcclxuICAgIF07XHJcbiAgICBoYW5kbGVycy5mb3JFYWNoKChvYmopID0+IHtcclxuICAgICAgY29uc3Qgb3MgPSB0aGlzLl9jbHVzdGVyTWFuYWdlci5jcmVhdGVDbHVzdGVyRXZlbnRPYnNlcnZhYmxlKG9iai5uYW1lKS5zdWJzY3JpYmUob2JqLmhhbmRsZXIpO1xyXG4gICAgICB0aGlzLl9vYnNlcnZhYmxlU3Vic2NyaXB0aW9ucy5wdXNoKG9zKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqIEBpbnRlcm5hbCAqL1xyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5fYWRkRXZlbnRMaXN0ZW5lcnMoKTtcclxuICAgIHRoaXMuX2NsdXN0ZXJNYW5hZ2VyLmluaXQoe1xyXG4gICAgICBhdmVyYWdlQ2VudGVyOiB0aGlzLmF2ZXJhZ2VDZW50ZXIsXHJcbiAgICAgIGNhbGN1bGF0b3I6IHRoaXMuY2FsY3VsYXRvcixcclxuICAgICAgY2x1c3RlckNsYXNzOiB0aGlzLmNsdXN0ZXJDbGFzcyxcclxuICAgICAgZW5hYmxlUmV0aW5hSWNvbnM6IHRoaXMuZW5hYmxlUmV0aW5hSWNvbnMsXHJcbiAgICAgIGdyaWRTaXplOiB0aGlzLmdyaWRTaXplLFxyXG4gICAgICBpZ25vcmVIaWRkZW46IHRoaXMuaWdub3JlSGlkZGVuLFxyXG4gICAgICBpbWFnZUV4dGVuc2lvbjogdGhpcy5pbWFnZUV4dGVuc2lvbixcclxuICAgICAgaW1hZ2VQYXRoOiB0aGlzLmltYWdlUGF0aCxcclxuICAgICAgaW1hZ2VTaXplczogdGhpcy5pbWFnZVNpemVzLFxyXG4gICAgICBtYXhab29tOiB0aGlzLm1heFpvb20sXHJcbiAgICAgIG1pbmltdW1DbHVzdGVyU2l6ZTogdGhpcy5taW5pbXVtQ2x1c3RlclNpemUsXHJcbiAgICAgIHN0eWxlczogdGhpcy5zdHlsZXMsXHJcbiAgICAgIHRpdGxlOiB0aGlzLnRpdGxlLFxyXG4gICAgICB6b29tT25DbGljazogdGhpcy56b29tT25DbGljayxcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=