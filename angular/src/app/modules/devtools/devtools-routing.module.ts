import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DevtoolsComponent} from "./pages/devtools/devtools.component";
import {DevtoolsPanelContainerComponent} from "./pages/devtools-panel-container/devtools-panel-container.component";
import {DevtoolsViewComponent} from "./components/devtools-view/devtools-view.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: DevtoolsComponent
  },
  {
    path: 'panel',
    pathMatch: 'full',
    component: DevtoolsPanelContainerComponent,
    children: [
      {
        path: '',
        component: DevtoolsViewComponent
      }
    ]
  },
  {
    path: 'popup',
    pathMatch: 'full',
    component: DevtoolsPanelContainerComponent,
    children: [
      {
        path: '',
        component: DevtoolsViewComponent
      }
    ]
  },
  {
    path: 'options',
    pathMatch: 'full',
    component: DevtoolsPanelContainerComponent,
    children: [
      {
        path: '',
        component: DevtoolsViewComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DevtoolsRoutingModule { }
