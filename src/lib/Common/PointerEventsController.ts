import { PointerEvent } from "./domEvents";
import { GridContext } from "./GridContext";

export class PointerEventsController {
    private clickTimes: number[] = [0, 0];
    private currentClickTime: number = 0;

    constructor(private gridContext: GridContext) { }

    public handlePointerDown = (event: PointerEvent) => {
        window.addEventListener('pointermove', this.handlePointerMove as any);
        window.addEventListener('pointerup', this.handlePointerUp as any);
        this.currentClickTime = 1 - this.currentClickTime;
        this.clickTimes[this.currentClickTime] = new Date().valueOf();
        this.gridContext.state.currentBehavior.handlePointerDown(event, 'range');
    }

    private handlePointerMove = (event: PointerEvent) => {
        this.gridContext.state.currentBehavior.handlePointerMove(event as any);
    }

    private handlePointerUp = (event: PointerEvent) => {
        window.removeEventListener('pointerup', this.handlePointerUp as any);
        window.removeEventListener('pointermove', this.handlePointerMove as any);
        const currentClickTime = new Date().valueOf();
        const prevClickTime = this.clickTimes[1 - this.currentClickTime];
        this.gridContext.state.currentBehavior.handlePointerUp(event);
        if (currentClickTime - prevClickTime < 500) {
            this.gridContext.state.currentBehavior.handleDoubleClick(event)
        }
    }
}