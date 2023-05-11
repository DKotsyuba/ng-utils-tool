import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {DataService} from "../../../../services/data.service";
import {SubscriptionDataHandlerService} from "../../../../services/subscription-data-handler.service";
import {defer} from "rxjs";

@Component({
  selector: 'app-devtools-view',
  templateUrl: './devtools-view.component.html',
  styleUrls: ['./devtools-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DevtoolsViewComponent implements OnInit {

  readonly subsData$ = defer(() => this.subscriptionDataHandlerService.data$)

  constructor(@Inject(DataService) public dataService: DataService,
              private subscriptionDataHandlerService: SubscriptionDataHandlerService) {
  }

  ngOnInit(): void {
    this.dataService.init()
  }
}
