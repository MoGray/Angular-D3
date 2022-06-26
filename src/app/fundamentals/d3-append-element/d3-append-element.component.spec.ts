import { ComponentFixture, TestBed } from '@angular/core/testing';

import { D3AppendElementComponent } from './d3-append-element.component';

describe('D3AppendElementComponent', () => {
  let component: D3AppendElementComponent;
  let fixture: ComponentFixture<D3AppendElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ D3AppendElementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(D3AppendElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
