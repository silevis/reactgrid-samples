// import { keyCodes } from "../Common";
import { CellRendererProps } from "../Components/CellRenderer";

export const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, props: CellRendererProps, type?: string) => {
    // let cell = undefined;
    // if (
    //     e.keyCode === keyCodes.LEFT_ARROW ||
    //     e.keyCode === keyCodes.RIGHT_ARROW ||
    //     e.keyCode === keyCodes.DOWN_ARROW ||
    //     e.keyCode === keyCodes.UP_ARROW ||
    //     e.keyCode === keyCodes.BACKSPACE ||
    //     e.keyCode === keyCodes.DELETE
    // ) {
    //     e.stopPropagation();
    // }

    // if (e.keyCode === keyCodes.RIGHT_ARROW || e.keyCode === keyCodes.DOWN_ARROW) {
    //     const input: HTMLInputElement = e.target as HTMLInputElement;
    //     if (input.selectionEnd === input.value.length) {
    //         props.gridContext.hiddenFocusElement.focus();
    //         e.preventDefault();
    //     }
    //     e.stopPropagation();
    // }

    // if (e.keyCode === keyCodes.UP_ARROW || e.keyCode === keyCodes.LEFT_ARROW) {
    //     const input: HTMLInputElement = e.target as HTMLInputElement;
    //     if (input.selectionEnd === 0) {
    //         props.gridContext.hiddenFocusElement.focus();
    //         e.preventDefault();
    //     }
    //     e.stopPropagation();
    // }
    // if (e.keyCode === keyCodes.TAB || e.keyCode === keyCodes.ENTER) {
    //     props.gridContext.hiddenFocusElement.focus();
    //     e.preventDefault();
    //     return;
    // }
    // if (e.keyCode === keyCodes.BACKSPACE || e.keyCode === keyCodes.DELETE) {
    //     e.stopPropagation();
    // }

    // if (type === FieldTypes.number) {
    //     if (
    //         props.validateValue(e.keyCode) ||
    //         e.keyCode === keyCodes.LEFT_ARROW ||
    //         e.keyCode === keyCodes.RIGHT_ARROW ||
    //         e.keyCode === keyCodes.DOWN_ARROW ||
    //         e.keyCode === keyCodes.UP_ARROW ||
    //         e.keyCode === keyCodes.BACKSPACE ||
    //         e.keyCode === keyCodes.DELETE
    //     ) {
    //         return;
    //     } else {
    //         e.preventDefault();
    //     }
    // }
    // e.stopPropagation();
};

export const stopPropagationEventHandler = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.stopPropagation();
};

export const handleKeyDownCheckboxCell = (e: React.KeyboardEvent<HTMLInputElement>, props: CellRendererProps) => {
    // let cell = undefined;
    // if (
    //     e.keyCode === keyCodes.RIGHT_ARROW ||
    //     e.keyCode === keyCodes.DOWN_ARROW ||
    //     e.keyCode === keyCodes.UP_ARROW ||
    //     e.keyCode === keyCodes.LEFT_ARROW
    // ) {
    //     props.grid.focusLocation(cell);
    //     props.grid.hiddenFocusElement.focus();
    //     e.preventDefault();
    // }

    // if (
    //     e.keyCode === keyCodes.TAB ||
    //     e.keyCode === keyCodes.ENTER ||
    //     e.keyCode === keyCodes.HOME ||
    //     e.keyCode === keyCodes.END ||
    //     e.keyCode === keyCodes.PAGE_UP ||
    //     e.keyCode === keyCodes.PAGE_DOWN ||
    //     (e.ctrlKey && e.keyCode === keyCodes.A)
    // ) {
    //     props.grid.hiddenFocusElement.focus();
    //     e.preventDefault();
    // }
};

// export const isItLastRowOrCol = (props: CellProps, name: string) => {
// const lastIdx =
//     name === 'row'
//         ? props.grid.props.cellMatrix.last.row.idx.toString()
//         : props.grid.props.cellMatrix.last.col.idx.toString();
// const selectedIdx =
//     name === 'row'
//         ? props.cellKey.substring(0, props.cellKey.indexOf('-'))
//         : props.cellKey.substring(props.cellKey.indexOf('-') + 1, props.cellKey.length);
// if (selectedIdx === lastIdx) {
//     return true;
// }
// return;
// };
