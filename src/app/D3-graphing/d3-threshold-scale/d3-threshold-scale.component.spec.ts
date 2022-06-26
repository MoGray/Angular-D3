import { ComponentFixture, TestBed } from '@angular/core/testing';

import { D3ThresholdScaleComponent } from './d3-threshold-scale.component';

describe('D3ThresholdScaleComponent', () => {
  let component: D3ThresholdScaleComponent;
  let fixture: ComponentFixture<D3ThresholdScaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ D3ThresholdScaleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(D3ThresholdScaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
