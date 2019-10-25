export declare const rows: (reorderable: boolean) => {
    id: string;
    height: number;
    reorderable: boolean;
    cells: ({
        type: string;
        data: string;
    } | {
        type: string;
        data: number;
    })[];
}[];
