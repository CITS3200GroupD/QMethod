import { Survey, User } from 'src/app/models';
import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';

export const TestingRegister = [
  'Age', 'Gender', 'Nationality', 'Main Spoken Language', 'Other Languages'
];

export const TestingQuestionnaire = [
  'Question 1', 'Question 2', 'Question 3', 'Question 4', 'Question 5'
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

export const ValidUserList: User[] = [
  {
    _id: '5b214qassdf1ad',
    progress: 3,
    register_ans: ['20', 'Female', 'United States', 'English', 'Dutch'],
    sort_agree: [0, 1, 2, 3, 4],
    sort_neutral: [5, 6, 7, 8, 9, 10, 14, 15, 16, 17, 18],
    sort_disagree: [11, 12, 13, 19, 20, 21, 22],
    matrix: [
      [0, 1],
      [2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12, 13],
      [14, 15, 16, 17],
      [18, 19, 20],
      [21, 22]
    ],
    question_ans: ['1', '2', '3', '4', '5'],
  },
  {
    _id: '5b31AFGfddf1ad',
    progress: 3,
    register_ans: ['21', 'Male', 'New Zealand', 'English', 'None'],
    sort_agree: [0, 1, 2, 3, 4, 8],
    sort_neutral: [9, 10, 11, 12, 20, 21, 13, 14, 15, 16, 17, 18],
    sort_disagree: [19, 5, 6, 7, 22],
    matrix: [
      [0, 2],
      [1, 3, 4],
      [5, 10, 7, 8],
      [9, 6, 11, 12, 13],
      [15, 14, 16, 17],
      [19, 18, 22],
      [21, 20]
    ],
    question_ans: ['1a', '2', '3', '4', '5'],
  },
  {
    _id: '5b214poipl-l1ad',
    progress: 3,
    register_ans: ['20', 'Male', 'Australia', 'Any Language', 'Any Languages'],
    sort_agree: [0, 1,  5, 6, 7, 8],
    sort_neutral: [9, 10, 2, 3, 4, 11, 12, 13, 14, 17, 18],
    sort_disagree: [19, 20, 15, 16, 21, 22],
    matrix: [
      [21, 4],
      [2, 3, 1],
      [5, 6, 7, 13],
      [9, 10, 11, 12, 8],
      [14, 15, 16, 20],
      [18, 19, 17],
      [0, 22]
    ],
    question_ans: ['1a', '2a', '3', '4', '5'],
  },
  {
    _id: '589jpol8ssdf1ad',
    progress: 3,
    register_ans: ['26', 'Male', 'Australia', 'English', 'Chinese'],
    sort_agree: [0, 1, 2, 14, 15, 16, 5, 6, 7, 8],
    sort_neutral: [9, 12, 13, 17, 18],
    sort_disagree: [19, 20, 10, 11, 3, 4, 21, 22],
    matrix: [
      [22, 21],
      [2, 20, 4],
      [5, 6, 19, 8],
      [9, 16, 11, 12, 13],
      [14, 15, 10, 17],
      [18, 7, 3],
      [1, 0]
    ],
    question_ans: ['1a', '2a', '3a', '4', '5'],
  },
  {
    _id: '5b67n4gsdf1ad',
    progress: 3,
    register_ans: ['23', 'Male', 'Australia', 'English', 'Japanese'],
    sort_agree: [0, 1, 2, 3, 11, 12, 13, 6, 7, 8],
    sort_neutral: [9, 10, 16, 17, 18],
    sort_disagree: [19, 20, 14, 15, 4, 5, 21, 22],
    matrix: [
      [3, 1],
      [2, 19, 4],
      [5, 10, 11, 8],
      [9, 12, 6, 7, 13],
      [14, 15, 16, 17],
      [18, 0, 20],
      [22, 21]
    ],
    question_ans: ['1a', '2a', '3a', '4a', '5'],
  },
  {
    _id: '5b7hdsfgsf1ad',
    progress: 3,
    register_ans: ['23', 'Female', 'Australia', 'English', 'French'],
    sort_agree: [19, 20, 21, 17, 22],
    sort_neutral: [9, 10, 11, 3, 15, 12, 2, 7, 16, 4, 5, 6, 13, 14, 18],
    sort_disagree: [0, 1, 8],
    matrix: [
      [14, 15],
      [0, 7, 8],
      [3, 4, 5, 6],
      [9, 10, 11, 12, 13],
      [16, 17, 20, 21],
      [22, 19, 18],
      [1, 2]
    ],
    question_ans: ['1a', '2a', '3a', '4a', '5a'],
  },
  {
    _id: '5bg45hdbad',
    progress: 1,
    register_ans: ['25', 'Female', 'Australia', 'English', 'None'],
    sort_agree: [19, 20, 13, 14, 15, 21, 22],
    sort_neutral: [9, 10, 11, 12, 16, 17, 18],
    sort_disagree: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    matrix: [
      [0, 1],
      [2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12, 13],
      [14, 15, 16, 17],
      [18, 19, 20],
      [21, 22]
    ],
    question_ans: ['1b', '2a', '3a', '4a', '5a'],
  },
  {
    _id: '45hdfbdsad',
    progress: 3,
    register_ans: ['25', 'Male', 'Australia', 'English', 'None'],
    sort_agree: [19, 20, 13, 14, 15, 21, 22],
    sort_neutral: [9, 10, 11, 12,  16, 17, 18],
    sort_disagree: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    matrix: [
      [0, 21],
      [2, 4, 3],
      [20, 6, 7, 8],
      [13, 10, 11, 12, 17],
      [14, 15, 16, 9],
      [18, 19, 5],
      [1, 22]
    ],
    question_ans: ['1b', '2b', '3a', '4a', '5a'],
  },
  {
    _id: '5b6setsgsd1ad',
    progress: 3,
    register_ans: ['22', 'Male', 'China', 'Chinese', 'English'],
    sort_agree: [19, 20, 13, 14, 15, 21, 22],
    sort_neutral: [9, 10, 11, 12,  16, 17, 18],
    sort_disagree: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    matrix: [
      [0, 22],
      [2, 3, 17],
      [5, 15, 7, 8],
      [9, 18, 11, 12, 13],
      [14, 6, 16, 4],
      [19, 10, 20],
      [21, 1]
    ],
    question_ans: ['1b', '2b', '3b', '4b', '5a'],
  },
  {
    _id: '5s56tdgds1ad',
    progress: 3,
    register_ans: ['21', 'Male', 'Korea', 'Korean', 'English'],
    sort_agree: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    sort_neutral: [9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
    sort_disagree: [19, 20, 21, 22],
    matrix: [
      [21, 22],
      [4, 3, 2],
      [14, 15, 16, 17],
      [9, 10, 11, 12, 8],
      [5, 6, 7, 13],
      [18, 19, 20],
      [0, 1]
    ],
    question_ans: ['1b', '2b', '3b', '4b', '5b'],
  },
  {
    _id: '5s345asdfh3s1ad',
    progress: 1,
    register_ans: ['21', 'Male', 'Korea', 'English', 'French'],
    sort_agree: [],
    sort_neutral: [],
    sort_disagree: [],
    matrix: [],
    question_ans: []
  },
  {
    _id: '5s345aDdfh3s652s',
    progress: 2,
    register_ans: ['21', 'Male', 'Korea', 'English', 'French'],
    sort_agree: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    sort_neutral: [9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
    sort_disagree: [19, 20, 21, 22],
    matrix: [],
    question_ans: []
  }
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
      '1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
      '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
      '21', '22', '23'
    ],
    questionnaire: TestingQuestionnaire,
    users: ValidUserList
  },
  {
    _id: '0234asd5',
    publish: false,
    name: 'testing2',
    range:  9,
    cols: [2, 3, 4, 5, 6, 5, 4, 3, 2],
    register: TestingRegister,
    statements:  [
      '1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
      '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
      '21', '22', '23', '24', '25', '26', '27', '28', '29', '30',
      '31', '32', '33', '34'
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

export class MockWindowWrap {
  get nativeWindow(): MockWindowWrapInner {
    const inner = new MockWindowWrapInner;
    return inner;
  }
}

export class MockWindowWrapInner {
  confirm(): boolean {
    return true;
  }
}

export class MockCookieService {
  get(s) { return true; }
  put(s, token) { return true; }
  remove(s) { return true; }
}

export class MockAuthService {

  logged_in = true;
  redirect_url: string;

  constructor() {
  }

  /** Check Session ID (in cookie) vs Auth Server */

  logIn(): Observable<boolean> {
    return of(true).pipe(
      delay(250),
      tap(() => {
        this.logged_in = true;
      })
    );
  }

  logOut(): void {
    this.logged_in = false;
  }
}

export class BlankComponent {}
