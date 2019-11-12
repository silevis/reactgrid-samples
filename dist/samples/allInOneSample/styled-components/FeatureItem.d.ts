/// <reference types="react" />
interface IFeatureItemProps {
    name: string;
    currentState?: boolean;
    action(): void;
    children?: any;
}
export declare const FeatureItem: (props: IFeatureItemProps) => JSX.Element;
export {};
