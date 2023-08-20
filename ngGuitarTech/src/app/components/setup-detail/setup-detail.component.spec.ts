import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupDetailComponent } from './setup-detail.component';

describe('SetupDetailComponent', () => {
  let component: SetupDetailComponent;
  let fixture: ComponentFixture<SetupDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SetupDetailComponent]
    });
    fixture = TestBed.createComponent(SetupDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
