import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevtoolsCallstackViewComponent } from './devtools-callstack-view.component';

describe('DevtoolsCallstackViewComponent', () => {
  let component: DevtoolsCallstackViewComponent;
  let fixture: ComponentFixture<DevtoolsCallstackViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevtoolsCallstackViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevtoolsCallstackViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
