import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevtoolsViewSubscriptionDetailComponent } from './devtools-view-subscription-detail.component';

describe('DevtoolsViewSubscriptionDetailComponent', () => {
  let component: DevtoolsViewSubscriptionDetailComponent;
  let fixture: ComponentFixture<DevtoolsViewSubscriptionDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevtoolsViewSubscriptionDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevtoolsViewSubscriptionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
