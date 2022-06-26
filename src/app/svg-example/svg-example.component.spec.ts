import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgExampleComponent } from './svg-example.component';

describe('SvgExampleComponent', () => {
  let component: SvgExampleComponent;
  let fixture: ComponentFixture<SvgExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SvgExampleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SvgExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
