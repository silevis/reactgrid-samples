import { TextCellTemplate } from "../Cells/TextCellTemplate";
import { NumberCellTemplate } from "../Cells/NumberCellTemplate";
import { HeaderCellTemplate } from "../Cells/HeaderCellTemplate";
import { CheckboxCellTemplate } from "../Cells/CheckboxCellTemplate";
import { DateCellTemplate } from "../Cells/DateCellTemplate";
import { EmailCellTemplate } from "../Cells/EmailCellTemplate";
import { TimeCellTemplate } from "../Cells/TimeCellTemplate";
import { CellTemplates } from "./PublicModel";

export const defaultCellTemplates: CellTemplates = {
    'text': new TextCellTemplate(),
    'number': new NumberCellTemplate(),
    'header': new HeaderCellTemplate(),
    'checkbox': new CheckboxCellTemplate(),
    'date': new DateCellTemplate(),
    'email': new EmailCellTemplate(),
    'time': new TimeCellTemplate(),
}
