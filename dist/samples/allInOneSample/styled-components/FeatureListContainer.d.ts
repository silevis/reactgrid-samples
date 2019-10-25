/// <reference types="react" />
import { IDemoActions, IDynaGridDemoState } from '../AllInOneSample';
interface IFeatureListContainer {
    demoActions: IDemoActions;
    state: IDynaGridDemoState;
    children?: any;
}
export declare const FeatureListContainer: (props: IFeatureListContainer) => JSX.Element;
export {};
