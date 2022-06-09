import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsharpClassDetailsFormComponent } from './csharp-class-details-form.component';

describe('CsharpClassDetailsFormComponent', () => {
  let component: CsharpClassDetailsFormComponent;
  let fixture: ComponentFixture<CsharpClassDetailsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CsharpClassDetailsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CsharpClassDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
