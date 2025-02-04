import { NgModule } from '@angular/core';
import { AgmBicyclingLayer } from './directives/bicycling-layer';
import { AgmCircle } from './directives/circle';
import { AgmDataLayer } from './directives/data-layer';
import { AgmFitBounds } from './directives/fit-bounds';
import { AgmInfoWindow } from './directives/info-window';
import { AgmKmlLayer } from './directives/kml-layer';
import { AgmFullscreenControl, AgmMap, AgmMapTypeControl, AgmPanControl, AgmRotateControl, AgmScaleControl, AgmStreetViewControl, AgmZoomControl } from './directives/map';
import { AgmMarker } from './directives/marker';
import { AgmPolygon } from './directives/polygon';
import { AgmPolyline } from './directives/polyline';
import { AgmPolylineIcon } from './directives/polyline-icon';
import { AgmPolylinePoint } from './directives/polyline-point';
import { AgmRectangle } from './directives/rectangle';
import { AgmTransitLayer } from './directives/transit-layer';
import { LazyMapsAPILoader, LAZY_MAPS_API_CONFIG } from './services/maps-api-loader/lazy-maps-api-loader';
import { MapsAPILoader } from './services/maps-api-loader/maps-api-loader';
import { BROWSER_GLOBALS_PROVIDERS } from './utils/browser-globals';
/**
 * @internal
 */
export function coreDirectives() {
    return [
        AgmBicyclingLayer,
        AgmCircle,
        AgmDataLayer,
        AgmFitBounds,
        AgmFullscreenControl,
        AgmInfoWindow,
        AgmKmlLayer,
        AgmMap,
        AgmMapTypeControl,
        AgmMarker,
        AgmPanControl,
        AgmPolygon,
        AgmPolyline,
        AgmPolylineIcon,
        AgmPolylinePoint,
        AgmRectangle,
        AgmRotateControl,
        AgmScaleControl,
        AgmStreetViewControl,
        AgmTransitLayer,
        AgmZoomControl,
    ];
}
/**
 * The angular-google-maps core module. Contains all Directives/Services/Pipes
 * of the core module. Please use `AgmCoreModule.forRoot()` in your app module.
 */
