import { ComponentFixture, TestBed } from '@angular/core/testing';

import { D3AnimationsComponent } from './d3-animations.component';

describe('D3AnimationsComponent', () => {
  let component: D3AnimationsComponent;
  let fixture: ComponentFixture<D3AnimationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ D3AnimationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(D3AnimationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
