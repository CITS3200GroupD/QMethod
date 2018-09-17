import { Survey } from './Survey';

export const ValidSurveyList: Survey[] = [
    {
      _id: '0131asfd3',
      publish: true,
      name: 'testing1',
      range:  7,
      cols: [2, 3, 4, 5, 4, 3, 2],
      statements: [
        '', '', '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '', '', '',
        '', '', ''
      ],
      users: [
        {
          _id: '12312asdfsdfa',
          register: {
            age: '20',
            gender: 'Male',
            main_lang: 'Any Language',
            other_lang: 'Any Languages'
          },
          progress: 0,
          questions_ans: ['', '', '', '', ''],
          sort_agree: [0, 1, 2, 3, 4, 5, 6, 7, 8],
          sort_neutral: [9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
          sort_disagree: [19, 20, 21, 22],
          matrix: [
            [0, 1],
            [1, 2, 3],
            [4, 5, 6, 7],
            [8, 9, 10, 11, 12],
            [13, 14, 15, 16],
            [17, 18, 19],
            [21, 22]
          ]
        },
        {
          _id: 'asdasdasdsad',
          register: {
            age: '19',
            gender: 'Female',
            main_lang: 'English',
            other_lang: 'French'
          },
          progress: 0,
          questions_ans: ['e', 'd', 'c', 'b', 'a'],
          sort_agree: [0, 1, 2, 3, 4, 5],
          sort_neutral: [6, 7, 8, 9, 10, 11, 12, 13, 14, 18],
          sort_disagree: [15, 16, 17, 19, 20, 21, 22],
          matrix: [
            [0, 1],
            [1, 2, 5],
            [4, 3, 6, 7],
            [8, 9, 15, 11, 12],
            [13, 14, 10, 16],
            [17, 22, 19],
            [21, 18]
          ]
        }
      ]
    },
    {
      _id: '0234asd5',
      publish: true,
      name: 'testing2',
      range:  9,
      cols: [2, 3, 4, 5, 6, 5, 4, 3, 2],
      statements:  [
        '', '', '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '', '', '',
        '', '', '', ''
      ],
      users: []
    }];


export const InvalidSurveyList: Survey[] = [
  {
    _id: '0131asfd3',
    publish: false,
    name: 'testing1',
    range:  7,
    cols: [3, 4, 5, 4, 3, 2],
    statements: ['string'],
    users: []
  },
  {
    _id: '0234asd5',
    publish: true,
    name: 'testing2',
    range:  8,
    cols: [2, 3, 4, 5, 6, 5, 4, 3, 2],
    statements: ['string'],
    users: []

  }];

export const TempIntDisagree: number[] = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
export const TempIntNeutral: number[] = [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
export const TempIntAgree: number[] =  [32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42];
