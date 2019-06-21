import { State, Behavior } from "../Common";

export function changeBehavior(state: State, behavior: Behavior): State {
    state.currentBehavior.dispose();
    state.hiddenFocusElement.focus();
    return {
        ...state,
        currentBehavior: behavior
    }
}