import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule  } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { Ng2PaginationModule } from 'ng2-pagination';
import { AdminUserViewComponent } from './admin-user-view.component';
import { WindowWrap } from '../../window-wrapper';

describe('AdminUserViewComponent', () => {
  let component: AdminUserViewComponent;
  let fixture: ComponentFixture<AdminUserViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminUserViewComponent ],
      imports: [ RouterTestingModule,
                HttpClientModule,
                RouterTestingModule,
                Ng2PaginationModule,
                FormsModule
              ],
      providers: [ WindowWrap ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUserViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
