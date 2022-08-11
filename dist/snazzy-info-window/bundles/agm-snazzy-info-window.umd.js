(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@agm/core'), require('@angular/core')) :
    typeof define === 'function' && define.amd ? define('@agm/snazzy-info-window', ['exports', '@agm/core', '@angular/core'], factory) :
    (global = global || self, factory((global.agm = global.agm || {}, global.agm['snazzy-info-window'] = {}), global.core, global.ng.core));
}(this, (function (exports, core, core$1) { 'use strict';

    var AgmSnazzyInfoWindow = /** @class */ (function () {
        function AgmSnazzyInfoWindow(_marker, _wrapper, _manager, _loader) {
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
            this.isOpenChange = new core$1.EventEmitter();
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
            this.beforeOpen = new core$1.EventEmitter();
            /**
             * Emits before the info window closes.
             */
            this.afterClose = new core$1.EventEmitter();
            this._snazzyInfoWindowInitialized = null;
        }
        /**
         * @internal
         */
        AgmSnazzyInfoWindow.prototype.ngOnChanges = function (changes) {
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
        };
        /**
         * @internal
         */
        AgmSnazzyInfoWindow.prototype.ngAfterViewInit = function () {
            var _this = this;
            var m = this._manager != null ? this._manager.getNativeMarker(this._marker) : null;
            this._snazzyInfoWindowInitialized = this._loader.load()
                .then(function () { return require('snazzy-info-window'); })
                .then(function (module) { return Promise.all([module, m, _this._wrapper.getNativeMap()]); })
                .then(function (elems) {
                var options = {
                    map: elems[2],
                    content: '',
                    placement: _this.placement,
                    maxWidth: _this.maxWidth,
                    maxHeight: _this.maxHeight,
                    backgroundColor: _this.backgroundColor,
                    padding: _this.padding,
                    border: _this.border,
                    borderRadius: _this.borderRadius,
                    fontColor: _this.fontColor,
                    pointer: _this.pointer,
                    shadow: _this.shadow,
                    closeOnMapClick: _this.closeOnMapClick,
                    openOnMarkerClick: _this.openOnMarkerClick,
                    closeWhenOthersOpen: _this.closeWhenOthersOpen,
                    showCloseButton: _this.showCloseButton,
                    panOnOpen: _this.panOnOpen,
                    wrapperClass: _this.wrapperClass,
                    callbacks: {
                        beforeOpen: function () {
                            _this._createViewContent();
                            _this.beforeOpen.emit();
                        },
                        afterOpen: function () {
                            _this.isOpenChange.emit(_this.openStatus());
                        },
                        afterClose: function () {
                            _this.afterClose.emit();
                            _this.isOpenChange.emit(_this.openStatus());
                        },
                    },
                };
                if (elems[1] != null) {
                    options.marker = elems[1];
                }
                else {
                    options.position = {
                        lat: _this.latitude,
                        lng: _this.longitude,
                    };
                }
                _this._nativeSnazzyInfoWindow = new elems[0](options);
            });
            this._snazzyInfoWindowInitialized.then(function () {
                if (_this.isOpen) {
                    _this._openInfoWindow();
                }
            });
        };
        AgmSnazzyInfoWindow.prototype._openInfoWindow = function () {
            var _this = this;
            this._snazzyInfoWindowInitialized.then(function () {
                _this._createViewContent();
                _this._nativeSnazzyInfoWindow.open();
            });
        };
        AgmSnazzyInfoWindow.prototype._closeInfoWindow = function () {
            var _this = this;
            this._snazzyInfoWindowInitialized.then(function () {
                _this._nativeSnazzyInfoWindow.close();
            });
        };
        AgmSnazzyInfoWindow.prototype._createViewContent = function () {
            if (this._viewContainerRef.length === 1) {
                return;
            }
            var evr = this._viewContainerRef.createEmbeddedView(this._templateRef);
            this._nativeSnazzyInfoWindow.setContent(this._outerWrapper.nativeElement);
            // we have to run this in a separate cycle.
            setTimeout(function () {
                evr.detectChanges();
            });
        };
        AgmSnazzyInfoWindow.prototype._updatePosition = function () {
            this._nativeSnazzyInfoWindow.setPosition({
                lat: this.latitude,
                lng: this.longitude,
            });
        };
        /**
         * Returns true when the Snazzy Info Window is initialized and open.
         */
        AgmSnazzyInfoWindow.prototype.openStatus = function () {
            return this._nativeSnazzyInfoWindow && this._nativeSnazzyInfoWindow.isOpen();
        };
        /**
         * @internal
         */
        AgmSnazzyInfoWindow.prototype.ngOnDestroy = function () {
            if (this._nativeSnazzyInfoWindow) {
                this._nativeSnazzyInfoWindow.destroy();
            }
        };
        return AgmSnazzyInfoWindow;
    }());
    AgmSnazzyInfoWindow.decorators = [
        { type: core$1.Component, args: [{
                    // tslint:disable-next-line:component-selector
                    selector: 'agm-snazzy-info-window',
                    template: '<div #outerWrapper><div #viewContainer></div></div><ng-content></ng-content>'
                },] }
    ];
    AgmSnazzyInfoWindow.ctorParameters = function () { return [
        { type: core.AgmMarker, decorators: [{ type: core$1.Optional }, { type: core$1.Host }, { type: core$1.SkipSelf }] },
        { type: core.GoogleMapsAPIWrapper },
        { type: core.MarkerManager },
        { type: core.MapsAPILoader }
    ]; };
    AgmSnazzyInfoWindow.propDecorators = {
        latitude: [{ type: core$1.Input }],
        longitude: [{ type: core$1.Input }],
        isOpen: [{ type: core$1.Input }],
        isOpenChange: [{ type: core$1.Output }],
        placement: [{ type: core$1.Input }],
        maxWidth: [{ type: core$1.Input }],
        maxHeight: [{ type: core$1.Input }],
        backgroundColor: [{ type: core$1.Input }],
        padding: [{ type: core$1.Input }],
        border: [{ type: core$1.Input }],
        borderRadius: [{ type: core$1.Input }],
        fontColor: [{ type: core$1.Input }],
        fontSize: [{ type: core$1.Input }],
        pointer: [{ type: core$1.Input }],
        shadow: [{ type: core$1.Input }],
        openOnMarkerClick: [{ type: core$1.Input }],
        closeOnMapClick: [{ type: core$1.Input }],
        wrapperClass: [{ type: core$1.Input }],
        closeWhenOthersOpen: [{ type: core$1.Input }],
        showCloseButton: [{ type: core$1.Input }],
        panOnOpen: [{ type: core$1.Input }],
        beforeOpen: [{ type: core$1.Output }],
        afterClose: [{ type: core$1.Output }],
        _outerWrapper: [{ type: core$1.ViewChild, args: ['outerWrapper', { read: core$1.ElementRef, static: false },] }],
        _viewContainerRef: [{ type: core$1.ViewChild, args: ['viewContainer', { read: core$1.ViewContainerRef, static: false },] }],
        _templateRef: [{ type: core$1.ContentChild, args: [core$1.TemplateRef, { static: false },] }]
    };

    var AgmSnazzyInfoWindowModule = /** @class */ (function () {
        function AgmSnazzyInfoWindowModule() {
        }
        return AgmSnazzyInfoWindowModule;
    }());
    AgmSnazzyInfoWindowModule.decorators = [
        { type: core$1.NgModule, args: [{
                    declarations: [AgmSnazzyInfoWindow],
                    exports: [AgmSnazzyInfoWindow],
                },] }
    ];

    /*
     * Public API Surface of snazzy-info-window
     */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.AgmSnazzyInfoWindow = AgmSnazzyInfoWindow;
    exports.AgmSnazzyInfoWindowModule = AgmSnazzyInfoWindowModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=agm-snazzy-info-window.umd.js.map
