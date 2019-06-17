import { State, Behavior } from "../Common";

export function changeBehavior(state: State, behavior: Behavior): State {
    console.log('changeBehavior')
    state.currentBehavior.dispose();
    state.hiddenFocusElement.focus();
    return {
        ...state,
        currentBehavior: behavior
    }
}