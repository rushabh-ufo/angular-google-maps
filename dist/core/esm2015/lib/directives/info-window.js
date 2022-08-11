import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { InfoWindowManager } from '../services/managers/info-window-manager';
let infoWindowId = 0;
/**
 * AgmInfoWindow renders a info window inside a {@link AgmMarker} or standalone.
 *
 * ### Example
 * ```typescript
 * import { Component } from '@angular/core';
 *
 * @Component({
 *  selector: 'my-map-cmp',
 *  styles: [`
 *    .agm-map-container {
 *      height: 300px;
 *    }
 * `],
 *  template: `
 *    <agm-map [latitude]="lat" [longitude]="lng" [zoom]="zoom">
 *      <agm-marker [latitude]="lat" [longitude]="lng" [label]="'M'">
 *        <agm-info-window [disableAutoPan]="true">
 *          Hi, this is the content of the <strong>info window</strong>
 *        </agm-info-window>
 *      </agm-marker>
 *    </agm-map>
 *  `
 * })
 * ```
 */
export class AgmInfoWindow {
    constructor(_infoWindowManager, _el) {
        this._infoWindowManager = _infoWindowManager;
        this._el = _el;
        /**
         * Sets the open state for the InfoWindow. You can also call the open() and close() methods.
         */
        this.isOpen = false;
        /**
         * Emits an event when the info window is closed.
         */
        this.infoWindowClose = new EventEmitter();
        this._infoWindowAddedToManager = false;
        this._id = (infoWindowId++).toString();
    }
    ngOnInit() {
        this.content = this._el.nativeElement.querySelector('.agm-info-window-content');
        this._infoWindowManager.addInfoWindow(this);
        this._infoWindowAddedToManager = true;
        this._updateOpenState();
        this._registerEventListeners();
    }
    /** @internal */
    ngOnChanges(changes) {
        if (!this._infoWindowAddedToManager) {
            return;
        }
        // tslint:disable: no-string-literal
        if ((changes['latitude'] || changes['longitude']) && typeof this.latitude === 'number' &&
            typeof this.longitude === 'number') {
            this._infoWindowManager.setPosition(this);
        }
        if (changes['zIndex']) {
            this._infoWindowManager.setZIndex(this);
        }
        if (changes['isOpen']) {
            this._updateOpenState();
        }
        this._setInfoWindowOptions(changes);
    }
    // tslint:enable: no-string-literal
    _registerEventListeners() {
        this._infoWindowManager.createEventObservable('closeclick', this).subscribe(() => {
            this.isOpen = false;
            this.infoWindowClose.emit();
        });
    }
    _updateOpenState() {
        this.isOpen ? this.open() : this.close();
    }
    _setInfoWindowOptions(changes) {
        const options = {};
        const optionKeys = Object.keys(changes).filter(k => AgmInfoWindow._infoWindowOptionsInputs.indexOf(k) !== -1);
        optionKeys.forEach((k) => { options[k] = changes[k].currentValue; });
        this._infoWindowManager.setOptions(this, options);
    }
    /**
     * Opens the info window.
     */
    open() { return this._infoWindowManager.open(this); }
    /**
     * Closes the info window.
     */
    close() {
        return this._infoWindowManager.close(this).then(() => { this.infoWindowClose.emit(); });
    }
    /** @internal */
    id() { return this._id; }
    /** @internal */
    toString() { return 'AgmInfoWindow-' + this._id.toString(); }
    /** @internal */
    ngOnDestroy() { this._infoWindowManager.deleteInfoWindow(this); }
}
AgmInfoWindow._infoWindowOptionsInputs = ['disableAutoPan', 'maxWidth'];
AgmInfoWindow.decorators = [
    { type: Component, args: [{
                selector: 'agm-info-window',
                template: `<div class='agm-info-window-content'>
      <ng-content></ng-content>
    </div>
  `
            },] }
];
AgmInfoWindow.ctorParameters = () => [
    { type: InfoWindowManager },
    { type: ElementRef }
];
AgmInfoWindow.propDecorators = {
    latitude: [{ type: Input }],
    longitude: [{ type: Input }],
    disableAutoPan: [{ type: Input }],
    zIndex: [{ type: Input }],
    maxWidth: [{ type: Input }],
    isOpen: [{ type: Input }],
    infoWindowClose: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mby13aW5kb3cuanMiLCJzb3VyY2VSb290IjoiRDovQXV0b21hdGlvbi9hbmd1bGFyLWdvb2dsZS1tYXBzL3BhY2thZ2VzL2NvcmUvc3JjLyIsInNvdXJjZXMiOlsibGliL2RpcmVjdGl2ZXMvaW5mby13aW5kb3cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBZ0MsTUFBTSxFQUFnQixNQUFNLGVBQWUsQ0FBQztBQUUvSCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUk3RSxJQUFJLFlBQVksR0FBRyxDQUFDLENBQUM7QUFFckI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F5Qkc7QUFRSCxNQUFNLE9BQU8sYUFBYTtJQTBEeEIsWUFBb0Isa0JBQXFDLEVBQVUsR0FBZTtRQUE5RCx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW1CO1FBQVUsUUFBRyxHQUFILEdBQUcsQ0FBWTtRQWRsRjs7V0FFRztRQUNNLFdBQU0sR0FBRyxLQUFLLENBQUM7UUFFeEI7O1dBRUc7UUFDTyxvQkFBZSxHQUF1QixJQUFJLFlBQVksRUFBUSxDQUFDO1FBR2pFLDhCQUF5QixHQUFHLEtBQUssQ0FBQztRQUNsQyxRQUFHLEdBQVcsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBRW1DLENBQUM7SUFFdEYsUUFBUTtRQUNOLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLDBCQUEwQixDQUFDLENBQUM7UUFDaEYsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM1QyxJQUFJLENBQUMseUJBQXlCLEdBQUcsSUFBSSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxD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QXdCLEdBQWEsQ0FBQyxnQkFBZ0IsRUFBRSxVQUFVLENBQUMsQ0FBQzs7WUE3RHBGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsaUJBQWlCO2dCQUMzQixRQUFRLEVBQUU7OztHQUdUO2FBQ0Y7OztZQXRDUSxpQkFBaUI7WUFGTixVQUFVOzs7dUJBOEMzQixLQUFLO3dCQU1MLEtBQUs7NkJBTUwsS0FBSztxQkFRTCxLQUFLO3VCQU9MLEtBQUs7cUJBZUwsS0FBSzs4QkFLTCxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgT25Jbml0LCBPdXRwdXQsIFNpbXBsZUNoYW5nZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgSW5mb1dpbmRvd01hbmFnZXIgfSBmcm9tICcuLi9zZXJ2aWNlcy9tYW5hZ2Vycy9pbmZvLXdpbmRvdy1tYW5hZ2VyJztcclxuXHJcbmltcG9ydCB7IEFnbU1hcmtlciB9IGZyb20gJy4vbWFya2VyJztcclxuXHJcbmxldCBpbmZvV2luZG93SWQgPSAwO1xyXG5cclxuLyoqXHJcbiAqIEFnbUluZm9XaW5kb3cgcmVuZGVycyBhIGluZm8gd2luZG93IGluc2lkZSBhIHtAbGluayBBZ21NYXJrZXJ9IG9yIHN0YW5kYWxvbmUuXHJcbiAqXHJcbiAqICMjIyBFeGFtcGxlXHJcbiAqIGBgYHR5cGVzY3JpcHRcclxuICogaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbiAqXHJcbiAqIEBDb21wb25lbnQoe1xyXG4gKiAgc2VsZWN0b3I6ICdteS1tYXAtY21wJyxcclxuICogIHN0eWxlczogW2BcclxuICogICAgLmFnbS1tYXAtY29udGFpbmVyIHtcclxuICogICAgICBoZWlnaHQ6IDMwMHB4O1xyXG4gKiAgICB9XHJcbiAqIGBdLFxyXG4gKiAgdGVtcGxhdGU6IGBcclxuICogICAgPGFnbS1tYXAgW2xhdGl0dWRlXT1cImxhdFwiIFtsb25naXR1ZGVdPVwibG5nXCIgW3pvb21dPVwiem9vbVwiPlxyXG4gKiAgICAgIDxhZ20tbWFya2VyIFtsYXRpdHVkZV09XCJsYXRcIiBbbG9uZ2l0dWRlXT1cImxuZ1wiIFtsYWJlbF09XCInTSdcIj5cclxuICogICAgICAgIDxhZ20taW5mby13aW5kb3cgW2Rpc2FibGVBdXRvUGFuXT1cInRydWVcIj5cclxuICogICAgICAgICAgSGksIHRoaXMgaXMgdGhlIGNvbnRlbnQgb2YgdGhlIDxzdHJvbmc+aW5mbyB3aW5kb3c8L3N0cm9uZz5cclxuICogICAgICAgIDwvYWdtLWluZm8td2luZG93PlxyXG4gKiAgICAgIDwvYWdtLW1hcmtlcj5cclxuICogICAgPC9hZ20tbWFwPlxyXG4gKiAgYFxyXG4gKiB9KVxyXG4gKiBgYGBcclxuICovXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnYWdtLWluZm8td2luZG93JyxcclxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9J2FnbS1pbmZvLXdpbmRvdy1jb250ZW50Jz5cclxuICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxyXG4gICAgPC9kaXY+XHJcbiAgYCxcclxufSlcclxuZXhwb3J0IGNsYXNzIEFnbUluZm9XaW5kb3cgaW1wbGVtZW50cyBPbkRlc3Ryb3ksIE9uQ2hhbmdlcywgT25Jbml0IHtcclxuICAvKipcclxuICAgKiBUaGUgbGF0aXR1ZGUgcG9zaXRpb24gb2YgdGhlIGluZm8gd2luZG93IChvbmx5IHVzZWZ1bGwgaWYgeW91IHVzZSBpdCBvdXNpZGUgb2YgYSB7QGxpbmtcclxuICAgKiBBZ21NYXJrZXJ9KS5cclxuICAgKi9cclxuICBASW5wdXQoKSBsYXRpdHVkZTogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgbG9uZ2l0dWRlIHBvc2l0aW9uIG9mIHRoZSBpbmZvIHdpbmRvdyAob25seSB1c2VmdWxsIGlmIHlvdSB1c2UgaXQgb3VzaWRlIG9mIGEge0BsaW5rXHJcbiAgICogQWdtTWFya2VyfSkuXHJcbiAgICovXHJcbiAgQElucHV0KCkgbG9uZ2l0dWRlOiBudW1iZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIERpc2FibGUgYXV0by1wYW4gb24gb3Blbi4gQnkgZGVmYXVsdCwgdGhlIGluZm8gd2luZG93IHdpbGwgcGFuIHRoZSBtYXAgc28gdGhhdCBpdCBpcyBmdWxseVxyXG4gICAqIHZpc2libGUgd2hlbiBpdCBvcGVucy5cclxuICAgKi9cclxuICBASW5wdXQoKSBkaXNhYmxlQXV0b1BhbjogYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICogQWxsIEluZm9XaW5kb3dzIGFyZSBkaXNwbGF5ZWQgb24gdGhlIG1hcCBpbiBvcmRlciBvZiB0aGVpciB6SW5kZXgsIHdpdGggaGlnaGVyIHZhbHVlc1xyXG4gICAqIGRpc3BsYXlpbmcgaW4gZnJvbnQgb2YgSW5mb1dpbmRvd3Mgd2l0aCBsb3dlciB2YWx1ZXMuIEJ5IGRlZmF1bHQsIEluZm9XaW5kb3dzIGFyZSBkaXNwbGF5ZWRcclxuICAgKiBhY2NvcmRpbmcgdG8gdGhlaXIgbGF0aXR1ZGUsIHdpdGggSW5mb1dpbmRvd3Mgb2YgbG93ZXIgbGF0aXR1ZGVzIGFwcGVhcmluZyBpbiBmcm9udCBvZlxyXG4gICAqIEluZm9XaW5kb3dzIGF0IGhpZ2hlciBsYXRpdHVkZXMuIEluZm9XaW5kb3dzIGFyZSBhbHdheXMgZGlzcGxheWVkIGluIGZyb250IG9mIG1hcmtlcnMuXHJcbiAgICovXHJcbiAgQElucHV0KCkgekluZGV4OiBudW1iZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIE1heGltdW0gd2lkdGggb2YgdGhlIGluZm93aW5kb3csIHJlZ2FyZGxlc3Mgb2YgY29udGVudCdzIHdpZHRoLiBUaGlzIHZhbHVlIGlzIG9ubHkgY29uc2lkZXJlZFxyXG4gICAqIGlmIGl0IGlzIHNldCBiZWZvcmUgYSBjYWxsIHRvIG9wZW4uIFRvIGNoYW5nZSB0aGUgbWF4aW11bSB3aWR0aCB3aGVuIGNoYW5naW5nIGNvbnRlbnQsIGNhbGxcclxuICAgKiBjbG9zZSwgdXBkYXRlIG1heFdpZHRoLCBhbmQgdGhlbiBvcGVuLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG1heFdpZHRoOiBudW1iZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIEhvbGRzIHRoZSBtYXJrZXIgdGhhdCBpcyB0aGUgaG9zdCBvZiB0aGUgaW5mbyB3aW5kb3cgKGlmIGF2YWlsYWJsZSlcclxuICAgKi9cclxuICBob3N0TWFya2VyOiBBZ21NYXJrZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIEhvbGRzIHRoZSBuYXRpdmUgZWxlbWVudCB0aGF0IGlzIHVzZWQgZm9yIHRoZSBpbmZvIHdpbmRvdyBjb250ZW50LlxyXG4gICAqL1xyXG4gIGNvbnRlbnQ6IE5vZGU7XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldHMgdGhlIG9wZW4gc3RhdGUgZm9yIHRoZSBJbmZvV2luZG93LiBZb3UgY2FuIGFsc28gY2FsbCB0aGUgb3BlbigpIGFuZCBjbG9zZSgpIG1ldGhvZHMuXHJcbiAgICovXHJcbiAgQElucHV0KCkgaXNPcGVuID0gZmFsc2U7XHJcblxyXG4gIC8qKlxyXG4gICAqIEVtaXRzIGFuIGV2ZW50IHdoZW4gdGhlIGluZm8gd2luZG93IGlzIGNsb3NlZC5cclxuICAgKi9cclxuICBAT3V0cHV0KCkgaW5mb1dpbmRvd0Nsb3NlOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XHJcblxyXG4gIHByaXZhdGUgc3RhdGljIF9pbmZvV2luZG93T3B0aW9uc0lucHV0czogc3RyaW5nW10gPSBbJ2Rpc2FibGVBdXRvUGFuJywgJ21heFdpZHRoJ107XHJcbiAgcHJpdmF0ZSBfaW5mb1dpbmRvd0FkZGVkVG9NYW5hZ2VyID0gZmFsc2U7XHJcbiAgcHJpdmF0ZSBfaWQ6IHN0cmluZyA9IChpbmZvV2luZG93SWQrKykudG9TdHJpbmcoKTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfaW5mb1dpbmRvd01hbmFnZXI6IEluZm9XaW5kb3dNYW5hZ2VyLCBwcml2YXRlIF9lbDogRWxlbWVudFJlZikge31cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLmNvbnRlbnQgPSB0aGlzLl9lbC5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZ20taW5mby13aW5kb3ctY29udGVudCcpO1xyXG4gICAgdGhpcy5faW5mb1dpbmRvd01hbmFnZXIuYWRkSW5mb1dpbmRvdyh0aGlzKTtcclxuICAgIHRoaXMuX2luZm9XaW5kb3dBZGRlZFRvTWFuYWdlciA9IHRydWU7XHJcbiAgICB0aGlzLl91cGRhdGVPcGVuU3RhdGUoKTtcclxuICAgIHRoaXMuX3JlZ2lzdGVyRXZlbnRMaXN0ZW5lcnMoKTtcclxuICB9XHJcblxyXG4gIC8qKiBAaW50ZXJuYWwgKi9cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiB7W2tleTogc3RyaW5nXTogU2ltcGxlQ2hhbmdlfSkge1xyXG4gICAgaWYgKCF0aGlzLl9pbmZvV2luZG93QWRkZWRUb01hbmFnZXIpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgLy8gdHNsaW50OmRpc2FibGU6IG5vLXN0cmluZy1saXRlcmFsXHJcbiAgICBpZiAoKGNoYW5nZXNbJ2xhdGl0dWRlJ10gfHwgY2hhbmdlc1snbG9uZ2l0dWRlJ10pICYmIHR5cGVvZiB0aGlzLmxhdGl0dWRlID09PSAnbnVtYmVyJyAmJlxyXG4gICAgICAgIHR5cGVvZiB0aGlzLmxvbmdpdHVkZSA9PT0gJ251bWJlcicpIHtcclxuICAgICAgdGhpcy5faW5mb1dpbmRvd01hbmFnZXIuc2V0UG9zaXRpb24odGhpcyk7XHJcbiAgICB9XHJcbiAgICBpZiAoY2hhbmdlc1snekluZGV4J10pIHtcclxuICAgICAgdGhpcy5faW5mb1dpbmRvd01hbmFnZXIuc2V0WkluZGV4KHRoaXMpO1xyXG4gICAgfVxyXG4gICAgaWYgKGNoYW5nZXNbJ2lzT3BlbiddKSB7XHJcbiAgICAgIHRoaXMuX3VwZGF0ZU9wZW5TdGF0ZSgpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5fc2V0SW5mb1dpbmRvd09wdGlvbnMoY2hhbmdlcyk7XHJcbiAgfVxyXG4gIC8vIHRzbGludDplbmFibGU6IG5vLXN0cmluZy1saXRlcmFsXHJcblxyXG4gIHByaXZhdGUgX3JlZ2lzdGVyRXZlbnRMaXN0ZW5lcnMoKSB7XHJcbiAgICB0aGlzLl9pbmZvV2luZG93TWFuYWdlci5jcmVhdGVFdmVudE9ic2VydmFibGUoJ2Nsb3NlY2xpY2snLCB0aGlzKS5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICB0aGlzLmlzT3BlbiA9IGZhbHNlO1xyXG4gICAgICB0aGlzLmluZm9XaW5kb3dDbG9zZS5lbWl0KCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX3VwZGF0ZU9wZW5TdGF0ZSgpIHtcclxuICAgIHRoaXMuaXNPcGVuID8gdGhpcy5vcGVuKCkgOiB0aGlzLmNsb3NlKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9zZXRJbmZvV2luZG93T3B0aW9ucyhjaGFuZ2VzOiB7W2tleTogc3RyaW5nXTogU2ltcGxlQ2hhbmdlfSkge1xyXG4gICAgY29uc3Qgb3B0aW9uczoge1twcm9wTmFtZTogc3RyaW5nXTogYW55fSA9IHt9O1xyXG4gICAgY29uc3Qgb3B0aW9uS2V5cyA9IE9iamVjdC5rZXlzKGNoYW5nZXMpLmZpbHRlcihcclxuICAgICAgICBrID0+IEFnbUluZm9XaW5kb3cuX2luZm9XaW5kb3dPcHRpb25zSW5wdXRzLmluZGV4T2YoaykgIT09IC0xKTtcclxuICAgIG9wdGlvbktleXMuZm9yRWFjaCgoaykgPT4geyBvcHRpb25zW2tdID0gY2hhbmdlc1trXS5jdXJyZW50VmFsdWU7IH0pO1xyXG4gICAgdGhpcy5faW5mb1dpbmRvd01hbmFnZXIuc2V0T3B0aW9ucyh0aGlzLCBvcHRpb25zKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE9wZW5zIHRoZSBpbmZvIHdpbmRvdy5cclxuICAgKi9cclxuICBvcGVuKCk6IFByb21pc2U8dm9pZD4geyByZXR1cm4gdGhpcy5faW5mb1dpbmRvd01hbmFnZXIub3Blbih0aGlzKTsgfVxyXG5cclxuICAvKipcclxuICAgKiBDbG9zZXMgdGhlIGluZm8gd2luZG93LlxyXG4gICAqL1xyXG4gIGNsb3NlKCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX2luZm9XaW5kb3dNYW5hZ2VyLmNsb3NlKHRoaXMpLnRoZW4oKCkgPT4geyB0aGlzLmluZm9XaW5kb3dDbG9zZS5lbWl0KCk7IH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqIEBpbnRlcm5hbCAqL1xyXG4gIGlkKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLl9pZDsgfVxyXG5cclxuICAvKiogQGludGVybmFsICovXHJcbiAgdG9TdHJpbmcoKTogc3RyaW5nIHsgcmV0dXJuICdBZ21JbmZvV2luZG93LScgKyB0aGlzLl9pZC50b1N0cmluZygpOyB9XHJcblxyXG4gIC8qKiBAaW50ZXJuYWwgKi9cclxuICBuZ09uRGVzdHJveSgpIHsgdGhpcy5faW5mb1dpbmRvd01hbmFnZXIuZGVsZXRlSW5mb1dpbmRvdyh0aGlzKTsgfVxyXG59XHJcbiJdfQ==