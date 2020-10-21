var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
import { noBorderCellStyle } from "./utils";
import { getDisabledCell } from "../../cell-templates/disabledCellTemplate/DisabledCellTemplate";
var style = noBorderCellStyle;
export var getAthletesRow = function (athletes) { return ({
    rowId: 'athletes',
    height: 30,
    cells: __spread([
        getDisabledCell('', style)
    ], athletes.map(function (athlete) { return getDisabledCell(athlete.surname + ", " + athlete.name, {}, 'bold-text align-right'); }))
}); };
