import * as React from 'react';
import styled from 'styled-components';
import { Id, MenuOption, Location, State, Range } from '../Common';
import { copySelectedRangeToClipboard, pasteData } from '../Behaviors/DefaultBehavior';

interface ContextMenuProps {
    contextMenuPosition: number[],
    focusedLocation?: Location,
    state: State,
    onRowContextMenu?: (selectedRowIds: Id[], menuOptions: MenuOption[]) => MenuOption[],
    onColumnContextMenu?: (selectedColIds: Id[], menuOptions: MenuOption[]) => MenuOption[],
    onRangeContextMenu?: (selectedRanges: Range[], menuOptions: MenuOption[]) => MenuOption[];
}

const ContextMenuContainer = styled.div`
    position: fixed;
    background: white;
    font-size: 13px;
    box-shadow: 0 4px 5px 3px rgba(0, 0, 0, .2);
    z-index: 1000;

    .dg-context-menu-option {
        padding: 10px 40px 10px 20px;
        cursor: pointer;

        &:hover {
            background: #f2f2f2;
        }
    }
`;

export class ContextMenu extends React.Component<ContextMenuProps> {
    render() {
        const { contextMenuPosition, onRowContextMenu, onColumnContextMenu, onRangeContextMenu, state } = this.props;
        const focusedLocation = state.focusedLocation;
        let contextMenuOptions: MenuOption[] = customContextMenuOptions(state);
        const rowOptions = onRowContextMenu && onRowContextMenu(state.selectedIds, customContextMenuOptions(state));
        const colOptions = onColumnContextMenu && onColumnContextMenu(state.selectedIds, customContextMenuOptions(state));
        const rangeOptions = onRangeContextMenu && onRangeContextMenu(state.selectedRanges, customContextMenuOptions(state));

        if (focusedLocation) {
            if (state.selectedIds.includes(focusedLocation.col.id) && colOptions) {
                contextMenuOptions = colOptions;
            } else if (state.selectedIds.includes(focusedLocation.row.id) && rowOptions) {
                contextMenuOptions = rowOptions;
            } else if (rangeOptions) {
                contextMenuOptions = rangeOptions;
            }
        }

        return (
            (contextMenuPosition[0] !== -1 && contextMenuPosition[1] !== -1 && contextMenuOptions.length > 0 &&
                <ContextMenuContainer
                    className="dg-context-menu"
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
                </ContextMenuContainer>
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
                navigator.clipboard.readText().then(e => state.updateState((state: State) =>
                    pasteData(state, e.split('\n').map(line => line.split('\t').map(t => ({ text: t, data: t, type: 'text' })))
                    )))
            }
        }
    ];
}
