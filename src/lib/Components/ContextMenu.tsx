import * as React from 'react';
import { MenuOption, Location, State } from '../Common';
import { copySelectedRangeToClipboard, pasteData } from '../Behaviors/DefaultBehavior';
import { isBrowserIE, getDataToPasteInIE } from '../Functions';
interface ContextMenuProps {
    contextMenuPosition: number[],
    focusedLocation?: Location,
    state: State,
    onRowContextMenu?: (menuOptions: MenuOption[]) => MenuOption[],
    onColumnContextMenu?: (menuOptions: MenuOption[]) => MenuOption[],
    onRangeContextMenu?: (menuOptions: MenuOption[]) => MenuOption[];
}


export class ContextMenu extends React.Component<ContextMenuProps> {
    state = { isHovered: false }
    render() {
        const { contextMenuPosition, onRowContextMenu, onColumnContextMenu, onRangeContextMenu, state } = this.props;
        const focusedLocation = state.focusedLocation;
        let contextMenuOptions: MenuOption[] = customContextMenuOptions(state);
        const rowOptions = onRowContextMenu && onRowContextMenu(customContextMenuOptions(state));
        const colOptions = onColumnContextMenu && onColumnContextMenu(customContextMenuOptions(state));
        const rangeOptions = onRangeContextMenu && onRangeContextMenu(customContextMenuOptions(state));

        if (focusedLocation) {
            if (state.selectionMode == 'row' && state.selectedIds.includes(focusedLocation.row.id) && rowOptions) {
                contextMenuOptions = rowOptions;
            } else if (state.selectionMode == 'column' && state.selectedIds.includes(focusedLocation.col.id) && colOptions) {
                contextMenuOptions = colOptions;
            } else if (state.selectionMode == 'range' && rangeOptions) {
                contextMenuOptions = rangeOptions;
            }
        }
        return (
            (contextMenuPosition[0] !== -1 && contextMenuPosition[1] !== -1 && contextMenuOptions.length > 0 &&
                <div
                    className="dg-context-menu"
                    style={{
                        top: contextMenuPosition[0] + 'px',
                        left: contextMenuPosition[1] + 'px',
                        position: 'fixed',
                        background: 'white',
                        fontSize: '1em',
                        boxShadow: '0 4px 5px 3px rgba(0, 0, 0, .2)',
                        zIndex: 1000
                    }}
                >
                    {contextMenuOptions.map((el, idx) => {
                        return (
                            <div
                                key={idx}
                                className="dg-context-menu-option"
                                style={{
                                    padding: '8px 20px 8px 15px',
                                    cursor: 'pointer',
                                }}
                                onPointerDown={e => e.stopPropagation()}
                                onClick={() => {
                                    el.handler();
                                    state.updateState((state: State) => ({ ...state, contextMenuPosition: [-1, -1] }))
                                }}
                            >
                                {el.title}
                            </div>
                        );
                    })}
                </div>
            )
        );
    }
}

function customContextMenuOptions(state: State): MenuOption[] {
    // TODO use document.execCommand('copy') and paste
    return [
        {
            title: 'Copy',
            handler: () => copySelectedRangeToClipboard(state, false)
        },
        {
            title: 'Cut',
            handler: () => copySelectedRangeToClipboard(state, true)
        },
        {
            title: 'Paste',
            handler: () => {
                if (isBrowserIE()) {
                    setTimeout(() => state.updateState((state: State) => pasteData(state, getDataToPasteInIE())));
                } else {
                    navigator.clipboard.readText().then(e => state.updateState((state: State) => pasteData(state, e.split('\n').map(line => line.split('\t').map(t => ({ text: t, data: t, type: 'text' }))))));
                }
            }
        }
    ];
}
