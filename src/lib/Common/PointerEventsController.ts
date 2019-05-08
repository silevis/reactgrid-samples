import { PointerEvent } from "./domEvents";
import { GridContext } from "./GridContext";

export class PointerEventsController {
    private clickTimestamps: number[] = [0, 0];
    private currentClickTimestamp: number = 0;

    constructor(private gridContext: GridContext) { }

    public handlePointerDown = (event: PointerEvent) => {
        window.addEventListener('pointermove', this.handlePointerMove as any);
        window.addEventListener('pointerup', this.handlePointerUp as any);
        this.currentClickTimestamp = 1 - this.currentClickTimestamp;
        this.clickTimestamps[this.currentClickTimestamp] = new Date().valueOf();
        this.gridContext.currentBehavior.handlePointerDown(event);
    }

    private handlePointerMove = (event: PointerEvent) => {

        this.gridContext.currentBehavior.handlePointerMove(event as any);
    }

    private handlePointerUp = (event: PointerEvent) => {
        window.removeEventListener('pointerup', this.handlePointerUp as any);
        window.removeEventListener('pointermove', this.handlePointerMove as any);
        const currentClickTimestamp = new Date().valueOf();
        const prevClickTimestamp = this.clickTimestamps[1 - this.currentClickTimestamp];
        this.gridContext.currentBehavior.handlePointerUp(event);
        if (currentClickTimestamp - prevClickTimestamp < 500) {
            this.gridContext.currentBehavior.handleDoubleClick(event)
        }
    }
}