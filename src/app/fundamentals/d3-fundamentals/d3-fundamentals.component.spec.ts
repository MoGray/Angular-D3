import { ComponentFixture, TestBed } from '@angular/core/testing';

import { D3FundamentalsComponent } from './d3-fundamentals.component';

describe('D3FundamentalsComponent', () => {
  let component: D3FundamentalsComponent;
  let fixture: ComponentFixture<D3FundamentalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ D3FundamentalsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(D3FundamentalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
