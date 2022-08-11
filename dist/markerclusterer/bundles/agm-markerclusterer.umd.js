(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@agm/core'), require('@angular/core'), require('@google/markerclustererplus'), require('rxjs')) :
    typeof define === 'function' && define.amd ? define('@agm/markerclusterer', ['exports', '@agm/core', '@angular/core', '@google/markerclustererplus', 'rxjs'], factory) :
    (global = global || self, factory((global.agm = global.agm || {}, global.agm.markerclusterer = {}), global.core, global.ng.core, global.MarkerClusterer, global.rxjs));
}(this, (function (exports, core, core$1, MarkerClusterer, rxjs) { 'use strict';

    MarkerClusterer = MarkerClusterer && Object.prototype.hasOwnProperty.call(MarkerClusterer, 'default') ? MarkerClusterer['default'] : MarkerClusterer;

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (Object.prototype.hasOwnProperty.call(b, p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    var __createBinding = Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
            desc = { enumerable: true, get: function () { return m[k]; } };
        }
        Object.defineProperty(o, k2, desc);
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    });
    function __exportStar(m, o) {
        for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
                __createBinding(o, m, p);
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    /** @deprecated */
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    /** @deprecated */
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    function __spreadArray(to, from, pack) {
        if (pack || arguments.length === 2)
            for (var i = 0, l = from.length, ar; i < l; i++) {
                if (ar || !(i in from)) {
                    if (!ar)
                        ar = Array.prototype.slice.call(from, 0, i);
                    ar[i] = from[i];
                }
            }
        return to.concat(ar || Array.prototype.slice.call(from));
    }
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n])
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    }
    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }
    function __asyncValues(o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }
    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    }
    ;
    var __setModuleDefault = Object.create ? (function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function (o, v) {
        o["default"] = v;
    };
    function __importStar(mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }
    function __classPrivateFieldGet(receiver, state, kind, f) {
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    }
    function __classPrivateFieldSet(receiver, state, value, kind, f) {
        if (kind === "m")
            throw new TypeError("Private method is not writable");
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
    }
    function __classPrivateFieldIn(state, receiver) {
        if (receiver === null || (typeof receiver !== "object" && typeof receiver !== "function"))
            throw new TypeError("Cannot use 'in' operator on non-object");
        return typeof state === "function" ? receiver === state : state.has(receiver);
    }

    var ClusterManager = /** @class */ (function (_super) {
        __extends(ClusterManager, _super);
        function ClusterManager(_mapsWrapper, _zone) {
            var _this = _super.call(this, _mapsWrapper, _zone) || this;
            _this._mapsWrapper = _mapsWrapper;
            _this._zone = _zone;
            _this._clustererInstance = new Promise(function (resolver) {
                _this._resolver = resolver;
            });
            return _this;
        }
        ClusterManager.prototype.init = function (options) {
            var _this = this;
            this._mapsWrapper.getNativeMap().then(function (map) {
                var clusterer = new MarkerClusterer(map, [], options);
                _this._resolver(clusterer);
            });
        };
        ClusterManager.prototype.getClustererInstance = function () {
            return this._clustererInstance;
        };
        ClusterManager.prototype.addMarker = function (markerDirective) {
            var clusterPromise = this.getClustererInstance();
            var markerPromise = this._mapsWrapper
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
                .then(function (_a) {
                var _b = __read(_a, 2), cluster = _b[0], marker = _b[1];
                return cluster.addMarker(marker);
            });
            this._markers.set(markerDirective, markerPromise);
        };
        ClusterManager.prototype.deleteMarker = function (marker) {
            var _this = this;
            var markerPromise = this._markers.get(marker);
            if (markerPromise == null) {
                // marker already deleted
                return Promise.resolve();
            }
            return markerPromise.then(function (m) {
                _this._zone.run(function () {
                    m.setMap(null);
                    _this.getClustererInstance().then(function (cluster) {
                        cluster.removeMarker(m);
                        _this._markers.delete(marker);
                    });
                });
            });
        };
        ClusterManager.prototype.clearMarkers = function () {
            return this.getClustererInstance().then(function (cluster) {
                cluster.clearMarkers();
            });
        };
        ClusterManager.prototype.setGridSize = function (c) {
            this.getClustererInstance().then(function (cluster) {
                cluster.setGridSize(c.gridSize);
            });
        };
        ClusterManager.prototype.setMaxZoom = function (c) {
            this.getClustererInstance().then(function (cluster) {
                cluster.setMaxZoom(c.maxZoom);
            });
        };
        ClusterManager.prototype.setStyles = function (c) {
            this.getClustererInstance().then(function (cluster) {
                cluster.setStyles(c.styles);
            });
        };
        ClusterManager.prototype.setZoomOnClick = function (c) {
            this.getClustererInstance().then(function (cluster) {
                if (c.zoomOnClick !== undefined) {
                    cluster.setZoomOnClick(c.zoomOnClick);
                }
            });
        };
        ClusterManager.prototype.setAverageCenter = function (c) {
            this.getClustererInstance().then(function (cluster) {
                if (c.averageCenter !== undefined) {
                    cluster.setAverageCenter(c.averageCenter);
                }
            });
        };
        ClusterManager.prototype.setImagePath = function (c) {
            this.getClustererInstance().then(function (cluster) {
                if (c.imagePath !== undefined) {
                    cluster.setImagePath(c.imagePath);
                }
            });
        };
        ClusterManager.prototype.setMinimumClusterSize = function (c) {
            this.getClustererInstance().then(function (cluster) {
                if (c.minimumClusterSize !== undefined) {
                    cluster.setMinimumClusterSize(c.minimumClusterSize);
                }
            });
        };
        ClusterManager.prototype.setImageExtension = function (c) {
            this.getClustererInstance().then(function (cluster) {
                if (c.imageExtension !== undefined) {
                    cluster.setImageExtension(c.imageExtension);
                }
            });
        };
        ClusterManager.prototype.createClusterEventObservable = function (eventName) {
            var _this = this;
            return new rxjs.Observable(function (subscriber) {
                _this._zone.runOutsideAngular(function () {
                    _this._clustererInstance.then(function (m) {
                        m.addListener(eventName, function (e) { return _this._zone.run(function () { return subscriber.next(e); }); });
                    });
                });
            });
        };
        ClusterManager.prototype.setCalculator = function (c) {
            this.getClustererInstance().then(function (cluster) {
                if (typeof c.calculator === 'function') {
                    cluster.setCalculator(c.calculator);
                }
            });
        };
        ClusterManager.prototype.setClusterClass = function (c) {
            return __awaiter(this, void 0, void 0, function () {
                var instance;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(typeof c.clusterClass !== 'undefined')) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.getClustererInstance()];
                        case 1:
                            instance = _a.sent();
                            instance.setClusterClass(c.clusterClass);
                            _a.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            });
        };
        ClusterManager.prototype.setEnableRetinaIcons = function (c) {
            return __awaiter(this, void 0, void 0, function () {
                var instance;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(typeof c.enableRetinaIcons !== 'undefined')) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.getClustererInstance()];
                        case 1:
                            instance = _a.sent();
                            instance.setEnableRetinaIcons(c.enableRetinaIcons);
                            _a.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            });
        };
        ClusterManager.prototype.setIgnoreHidden = function (c) {
            return __awaiter(this, void 0, void 0, function () {
                var instance;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(typeof c.ignoreHidden !== 'undefined')) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.getClustererInstance()];
                        case 1:
                            instance = _a.sent();
                            instance.setIgnoreHidden(c.ignoreHidden);
                            _a.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            });
        };
        ClusterManager.prototype.setImageSizes = function (c) {
            return __awaiter(this, void 0, void 0, function () {
                var instance;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(typeof c.imageSizes !== 'undefined')) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.getClustererInstance()];
                        case 1:
                            instance = _a.sent();
                            instance.setImageSizes(c.imageSizes);
                            _a.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            });
        };
        ClusterManager.prototype.setTitle = function (c) {
            return __awaiter(this, void 0, void 0, function () {
                var instance;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(typeof c.title !== 'undefined')) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.getClustererInstance()];
                        case 1:
                            instance = _a.sent();
                            instance.setTitle(c.title);
                            _a.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            });
        };
        return ClusterManager;
    }(core.MarkerManager));
    ClusterManager.decorators = [
        { type: core$1.Injectable }
    ];
    ClusterManager.ctorParameters = function () { return [
        { type: core.GoogleMapsAPIWrapper },
        { type: core$1.NgZone }
    ]; };

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
    var AgmMarkerCluster = /** @class */ (function () {
        function AgmMarkerCluster(_clusterManager) {
            this._clusterManager = _clusterManager;
            this.clusterClick = new core$1.EventEmitter();
            this._observableSubscriptions = [];
        }
        /** @internal */
        AgmMarkerCluster.prototype.ngOnDestroy = function () {
            this._clusterManager.clearMarkers();
            this._observableSubscriptions.forEach(function (s) { return s.unsubscribe(); });
        };
        /** @internal */
        AgmMarkerCluster.prototype.ngOnChanges = function (changes) {
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
        };
        AgmMarkerCluster.prototype._addEventListeners = function () {
            var _this = this;
            var handlers = [
                {
                    name: 'clusterclick',
                    handler: function () { return _this.clusterClick.emit(); },
                },
            ];
            handlers.forEach(function (obj) {
                var os = _this._clusterManager.createClusterEventObservable(obj.name).subscribe(obj.handler);
                _this._observableSubscriptions.push(os);
            });
        };
        /** @internal */
        AgmMarkerCluster.prototype.ngOnInit = function () {
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
        };
        return AgmMarkerCluster;
    }());
    AgmMarkerCluster.decorators = [
        { type: core$1.Directive, args: [{
                    selector: 'agm-marker-cluster',
                    providers: [
                        ClusterManager,
                        { provide: core.MarkerManager, useExisting: ClusterManager },
                        core.InfoWindowManager,
                    ],
                },] }
    ];
    AgmMarkerCluster.ctorParameters = function () { return [
        { type: ClusterManager }
    ]; };
    AgmMarkerCluster.propDecorators = {
        gridSize: [{ type: core$1.Input }],
        maxZoom: [{ type: core$1.Input }],
        zoomOnClick: [{ type: core$1.Input }],
        averageCenter: [{ type: core$1.Input }],
        minimumClusterSize: [{ type: core$1.Input }],
        styles: [{ type: core$1.Input }],
        calculator: [{ type: core$1.Input }],
        imagePath: [{ type: core$1.Input }],
        imageExtension: [{ type: core$1.Input }],
        clusterClass: [{ type: core$1.Input }],
        enableRetinaIcons: [{ type: core$1.Input }],
        ignoreHidden: [{ type: core$1.Input }],
        imageSizes: [{ type: core$1.Input }],
        title: [{ type: core$1.Input }],
        clusterClick: [{ type: core$1.Output }]
    };

    var AgmMarkerClustererModule = /** @class */ (function () {
        function AgmMarkerClustererModule() {
        }
        return AgmMarkerClustererModule;
    }());
    AgmMarkerClustererModule.decorators = [
        { type: core$1.NgModule, args: [{
                    imports: [core.AgmCoreModule],
                    declarations: [AgmMarkerCluster],
                    exports: [AgmMarkerCluster],
                },] }
    ];

    /*
     * Public API Surface of markerclusterer
     */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.AgmMarkerCluster = AgmMarkerCluster;
    exports.AgmMarkerClustererModule = AgmMarkerClustererModule;
    exports.ClusterManager = ClusterManager;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=agm-markerclusterer.umd.js.map
