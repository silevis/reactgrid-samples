import * as React from 'react';
import { ReactGrid, Id, Column, Row } from '@silevis/reactgrid';
import styled from 'styled-components';
import { CssClassCell, CssClassCellTemplate } from '../../cell-templates/cssClassCellTemplate/CssClassTemplate';
import './styling.scss';

const ReactGridContainer = styled.div`
  position: relative;
  min-height: 400px;
`

const fields: Column[] = [
  {
    columnId: 'name',
    reorderable: false,
    rezisable: false,
    width: 150,
  },
  {
    columnId: 'Symbol',
    reorderable: false,
    rezisable: false,
    width: 150,
  },
  {
    columnId: 'Current value',
    reorderable: false,
    rezisable: false,
    width: 150,
  },
  {
    columnId: 'Low_24',
    reorderable: false,
    rezisable: false,
    width: 150,
  },
  {
    columnId: 'High_24',
    reorderable: false,
    rezisable: false,
    width: 150,
  },
]

const fetchStockMarketData = async () => {
  const promise = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd");
  const myJsonData = await promise.json();
  const newRows: Row[] = [
    {
      id: 'header',
      reorderable: false,
      height: 25,
      cells: [
        { type: 'header', data: 'Name' },
        { type: 'header', data: 'Symbol' },
        { type: 'header', data: 'Current value' },
        { type: 'header', data: 'Low 24h' },
        { type: 'header', data: 'High 24h' },
      ],
    },
    ...myJsonData.map((item: any) => {
      return {
        id: item.id,
        reorderable: false,
        height: 25,
        cells: [
          { type: 'text', data: item.name },
          { type: 'text', data: item.symbol },
          { type: 'cssClass', data: item.current_price, props: { className: 'stockMarketBaseStyle' } },
          { type: 'number', data: item.low_24h },
          { type: 'number', data: item.high_24h },
        ]
      }
    }),
  ];
  return newRows;
}

export class StockMarketDataSample extends React.Component {

  state = {
    columns: fields.map((field: Column) => (  {
      columnId: field.columnId,
      reorderable: field.reorderable,
      rezisable: field.rezisable,
      width: field.width,
    })),
    rows: [],
  };
  
  intervalId?: number;
  

  returnRandomWith = (numberOfRows: number) => {
    return Math.floor(Math.random() * numberOfRows + 1);
  }

  currentValueRandom = (apiRows: Row[], numberOfRows: number): number => {
    const row: Row | undefined = apiRows.find((_: Row, idx: number) => idx === numberOfRows);
    if (!row) return 0;
    const min = (row.cells[3] as CssClassCell).value;
    const max = (row.cells[4] as CssClassCell).value;
    const randomValue = (Math.random() * (+max - +min) + +min);
    return parseFloat(randomValue.toFixed(6));
  }

  findIdsChanged = (itemID: Id, dataApi: Row[]) => {
    let changedRowIds: number[] = [];
    dataApi.forEach((item, idx) => {
      if (item.rowId === itemID) {
        changedRowIds = [...changedRowIds, idx]
      }
    });
    return changedRowIds;
  }

  findChangedRows = (dataState: Row[], dataApi: Row[]): Row[] => {
    if (!dataState) return [];
    return dataState.filter((data: Row, idx: number) => idx != 0 && (data.cells[2] as CssClassCell).value !== (dataApi[idx].cells[2] as CssClassCell).value);
  }

  renderValue = async () => {
    const dataApi: Row[] = await fetchStockMarketData();
    const dataState: Row[] = [...this.state.rows];
    const changedIdx = this.returnRandomWith(dataState.length);
    const randomvalue = this.currentValueRandom(dataApi, changedIdx);

    
    (dataApi[changedIdx].cells[2] as CssClassCell).value = randomvalue

    const cheangeRows: Row[] = this.findChangedRows(dataState, dataApi);
    if (cheangeRows.length !== 0) {
      cheangeRows.forEach((row) => {
        let idsToCheanges: number[] = this.findIdsChanged(row.rowId, dataApi);
        idsToCheanges.forEach(id => {
          (dataApi[id].cells[2] as CssClassCell).className = 
            (dataApi[id].cells[2] as CssClassCell).value > (dataState[id].cells[2] as CssClassCell).value 
            ? 'stockMarketBaseStyle greenyellow' 
            : 'stockMarketBaseStyle red';
        })
        idsToCheanges.length = 0;
      })
    }
    this.setState({ rows: dataApi });
  }

  componentDidMount() {
    this.renderValue();
    this.intervalId = setInterval(
      () => { this.renderValue(); }
      , 3000);
  }
  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  render() {
    return (
      <>
        <ReactGridContainer className="stock-market-cell-sample">
          {this.state.rows.length !== 0 ? 
            <ReactGrid
              rows={this.state.rows}
              columns={this.state.columns}
              cellTemplates={{ 'cssClass': new CssClassCellTemplate }}
              license={'non-commercial'}
              enableRowSelection
              enableColumnSelection
            /> : 'Loading...'}
        </ReactGridContainer>
      </>
    )
  }
}

