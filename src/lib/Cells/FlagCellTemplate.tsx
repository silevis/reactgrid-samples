import * as React from 'react';
import { keyCodes } from '../Common/Constants';
import { CellRenderProps, CellTemplate } from '../Common';

class Svg extends React.Component<{ url: string }> {
    state = {
        svg: '',
        loading: false,
    }

    componentDidMount() {
        fetch(this.props.url)
            .then(res => res.text())
            .then(text => this.setState({ svg: text }));
    }

    render() {
        const { loading, svg } = this.state;
        if (loading) {
            return <div className="spinner" />;
        } else if (!svg) {
            return <div className="error" />
        }
        return <div dangerouslySetInnerHTML={{ __html: this.state.svg }} />;
    }
}

export class FlagCellTemplate implements CellTemplate<string> {
    readonly hasEditMode = true;

    validate(data: any): string {
        return (typeof (data) === 'string') ? data : '';
    }

    textToCellData(text: string): string {
        return text;
    }

    cellDataToText(cellData: string) {
        return cellData;
    }

    handleKeyDown(keyCode: number, cellData: string) {
        return { editable: true, cellData }
    }

    customStyle: React.CSSProperties = { background: '#fff' };

    renderContent: (props: CellRenderProps<string>) => React.ReactNode = (props) => {
        if (!props.isInEditMode)
            return <Svg url={'https://restcountries.eu/data/col.svg'} />;
        return props.cellData
    }
}