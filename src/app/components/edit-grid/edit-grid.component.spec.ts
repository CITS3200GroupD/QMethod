import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GridTemplates } from '../../models';

import { EditGridComponent } from './edit-grid.component';

describe('EditGridComponent', () => {
  let component: EditGridComponent;
  let fixture: ComponentFixture<EditGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('check params', () => {
    expect(component.disabled).toBe(undefined);
    expect(component.grid).toBe(undefined);
    expect(component.max_grid).toBe(undefined);
    expect(component.offset).toBe(undefined);
    expect(component.max_rows).toBe(undefined);
    expect(component.grid_statements_count).toBe(undefined);
    expect(component.num_statements).toBe(undefined);
    expect(component['cols_templates']).toBe(GridTemplates);
    expect(typeof component.arr).toBe('function');

  });
});
