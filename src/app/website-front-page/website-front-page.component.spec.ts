import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsiteFrontPageComponent } from './website-front-page.component';

describe('WebsiteFrontPageComponent', () => {
  let component: WebsiteFrontPageComponent;
  let fixture: ComponentFixture<WebsiteFrontPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebsiteFrontPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebsiteFrontPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
