import { AgmMarker, GoogleMapsAPIWrapper, MapsAPILoader, MarkerManager } from '@agm/core';
import { Component, ContentChild, ElementRef, EventEmitter, Host, Input, Optional, Output, SkipSelf, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
export class AgmSnazzyInfoWindow {
    constructor(_marker, _wrapper, _manager, _loader) {
        this._marker = _marker;
        this._wrapper = _wrapper;
        this._manager = _manager;
        this._loader = _loader;
        /**
         * Changes the open status of the snazzy info window.
         */
        this.isOpen = false;
        /**
         * Emits when the open status changes.
         */
        this.isOpenChange = new EventEmitter();
        /**
         * Choose where you want the info window to be displayed, relative to the marker.
         */
        this.placement = 'top';
        /**
         * The max width in pixels of the info window.
         */
        this.maxWidth = 200;
        /**
         * The max height in pixels of the info window.
         */
        this.maxHeight = 200;
        /**
         * Determines if the info window will open when the marker is clicked.
         * An internal listener is added to the Google Maps click event which calls the open() method.
         */
        this.openOnMarkerClick = true;
        /**
         * Determines if the info window will close when the map is clicked. An internal listener is added to
         * the Google Maps click event which calls the close() method.
         * This will not activate on the Google Maps drag event when the user is panning the map.
         */
        this.closeOnMapClick = true;
        /**
         * Determines if the info window will close when any other Snazzy Info Window is opened.
         */
        this.closeWhenOthersOpen = false;
        /**
         * Determines if the info window will show a close button.
         */
        this.showCloseButton = true;
        /**
         * Determines if the info window will be panned into view when opened.
         */
        this.panOnOpen = true;
        /**
         * Emits before the info window opens.
         */
        this.beforeOpen = new EventEmitter();
        /**
         * Emits before the info window closes.
         */
        this.afterClose = new EventEmitter();
        this._snazzyInfoWindowInitialized = null;
    }
    /**
     * @internal
     */
    ngOnChanges(changes) {
        if (this._nativeSnazzyInfoWindow == null) {
            return;
        }
        if ('isOpen' in changes && this.isOpen) {
            this._openInfoWindow();
        }
        else if ('isOpen' in changes && !this.isOpen) {
            this._closeInfoWindow();
        }
        if (('latitude' in changes || 'longitude' in changes) && this._marker == null) {
            this._updatePosition();
        }
    }
    /**
     * @internal
     */
    ngAfterViewInit() {
        const m = this._manager != null ? this._manager.getNativeMarker(this._marker) : null;
        this._snazzyInfoWindowInitialized = this._loader.load()
            .then(() => require('snazzy-info-window'))
            .then((module) => Promise.all([module, m, this._wrapper.getNativeMap()]))
            .then((elems) => {
            const options = {
                map: elems[2],
                content: '',
                placement: this.placement,
                maxWidth: this.maxWidth,
                maxHeight: this.maxHeight,
                backgroundColor: this.backgroundColor,
                padding: this.padding,
                border: this.border,
                borderRadius: this.borderRadius,
                fontColor: this.fontColor,
                pointer: this.pointer,
                shadow: this.shadow,
                closeOnMapClick: this.closeOnMapClick,
                openOnMarkerClick: this.openOnMarkerClick,
                closeWhenOthersOpen: this.closeWhenOthersOpen,
                showCloseButton: this.showCloseButton,
                panOnOpen: this.panOnOpen,
                wrapperClass: this.wrapperClass,
                callbacks: {
                    beforeOpen: () => {
                        this._createViewContent();
                        this.beforeOpen.emit();
                    },
                    afterOpen: () => {
                        this.isOpenChange.emit(this.openStatus());
                    },
                    afterClose: () => {
                        this.afterClose.emit();
                        this.isOpenChange.emit(this.openStatus());
                    },
                },
            };
            if (elems[1] != null) {
                options.marker = elems[1];
            }
            else {
                options.position = {
                    lat: this.latitude,
                    lng: this.longitude,
                };
            }
            this._nativeSnazzyInfoWindow = new elems[0](options);
        });
        this._snazzyInfoWindowInitialized.then(() => {
            if (this.isOpen) {
                this._openInfoWindow();
            }
        });
    }
    _openInfoWindow() {
        this._snazzyInfoWindowInitialized.then(() => {
            this._createViewContent();
            this._nativeSnazzyInfoWindow.open();
        });
    }
    _closeInfoWindow() {
        this._snazzyInfoWindowInitialized.then(() => {
            this._nativeSnazzyInfoWindow.close();
        });
    }
    _createViewContent() {
        if (this._viewContainerRef.length === 1) {
            return;
        }
        const evr = this._viewContainerRef.createEmbeddedView(this._templateRef);
        this._nativeSnazzyInfoWindow.setContent(this._outerWrapper.nativeElement);
        // we have to run this in a separate cycle.
        setTimeout(() => {
            evr.detectChanges();
        });
    }
    _updatePosition() {
        this._nativeSnazzyInfoWindow.setPosition({
            lat: this.latitude,
            lng: this.longitude,
        });
    }
    /**
     * Returns true when the Snazzy Info Window is initialized and open.
     */
    openStatus() {
        return this._nativeSnazzyInfoWindow && this._nativeSnazzyInfoWindow.isOpen();
    }
    /**
     * @internal
     */
    ngOnDestroy() {
        if (this._nativeSnazzyInfoWindow) {
            this._nativeSnazzyInfoWindow.destroy();
        }
    }
}
AgmSnazzyInfoWindow.decorators = [
    { type: Component, args: [{
                // tslint:disable-next-line:component-selector
                selector: 'agm-snazzy-info-window',
                template: '<div #outerWrapper><div #viewContainer></div></div><ng-content></ng-content>'
            },] }
];
AgmSnazzyInfoWindow.ctorParameters = () => [
    { type: AgmMarker, decorators: [{ type: Optional }, { type: Host }, { type: SkipSelf }] },
    { type: GoogleMapsAPIWrapper },
    { type: MarkerManager },
    { type: MapsAPILoader }
];
AgmSnazzyInfoWindow.propDecorators = {
    latitude: [{ type: Input }],
    longitude: [{ type: Input }],
    isOpen: [{ type: Input }],
    isOpenChange: [{ type: Output }],
    placement: [{ type: Input }],
    maxWidth: [{ type: Input }],
    maxHeight: [{ type: Input }],
    backgroundColor: [{ type: Input }],
    padding: [{ type: Input }],
    border: [{ type: Input }],
    borderRadius: [{ type: Input }],
    fontColor: [{ type: Input }],
    fontSize: [{ type: Input }],
    pointer: [{ type: Input }],
    shadow: [{ type: Input }],
    openOnMarkerClick: [{ type: Input }],
    closeOnMapClick: [{ type: Input }],
    wrapperClass: [{ type: Input }],
    closeWhenOthersOpen: [{ type: Input }],
    showCloseButton: [{ type: Input }],
    panOnOpen: [{ type: Input }],
    beforeOpen: [{ type: Output }],
    afterClose: [{ type: Output }],
    _outerWrapper: [{ type: ViewChild, args: ['outerWrapper', { read: ElementRef, static: false },] }],
    _viewContainerRef: [{ type: ViewChild, args: ['viewContainer', { read: ViewContainerRef, static: false },] }],
    _templateRef: [{ type: ContentChild, args: [TemplateRef, { static: false },] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic25henp5LWluZm8td2luZG93LmpzIiwic291cmNlUm9vdCI6IkQ6L0F1dG9tYXRpb24vYW5ndWxhci1nb29nbGUtbWFwcy9wYWNrYWdlcy9zbmF6enktaW5mby13aW5kb3cvc3JjLyIsInNvdXJjZXMiOlsibGliL2RpcmVjdGl2ZXMvc25henp5LWluZm8td2luZG93LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsb0JBQW9CLEVBQUUsYUFBYSxFQUFFLGFBQWEsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUMxRixPQUFPLEVBQWlCLFNBQVMsRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUF3QixRQUFRLEVBQUUsTUFBTSxFQUFpQixRQUFRLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQVN6TixNQUFNLE9BQU8sbUJBQW1CO0lBZ0o5QixZQUMwQyxPQUFrQixFQUNsRCxRQUE4QixFQUM5QixRQUF1QixFQUN2QixPQUFzQjtRQUhVLFlBQU8sR0FBUCxPQUFPLENBQVc7UUFDbEQsYUFBUSxHQUFSLFFBQVEsQ0FBc0I7UUFDOUIsYUFBUSxHQUFSLFFBQVEsQ0FBZTtRQUN2QixZQUFPLEdBQVAsT0FBTyxDQUFlO1FBdkloQzs7V0FFRztRQUNNLFdBQU0sR0FBRyxLQUFLLENBQUM7UUFFeEI7O1dBRUc7UUFDTyxpQkFBWSxHQUEwQixJQUFJLFlBQVksRUFBVyxDQUFDO1FBRTVFOztXQUVHO1FBQ00sY0FBUyxHQUF3QyxLQUFLLENBQUM7UUFFaEU7O1dBRUc7UUFDTSxhQUFRLEdBQW9CLEdBQUcsQ0FBQztRQUV6Qzs7V0FFRztRQUNNLGNBQVMsR0FBb0IsR0FBRyxDQUFDO1FBOEMxQzs7O1dBR0c7UUFDTSxzQkFBaUIsR0FBRyxJQUFJLENBQUM7UUFFbEM7Ozs7V0FJRztRQUNNLG9CQUFlLEdBQUcsSUFBSSxDQUFDO1FBUWhDOztX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Q3pGOzs7WUFUUSxTQUFTLHVCQTJKYixRQUFRLFlBQUksSUFBSSxZQUFJLFFBQVE7WUEzSmIsb0JBQW9CO1lBQWlCLGFBQWE7WUFBNUIsYUFBYTs7O3VCQWVwRCxLQUFLO3dCQU1MLEtBQUs7cUJBS0wsS0FBSzsyQkFLTCxNQUFNO3dCQUtOLEtBQUs7dUJBS0wsS0FBSzt3QkFLTCxLQUFLOzhCQUtMLEtBQUs7c0JBS0wsS0FBSztxQkFNTCxLQUFLOzJCQUtMLEtBQUs7d0JBS0wsS0FBSzt1QkFLTCxLQUFLO3NCQU9MLEtBQUs7cUJBTUwsS0FBSztnQ0FNTCxLQUFLOzhCQU9MLEtBQUs7MkJBTUwsS0FBSztrQ0FLTCxLQUFLOzhCQUtMLEtBQUs7d0JBS0wsS0FBSzt5QkFLTCxNQUFNO3lCQUtOLE1BQU07NEJBS04sU0FBUyxTQUFDLGNBQWMsRUFBRSxFQUFDLElBQUksRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBQztnQ0FLM0QsU0FBUyxTQUFDLGVBQWUsRUFBRSxFQUFDLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFDOzJCQUtsRSxZQUFZLFNBQUMsV0FBVyxFQUFFLEVBQUMsTUFBTSxFQUFFLEtBQUssRUFBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFnbU1hcmtlciwgR29vZ2xlTWFwc0FQSVdyYXBwZXIsIE1hcHNBUElMb2FkZXIsIE1hcmtlck1hbmFnZXIgfSBmcm9tICdAYWdtL2NvcmUnO1xyXG5pbXBvcnQgeyBBZnRlclZpZXdJbml0LCBDb21wb25lbnQsIENvbnRlbnRDaGlsZCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBIb3N0LCBJbnB1dCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIE9wdGlvbmFsLCBPdXRwdXQsIFNpbXBsZUNoYW5nZXMsIFNraXBTZWxmLCBUZW1wbGF0ZVJlZiwgVmlld0NoaWxkLCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5kZWNsYXJlIHZhciByZXF1aXJlOiBhbnk7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Y29tcG9uZW50LXNlbGVjdG9yXHJcbiAgc2VsZWN0b3I6ICdhZ20tc25henp5LWluZm8td2luZG93JyxcclxuICB0ZW1wbGF0ZTogJzxkaXYgI291dGVyV3JhcHBlcj48ZGl2ICN2aWV3Q29udGFpbmVyPjwvZGl2PjwvZGl2PjxuZy1jb250ZW50PjwvbmctY29udGVudD4nLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgQWdtU25henp5SW5mb1dpbmRvdyBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSwgT25DaGFuZ2VzIHtcclxuICAvKipcclxuICAgKiBUaGUgbGF0aXR1ZGUgYW5kIGxvbmdpdHVkZSB3aGVyZSB0aGUgaW5mbyB3aW5kb3cgaXMgYW5jaG9yZWQuXHJcbiAgICogVGhlIG9mZnNldCB3aWxsIGRlZmF1bHQgdG8gMHB4IHdoZW4gdXNpbmcgdGhpcyBvcHRpb24uIE9ubHkgcmVxdWlyZWQvdXNlZCBpZiB5b3UgYXJlIG5vdCB1c2luZyBhIGFnbS1tYXJrZXIuXHJcbiAgICovXHJcbiAgQElucHV0KCkgbGF0aXR1ZGU6IG51bWJlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGxvbmdpdHVkZSB3aGVyZSB0aGUgaW5mbyB3aW5kb3cgaXMgYW5jaG9yZWQuXHJcbiAgICogVGhlIG9mZnNldCB3aWxsIGRlZmF1bHQgdG8gMHB4IHdoZW4gdXNpbmcgdGhpcyBvcHRpb24uIE9ubHkgcmVxdWlyZWQvdXNlZCBpZiB5b3UgYXJlIG5vdCB1c2luZyBhIGFnbS1tYXJrZXIuXHJcbiAgICovXHJcbiAgQElucHV0KCkgbG9uZ2l0dWRlOiBudW1iZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIENoYW5nZXMgdGhlIG9wZW4gc3RhdHVzIG9mIHRoZSBzbmF6enkgaW5mbyB3aW5kb3cuXHJcbiAgICovXHJcbiAgQElucHV0KCkgaXNPcGVuID0gZmFsc2U7XHJcblxyXG4gIC8qKlxyXG4gICAqIEVtaXRzIHdoZW4gdGhlIG9wZW4gc3RhdHVzIGNoYW5nZXMuXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIGlzT3BlbkNoYW5nZTogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xyXG5cclxuICAvKipcclxuICAgKiBDaG9vc2Ugd2hlcmUgeW91IHdhbnQgdGhlIGluZm8gd2luZG93IHRvIGJlIGRpc3BsYXllZCwgcmVsYXRpdmUgdG8gdGhlIG1hcmtlci5cclxuICAgKi9cclxuICBASW5wdXQoKSBwbGFjZW1lbnQ6ICd0b3AnIHwgJ2JvdHRvbScgfCAnbGVmdCcgfCAncmlnaHQnID0gJ3RvcCc7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBtYXggd2lkdGggaW4gcGl4ZWxzIG9mIHRoZSBpbmZvIHdpbmRvdy5cclxuICAgKi9cclxuICBASW5wdXQoKSBtYXhXaWR0aDogbnVtYmVyIHwgc3RyaW5nID0gMjAwO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgbWF4IGhlaWdodCBpbiBwaXhlbHMgb2YgdGhlIGluZm8gd2luZG93LlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG1heEhlaWdodDogbnVtYmVyIHwgc3RyaW5nID0gMjAwO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgY29sb3IgdG8gdXNlIGZvciB0aGUgYmFja2dyb3VuZCBvZiB0aGUgaW5mbyB3aW5kb3cuXHJcbiAgICovXHJcbiAgQElucHV0KCkgYmFja2dyb3VuZENvbG9yOiBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgY3VzdG9tIHBhZGRpbmcgc2l6ZSBhcm91bmQgdGhlIGNvbnRlbnQgb2YgdGhlIGluZm8gd2luZG93LlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHBhZGRpbmc6IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICogQSBjdXN0b20gYm9yZGVyIGFyb3VuZCB0aGUgaW5mbyB3aW5kb3cuIFNldCB0byBmYWxzZSB0byBjb21wbGV0ZWx5IHJlbW92ZSB0aGUgYm9yZGVyLlxyXG4gICAqIFRoZSB1bml0cyB1c2VkIGZvciBib3JkZXIgc2hvdWxkIGJlIHRoZSBzYW1lIGFzIHBvaW50ZXIuXHJcbiAgICovXHJcbiAgQElucHV0KCkgYm9yZGVyOiB7d2lkdGg6IHN0cmluZzsgY29sb3I6IHN0cmluZ30gfCBib29sZWFuO1xyXG5cclxuICAvKipcclxuICAgKiBBIGN1c3RvbSBDU1MgYm9yZGVyIHJhZGl1cyBwcm9wZXJ0eSB0byBzcGVjaWZ5IHRoZSByb3VuZGVkIGNvcm5lcnMgb2YgdGhlIGluZm8gd2luZG93LlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGJvcmRlclJhZGl1czogc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgZm9udCBjb2xvciB0byB1c2UgZm9yIHRoZSBjb250ZW50IGluc2lkZSB0aGUgYm9keSBvZiB0aGUgaW5mbyB3aW5kb3cuXHJcbiAgICovXHJcbiAgQElucHV0KCkgZm9udENvbG9yOiBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBmb250IHNpemUgdG8gdXNlIGZvciB0aGUgY29udGVudCBpbnNpZGUgdGhlIGJvZHkgb2YgdGhlIGluZm8gd2luZG93LlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGZvbnRTaXplOiBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBoZWlnaHQgb2YgdGhlIHBvaW50ZXIgZnJvbSB0aGUgaW5mbyB3aW5kb3cgdG8gdGhlIG1hcmtlci5cclxuICAgKiBTZXQgdG8gZmFsc2UgdG8gY29tcGxldGVseSByZW1vdmUgdGhlIHBvaW50ZXIuXHJcbiAgICogVGhlIHVuaXRzIHVzZWQgZm9yIHBvaW50ZXIgc2hvdWxkIGJlIHRoZSBzYW1lIGFzIGJvcmRlci5cclxuICAgKi9cclxuICBASW5wdXQoKSBwb2ludGVyOiBzdHJpbmcgfCBib29sZWFuO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgQ1NTIHByb3BlcnRpZXMgZm9yIHRoZSBzaGFkb3cgb2YgdGhlIGluZm8gd2luZG93LlxyXG4gICAqIFNldCB0byBmYWxzZSB0byBjb21wbGV0ZWx5IHJlbW92ZSB0aGUgc2hhZG93LlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHNoYWRvdzogYm9vbGVhbiB8IHtoPzogc3RyaW5nLCB2Pzogc3RyaW5nLCBibHVyOiBzdHJpbmcsIHNwcmVhZDogc3RyaW5nLCBvcGFjaXR5OiBudW1iZXIsIGNvbG9yOiBzdHJpbmd9O1xyXG5cclxuICAvKipcclxuICAgKiBEZXRlcm1pbmVzIGlmIHRoZSBpbmZvIHdpbmRvdyB3aWxsIG9wZW4gd2hlbiB0aGUgbWFya2VyIGlzIGNsaWNrZWQuXHJcbiAgICogQW4gaW50ZXJuYWwgbGlzdGVuZXIgaXMgYWRkZWQgdG8gdGhlIEdvb2dsZSBNYXBzIGNsaWNrIGV2ZW50IHdoaWNoIGNhbGxzIHRoZSBvcGVuKCkgbWV0aG9kLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG9wZW5Pbk1hcmtlckNsaWNrID0gdHJ1ZTtcclxuXHJcbiAgLyoqXHJcbiAgICogRGV0ZXJtaW5lcyBpZiB0aGUgaW5mbyB3aW5kb3cgd2lsbCBjbG9zZSB3aGVuIHRoZSBtYXAgaXMgY2xpY2tlZC4gQW4gaW50ZXJuYWwgbGlzdGVuZXIgaXMgYWRkZWQgdG9cclxuICAgKiB0aGUgR29vZ2xlIE1hcHMgY2xpY2sgZXZlbnQgd2hpY2ggY2FsbHMgdGhlIGNsb3NlKCkgbWV0aG9kLlxyXG4gICAqIFRoaXMgd2lsbCBub3QgYWN0aXZhdGUgb24gdGhlIEdvb2dsZSBNYXBzIGRyYWcgZXZlbnQgd2hlbiB0aGUgdXNlciBpcyBwYW5uaW5nIHRoZSBtYXAuXHJcbiAgICovXHJcbiAgQElucHV0KCkgY2xvc2VPbk1hcENsaWNrID0gdHJ1ZTtcclxuXHJcbiAgLyoqXHJcbiAgICogQW4gb3B0aW9uYWwgQ1NTIGNsYXNzIHRvIGFzc2lnbiB0byB0aGUgd3JhcHBlciBjb250YWluZXIgb2YgdGhlIGluZm8gd2luZG93LlxyXG4gICAqIENhbiBiZSB1c2VkIGZvciBhcHBseWluZyBjdXN0b20gQ1NTIHRvIHRoZSBpbmZvIHdpbmRvdy5cclxuICAgKi9cclxuICBASW5wdXQoKSB3cmFwcGVyQ2xhc3M6IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICogRGV0ZXJtaW5lcyBpZiB0aGUgaW5mbyB3aW5kb3cgd2lsbCBjbG9zZSB3aGVuIGFueSBvdGhlciBTbmF6enkgSW5mbyBXaW5kb3cgaXMgb3BlbmVkLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGNsb3NlV2hlbk90aGVyc09wZW4gPSBmYWxzZTtcclxuXHJcbiAgLyoqXHJcbiAgICogRGV0ZXJtaW5lcyBpZiB0aGUgaW5mbyB3aW5kb3cgd2lsbCBzaG93IGEgY2xvc2UgYnV0dG9uLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHNob3dDbG9zZUJ1dHRvbiA9IHRydWU7XHJcblxyXG4gIC8qKlxyXG4gICAqIERldGVybWluZXMgaWYgdGhlIGluZm8gd2luZG93IHdpbGwgYmUgcGFubmVkIGludG8gdmlldyB3aGVuIG9wZW5lZC5cclxuICAgKi9cclxuICBASW5wdXQoKSBwYW5Pbk9wZW4gPSB0cnVlO1xyXG5cclxuICAvKipcclxuICAgKiBFbWl0cyBiZWZvcmUgdGhlIGluZm8gd2luZG93IG9wZW5zLlxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBiZWZvcmVPcGVuOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEVtaXRzIGJlZm9yZSB0aGUgaW5mbyB3aW5kb3cgY2xvc2VzLlxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBhZnRlckNsb3NlOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIEBWaWV3Q2hpbGQoJ291dGVyV3JhcHBlcicsIHtyZWFkOiBFbGVtZW50UmVmLCBzdGF0aWM6IGZhbHNlfSkgX291dGVyV3JhcHBlcjogRWxlbWVudFJlZjtcclxuXHJcbiAgLyoqXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgQFZpZXdDaGlsZCgndmlld0NvbnRhaW5lcicsIHtyZWFkOiBWaWV3Q29udGFpbmVyUmVmLCBzdGF0aWM6IGZhbHNlfSkgX3ZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWY7XHJcblxyXG4gIC8qKlxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIEBDb250ZW50Q2hpbGQoVGVtcGxhdGVSZWYsIHtzdGF0aWM6IGZhbHNlfSkgX3RlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG5cclxuICBwcm90ZWN0ZWQgX25hdGl2ZVNuYXp6eUluZm9XaW5kb3c6IGFueTtcclxuICBwcm90ZWN0ZWQgX3NuYXp6eUluZm9XaW5kb3dJbml0aWFsaXplZDogUHJvbWlzZTxhbnk+IHwgbnVsbCA9IG51bGw7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgQE9wdGlvbmFsKCkgQEhvc3QoKSBAU2tpcFNlbGYoKSBwcml2YXRlIF9tYXJrZXI6IEFnbU1hcmtlcixcclxuICAgIHByaXZhdGUgX3dyYXBwZXI6IEdvb2dsZU1hcHNBUElXcmFwcGVyLFxyXG4gICAgcHJpdmF0ZSBfbWFuYWdlcjogTWFya2VyTWFuYWdlcixcclxuICAgIHByaXZhdGUgX2xvYWRlcjogTWFwc0FQSUxvYWRlcixcclxuICApIHt9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcclxuICAgIGlmICh0aGlzLl9uYXRpdmVTbmF6enlJbmZvV2luZG93ID09IG51bGwpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKCdpc09wZW4nIGluIGNoYW5nZXMgJiYgdGhpcy5pc09wZW4pIHtcclxuICAgICAgdGhpcy5fb3BlbkluZm9XaW5kb3coKTtcclxuICAgIH0gZWxzZSBpZiAoJ2lzT3BlbicgaW4gY2hhbmdlcyAmJiAhdGhpcy5pc09wZW4pIHtcclxuICAgICAgdGhpcy5fY2xvc2VJbmZvV2luZG93KCk7XHJcbiAgICB9XHJcbiAgICBpZiAoKCdsYXRpdHVkZScgaW4gY2hhbmdlcyB8fCAnbG9uZ2l0dWRlJyBpbiBjaGFuZ2VzKSAmJiB0aGlzLl9tYXJrZXIgPT0gbnVsbCkge1xyXG4gICAgICB0aGlzLl91cGRhdGVQb3NpdGlvbigpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgbmdBZnRlclZpZXdJbml0KCkge1xyXG4gICAgY29uc3QgbSA9IHRoaXMuX21hbmFnZXIgIT0gbnVsbCA/IHRoaXMuX21hbmFnZXIuZ2V0TmF0aXZlTWFya2VyKHRoaXMuX21hcmtlcikgOiBudWxsO1xyXG4gICAgdGhpcy5fc25henp5SW5mb1dpbmRvd0luaXRpYWxpemVkID0gdGhpcy5fbG9hZGVyLmxvYWQoKVxyXG4gICAgICAudGhlbigoKSA9PiByZXF1aXJlKCdzbmF6enktaW5mby13aW5kb3cnKSlcclxuICAgICAgLnRoZW4oKG1vZHVsZTogYW55KSA9PiBQcm9taXNlLmFsbChbbW9kdWxlLCBtLCB0aGlzLl93cmFwcGVyLmdldE5hdGl2ZU1hcCgpXSkpXHJcbiAgICAgIC50aGVuKChlbGVtcykgPT4ge1xyXG4gICAgICAgIGNvbnN0IG9wdGlvbnM6IGFueSA9IHtcclxuICAgICAgICAgIG1hcDogZWxlbXNbMl0sXHJcbiAgICAgICAgICBjb250ZW50OiAnJyxcclxuICAgICAgICAgIHBsYWNlbWVudDogdGhpcy5wbGFjZW1lbnQsXHJcbiAgICAgICAgICBtYXhXaWR0aDogdGhpcy5tYXhXaWR0aCxcclxuICAgICAgICAgIG1heEhlaWdodDogdGhpcy5tYXhIZWlnaHQsXHJcbiAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IHRoaXMuYmFja2dyb3VuZENvbG9yLFxyXG4gICAgICAgICAgcGFkZGluZzogdGhpcy5wYWRkaW5nLFxyXG4gICAgICAgICAgYm9yZGVyOiB0aGlzLmJvcmRlcixcclxuICAgICAgICAgIGJvcmRlclJhZGl1czogdGhpcy5ib3JkZXJSYWRpdXMsXHJcbiAgICAgICAgICBmb250Q29sb3I6IHRoaXMuZm9udENvbG9yLFxyXG4gICAgICAgICAgcG9pbnRlcjogdGhpcy5wb2ludGVyLFxyXG4gICAgICAgICAgc2hhZG93OiB0aGlzLnNoYWRvdyxcclxuICAgICAgICAgIGNsb3NlT25NYXBDbGljazogdGhpcy5jbG9zZU9uTWFwQ2xpY2ssXHJcbiAgICAgICAgICBvcGVuT25NYXJrZXJDbGljazogdGhpcy5vcGVuT25NYXJrZXJDbGljayxcclxuICAgICAgICAgIGNsb3NlV2hlbk90aGVyc09wZW46IHRoaXMuY2xvc2VXaGVuT3RoZXJzT3BlbixcclxuICAgICAgICAgIHNob3dDbG9zZUJ1dHRvbjogdGhpcy5zaG93Q2xvc2VCdXR0b24sXHJcbiAgICAgICAgICBwYW5Pbk9wZW46IHRoaXMucGFuT25PcGVuLFxyXG4gICAgICAgICAgd3JhcHBlckNsYXNzOiB0aGlzLndyYXBwZXJDbGFzcyxcclxuICAgICAgICAgIGNhbGxiYWNrczoge1xyXG4gICAgICAgICAgICBiZWZvcmVPcGVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgdGhpcy5fY3JlYXRlVmlld0NvbnRlbnQoKTtcclxuICAgICAgICAgICAgICB0aGlzLmJlZm9yZU9wZW4uZW1pdCgpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBhZnRlck9wZW46ICgpID0+IHtcclxuICAgICAgICAgICAgICB0aGlzLmlzT3BlbkNoYW5nZS5lbWl0KHRoaXMub3BlblN0YXR1cygpKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYWZ0ZXJDbG9zZTogKCkgPT4ge1xyXG4gICAgICAgICAgICAgIHRoaXMuYWZ0ZXJDbG9zZS5lbWl0KCk7XHJcbiAgICAgICAgICAgICAgdGhpcy5pc09wZW5DaGFuZ2UuZW1pdCh0aGlzLm9wZW5TdGF0dXMoKSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgaWYgKGVsZW1zWzFdICE9IG51bGwpIHtcclxuICAgICAgICAgIG9wdGlvbnMubWFya2VyID0gZWxlbXNbMV07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIG9wdGlvbnMucG9zaXRpb24gPSB7XHJcbiAgICAgICAgICAgIGxhdDogdGhpcy5sYXRpdHVkZSxcclxuICAgICAgICAgICAgbG5nOiB0aGlzLmxvbmdpdHVkZSxcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX25hdGl2ZVNuYXp6eUluZm9XaW5kb3cgPSBuZXcgZWxlbXNbMF0ob3B0aW9ucyk7XHJcbiAgICAgIH0pO1xyXG4gICAgdGhpcy5fc25henp5SW5mb1dpbmRvd0luaXRpYWxpemVkLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLmlzT3Blbikge1xyXG4gICAgICAgICAgdGhpcy5fb3BlbkluZm9XaW5kb3coKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBfb3BlbkluZm9XaW5kb3coKSB7XHJcbiAgICB0aGlzLl9zbmF6enlJbmZvV2luZG93SW5pdGlhbGl6ZWQudGhlbigoKSA9PiB7XHJcbiAgICAgIHRoaXMuX2NyZWF0ZVZpZXdDb250ZW50KCk7XHJcbiAgICAgIHRoaXMuX25hdGl2ZVNuYXp6eUluZm9XaW5kb3cub3BlbigpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgX2Nsb3NlSW5mb1dpbmRvdygpIHtcclxuICAgIHRoaXMuX3NuYXp6eUluZm9XaW5kb3dJbml0aWFsaXplZC50aGVuKCgpID0+IHtcclxuICAgICAgdGhpcy5fbmF0aXZlU25henp5SW5mb1dpbmRvdy5jbG9zZSgpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgX2NyZWF0ZVZpZXdDb250ZW50KCkge1xyXG4gICAgaWYgKHRoaXMuX3ZpZXdDb250YWluZXJSZWYubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGNvbnN0IGV2ciA9IHRoaXMuX3ZpZXdDb250YWluZXJSZWYuY3JlYXRlRW1iZWRkZWRWaWV3KHRoaXMuX3RlbXBsYXRlUmVmKTtcclxuICAgIHRoaXMuX25hdGl2ZVNuYXp6eUluZm9XaW5kb3cuc2V0Q29udGVudCh0aGlzLl9vdXRlcldyYXBwZXIubmF0aXZlRWxlbWVudCk7XHJcbiAgICAvLyB3ZSBoYXZlIHRvIHJ1biB0aGlzIGluIGEgc2VwYXJhdGUgY3ljbGUuXHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgZXZyLmRldGVjdENoYW5nZXMoKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIF91cGRhdGVQb3NpdGlvbigpIHtcclxuICAgIHRoaXMuX25hdGl2ZVNuYXp6eUluZm9XaW5kb3cuc2V0UG9zaXRpb24oe1xyXG4gICAgICBsYXQ6IHRoaXMubGF0aXR1ZGUsXHJcbiAgICAgIGxuZzogdGhpcy5sb25naXR1ZGUsXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgdHJ1ZSB3aGVuIHRoZSBTbmF6enkgSW5mbyBXaW5kb3cgaXMgaW5pdGlhbGl6ZWQgYW5kIG9wZW4uXHJcbiAgICovXHJcbiAgb3BlblN0YXR1cygpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLl9uYXRpdmVTbmF6enlJbmZvV2luZG93ICYmIHRoaXMuX25hdGl2ZVNuYXp6eUluZm9XaW5kb3cuaXNPcGVuKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIGlmICh0aGlzLl9uYXRpdmVTbmF6enlJbmZvV2luZG93KSB7XHJcbiAgICAgIHRoaXMuX25hdGl2ZVNuYXp6eUluZm9XaW5kb3cuZGVzdHJveSgpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=