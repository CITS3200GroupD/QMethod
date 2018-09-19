import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminUserListComponent, UserPipe} from './admin-user-list.component';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule  } from '@angular/router/testing';
import { ValidSurveyList, MockWindowWrap, ValidUserList } from '../../testing/Testing';
import { MockUserService } from '../../testing/mockuser.service';
import { HttpClientModule } from '@angular/common/http';
import { Ng2PaginationModule } from 'ng2-pagination';
import { WindowWrap } from '../../window-wrapper';
import * as Settings from '../../../../config/Settings';

describe('AdminUserListComponent', () => {
  let component: AdminUserListComponent;
  let fixture: ComponentFixture<AdminUserListComponent>;
  const valid_survey_list = ValidSurveyList;
  const valid_user_list = ValidUserList;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminUserListComponent, UserPipe ],
      imports: [ RouterTestingModule,
                HttpClientModule,
                RouterTestingModule,
                Ng2PaginationModule,
                FormsModule
              ],
      providers: [ AdminUserListComponent,
        {provide: WindowWrap, useClass: MockWindowWrap},
        {provide: MockUserService, useClass: MockUserService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('check params', () => {
    expect(component.page).toBe(undefined);
    expect(component.user_filter).toBe(undefined);
    expect(component.survey_id).toBe(undefined);
    expect(component.users).toBe(valid_user_list);
    expect(component.PAGINATE_TABLES).toBe(Settings.PAGINATE_TABLES);
  });

  it('delete User', () => {
    component.deleteUser(valid_user_list[0]._id);
  });
});
