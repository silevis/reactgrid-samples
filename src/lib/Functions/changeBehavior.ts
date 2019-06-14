import { Behavior } from "../Common/Behavior";
import { State } from "../Common/state";

export function changeBehavior(state: State, behavior: Behavior): State {
    state.currentBehavior.dispose();
    state.hiddenFocusElement.focus();
    return {
        ...state,
        currentBehavior: behavior
    }
}