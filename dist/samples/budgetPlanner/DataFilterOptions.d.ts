import React from 'react';
interface ValuesFilterOptionsProps {
    onGetValuesFilterOptions: Function;
}
export interface valuesFilterOptionsState {
    date: {
        $gte: Date | null | undefined;
        $lte: Date | null | undefined;
    };
}
export declare const DataFilterOptions: React.FunctionComponent<ValuesFilterOptionsProps>;
export default DataFilterOptions;
