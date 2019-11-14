import * as React from 'react';
import { ReactGrid, Column, Id, Row } from '@silevis/reactgrid';
import styled from 'styled-components';
import { CssClassCell, CssClassCellTemplate } from '../../cell-templates/cssClassCellTemplate/CssClassTemplate';
import { fields } from './../../data/stockMarket/columns'
import './styling.scss';

const ReactGridContainer = styled.div`
  position: relative;
  min-height: 400px;
`

const fetchStockMarketData = async () => {
  const promise = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd");
  const myJsonData = await promise.json();
  const newRows: Row[] = [
    {
      id: 'header',
      reorderable: false,
      height: 25,
      cells: [
        { type: 'header', text: 'Name' },
        { type: 'header', text: 'Symbol' },
        { type: 'header', text: 'Current value' },
        { type: 'header', text: 'Low 24h' },
        { type: 'header', text: 'High 24h' },
      ],
    },
    ...myJsonData.map((item: any) => {
      return {
        id: item.id,
        reorderable: false,
        height: 25,
        cells: [
          { type: 'text', text: item.name },
          { type: 'text', text: item.symbol },
          { type: 'cssClass', value: item.current_price, className: 'stockMarketBaseStyle' },
          { type: 'number', value: item.low_24h },
          { type: 'number', value: item.high_24h },
        ]
      }
    }),
  ];
  return newRows;
}

export class StockMarketDataSample extends React.Component {

  state = {
    columns: [...fields],
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

    (dataApi[changedIdx].cells[2] as CssClassCell).value = this.currentValueRandom(dataApi, changedIdx);

    const cheangeRows: Row[] = this.findChangedRows(dataState, dataApi);
    if (cheangeRows.length !== 0) {
      cheangeRows.forEach((row) => {
        let idsToCheanges: number[] = this.findIdsChanged(row.rowId, dataApi);
        idsToCheanges.forEach(id => {
          const valueFromApi = (dataApi[id].cells[2] as CssClassCell).value;
          const valueFromState = (dataState[id].cells[2] as CssClassCell).value;
            if ( valueFromApi !== valueFromState) {
              (dataApi[id].cells[2] as CssClassCell).className = valueFromApi > valueFromState
                ? 'stockMarketBaseStyle greenyellow' 
                : 'stockMarketBaseStyle red';
            }
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
              customCellTemplates={{ 'cssClass': new CssClassCellTemplate }}
              license={'non-commercial'}
              enableRowSelection
              enableColumnSelection
            /> : 'Loading...'}
        </ReactGridContainer>
      </>
    )
  }
}

