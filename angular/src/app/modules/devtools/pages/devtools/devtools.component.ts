import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-devtools',
  templateUrl: './devtools.component.html',
  styleUrls: ['./devtools.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DevtoolsComponent {

  constructor() {
    chrome.devtools.panels.create(
      'Ng utils tool',
      '',
      'index.html?#/devtools/panel',
      function () {}
    );
  }

}
