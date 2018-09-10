export interface Survey {
    id: Number;
    publish: Boolean;
    name: String;
    range: Number;
}

export const KurtOptions = [
    { label: '+3 to -3', val: '7', grid: [2, 3, 4, 5, 4, 3, 2]},
    { label: '+4 to -4', val: '9', grid: [2, 3, 4, 5, 6, 5, 4, 3, 2]},
    { label: '+5 to -5', val: '11', grid: [2, 3, 4, 5, 6, 7, 6, 5, 4, 3, 2]}
    // { label: '+6 to -6', val: '13'},
    // { label: '+7 to -7', val: '15'}
];

export const KurtOptionsNew = [
    { label: '+3 to -3', val: [2, 3, 4, 5, 4, 3, 2]},
    { label: '+4 to -4', val: [2, 3, 4, 5, 6, 5, 4, 3, 2]},
    { label: '+5 to -5', val: [2, 3, 4, 5, 6, 7, 6, 5, 4, 3, 2]}
    // { label: '+6 to -6', val: '13'},
    // { label: '+7 to -7', val: '15'}
]

export const GridDefaults = [

]

export default KurtOptions;