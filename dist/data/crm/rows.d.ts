import { Row, DefaultCellTypes } from '@silevis/reactgrid';
import { FlagCell } from '../../cell-templates/flagCell/FlagCellTemplate';
import { DropdownNumberCell } from '../../cell-templates/dropdownNumberCell/DropdownNumberCellTemplate';
export declare const rows: (reorderable: boolean, height?: number) => Row<DefaultCellTypes | FlagCell | DropdownNumberCell>[];
