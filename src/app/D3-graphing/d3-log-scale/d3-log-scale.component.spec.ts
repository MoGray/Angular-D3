import { ComponentFixture, TestBed } from '@angular/core/testing';

import { D3LogScaleComponent } from './d3-log-scale.component';

describe('D3LogScaleComponent', () => {
  let component: D3LogScaleComponent;
  let fixture: ComponentFixture<D3LogScaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ D3LogScaleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(D3LogScaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
