import * as React from 'react';
import { ReactGrid, DataChange, DropPosition, Id, ColumnProps, CellMatrixProps } from '@silevis/reactgrid';
import { RateCellTemplate } from '../../cell-templates/rateCell/RateCellTemplate';
import { FlagCellTemplate } from '../../cell-templates/flagCell/FlagCellTemplate';
import { columns } from '../../data/columns';
import { rows } from '../../data/rows';
import { ContactsList } from "./ContactsList";
import styled from 'styled-components';
import './styling.scss';


const ReactGridContainer = styled.div`
  position: relative;
  margin-left: 10px;
  width: 100%;
  min-height: 400px;
`


export default class StockMarketDataSample extends React.Component {

  state = {
    contacts: null
  };

  componentDidMount() {
    fetch("https://randomuser.me/api/?format=json&results=10")
      .then(res => res.json())
      .then(json => this.setState({ contacts: json.results }));

  }


  render() {
    const contacts = this.state.contacts;
    // console.log(this.state.contacts)
    return (
      <ReactGridContainer className="resize-cell-sample">

        <div>
          <main className="ui main text container">
            {contacts ? <ContactsList contacts={contacts} /> : 'Ładowanie…'}
          </main>
        </div>
      </ReactGridContainer>
    )
  }
}