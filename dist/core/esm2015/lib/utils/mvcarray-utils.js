import { fromEventPattern } from 'rxjs';
export function createMVCEventObservable(array) {
    const eventNames = ['insert_at', 'remove_at', 'set_at'];
    return fromEventPattern(handler => eventNames.map(eventName => array.addListener(eventName, (index, previous) => handler.apply(array, [{ newArr: array.getArray(), eventName, index, previous }]))), (_handler, evListeners) => evListeners.forEach(evListener => evListener.remove()));
}
export class MvcArrayMock {
    constructor() {
        this.vals = [];
        this.listeners = {
            remove_at: [],
            insert_at: [],
            set_at: [],
        };
    }
    clear() {
        for (let i = this.vals.length - 1; i >= 0; i--) {
            this.removeAt(i);
        }
    }
    getArray() {
        return [...this.vals];
    }
    getAt(i) {
        return this.vals[i];
    }
    getLength() {
        return this.vals.length;
    }
    insertAt(i, elem) {
        this.vals.splice(i, 0, elem);
        this.listeners.insert_at.forEach(listener => listener(i));
    }
    pop() {
        const deleted = this.vals.pop();
        this.listeners.remove_at.forEach(listener => listener(this.vals.length, deleted));
        return deleted;
    }
    push(elem) {
        this.vals.push(elem);
        this.listeners.insert_at.forEach(listener => listener(this.vals.length - 1));
        return this.vals.length;
    }
    removeAt(i) {
        const deleted = this.vals.splice(i, 1)[0];
        this.listeners.remove_at.forEach(listener => listener(i, deleted));
        return deleted;
    }
    setAt(i, elem) {
        const deleted = this.vals[i];
        this.vals[i] = elem;
        this.listeners.set_at.forEach(listener => listener(i, deleted));
    }
    forEach(callback) {
        this.vals.forEach(callback);
    }
    addListener(eventName, handler) {
        const listenerArr = this.listeners[eventName];
        listenerArr.push(handler);
        return {
            remove: () => {
                listenerArr.splice(listenerArr.indexOf(handler), 1);
            },
        };
    }
    bindTo() { throw new Error('Not implemented'); }
    changed() { throw new Error('Not implemented'); }
    get() { throw new Error('Not implemented'); }
    notify() { throw new Error('Not implemented'); }
    set() { throw new Error('Not implemented'); }
    setValues() { throw new Error('Not implemented'); }
    unbind() { throw new Error('Not implemented'); }
    unbindAll() { throw new Error('Not implemented'); }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXZjYXJyYXktdXRpbHMuanMiLCJzb3VyY2VSb290IjoiRDovQXV0b21hdGlvbi9hbmd1bGFyLWdvb2dsZS1tYXBzL3BhY2thZ2VzL2NvcmUvc3JjLyIsInNvdXJjZXMiOlsibGliL3V0aWxzL212Y2FycmF5LXV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxnQkFBZ0IsRUFBYyxNQUFNLE1BQU0sQ0FBQztBQUVwRCxNQUFNLFVBQVUsd0JBQXdCLENBQUksS0FBOEI7SUFDeEUsTUFBTSxVQUFVLEdBQUcsQ0FBQyxXQUFXLEVBQUUsV0FBVyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ3hELE9BQU8sZ0JBQWdCLENBQ3JCLE9BQU8sQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUNoRSxDQUFDLEtBQWEsRUFBRSxRQUFZLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUUsRUFBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLFFBQVEsRUFBRSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQ25JLENBQUMsUUFBUSxFQUFFLFdBQTRDLEVBQUUsRUFBRSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ3hILENBQUM7QUFXRCxNQUFNLE9BQU8sWUFBWTtJQUF6QjtRQUNVLFNBQUksR0FBUSxFQUFFLENBQUM7UUFDZixjQUFTLEdBSWI7WUFDRixTQUFTLEVBQUUsRUFBRTtZQUNiLFNBQVMsRUFBRSxFQUFFO1lBQ2IsTUFBTSxFQUFFLEVBQUU7U0FDWCxDQUFDO0lBNERKLENBQUM7SUEzREMsS0FBSztRQUNILEtBQUssSUFBSSxDQUFDLEdBQUcsSUFB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QU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN4RCxDQUFDO1NBQ0osQ0FBQztJQUNKLENBQUM7SUFFRCxNQUFNLEtBQVksTUFBTSxJQUFJLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN2RCxPQUFPLEtBQVksTUFBTSxJQUFJLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN4RCxHQUFHLEtBQVksTUFBTSxJQUFJLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNwRCxNQUFNLEtBQVksTUFBTSxJQUFJLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN2RCxHQUFHLEtBQVksTUFBTSxJQUFJLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNwRCxTQUFTLEtBQVksTUFBTSxJQUFJLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMxRCxNQUFNLEtBQVksTUFBTSxJQUFJLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN2RCxTQUFTLEtBQVksTUFBTSxJQUFJLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUMzRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGZyb21FdmVudFBhdHRlcm4sIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVNVkNFdmVudE9ic2VydmFibGU8VD4oYXJyYXk6IGdvb2dsZS5tYXBzLk1WQ0FycmF5PFQ+KTogT2JzZXJ2YWJsZTxNVkNFdmVudDxUPj57XHJcbiAgY29uc3QgZXZlbnROYW1lcyA9IFsnaW5zZXJ0X2F0JywgJ3JlbW92ZV9hdCcsICdzZXRfYXQnXTtcclxuICByZXR1cm4gZnJvbUV2ZW50UGF0dGVybihcclxuICAgIGhhbmRsZXIgPT4gZXZlbnROYW1lcy5tYXAoZXZlbnROYW1lID0+IGFycmF5LmFkZExpc3RlbmVyKGV2ZW50TmFtZSxcclxuICAgICAgKGluZGV4OiBudW1iZXIsIHByZXZpb3VzPzogVCkgPT4gaGFuZGxlci5hcHBseShhcnJheSwgWyB7bmV3QXJyOiBhcnJheS5nZXRBcnJheSgpLCBldmVudE5hbWUsIGluZGV4LCBwcmV2aW91c30gYXMgTVZDRXZlbnQ8VD5dKSkpLFxyXG4gICAgKF9oYW5kbGVyLCBldkxpc3RlbmVyczogZ29vZ2xlLm1hcHMuTWFwc0V2ZW50TGlzdGVuZXJbXSkgPT4gZXZMaXN0ZW5lcnMuZm9yRWFjaChldkxpc3RlbmVyID0+IGV2TGlzdGVuZXIucmVtb3ZlKCkpKTtcclxufVxyXG5cclxuZXhwb3J0IHR5cGUgTXZjRXZlbnRUeXBlID0gJ2luc2VydF9hdCcgfCAncmVtb3ZlX2F0JyB8ICdzZXRfYXQnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBNVkNFdmVudDxUPiB7XHJcbiAgbmV3QXJyOiBUW107XHJcbiAgZXZlbnROYW1lOiBNdmNFdmVudFR5cGU7XHJcbiAgaW5kZXg6IG51bWJlcjtcclxuICBwcmV2aW91cz86IFQ7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBNdmNBcnJheU1vY2s8VD4gaW1wbGVtZW50cyBnb29nbGUubWFwcy5NVkNBcnJheTxUPiB7XHJcbiAgcHJpdmF0ZSB2YWxzOiBUW10gPSBbXTtcclxuICBwcml2YXRlIGxpc3RlbmVyczoge1xyXG4gICAgJ3JlbW92ZV9hdCc6ICgoaTogbnVtYmVyLCByOiBUKSA9PiB2b2lkKVtdO1xyXG4gICAgJ2luc2VydF9hdCc6ICgoaTogbnVtYmVyKSA9PiB2b2lkKVtdO1xyXG4gICAgJ3NldF9hdCc6ICgoaTogbnVtYmVyLCB2YWw6IFQpID0+IHZvaWQpW107XHJcbiAgfSA9IHtcclxuICAgIHJlbW92ZV9hdDogW10sXHJcbiAgICBpbnNlcnRfYXQ6IFtdLFxyXG4gICAgc2V0X2F0OiBbXSxcclxuICB9O1xyXG4gIGNsZWFyKCk6IHZvaWQge1xyXG4gICAgZm9yIChsZXQgaSA9IHRoaXMudmFscy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICAgIHRoaXMucmVtb3ZlQXQoaSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGdldEFycmF5KCk6IFRbXSB7XHJcbiAgICByZXR1cm4gWy4uLnRoaXMudmFsc107XHJcbiAgfVxyXG4gIGdldEF0KGk6IG51bWJlcik6IFQge1xyXG4gICAgcmV0dXJuIHRoaXMudmFsc1tpXTtcclxuICB9XHJcbiAgZ2V0TGVuZ3RoKCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy52YWxzLmxlbmd0aDtcclxuICB9XHJcbiAgaW5zZXJ0QXQoaTogbnVtYmVyLCBlbGVtOiBUKTogdm9pZCB7XHJcbiAgICB0aGlzLnZhbHMuc3BsaWNlKGksIDAsIGVsZW0pO1xyXG4gICAgdGhpcy5saXN0ZW5lcnMuaW5zZXJ0X2F0LmZvckVhY2gobGlzdGVuZXIgPT4gbGlzdGVuZXIoaSkpO1xyXG4gIH1cclxuICBwb3AoKTogVCB7XHJcbiAgICBjb25zdCBkZWxldGVkID0gdGhpcy52YWxzLnBvcCgpO1xyXG4gICAgdGhpcy5saXN0ZW5lcnMucmVtb3ZlX2F0LmZvckVhY2gobGlzdGVuZXIgPT4gbGlzdGVuZXIodGhpcy52YWxzLmxlbmd0aCwgZGVsZXRlZCkpO1xyXG4gICAgcmV0dXJuIGRlbGV0ZWQ7XHJcbiAgfVxyXG4gIHB1c2goZWxlbTogVCk6IG51bWJlciB7XHJcbiAgICB0aGlzLnZhbHMucHVzaChlbGVtKTtcclxuICAgIHRoaXMubGlzdGVuZXJzLmluc2VydF9hdC5mb3JFYWNoKGxpc3RlbmVyID0+IGxpc3RlbmVyKHRoaXMudmFscy5sZW5ndGggLSAxKSk7XHJcbiAgICByZXR1cm4gdGhpcy52YWxzLmxlbmd0aDtcclxuICB9XHJcbiAgcmVtb3ZlQXQoaTogbnVtYmVyKTogVCB7XHJcbiAgICBjb25zdCBkZWxldGVkID0gdGhpcy52YWxzLnNwbGljZShpLCAxKVswXTtcclxuICAgIHRoaXMubGlzdGVuZXJzLnJlbW92ZV9hdC5mb3JFYWNoKGxpc3RlbmVyID0+IGxpc3RlbmVyKGksIGRlbGV0ZWQpKTtcclxuICAgIHJldHVybiBkZWxldGVkO1xyXG4gIH1cclxuICBzZXRBdChpOiBudW1iZXIsIGVsZW06IFQpOiB2b2lkIHtcclxuICAgIGNvbnN0IGRlbGV0ZWQgPSB0aGlzLnZhbHNbaV07XHJcbiAgICB0aGlzLnZhbHNbaV0gPSBlbGVtO1xyXG4gICAgdGhpcy5saXN0ZW5lcnMuc2V0X2F0LmZvckVhY2gobGlzdGVuZXIgPT4gbGlzdGVuZXIoaSwgZGVsZXRlZCkpO1xyXG4gIH1cclxuICBmb3JFYWNoKGNhbGxiYWNrOiAoZWxlbTogVCwgaTogbnVtYmVyKSA9PiB2b2lkKTogdm9pZCB7XHJcbiAgICB0aGlzLnZhbHMuZm9yRWFjaChjYWxsYmFjayk7XHJcbiAgfVxyXG4gIGFkZExpc3RlbmVyKGV2ZW50TmFtZTogJ3JlbW92ZV9hdCcgfCAnaW5zZXJ0X2F0JyB8ICdzZXRfYXQnLCBoYW5kbGVyOiAoLi4uYXJnczogYW55W10pID0+IHZvaWQpOiBnb29nbGUubWFwcy5NYXBzRXZlbnRMaXN0ZW5lciB7XHJcbiAgICBjb25zdCBsaXN0ZW5lckFyciA9IHRoaXMubGlzdGVuZXJzW2V2ZW50TmFtZV07XHJcbiAgICBsaXN0ZW5lckFyci5wdXNoKGhhbmRsZXIpO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICByZW1vdmU6ICgpID0+IHtcclxuICAgICAgICAgICAgbGlzdGVuZXJBcnIuc3BsaWNlKGxpc3RlbmVyQXJyLmluZGV4T2YoaGFuZGxlciksIDEpO1xyXG4gICAgICAgIH0sXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgYmluZFRvKCk6IG5ldmVyIHsgdGhyb3cgbmV3IEVycm9yKCdOb3QgaW1wbGVtZW50ZWQnKTsgfVxyXG4gIGNoYW5nZWQoKTogbmV2ZXIgeyB0aHJvdyBuZXcgRXJyb3IoJ05vdCBpbXBsZW1lbnRlZCcpOyB9XHJcbiAgZ2V0KCk6IG5ldmVyIHsgdGhyb3cgbmV3IEVycm9yKCdOb3QgaW1wbGVtZW50ZWQnKTsgfVxyXG4gIG5vdGlmeSgpOiBuZXZlciB7IHRocm93IG5ldyBFcnJvcignTm90IGltcGxlbWVudGVkJyk7IH1cclxuICBzZXQoKTogbmV2ZXIgeyB0aHJvdyBuZXcgRXJyb3IoJ05vdCBpbXBsZW1lbnRlZCcpOyB9XHJcbiAgc2V0VmFsdWVzKCk6IG5ldmVyIHsgdGhyb3cgbmV3IEVycm9yKCdOb3QgaW1wbGVtZW50ZWQnKTsgfVxyXG4gIHVuYmluZCgpOiBuZXZlciB7IHRocm93IG5ldyBFcnJvcignTm90IGltcGxlbWVudGVkJyk7IH1cclxuICB1bmJpbmRBbGwoKTogbmV2ZXIgeyB0aHJvdyBuZXcgRXJyb3IoJ05vdCBpbXBsZW1lbnRlZCcpOyB9XHJcbn1cclxuIl19