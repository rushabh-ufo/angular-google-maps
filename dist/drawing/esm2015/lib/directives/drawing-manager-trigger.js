import { AgmMap } from '@agm/core';
import { Directive, Host, Input } from '@angular/core';
import { first } from 'rxjs/operators';
export class AgmDrawingManagerTrigger {
    constructor(_agmMap) {
        this._agmMap = _agmMap;
    }
    ngAfterViewInit() {
        this._agmMap.mapReady.pipe(first()).subscribe(map => this.drawingManager.setMap(map));
    }
    ngOnDestroy() {
        this._agmMap.mapReady.pipe(first()).subscribe(() => this.drawingManager.setMap(null));
    }
}
AgmDrawingManagerTrigger.decorators = [
    { type: Directive, args: [{
                selector: 'agm-map[agmDrawingManager]',
                exportAs: 'matDrawingManagerTrigger',
            },] }
];
AgmDrawingManagerTrigger.ctorParameters = () => [
    { type: AgmMap, decorators: [{ type: Host }] }
];
AgmDrawingManagerTrigger.propDecorators = {
    drawingManager: [{ type: Input, args: ['agmDrawingManager',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhd2luZy1tYW5hZ2VyLXRyaWdnZXIuanMiLCJzb3VyY2VSb290IjoiRDovQXV0b21hdGlvbi9hbmd1bGFyLWdvb2dsZS1tYXBzL3BhY2thZ2VzL2RyYXdpbmcvc3JjLyIsInNvdXJjZXMiOlsibGliL2RpcmVjdGl2ZXMvZHJhd2luZy1tYW5hZ2VyLXRyaWdnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUNuQyxPQUFPLEVBQWlCLFNBQVMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBQ2pGLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQU92QyxNQUFNLE9BQU8sd0JBQXdCO0lBTW5DLFlBQTRCLE9BQWU7UUFBZixZQUFPLEdBQVAsT0FBTyxDQUFRO0lBQzNDLENBQUM7SUFFRCxlQUFlO1FBQ2IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUN4RixDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ3hGLENBQUM7OztZQW5CRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLDRCQUE0QjtnQkFDdEMsUUFBUSxFQUFFLDBCQUEwQjthQUNyQzs7O1lBUlEsTUFBTSx1QkFlQSxJQUFJOzs7NkJBRmhCLEtBQUssU0FBQyxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZ21NYXAgfSBmcm9tICdAYWdtL2NvcmUnO1xyXG5pbXBvcnQgeyBBZnRlclZpZXdJbml0LCBEaXJlY3RpdmUsIEhvc3QsIElucHV0LCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgZmlyc3QgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IEFnbURyYXdpbmdNYW5hZ2VyIH0gZnJvbSAnLi9kcmF3aW5nLW1hbmFnZXInO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdhZ20tbWFwW2FnbURyYXdpbmdNYW5hZ2VyXScsXHJcbiAgZXhwb3J0QXM6ICdtYXREcmF3aW5nTWFuYWdlclRyaWdnZXInLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgQWdtRHJhd2luZ01hbmFnZXJUcmlnZ2VyIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95e1xyXG5cclxuICAvKiogVGhlIGRyYXdpbmcgbWFuYWdlciB0byBiZSBhdHRhY2hlZCB0byB0aGlzIHRyaWdnZXIuICovXHJcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby1pbnB1dC1yZW5hbWVcclxuICBASW5wdXQoJ2FnbURyYXdpbmdNYW5hZ2VyJykgZHJhd2luZ01hbmFnZXI6IEFnbURyYXdpbmdNYW5hZ2VyO1xyXG5cclxuICBjb25zdHJ1Y3RvcihASG9zdCgpIHByaXZhdGUgX2FnbU1hcDogQWdtTWFwKSB7XHJcbiAgfVxyXG5cclxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XHJcbiAgICB0aGlzLl9hZ21NYXAubWFwUmVhZHkucGlwZShmaXJzdCgpKS5zdWJzY3JpYmUobWFwID0+IHRoaXMuZHJhd2luZ01hbmFnZXIuc2V0TWFwKG1hcCkpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLl9hZ21NYXAubWFwUmVhZHkucGlwZShmaXJzdCgpKS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5kcmF3aW5nTWFuYWdlci5zZXRNYXAobnVsbCkpO1xyXG4gIH1cclxufVxyXG4iXX0=