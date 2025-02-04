import { Directive, Input } from '@angular/core';
/**
 * AgmPolylineIcon enables to add polyline sequences to add arrows, circle,
 * or custom icons either along the entire line, or in a specific part of it.
 * See https://developers.google.com/maps/documentation/javascript/shapes#polyline_customize
 *
 * ### Example
 * ```html
 *    <agm-map [latitude]="lat" [longitude]="lng" [zoom]="zoom">
 *      <agm-polyline>
 *          <agm-icon-sequence [fixedRotation]="true" [path]="'FORWARD_OPEN_ARROW'">
 *          </agm-icon-sequence>
 *      </agm-polyline>
 *    </agm-map>
 * ```
 */
export class AgmPolylineIcon {
    ngOnInit() {
        if (this.path == null) {
            throw new Error('Icon Sequence path is required');
        }
    }
}
AgmPolylineIcon.decorators = [
    { type: Directive, args: [{ selector: 'agm-polyline agm-icon-sequence' },] }
];
AgmPolylineIcon.propDecorators = {
    fixedRotation: [{ type: Input }],
    offset: [{ type: Input }],
    repeat: [{ type: Input }],
    anchorX: [{ type: Input }],
    anchorY: [{ type: Input }],
    fillColor: [{ type: Input }],
    fillOpacity: [{ type: Input }],
    path: [{ type: Input }],
    rotation: [{ type: Input }],
    scale: [{ type: Input }],
    strokeColor: [{ type: Input }],
    strokeOpacity: [{ type: Input }],
    strokeWeight: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9seWxpbmUtaWNvbi5qcyIsInNvdXJjZVJvb3QiOiJEOi9BdXRvbWF0aW9uL2FuZ3VsYXItZ29vZ2xlLW1hcHMvcGFja2FnZXMvY29yZS9zcmMvIiwic291cmNlcyI6WyJsaWIvZGlyZWN0aXZlcy9wb2x5bGluZS1pY29uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBRXpEOzs7Ozs7Ozs7Ozs7OztHQWNHO0FBRUgsTUFBTSxPQUFPLGVBQWU7SUFzRjFCLFFBQVE7UUFDTixJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxFQUFFO1lBQ3JCLE1BQU0sSUFBSSxLQUFLLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztTQUNuRDtJQUNILENBQUM7OztZQTNGRixTQUFTLFNBQUMsRUFBQyxRQUFRLEVBQUUsZ0NBQWdDLEVBQUM7Ozs0QkFRcEQsS0FBSztxQkFPTCxLQUFLO3FCQU9MLEtBQUs7c0JBUUwsS0FBSztzQkFRTCxLQUFLO3dCQU1MLEtBQUs7MEJBS0wsS0FBSzttQkFNTCxLQUFLO3VCQU9MLEtBQUs7b0JBT0wsS0FBSzswQkFNTCxLQUFLOzRCQUtMLEtBQUs7MkJBS0wsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuLyoqXHJcbiAqIEFnbVBvbHlsaW5lSWNvbiBlbmFibGVzIHRvIGFkZCBwb2x5bGluZSBzZXF1ZW5jZXMgdG8gYWRkIGFycm93cywgY2lyY2xlLFxyXG4gKiBvciBjdXN0b20gaWNvbnMgZWl0aGVyIGFsb25nIHRoZSBlbnRpcmUgbGluZSwgb3IgaW4gYSBzcGVjaWZpYyBwYXJ0IG9mIGl0LlxyXG4gKiBTZWUgaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vbWFwcy9kb2N1bWVudGF0aW9uL2phdmFzY3JpcHQvc2hhcGVzI3BvbHlsaW5lX2N1c3RvbWl6ZVxyXG4gKlxyXG4gKiAjIyMgRXhhbXBsZVxyXG4gKiBgYGBodG1sXHJcbiAqICAgIDxhZ20tbWFwIFtsYXRpdHVkZV09XCJsYXRcIiBbbG9uZ2l0dWRlXT1cImxuZ1wiIFt6b29tXT1cInpvb21cIj5cclxuICogICAgICA8YWdtLXBvbHlsaW5lPlxyXG4gKiAgICAgICAgICA8YWdtLWljb24tc2VxdWVuY2UgW2ZpeGVkUm90YXRpb25dPVwidHJ1ZVwiIFtwYXRoXT1cIidGT1JXQVJEX09QRU5fQVJST1cnXCI+XHJcbiAqICAgICAgICAgIDwvYWdtLWljb24tc2VxdWVuY2U+XHJcbiAqICAgICAgPC9hZ20tcG9seWxpbmU+XHJcbiAqICAgIDwvYWdtLW1hcD5cclxuICogYGBgXHJcbiAqL1xyXG5ARGlyZWN0aXZlKHtzZWxlY3RvcjogJ2FnbS1wb2x5bGluZSBhZ20taWNvbi1zZXF1ZW5jZSd9KVxyXG5leHBvcnQgY2xhc3MgQWdtUG9seWxpbmVJY29uIGltcGxlbWVudHMgT25Jbml0e1xyXG5cclxuICAvKipcclxuICAgKiBJZiBgdHJ1ZWAsIGVhY2ggaWNvbiBpbiB0aGUgc2VxdWVuY2UgaGFzIHRoZSBzYW1lIGZpeGVkIHJvdGF0aW9uIHJlZ2FyZGxlc3Mgb2YgdGhlXHJcbiAgICogYW5nbGUgb2YgdGhlIGVkZ2Ugb24gd2hpY2ggaXQgbGllcy4gRGVmYXVsdHMgdG8gYGZhbHNlYCwgaW4gd2hpY2ggY2FzZSBlYWNoIGljb25cclxuICAgKiBpbiB0aGUgc2VxdWVuY2UgaXMgcm90YXRlZCB0byBhbGlnbiB3aXRoIGl0cyBlZGdlLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGZpeGVkUm90YXRpb246IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBkaXN0YW5jZSBmcm9tIHRoZSBzdGFydCBvZiB0aGUgbGluZSBhdCB3aGljaCBhbiBpY29uIGlzIHRvIGJlIHJlbmRlcmVkLiBUaGlzXHJcbiAgICogZGlzdGFuY2UgbWF5IGJlIGV4cHJlc3NlZCBhcyBhIHBlcmNlbnRhZ2Ugb2YgbGluZSdzIGxlbmd0aCAoZS5nLiAnNTAlJykgb3IgaW4gcGl4ZWxzXHJcbiAgICogKGUuZy4gJzUwcHgnKS4gRGVmYXVsdHMgdG8gJzEwMCUnLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG9mZnNldDogc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgZGlzdGFuY2UgYmV0d2VlbiBjb25zZWN1dGl2ZSBpY29ucyBvbiB0aGUgbGluZS4gVGhpcyBkaXN0YW5jZSBtYXkgYmUgZXhwcmVzc2VkIGFzXHJcbiAgICogYSBwZXJjZW50YWdlIG9mIHRoZSBsaW5lJ3MgbGVuZ3RoIChlLmcuICc1MCUnKSBvciBpbiBwaXhlbHMgKGUuZy4gJzUwcHgnKS4gVG8gZGlzYWJsZVxyXG4gICAqIHJlcGVhdGluZyBvZiB0aGUgaWNvbiwgc3BlY2lmeSAnMCcuIERlZmF1bHRzIHRvICcwJy5cclxuICAgKi9cclxuICBASW5wdXQoKSByZXBlYXQ6IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIHggY29vcmRpbmF0ZSBvZiB0aGUgcG9zaXRpb24gb2YgdGhlIHN5bWJvbCByZWxhdGl2ZSB0byB0aGUgcG9seWxpbmUuIFRoZSBjb29yZGluYXRlXHJcbiAgICogb2YgdGhlIHN5bWJvbCdzIHBhdGggaXMgdHJhbnNsYXRlZCBfbGVmdF8gYnkgdGhlIGFuY2hvcidzIHggY29vcmRpbmF0ZS4gQnkgZGVmYXVsdCwgYVxyXG4gICAqIHN5bWJvbCBpcyBhbmNob3JlZCBhdCAoMCwgMCkuIFRoZSBwb3NpdGlvbiBpcyBleHByZXNzZWQgaW4gdGhlIHNhbWUgY29vcmRpbmF0ZSBzeXN0ZW0gYXMgdGhlXHJcbiAgICogc3ltYm9sJ3MgcGF0aC5cclxuICAgKi9cclxuICBASW5wdXQoKSBhbmNob3JYOiBudW1iZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSB5IGNvb3JkaW5hdGUgb2YgdGhlIHBvc2l0aW9uIG9mIHRoZSBzeW1ib2wgcmVsYXRpdmUgdG8gdGhlIHBvbHlsaW5lLiBUaGUgY29vcmRpbmF0ZVxyXG4gICAqIG9mIHRoZSBzeW1ib2wncyBwYXRoIGlzIHRyYW5zbGF0ZWQgX3VwXyBieSB0aGUgYW5jaG9yJ3MgeSBjb29yZGluYXRlLiBCeSBkZWZhdWx0LCBhXHJcbiAgICogc3ltYm9sIGlzIGFuY2hvcmVkIGF0ICgwLCAwKS4gVGhlIHBvc2l0aW9uIGlzIGV4cHJlc3NlZCBpbiB0aGUgc2FtZSBjb29yZGluYXRlIHN5c3RlbSBhcyB0aGVcclxuICAgKiBzeW1ib2wncyBwYXRoLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGFuY2hvclk6IG51bWJlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIHN5bWJvbCdzIGZpbGwgY29sb3IuIEFsbCBDU1MzIGNvbG9ycyBhcmUgc3VwcG9ydGVkIGV4Y2VwdCBmb3IgZXh0ZW5kZWQgbmFtZWRcclxuICAgKiBjb2xvcnMuIERlZmF1bHRzIHRvIHRoZSBzdHJva2UgY29sb3Igb2YgdGhlIGNvcnJlc3BvbmRpbmcgcG9seWxpbmUuXHJcbiAgICovXHJcbiAgQElucHV0KCkgZmlsbENvbG9yOiBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBzeW1ib2wncyBmaWxsIG9wYWNpdHkuIERlZmF1bHRzIHRvIDAuXHJcbiAgICovXHJcbiAgQElucHV0KCkgZmlsbE9wYWNpdHk6IG51bWJlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIHN5bWJvbCdzIHBhdGgsIHdoaWNoIGlzIGEgYnVpbHQtaW4gc3ltYm9sIHBhdGgsIG9yIGEgY3VzdG9tIHBhdGggZXhwcmVzc2VkIHVzaW5nXHJcbiAgICogU1ZHIHBhdGggbm90YXRpb24uIFJlcXVpcmVkLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHBhdGg6IGtleW9mIHR5cGVvZiBnb29nbGUubWFwcy5TeW1ib2xQYXRoIHwgc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgYW5nbGUgYnkgd2hpY2ggdG8gcm90YXRlIHRoZSBzeW1ib2wsIGV4cHJlc3NlZCBjbG9ja3dpc2UgaW4gZGVncmVlcy5cclxuICAgKiBEZWZhdWx0cyB0byAwLiBBIHN5bWJvbCB3aGVyZSBgZml4ZWRSb3RhdGlvbmAgaXMgYGZhbHNlYCBpcyByb3RhdGVkIHJlbGF0aXZlIHRvXHJcbiAgICogdGhlIGFuZ2xlIG9mIHRoZSBlZGdlIG9uIHdoaWNoIGl0IGxpZXMuXHJcbiAgICovXHJcbiAgQElucHV0KCkgcm90YXRpb246IG51bWJlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGFtb3VudCBieSB3aGljaCB0aGUgc3ltYm9sIGlzIHNjYWxlZCBpbiBzaXplLiBEZWZhdWx0cyB0byB0aGUgc3Ryb2tlIHdlaWdodFxyXG4gICAqIG9mIHRoZSBwb2x5bGluZTsgYWZ0ZXIgc2NhbGluZywgdGhlIHN5bWJvbCBtdXN0IGxpZSBpbnNpZGUgYSBzcXVhcmUgMjIgcGl4ZWxzIGluXHJcbiAgICogc2l6ZSBjZW50ZXJlZCBhdCB0aGUgc3ltYm9sJ3MgYW5jaG9yLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHNjYWxlOiBudW1iZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBzeW1ib2wncyBzdHJva2UgY29sb3IuIEFsbCBDU1MzIGNvbG9ycyBhcmUgc3VwcG9ydGVkIGV4Y2VwdCBmb3IgZXh0ZW5kZWQgbmFtZWRcclxuICAgKiBjb2xvcnMuIERlZmF1bHRzIHRvIHRoZSBzdHJva2UgY29sb3Igb2YgdGhlIHBvbHlsaW5lLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHN0cm9rZUNvbG9yOiBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBzeW1ib2wncyBzdHJva2Ugb3BhY2l0eS4gRGVmYXVsdHMgdG8gdGhlIHN0cm9rZSBvcGFjaXR5IG9mIHRoZSBwb2x5bGluZS5cclxuICAgKi9cclxuICBASW5wdXQoKSBzdHJva2VPcGFjaXR5OiBudW1iZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBzeW1ib2wncyBzdHJva2Ugd2VpZ2h0LiBEZWZhdWx0cyB0byB0aGUgc2NhbGUgb2YgdGhlIHN5bWJvbC5cclxuICAgKi9cclxuICBASW5wdXQoKSBzdHJva2VXZWlnaHQ6IG51bWJlcjtcclxuXHJcbiAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5wYXRoID09IG51bGwpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJY29uIFNlcXVlbmNlIHBhdGggaXMgcmVxdWlyZWQnKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19