export class AgmCoreModule {
    /**
     * Please use this method when you register the module at the root level.
     */
    static forRoot(lazyMapsAPILoaderConfig) {
        return {
            ngModule: AgmCoreModule,
            providers: [
                ...BROWSER_GLOBALS_PROVIDERS, { provide: MapsAPILoader, useClass: LazyMapsAPILoader },
                { provide: LAZY_MAPS_API_CONFIG, useValue: lazyMapsAPILoaderConfig },
            ],
        };
    }
}
AgmCoreModule.decorators = [
    { type: NgModule, args: [{ declarations: coreDirectives(), exports: coreDirectives() },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiRDovQXV0b21hdGlvbi9hbmd1bGFyLWdvb2dsZS1tYXBzL3BhY2thZ2VzL2NvcmUvc3JjLyIsInNvdXJjZXMiOlsibGliL2NvcmUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBdUIsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTlELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNoRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDdkQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDckQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sRUFBRSxpQkFBaUIsRUFBRSxhQUFhLEVBQUUsZ0JBQWdCLEVBQUUsZUFBZSxFQUFFLG9CQUFvQixFQUFFLGNBQWMsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQzNLLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNoRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbEQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3BELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUMvRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDdEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBRTdELE9BQU8sRUFBRSxpQkFBaUIsRUFBa0Msb0JBQW9CLEVBQUUsTUFBTSxpREFBaUQsQ0FBQztBQUMxSSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFFM0UsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFcEU7O0dBRUc7QUFDSCxNQUFNLFVBQVUsY0FBYztJQUM1QixPQUFPO1FBQ0wsaUJBQWlCO1FBQ2pCLFNBQVM7UUFDVCxZQUFZO1FBQ1osWUFBWTtRQUNaLG9CQUFvQjtRQUNwQixhQUFhO1FBQ2IsV0FBVztRQUNYLE1BQU07UUFDTixpQkFBaUI7UUFDakIsU0FBUztRQUNULGFBQWE7UUFDYixVQUFVO1FBQ1YsV0FBVztRQUNYLGVBQWU7UUFDZixnQkFBZ0I7UUFDaEIsWUFBWTtRQUNaLGdCQUFnQjtRQUNoQixlQUFlO1FBQ2Ysb0JBQW9CO1FBQ3BCLGVBQWU7UUFDZixjQUFjO0tBQ2YsQ0FBQztBQUNKLENBQUM7QUFFRDs7O0dBR0c7QUFFSCxNQUFNLE9BQU8sYUFBYTtJQUN4Qjs7T0FFRztJQUNILE1BQU0sQ0FBQyxPQUFPLENBQUMsdUJBQXdEO1FBQ3JFLE9BQU87WUFDTCxRQUFRLEVBQUUsYUFBYTtZQUN2QixTQUFTLEVBQUU7Z0JBQ1QsR0FBRyx5QkFBeUIsRUFBRSxFQUFDLE9BQU8sRUFBRSxhQUFhLEVBQUUsUUFBUSxFQUFFLGlCQUFpQixFQUFDO2dCQUNuRixFQUFDLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxRQUFRLEVBQUUsdUJBQXVCLEVBQUM7YUFDbkU7U0FDRixDQUFDO0lBQ0osQ0FBQzs7O1lBYkYsUUFBUSxTQUFDLEVBQUMsWUFBWSxFQUFFLGNBQWMsRUFBRSxFQUFFLE9BQU8sRUFBRSxjQUFjLEVBQUUsRUFBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBBZ21CaWN5Y2xpbmdMYXllciB9IGZyb20gJy4vZGlyZWN0aXZlcy9iaWN5Y2xpbmctbGF5ZXInO1xyXG5pbXBvcnQgeyBBZ21DaXJjbGUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvY2lyY2xlJztcclxuaW1wb3J0IHsgQWdtRGF0YUxheWVyIH0gZnJvbSAnLi9kaXJlY3RpdmVzL2RhdGEtbGF5ZXInO1xyXG5pbXBvcnQgeyBBZ21GaXRCb3VuZHMgfSBmcm9tICcuL2RpcmVjdGl2ZXMvZml0LWJvdW5kcyc7XHJcbmltcG9ydCB7IEFnbUluZm9XaW5kb3cgfSBmcm9tICcuL2RpcmVjdGl2ZXMvaW5mby13aW5kb3cnO1xyXG5pbXBvcnQgeyBBZ21LbWxMYXllciB9IGZyb20gJy4vZGlyZWN0aXZlcy9rbWwtbGF5ZXInO1xyXG5pbXBvcnQgeyBBZ21GdWxsc2NyZWVuQ29udHJvbCwgQWdtTWFwLCBBZ21NYXBUeXBlQ29udHJvbCwgQWdtUGFuQ29udHJvbCwgQWdtUm90YXRlQ29udHJvbCwgQWdtU2NhbGVDb250cm9sLCBBZ21TdHJlZXRWaWV3Q29udHJvbCwgQWdtWm9vbUNvbnRyb2wgfSBmcm9tICcuL2RpcmVjdGl2ZXMvbWFwJztcclxuaW1wb3J0IHsgQWdtTWFya2VyIH0gZnJvbSAnLi9kaXJlY3RpdmVzL21hcmtlcic7XHJcbmltcG9ydCB7IEFnbVBvbHlnb24gfSBmcm9tICcuL2RpcmVjdGl2ZXMvcG9seWdvbic7XHJcbmltcG9ydCB7IEFnbVBvbHlsaW5lIH0gZnJvbSAnLi9kaXJlY3RpdmVzL3BvbHlsaW5lJztcclxuaW1wb3J0IHsgQWdtUG9seWxpbmVJY29uIH0gZnJvbSAnLi9kaXJlY3RpdmVzL3BvbHlsaW5lLWljb24nO1xyXG5pbXBvcnQgeyBBZ21Qb2x5bGluZVBvaW50IH0gZnJvbSAnLi9kaXJlY3RpdmVzL3BvbHlsaW5lLXBvaW50JztcclxuaW1wb3J0IHsgQWdtUmVjdGFuZ2xlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL3JlY3RhbmdsZSc7XHJcbmltcG9ydCB7IEFnbVRyYW5zaXRMYXllciB9IGZyb20gJy4vZGlyZWN0aXZlcy90cmFuc2l0LWxheWVyJztcclxuXHJcbmltcG9ydCB7IExhenlNYXBzQVBJTG9hZGVyLCBMYXp5TWFwc0FQSUxvYWRlckNvbmZpZ0xpdGVyYWwsIExBWllfTUFQU19BUElfQ09ORklHIH0gZnJvbSAnLi9zZXJ2aWNlcy9tYXBzLWFwaS1sb2FkZXIvbGF6eS1tYXBzLWFwaS1sb2FkZXInO1xyXG5pbXBvcnQgeyBNYXBzQVBJTG9hZGVyIH0gZnJvbSAnLi9zZXJ2aWNlcy9tYXBzLWFwaS1sb2FkZXIvbWFwcy1hcGktbG9hZGVyJztcclxuXHJcbmltcG9ydCB7IEJST1dTRVJfR0xPQkFMU19QUk9WSURFUlMgfSBmcm9tICcuL3V0aWxzL2Jyb3dzZXItZ2xvYmFscyc7XHJcblxyXG4vKipcclxuICogQGludGVybmFsXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gY29yZURpcmVjdGl2ZXMoKSB7XHJcbiAgcmV0dXJuIFtcclxuICAgIEFnbUJpY3ljbGluZ0xheWVyLFxyXG4gICAgQWdtQ2lyY2xlLFxyXG4gICAgQWdtRGF0YUxheWVyLFxyXG4gICAgQWdtRml0Qm91bmRzLFxyXG4gICAgQWdtRnVsbHNjcmVlbkNvbnRyb2wsXHJcbiAgICBBZ21JbmZvV2luZG93LFxyXG4gICAgQWdtS21sTGF5ZXIsXHJcbiAgICBBZ21NYXAsXHJcbiAgICBBZ21NYXBUeXBlQ29udHJvbCxcclxuICAgIEFnbU1hcmtlcixcclxuICAgIEFnbVBhbkNvbnRyb2wsXHJcbiAgICBBZ21Qb2x5Z29uLFxyXG4gICAgQWdtUG9seWxpbmUsXHJcbiAgICBBZ21Qb2x5bGluZUljb24sXHJcbiAgICBBZ21Qb2x5bGluZVBvaW50LFxyXG4gICAgQWdtUmVjdGFuZ2xlLFxyXG4gICAgQWdtUm90YXRlQ29udHJvbCxcclxuICAgIEFnbVNjYWxlQ29udHJvbCxcclxuICAgIEFnbVN0cmVldFZpZXdDb250cm9sLFxyXG4gICAgQWdtVHJhbnNpdExheWVyLFxyXG4gICAgQWdtWm9vbUNvbnRyb2wsXHJcbiAgXTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFRoZSBhbmd1bGFyLWdvb2dsZS1tYXBzIGNvcmUgbW9kdWxlLiBDb250YWlucyBhbGwgRGlyZWN0aXZlcy9TZXJ2aWNlcy9QaXBlc1xyXG4gKiBvZiB0aGUgY29yZSBtb2R1bGUuIFBsZWFzZSB1c2UgYEFnbUNvcmVNb2R1bGUuZm9yUm9vdCgpYCBpbiB5b3VyIGFwcCBtb2R1bGUuXHJcbiAqL1xyXG5ATmdNb2R1bGUoe2RlY2xhcmF0aW9uczogY29yZURpcmVjdGl2ZXMoKSwgZXhwb3J0czogY29yZURpcmVjdGl2ZXMoKX0pXHJcbmV4cG9ydCBjbGFzcyBBZ21Db3JlTW9kdWxlIHtcclxuICAvKipcclxuICAgKiBQbGVhc2UgdXNlIHRoaXMgbWV0aG9kIHdoZW4geW91IHJlZ2lzdGVyIHRoZSBtb2R1bGUgYXQgdGhlIHJvb3QgbGV2ZWwuXHJcbiAgICovXHJcbiAgc3RhdGljIGZvclJvb3QobGF6eU1hcHNBUElMb2FkZXJDb25maWc/OiBMYXp5TWFwc0FQSUxvYWRlckNvbmZpZ0xpdGVyYWwpOiBNb2R1bGVXaXRoUHJvdmlkZXJzPEFnbUNvcmVNb2R1bGU+IHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIG5nTW9kdWxlOiBBZ21Db3JlTW9kdWxlLFxyXG4gICAgICBwcm92aWRlcnM6IFtcclxuICAgICAgICAuLi5CUk9XU0VSX0dMT0JBTFNfUFJPVklERVJTLCB7cHJvdmlkZTogTWFwc0FQSUxvYWRlciwgdXNlQ2xhc3M6IExhenlNYXBzQVBJTG9hZGVyfSxcclxuICAgICAgICB7cHJvdmlkZTogTEFaWV9NQVBTX0FQSV9DT05GSUcsIHVzZVZhbHVlOiBsYXp5TWFwc0FQSUxvYWRlckNvbmZpZ30sXHJcbiAgICAgIF0sXHJcbiAgICB9O1xyXG4gIH1cclxufVxyXG4iXX0=