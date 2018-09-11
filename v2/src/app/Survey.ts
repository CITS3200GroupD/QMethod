export interface Survey {
    id: number;
    publish: boolean;
    name: String;
    range: number;
    grid: number[];
}

export const gridTemplates = [
    { label: '+3 to -3', val: '7', defaultGrid: [2, 3, 4, 5, 4, 3, 2]},
    { label: '+4 to -4', val: '9', defaultGrid: [2, 3, 4, 5, 6, 5, 4, 3, 2]},
    { label: '+5 to -5', val: '11', defaultGrid: [2, 3, 4, 5, 6, 7, 6, 5, 4, 3, 2]}
];