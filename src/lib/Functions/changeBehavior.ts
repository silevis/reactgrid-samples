
export function changeBehavior(behavior: Behavior, shouldFocusInnerElement: boolean = true) {
    this.state.currentBehavior.dispose();
    this.setState({ currentBehavior: behavior });

    if (shouldFocusInnerElement) {
        this.hiddenFocusElement.focus();
    }
}