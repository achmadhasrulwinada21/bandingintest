import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigateTopComponent } from './navigate-top.component';

describe('NavigateTopComponent', () => {
  let component: NavigateTopComponent;
  let fixture: ComponentFixture<NavigateTopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavigateTopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigateTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
