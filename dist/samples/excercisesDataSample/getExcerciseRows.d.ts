import { Row } from "@silevis/reactgrid/lib";
import { Excercise, Athlete, Result } from "./model";
import { SampleCellTypes } from "./ExcercisesDataSample";
export declare const getExcerciseRows: (excercise: Excercise, athletes: Athlete[], results: Result[]) => Row<SampleCellTypes>[];
