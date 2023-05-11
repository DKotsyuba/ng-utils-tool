import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DevtoolsRoutingModule } from './devtools-routing.module';
import { DevtoolsComponent } from './pages/devtools/devtools.component';
import { DevtoolsViewComponent } from './components/devtools-view/devtools-view.component';
import { DevtoolsPanelContainerComponent } from './pages/devtools-panel-container/devtools-panel-container.component';
import {NzTabsModule} from "ng-zorro-antd/tabs";
import { DevtoolsViewSubscriptionsComponent } from './components/devtools-view-subscriptions/devtools-view-subscriptions.component';
import {NzListModule} from "ng-zorro-antd/list";
import {NzCollapseModule} from "ng-zorro-antd/collapse";
import {NzTableModule} from "ng-zorro-antd/table";
import { BacklightPipe } from './pipes/backlight.pipe';
import { SumPipe } from './pipes/sum.pipe';
import { DevtoolsViewSubscriptionDetailComponent } from './components/devtools-view-subscription-detail/devtools-view-subscription-detail.component';
import {NzPageHeaderModule} from "ng-zorro-antd/page-header";
import {NzIconModule} from "ng-zorro-antd/icon";
import { DevtoolsCallstackViewComponent } from './components/devtools-callstack-view/devtools-callstack-view.component';


@NgModule({
  declarations: [
    DevtoolsComponent,
    DevtoolsViewComponent,
    DevtoolsPanelContainerComponent,
    DevtoolsViewSubscriptionsComponent,
    BacklightPipe,
    SumPipe,
    DevtoolsViewSubscriptionDetailComponent,
    DevtoolsCallstackViewComponent,
  ],
  imports: [
    CommonModule,
    DevtoolsRoutingModule,
    NzTabsModule,
    NzListModule,
    NzCollapseModule,
    NzTableModule,
    NzPageHeaderModule,
    NzIconModule,
  ]
})
export class DevtoolsModule { }
