import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevtoolsViewSubscriptionsComponent } from './devtools-view-subscriptions.component';

describe('DevtoolsViewSubscriptionsComponent', () => {
  let component: DevtoolsViewSubscriptionsComponent;
  let fixture: ComponentFixture<DevtoolsViewSubscriptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevtoolsViewSubscriptionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevtoolsViewSubscriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
