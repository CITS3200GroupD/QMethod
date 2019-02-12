import * as Settings from '../../config/Settings';

// WIP these have to be adjusted too

export interface SurveyInput {
    // ID is generated by mongoDB for inputs
    publish: boolean;
    name: string;
    range: number;
    cols: number[];
    register: string[];
    statements: string[];
    questionnaire: string[];
    users: User[];

    // questionnaire_type: number[];
    // instructions: string[];
}

export interface Survey {
    _id: string;
    publish: boolean;
    name: string;
    range: number;
    cols: number[];
    register: string[];
    statements: string[];
    questionnaire: string[];
    users: User[];
    // questionnaire_type: number[];
    // instructions: string[];
}

export interface User {
    _id: string;
    register_ans: string[];
    progress: number;
    question_ans: string[];
    sort_agree: number[];
    sort_neutral: number[];
    sort_disagree: number[];
    matrix: number[][];
}
export interface Admin {
  username: string;
  password: string;
}

export const GridTemplates = [
    { label: '+3 to -3', val: '7', default_cols: [2, 3, 4, 5, 4, 3, 2], max_statements: 23 },
    { label: '+4 to -4', val: '9', default_cols: [2, 3, 4, 5, 6, 5, 4, 3, 2], max_statements: 34 },
    { label: '+5 to -5', val: '11', default_cols: [2, 3, 4, 5, 6, 7, 6, 5, 4, 3, 2], max_statements: 47}
];

let default_template = 0;
for (let index = 0; index < GridTemplates.length; index++) {
    const value = GridTemplates[index].val;
    if (Number(value) === Settings.DEFAULT_RANGE) {
        default_template = index;
    }
}
export const DefaultAdmin: Admin = {
  username: 'admin',
  password: 'password'
};

export const BlankSurvey: Survey = {
    _id: 'BLANK_SURVEY',
    publish: false,
    name: '',
    cols: GridTemplates[default_template].default_cols,
    range: Settings.DEFAULT_RANGE,
    register: [],
    statements: [],
    questionnaire: [],
    users: []
};
