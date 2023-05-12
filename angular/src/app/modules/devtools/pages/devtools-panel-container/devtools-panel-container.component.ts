import {ChangeDetectionStrategy, Component} from '@angular/core';
import {DataService} from "../../../../services/data.service";
import {SourceMapLoaderService} from "../../../../services/source-map-loader.service";

@Component({
  selector: 'app-devtools-panel-container',
  templateUrl: './devtools-panel-container.component.html',
  styleUrls: ['./devtools-panel-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    DataService,
    SourceMapLoaderService
  ]
})
export class DevtoolsPanelContainerComponent {

}
