import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgPathComponent } from './svg-path.component';

describe('SvgPathComponent', () => {
  let component: SvgPathComponent;
  let fixture: ComponentFixture<SvgPathComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SvgPathComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SvgPathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
