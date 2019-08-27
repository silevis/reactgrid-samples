import * as React from 'react';
import { Id, MenuOption, Location, State, Range } from '../Common';
import { copySelectedRangeToClipboard, pasteData } from '../Behaviors/DefaultBehavior';
import { isBrowserIE, getDataToPasteInIE } from '../Functions';
import './ContextMenu.css';

interface ContextMenuProps {
    contextMenuPosition: number[],
    focusedLocation?: Location,
    state: State,
    onRowContextMenu?: (selectedRowIds: Id[], menuOptions: MenuOption[]) => MenuOption[],
    onColumnContextMenu?: (selectedColIds: Id[], menuOptions: MenuOption[]) => MenuOption[],
    onRangeContextMenu?: (selectedRanges: Range[], menuOptions: MenuOption[]) => MenuOption[];
}


export class ContextMenu extends React.Component<ContextMenuProps> {
    render() {
        const { contextMenuPosition, onRowContextMenu, onColumnContextMenu, onRangeContextMenu, state } = this.props;
        const focusedLocation = state.focusedLocation;
        let contextMenuOptions: MenuOption[] = customContextMenuOptions(state);
        const rowOptions = onRowContextMenu && onRowContextMenu(state.selectedIds, customContextMenuOptions(state));
        const colOptions = onColumnContextMenu && onColumnContextMenu(state.selectedIds, customContextMenuOptions(state));
        const rangeOptions = onRangeContextMenu && onRangeContextMenu(state.selectedRanges, customContextMenuOptions(state));

        if (focusedLocation) {
            if (state.selectedIds.includes(focusedLocation.row.id) && rowOptions) {
                contextMenuOptions = rowOptions;
            } else if (state.selectedIds.includes(focusedLocation.col.id) && colOptions) {
                contextMenuOptions =  colOptions;
            } else if (rangeOptions) {
                contextMenuOptions = rangeOptions;
            }
        }

        return (
            (contextMenuPosition[0] !== -1 && contextMenuPosition[1] !== -1 && contextMenuOptions.length > 0 &&
                <div
                    className="dg-context-menu context-menu-container"
                    style={{
                        top: contextMenuPosition[0] + 'px',
                        left: contextMenuPosition[1] + 'px'
                    }}
                >
                    {contextMenuOptions.map((el, idx) => {
                        return (
                            <div
                                key={idx}
                                className="dg-context-menu-option"
                                onPointerDown={e => e.stopPropagation()}
                                onClick={() => {
                                    el.handler();
                                    state.updateState((state: State) => ({ ...state, selectedIds: state.selectedIds, contextMenuPosition: [-1, -1] }))
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
