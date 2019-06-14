import { PointerEvent, Location, State } from ".";
import { getLocationFromClient, scrollIntoView, focusLocation, changeBehavior } from "../Functions";
import { DefaultBehavior } from "../Behaviors/DefaultBehavior";

export class PointerEventsController {
    private eventTimestamps: number[] = [0, 0];
    private eventLocations: Array<Location | undefined> = [undefined, undefined]
    private currentIndex: number = 0;
    private pointerDownLocation?: Location;

    // TODO Handle PointerCancel

    public handlePointerDown = (event: PointerEvent, state: State): State => {
        // TODO open context menu (long hold tap)

        if (event.button !== 0 && event.button !== undefined) {
            return state;
        }
        window.addEventListener('pointermove', this.handlePointerMove as any);
        window.addEventListener('pointerup', this.handlePointerUp as any);
        const previousLocation = this.eventLocations[this.currentIndex];
        const currentLocation = getLocationFromClient(state, event.clientX, event.clientY);
        this.pointerDownLocation = currentLocation;
        this.currentIndex = 1 - this.currentIndex;
        this.eventTimestamps[this.currentIndex] = new Date().valueOf();
        this.eventLocations[this.currentIndex] = currentLocation;
        if (event.pointerType === 'mouse' || currentLocation.equals(previousLocation) || event.pointerType === undefined) { // === undefined only for cypress tests
            state = state.currentBehavior.handlePointerDown(event, currentLocation, state);
        }
        return state;
    }

    // TODO! Bug here: state not passed 
    private handlePointerMove = (event: PointerEvent, state: State): State => {
        const autoScrollDirection = state.currentBehavior.autoScrollDirection;
        const currentLocation = getLocationFromClient(state, event.clientX, event.clientY, autoScrollDirection);
        scrollIntoView(state, currentLocation, autoScrollDirection);
        state = state.currentBehavior.handlePointerMove(event, currentLocation, state);
        const previousLocation = this.eventLocations[this.currentIndex];
        this.eventLocations[this.currentIndex] = currentLocation;
        if (!currentLocation.equals(previousLocation)) {
            state = state.currentBehavior.handlePointerEnter(event, currentLocation, state);
        }
        return state;
    }

    private handlePointerUp = (event: PointerEvent, state: State): State => {
        if (event.button !== 0 && event.button !== undefined) {
            return state;
        }

        window.removeEventListener('pointerup', this.handlePointerUp as any);
        window.removeEventListener('pointermove', this.handlePointerMove as any);
        const currentLocation = getLocationFromClient(state, event.clientX, event.clientY);
        const currentTimestamp = new Date().valueOf();
        const secondLastTimestamp = this.eventTimestamps[1 - this.currentIndex];
        state.currentBehavior.handlePointerUp(event, currentLocation, state);
        if (event.pointerType !== 'mouse' && currentLocation.equals(this.pointerDownLocation) && event.pointerType !== undefined) { // !== undefined only for cypress tests
            state = focusLocation(state, currentLocation, true);
        }
        if (currentTimestamp - secondLastTimestamp < 500 && currentLocation.equals(this.eventLocations[0]) && currentLocation.equals(this.eventLocations[1])) {
            state = state.currentBehavior.handleDoubleClick(event, currentLocation, state)
        }
        return changeBehavior(state, new DefaultBehavior());
    }
}

