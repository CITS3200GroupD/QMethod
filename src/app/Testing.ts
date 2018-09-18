import { Survey } from './Survey';

export const TestingRegister = [
  'Age', 'Gender', 'Nationality', 'Main Language', 'Secondary Languages'
];

export const TestingQuestionnaire = [
  'a', 'Question 1', 'Question 2', 'Question 3', 'Question 4', 'Question 5'
];

export const TestingStatements = [
  'I can see myself fostering understanding between Australia and yyy',
  'I can see myself enjoying recreational activities with yyy people',
  'I can see myself speaking yyy better than many other Australians',
  'I can see myself studying in yyy',
  'I can see myself taking the WACE exam in yyy',
  'I can see myself as a more knowledgeable person',
  'I can see myself able to better understand people from any other culture',
  'I can see myself fostering understanding between Australia and yyy 2',
  'I can see myself enjoying recreational activities with yyy people 2',
  'I can see myself speaking yyy better than many other Australians 2',
  'I can see myself studying in yyy 2',
  'I can see myself taking the WACE exam in yyy 2',
  'I can see myself as a more knowledgeable person 2',
  'I can see myself able to better understand people from any other culture 2',
  'I can see myself fostering understanding between Australia and yyy 3',
  'I can see myself enjoying recreational activities with yyy people 3',
  'I can see myself speaking yyy better than many other Australians 3',
  'I can see myself studying in yyy 3',
  'I can see myself taking the WACE exam in yyy 3',
  'I can see myself as a more knowledgeable person 3',
  'I can see myself able to better understand people from any other culture 3',
  'I can see myself fostering understanding between Australia and yyy 4',
  'I can see myself enjoying recreational activities with yyy people 4',
  'I can see myself speaking yyy better than many other Australians 4',
  'I can see myself studying in yyy 4',
  'I can see myself taking the WACE exam in yyy 4',
  'I can see myself as a more knowledgeable person 4',
  'I can see myself able to better understand people from any other culture 4',
  'I can see myself fostering understanding between Australia and yyy 5',
  'I can see myself enjoying recreational activities with yyy people 5',
  'I can see myself speaking yyy better than many other Australians 5',
  'I can see myself studying in yyy 5',
  'I can see myself taking the WACE exam in yyy 5',
  'I can see myself as a more knowledgeable person 5',
  'I can see myself able to better understand people from any other culture 5'
];

export const ValidSurveyList: Survey[] = [
  {
    _id: '0131asfd3',
    publish: true,
    name: 'testing1',
    range:  7,
    cols: [2, 3, 4, 5, 4, 3, 2],
    register: TestingRegister,
    statements: [
      '', '', '', '', '', '', '', '', '', '',
      '', '', '', '', '', '', '', '', '', '',
      '', '', ''
    ],
    questionnaire: TestingQuestionnaire,
    users: [
      {
        _id: '12312asdfsdfa',
        progress: 0,
        register_ans: ['20', 'Male', 'Australia', 'Any Language', 'Any Languages'],
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
        ],
        questions_ans: ['', '', '', '', ''],
      },
      {
        _id: 'asdasdasdsad',
        progress: 0,
        register_ans: ['19', 'Female', 'Australia', 'English', 'French'],
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
        ],
        questions_ans: ['e', 'd', 'c', 'b', 'a'],
      }
    ]
  },
  {
    _id: '0234asd5',
    publish: true,
    name: 'testing2',
    range:  9,
    cols: [2, 3, 4, 5, 6, 5, 4, 3, 2],
    register: TestingRegister,
    statements:  [
      '', '', '', '', '', '', '', '', '', '',
      '', '', '', '', '', '', '', '', '', '',
      '', '', '', '', '', '', '', '', '', '',
      '', '', '', ''
    ],
    questionnaire: TestingQuestionnaire,
    users: []
  }
];


export const InvalidSurveyList: Survey[] = [{
  _id: '0131asfd3',
  publish: false,
  name: 'testing1',
  range:  7,
  cols: [3, 4, 5, 4, 3, 2],
  statements: ['string'],
  register: ['age', 'gender', 'Main Language'],
  questionnaire: ['Question 1', 'Question 2', 'Question 3', 'Question 4', 'Question 5'],
  users: []
},
{
  _id: '0234asd5',
  publish: true,
  name: 'testing2',
  range:  8,
  cols: [2, 3, 4, 5, 6, 5, 4, 3, 2],
  statements: ['string'],
  register: ['age', 'gender', 'Main Language'],
  questionnaire: ['Question 1', 'Question 2', 'Question 3', 'Question 4', 'Question 5'],
  users: []
}];

export const TempIntDisagree: number[] = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
export const TempIntNeutral: number[] = [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
export const TempIntAgree: number[] =  [32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42];
