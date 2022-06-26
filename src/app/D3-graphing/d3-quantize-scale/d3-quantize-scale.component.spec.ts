import { ComponentFixture, TestBed } from '@angular/core/testing';

import { D3QuantizeScaleComponent } from './d3-quantize-scale.component';

describe('D3QuantizeScaleComponent', () => {
  let component: D3QuantizeScaleComponent;
  let fixture: ComponentFixture<D3QuantizeScaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ D3QuantizeScaleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(D3QuantizeScaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
