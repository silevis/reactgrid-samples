import * as React from "react";
import { ReactGrid, Column, Row, CellChange } from "@silevis/reactgrid";
import "./styling.scss";
import "@silevis/reactgrid/styles.css";

const nodes = [
    {
        name: 'Hadrian',
        parentId: 'Pracownicy',
        values: {
            2020: {
                q1: {
                    1: '5000',
                    2: '5000',
                    3: '5000',
                },
                q2: {
                    4: '5000',
                    5: '5000',
                    6: '5000',
                },
                q3: {
                    7: '5000',
                    8: '5000',
                    9: '5000',
                },
                q4: {
                    10: '5000',
                    11: '5000',
                    12: '5000',
                },
            }
        }
    },
    {
        name: 'Marek Antoniusz',
        parentId: 'Pracownicy',
        values: {
            2020: {
                q1: {
                    1: '5000',
                    2: '5000',
                    3: '5000',
                },
                q2: {
                    4: '5000',
                    5: '5000',
                    6: '5000',
                },
                q3: {
                    7: '5000',
                    8: '5000',
                    9: '5000',
                },
                q4: {
                    10: '5000',
                    11: '5000',
                    12: '5000',
                },
            }
        }
    },
    {
        name: 'Juliusz Gajusz Cezar',
        parentId: 'Pracownicy',
        values: {
            2020: {
                q1: {
                    1: '5000',
                    2: '5000',
                    3: '5000',
                },
                q2: {
                    4: '5000',
                    5: '5000',
                    6: '5000',
                },
                q3: {
                    7: '5000',
                    8: '5000',
                    9: '5000',
                },
                q4: {
                    10: '5000',
                    11: '5000',
                    12: '5000',
                },
            }
        }
    },
];

const vertical = [
    {
        Silevis: [
            {
                Koszty: [
                    {
                        Pracownicy: [
                            { name: 'Hadrian' },
                            { name: 'Marek Antoniusz' },
                            { name: 'Juliusz Gajusz Cezar' },
                        ],
                    },
                    {
                        NonHuman: [
                            { name: 'Uffok' },
                        ]
                    }
                ]
            }
        ],
    }
];

const rows = vertical.map((row, idx) => {
    console.log(Object.keys(row)[0]);
    return {
        rowId: idx,
        cells: [
            { type: "group", text: "Name " + Object.keys(row)[0] },
        ]
    } as Row
});

const xxx = (node: any[], idx: number) => {


    const isLeaf = true;
    if (isLeaf) {
        return {
            rowId: idx,
            cells: [
                { type: "group", text: `Idx: ${idx}` },
            ]
        }
    }

    node.forEach(node => {
        xxx(node, idx++);
    });

}

const quarters = {
    q1: {},
    q2: {},
    q3: {},
    q4: {},
}

const horizontal = [
    {
        2019: quarters,
        2020: quarters,
        2021: quarters,
    }
]

export const BPSample: React.FC = () => {
    const [state, setState] = React.useState(() => ({
        columns: [
            { columnId: "Struct", width: 200 },
            // [...horizontal]
        ] as Column[],
        rows: [...rows] as Row[]
    }));

    const handleChanges = (changes: CellChange[]) => {
        const newState = { ...state };
        changes.forEach(change => {
            const changeRowIdx = newState.rows.findIndex(el => el.rowId === change.rowId);
            const changeColumnIdx = newState.columns.findIndex(el => el.columnId === change.columnId);
            newState.rows[changeRowIdx].cells[changeColumnIdx] = change.newCell;
        });
        setState(newState);
    };

    return (
        <ReactGrid
            rows={state.rows}
            columns={state.columns}
            onCellsChanged={handleChanges}
        />
    );
}