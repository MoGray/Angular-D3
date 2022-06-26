import { ComponentFixture, TestBed } from '@angular/core/testing';

import { D3WeatherHistogramComponent } from './d3-weather-histogram.component';

describe('D3WeatherHistogramComponent', () => {
  let component: D3WeatherHistogramComponent;
  let fixture: ComponentFixture<D3WeatherHistogramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ D3WeatherHistogramComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(D3WeatherHistogramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
