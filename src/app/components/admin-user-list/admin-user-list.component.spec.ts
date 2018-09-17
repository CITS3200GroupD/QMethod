import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminUserListComponent, UserPipe} from './admin-user-list.component';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule  } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Ng2PaginationModule } from 'ng2-pagination';
import { Survey } from '../../Survey';
import { ValidSurveyList } from '../../Testing';
import { SurveyService } from '../../survey.service';
import { Observable, of } from 'rxjs';
import { WindowWrap } from '../../window-wrapper';

describe('AdminUserListComponent', () => {
  let component: AdminUserListComponent;
  let fixture: ComponentFixture<AdminUserListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminUserListComponent],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  // TODO: Unit Tests
  /*
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  */
});
