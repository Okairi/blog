import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingBlackComponent } from './loading-black.component';

describe('LoadingBlackComponent', () => {
  let component: LoadingBlackComponent;
  let fixture: ComponentFixture<LoadingBlackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingBlackComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadingBlackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
