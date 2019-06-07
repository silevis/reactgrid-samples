import { PointerEvent, Location } from "./";
import { GridContext } from "./GridContext";
import { getLocationFromClient, scrollIntoView, focusLocation } from "../Functions";

export class PointerEventsController {
    private eventTimestamps: number[] = [0, 0];
    private eventLocations: Array<Location | undefined> = [undefined, undefined]
    private currentIndex: number = 0;
    private pointerDownLocation?: Location;

    constructor(private gridContext: GridContext) { }

    // TODO Handle PointerCancel

    public handlePointerDown = (event: PointerEvent) => {
        // TODO open context menu (long hold tap)

        if (event.button !== 0 && event.button !== undefined) {
            return
        }
        window.addEventListener('pointermove', this.handlePointerMove as any);
        window.addEventListener('pointerup', this.handlePointerUp as any);
        const previousLocation = this.eventLocations[this.currentIndex];
        const currentLocation = getLocationFromClient(this.gridContext, event.clientX, event.clientY);
        this.pointerDownLocation = currentLocation;
        this.currentIndex = 1 - this.currentIndex;
        this.eventTimestamps[this.currentIndex] = new Date().valueOf();
        this.eventLocations[this.currentIndex] = currentLocation;
        if (event.pointerType === 'mouse' || isSameLocation(previousLocation, currentLocation)) {
            this.gridContext.currentBehavior.handlePointerDown(event, currentLocation);
        }
    }

    private handlePointerMove = (event: PointerEvent) => {
        const autoScrollDirection = this.gridContext.currentBehavior.autoScrollDirection;
        const currentLocation = getLocationFromClient(this.gridContext, event.clientX, event.clientY, autoScrollDirection);
        scrollIntoView(this.gridContext, currentLocation, autoScrollDirection);
        this.gridContext.currentBehavior.handlePointerMove(event, currentLocation);
        const previousLocation = this.eventLocations[this.currentIndex];
        this.eventLocations[this.currentIndex] = currentLocation;
        if (!isSameLocation(previousLocation, currentLocation)) {
            this.gridContext.currentBehavior.handlePointerEnter(event, currentLocation);
        }
    }

    private handlePointerUp = (event: PointerEvent) => {
        if (event.button !== 0 && event.button !== undefined) {
            return
        }

        window.removeEventListener('pointerup', this.handlePointerUp as any);
        window.removeEventListener('pointermove', this.handlePointerMove as any);
        const currentLocation = getLocationFromClient(this.gridContext, event.clientX, event.clientY);
        const currentTimestamp = new Date().valueOf();
        const secondLastTimestamp = this.eventTimestamps[1 - this.currentIndex];
        this.gridContext.currentBehavior.handlePointerUp(event, currentLocation);
        if (event.pointerType !== 'mouse' && isSameLocation(this.pointerDownLocation, currentLocation)) {
            focusLocation(this.gridContext, currentLocation, true);
        }
        if (currentTimestamp - secondLastTimestamp < 500 && isSameLocation(currentLocation, this.eventLocations[0]) && isSameLocation(currentLocation, this.eventLocations[1])) {
            this.gridContext.currentBehavior.handleDoubleClick(event, currentLocation)
        }
    }
}

function isSameLocation(location1?: Location, location2?: Location): boolean {
    return location1 !== undefined
        && location2 !== undefined
        && location1.col.idx === location2.col.idx
        && location1.row.idx === location2.row.idx;
}

