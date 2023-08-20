import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGuitarComponent } from './create-guitar.component';

describe('CreateGuitarComponent', () => {
  let component: CreateGuitarComponent;
  let fixture: ComponentFixture<CreateGuitarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateGuitarComponent]
    });
    fixture = TestBed.createComponent(CreateGuitarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
