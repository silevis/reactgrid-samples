import { State, Behavior } from "../Common";

export function changeBehavior(state: State, behavior: Behavior): State {
    state.currentBehavior.dispose();
    state.hiddenFocusElement.focus();
    console.log(behavior)
    return {
        ...state,
        currentBehavior: behavior
    }
}