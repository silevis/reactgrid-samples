import * as React from 'react';
// import styled from 'styled-components';
// import { ReactGrid, DataChange, ColumnProps, CellMatrixProps } from '@silevis/reactgrid';
// import { RateCellTemplate } from '../../cell-templates/rateCell/RateCellTemplate';
// import { FlagCellTemplate } from '../../cell-templates/flagCell/FlagCellTemplate';
// import { columns } from '../../data/columns';
// import { rows } from '../../data/rows';

// const ReactGridContainer = styled.div`
//   position: relative;
//   min-height: 400px;
// `;

// export class ResizeColumnSample extends React.Component<{}, CellMatrixProps> {
//   state = {
//     columns:  columns(false, true),
//     rows:     rows(false),
//   }

//   private getMatrix() {
//     const columns: ColumnProps[] = [...this.state.columns].map((column, idx) => ({
//       ...column,
//       onResize: width => {
//         columns[idx] = { ...column, width };
//         this.setState({ columns })
//       }
//     }));

//     return { columns, rows: this.state.rows }
//   }

//   private prepareDataChanges = (dataChanges: DataChange[]): {} => {
//     const state = { ...this.state }
//     dataChanges.forEach(change => {
//       state.rows.forEach((row: any) => {
//         if (row.id == change.rowId) {
//           const field = this.state.columns.findIndex((column: any) => column.id == change.columnId)
//           if (field !== undefined)
//             row.cells[field].data = change.newData;
//         }
//       })
//     })
//     return state
//   }

//   render() {
//     return (
//       <ReactGridContainer id="resize-column-sample">
//         <ReactGrid
//           cellMatrixProps={this.getMatrix()}
//           cellTemplates={{ 
//             'rating': new RateCellTemplate, 
//             'flag': new FlagCellTemplate 
//           }}
//           onDataChanged={changes => this.setState(this.prepareDataChanges(changes))}
//           license={'non-commercial'}
//         />
//       </ReactGridContainer> 
//     )
//   }
// }