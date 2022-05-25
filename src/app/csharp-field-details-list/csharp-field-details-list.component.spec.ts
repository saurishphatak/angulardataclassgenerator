import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsharpFieldDetailsListComponent } from './csharp-field-details-list.component';

describe('CsharpFieldDetailsListComponent', () => {
  let component: CsharpFieldDetailsListComponent;
  let fixture: ComponentFixture<CsharpFieldDetailsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CsharpFieldDetailsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CsharpFieldDetailsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
