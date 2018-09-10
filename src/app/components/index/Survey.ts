export interface Survey {
    id: Number;
    publish: Boolean;
    survey_name: String;
    survey_kurt: Number;
}

const KurtOptions = [
    { label: '+3 to -3', val: '7'},
    { label: '+4 to -4', val: '9'},
    { label: '+5 to -5', val: '11'},
    { label: '+6 to -6', val: '13'},
    { label: '+7 to -7', val: '15'}
];

export default KurtOptions;
