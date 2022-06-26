import { ComponentFixture, TestBed } from '@angular/core/testing';

import { D3QuantileScaleComponent } from './d3-quantile-scale.component';

describe('D3QuantileScaleComponent', () => {
  let component: D3QuantileScaleComponent;
  let fixture: ComponentFixture<D3QuantileScaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ D3QuantileScaleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(D3QuantileScaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
