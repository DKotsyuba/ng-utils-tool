import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevtoolsPanelContainerComponent } from './devtools-panel-container.component';

describe('DevtoolsPanelContainerComponent', () => {
  let component: DevtoolsPanelContainerComponent;
  let fixture: ComponentFixture<DevtoolsPanelContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevtoolsPanelContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevtoolsPanelContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
