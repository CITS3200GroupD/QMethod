import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule  } from '@angular/router/testing';
import { EditStatementsComponent } from './edit-statements.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 

describe('EditStatementsComponent', () => {
  let component: EditStatementsComponent;
  let fixture: ComponentFixture<EditStatementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditStatementsComponent ],
      imports: [ RouterTestingModule, FormsModule, ReactiveFormsModule, HttpClientModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditStatementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
