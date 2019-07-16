import * as React from 'react';
import styled from 'styled-components';
import { Id, MenuOption, CellMatrix, Location, State } from '../Common';
import { copySelectedRangeToClipboard } from '../Behaviors/DefaultBehavior';

interface ContextMenuProps {
    contextMenuPosition: number[],
    focusedLocation?: Location,
    state: State,
    onRowContextMenu?: (selectedRowIds: Id[], menuOptions: MenuOption[]) => MenuOption[]
    onColumnContextMenu?: (selectedColIds: Id[], menuOptions: MenuOption[]) => MenuOption[]
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
        const { contextMenuPosition, onRowContextMenu, onColumnContextMenu, state } = this.props;
        const focusedLocation = state.focusedLocation!;
        const rowOptions = renderCustomContextMenuOptions(state);
        const colOptions = renderCustomContextMenuOptions(state);
        const cellOptions = renderCustomContextMenuOptions(state);

        onRowContextMenu && onRowContextMenu(state.selectedIds, rowOptions).map(option => rowOptions.push(option));
        onColumnContextMenu && onColumnContextMenu(state.selectedIds, colOptions).map(option => colOptions.push(option));

        return (
            (contextMenuPosition[0] !== -1 && contextMenuPosition[1] !== -1 &&
                <ContextMenuContainer
                    className="dg-context-menu"
                    style={{
                        top: contextMenuPosition[0] + 'px',
                        left: contextMenuPosition[1] + 'px'
                    }}
                >
                    {(state.selectedIds.includes(focusedLocation.col.id)
                        ? colOptions
                        : state.selectedIds.includes(focusedLocation.row.id)
                            ? rowOptions
                            : cellOptions).map((el, idx) => {
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

function renderCustomContextMenuOptions(state: State): MenuOption[] {
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
            title: 'Paste (doesn\'t work)',
            handler: () => {
            }
        }
    ];
}
