/// <reference types="react" />
import { IReactgridAllInOneActions, IReactgridAllInOneState } from '../AllInOneSample';
interface IFeatureListContainer {
    demoActions: IReactgridAllInOneActions;
    state: IReactgridAllInOneState;
    children?: any;
}
export declare const FeatureListContainer: (props: IFeatureListContainer) => JSX.Element;
export {};
