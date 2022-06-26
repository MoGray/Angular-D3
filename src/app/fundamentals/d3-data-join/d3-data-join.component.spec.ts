import { ComponentFixture, TestBed } from '@angular/core/testing';

import { D3DataJoinComponent } from './d3-data-join.component';

describe('D3DataJoinComponent', () => {
  let component: D3DataJoinComponent;
  let fixture: ComponentFixture<D3DataJoinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ D3DataJoinComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(D3DataJoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
