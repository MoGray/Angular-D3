import { ComponentFixture, TestBed } from '@angular/core/testing';

import { D3SelectComponent } from './d3-select.component';

describe('D3SelectComponent', () => {
  let component: D3SelectComponent;
  let fixture: ComponentFixture<D3SelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ D3SelectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(D3SelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
