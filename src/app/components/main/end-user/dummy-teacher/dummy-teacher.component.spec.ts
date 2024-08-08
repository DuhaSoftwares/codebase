import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DummyTeacherComponent } from './dummy-teacher.component';

describe('DummyTeacherComponent', () => {
  let component: DummyTeacherComponent;
  let fixture: ComponentFixture<DummyTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DummyTeacherComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DummyTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
