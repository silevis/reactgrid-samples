import { Row, DefaultCellTypes } from '@silevis/reactgrid';
import { FlagCell } from '../cell-templates/flagCell/FlagCellTemplate';
import { RateCell } from '../cell-templates/rateCell/RateCellTemplate';
export declare const rows: (reorderable: boolean) => Row<DefaultCellTypes | FlagCell | RateCell>[];
