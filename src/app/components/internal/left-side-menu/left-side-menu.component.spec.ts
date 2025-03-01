import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftSideMenuComponent } from './left-side-menu.component';

describe('LeftSideBarComponent', () => {
  let component: LeftSideMenuComponent;
  let fixture: ComponentFixture<LeftSideMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeftSideMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeftSideMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
