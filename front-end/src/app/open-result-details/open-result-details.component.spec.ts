import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenResultDetailsComponent } from './open-result-details.component';

describe('OpenResultDetailsComponent', () => {
  let component: OpenResultDetailsComponent;
  let fixture: ComponentFixture<OpenResultDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenResultDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpenResultDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
