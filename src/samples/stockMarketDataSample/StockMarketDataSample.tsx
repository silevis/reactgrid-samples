import React, {useEffect, useRef} from 'react';
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
      rowId: 'header',
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
        rowId: item.id,
        reorderable: false,
        height: 25,
        cells: [
          { type: 'text', text: item.name },
          { type: 'text', text: item.symbol },
          { type: 'cssClass', value: item.current_price },
          { type: 'number', value: item.low_24h },
          { type: 'number', value: item.high_24h },
        ]
      }
    }),
  ];
  return newRows;
}

interface StockMarketState {
  columns:  Column[]
  rows:     Row[]
}

export const StockMarketDataSample: React.FunctionComponent = () => {

  const [state, setState] = React.useState<StockMarketState>(() => ({
    columns: [...fields],
    rows: []
  }));

  const returnRandomWith = (numberOfRows: number) => Math.floor(Math.random() * numberOfRows + 1)

  const currentValueRandom = (apiRows: Row[], numberOfRows: number): number => {
    const row: Row | undefined = apiRows.find((_: Row, idx: number) => idx === numberOfRows);
    if (!row) return 0;
    const min = (row.cells[3] as CssClassCell).value;
    const max = (row.cells[4] as CssClassCell).value;
    const randomValue = (Math.random() * (+max - +min) + +min);
    return parseFloat(randomValue.toFixed(6));
  }

  const findIdsChanged = (itemID: Id, dataApi: Row[]) => {
    let changedRowIds: number[] = [];
    dataApi.forEach((item, idx) => {
      if (item.rowId === itemID) {
        changedRowIds = [...changedRowIds, idx]
      }
    });
    return changedRowIds;
  }

  const findChangedRows = (dataState: Row[], dataApi: Row[]): Row[] => {
    if (!dataState) return [];
    return dataState.filter((data: Row, idx: number) => idx != 0 && (data.cells[2] as CssClassCell).value !== (dataApi[idx].cells[2] as CssClassCell).value);
  }

  const useInterval = (callback: any, delay: number) => {
    const savedCallback = useRef();

    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
      const tick = () => (savedCallback as any).current();
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  useInterval(() => renderValue(), 3000);

  const renderValue = () => {
    fetchStockMarketData().then((res: Row[]) => {
      const dataApi: Row[] = res;
      const dataState: Row[] = [...state.rows];
      for (let i = 0; i < Math.floor(dataApi.length / 6); i++) {
        const changedIdx = returnRandomWith(dataApi.length);
        (dataApi[changedIdx].cells[2] as CssClassCell).value = currentValueRandom(dataApi, changedIdx);
      }

      const cheangeRows: Row[] = findChangedRows(dataState, dataApi);
      if (cheangeRows.length !== 0) {
        cheangeRows.forEach(row => {
          let idsToCheanges: number[] = findIdsChanged(row.rowId, dataApi);
          idsToCheanges.forEach(id => {
            const valueFromApi = (dataApi[id].cells[2] as CssClassCell).value;
            const valueFromState = (dataState[id].cells[2] as CssClassCell).value;
            if (valueFromApi !== valueFromState) {
              (dataApi[id].cells[2] as CssClassCell).className = valueFromApi > valueFromState  ? 'growth' : 'decrease';
            }
          })
          idsToCheanges.length = 0;
        })
      }
      setState({ columns: [...state.columns], rows: dataApi });
    })
    .catch(console.error);
  }

  return (
    <>
      <ReactGridContainer id="#stock-market-sample" className="stock-market-cell-sample">
        {state.rows.length !== 0 ?
          <ReactGrid
            rows={state.rows}
            columns={state.columns}
            customCellTemplates={{ 
              'cssClass': new CssClassCellTemplate 
            }}
            license={'non-commercial'}
            disableFillHandle
            enableRowSelection
            enableColumnSelection
          />
          : <span className='stock-market-sample-loader'>Loading...</span>}
      </ReactGridContainer>
    </>
  )
}

