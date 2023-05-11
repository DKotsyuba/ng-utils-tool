import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {CallData} from "../../../../../../../shared/actions";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-devtools-view-subscription-detail',
  templateUrl: './devtools-view-subscription-detail.component.html',
  styleUrls: ['./devtools-view-subscription-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('enter', [
      transition(':enter', [
        style({backgroundColor: 'var(--bg-2)'}),
        animate('800ms ease-in-out', style({backgroundColor: ''}))
      ])
    ])
  ]
})
export class DevtoolsViewSubscriptionDetailComponent {

  @Input() data: CallData[] = []

  @Output() back = new EventEmitter()

  trackBy(_: number, data: CallData) {
    return data.spaceName + data.errorText + data.timestamp
  }

}
