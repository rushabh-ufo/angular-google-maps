import { AgmCoreModule } from '@agm/core';
import { NgModule } from '@angular/core';
import { AgmMarkerCluster } from './directives/marker-cluster';
export class AgmMarkerClustererModule {
}
AgmMarkerClustererModule.decorators = [
    { type: NgModule, args: [{
                imports: [AgmCoreModule],
                declarations: [AgmMarkerCluster],
                exports: [AgmMarkerCluster],
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2VyLWNsdXN0ZXJlci5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiRDovQXV0b21hdGlvbi9hbmd1bGFyLWdvb2dsZS1tYXBzL3BhY2thZ2VzL21hcmtlcmNsdXN0ZXJlci9zcmMvIiwic291cmNlcyI6WyJsaWIvbWFya2VyLWNsdXN0ZXJlci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUMxQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBTy9ELE1BQU0sT0FBTyx3QkFBd0I7OztZQUxwQyxRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFLENBQUMsYUFBYSxDQUFDO2dCQUN4QixZQUFZLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQztnQkFDaEMsT0FBTyxFQUFFLENBQUMsZ0JBQWdCLENBQUM7YUFDNUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZ21Db3JlTW9kdWxlIH0gZnJvbSAnQGFnbS9jb3JlJztcclxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQWdtTWFya2VyQ2x1c3RlciB9IGZyb20gJy4vZGlyZWN0aXZlcy9tYXJrZXItY2x1c3Rlcic7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtBZ21Db3JlTW9kdWxlXSxcclxuICBkZWNsYXJhdGlvbnM6IFtBZ21NYXJrZXJDbHVzdGVyXSxcclxuICBleHBvcnRzOiBbQWdtTWFya2VyQ2x1c3Rlcl0sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBZ21NYXJrZXJDbHVzdGVyZXJNb2R1bGUge1xyXG59XHJcbiJdfQ==