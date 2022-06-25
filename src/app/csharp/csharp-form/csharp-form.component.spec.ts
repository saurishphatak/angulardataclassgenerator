import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsharpFormComponent } from './csharp-form.component';

describe('CsharpFormComponent', () => {
  let component: CsharpFormComponent;
  let fixture: ComponentFixture<CsharpFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CsharpFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CsharpFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
