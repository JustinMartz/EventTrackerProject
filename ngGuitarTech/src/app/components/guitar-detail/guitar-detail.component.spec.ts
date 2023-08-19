import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuitarDetailComponent } from './guitar-detail.component';

describe('GuitarDetailComponent', () => {
  let component: GuitarDetailComponent;
  let fixture: ComponentFixture<GuitarDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GuitarDetailComponent]
    });
    fixture = TestBed.createComponent(GuitarDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
