import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {CallData} from "../../../../../../../shared/actions";


export interface TableViewData {
  spaceName: string
  errorText: string
  totalSubscriptions: number
  activeSubscriptions: number
  complexity: number
}

@Component({
  selector: 'app-devtools-view-subscriptions',
  templateUrl: './devtools-view-subscriptions.component.html',
  styleUrls: ['./devtools-view-subscriptions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DevtoolsViewSubscriptionsComponent {

  @Input()
  set data(data: [string, CallData[]][]) {
    if (!Array.isArray(data)) return
    this.updateView(data)
  }
  innerData: [string, CallData[]][] = []
  tableData: [string, TableViewData[]][] = []
  expandSet = new Set<string>();
  nzWidthConfig = ['60px', 'auto', 'auto', 'auto']
  detailPath: string | null = null
  detailData: CallData[] | null = null
  onlyActive = false
  moreOneAction = false

  trackBy(_: number, data: [string, TableViewData[]]): string {
    return data[0]
  }

  trackByCallData(_: number, data: TableViewData): string {
    return data.errorText
  }

  onExpandChange(id: string, checked: boolean): void {
    if (checked) {
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
  }

  onShowDetails(data: TableViewData) {
    this.detailPath = [data.spaceName, data.errorText].join('|')
    this.updateDetail()
  }

  onCloseDetails() {
    this.detailData = null
    this.detailPath = null
  }

  onChangeOnlyActive(state: boolean) {
    this.onlyActive = state
    this.updateView(this.innerData)
  }

  onChangeMoreOneActive(state: boolean) {
    this.moreOneAction = state
    this.updateView(this.innerData)
  }

  private updateView(data: [string, CallData[]][]) {
    this.innerData = data
    this.updateTable();
    this.updateDetail()
  }

  private updateTable() {
    const data = this.innerData
    const map = new Map<string, TableViewData[]>()
    for (let i = 0; i < data.length; i++) {
      const item = data[i]
      let callDataArray = item[1]
      if (this.onlyActive) {
        callDataArray = callDataArray.filter(d => !d.isComplete)
        if (callDataArray.length === 0) continue;
      }
      if (this.moreOneAction) {
        if (callDataArray.length === 1) continue;
      }
      const [name] = item[0].split('|')
      if (!map.has(name)) map.set(name, [])
      map.get(name).push(...this.buildTableViewData(callDataArray))
    }
    this.tableData = Array.from(map)
  }

  private updateDetail() {
    let data = this.innerData.find(d => d[0] === this.detailPath)
    if (!data) return;
    if (this.onlyActive && data.length > 0) {
      data = [data[0], data[1].filter(d => !d.isComplete)]
    }
    this.detailData = data[1].reverse()
  }

  private buildTableViewData(data: CallData[]): TableViewData[] {
    const map = new Map<string, TableViewData>()
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      if (!map.has(item.errorText)) map.set(item.errorText, {
        errorText: item.errorText,
        spaceName: item.spaceName,
        activeSubscriptions: 0,
        totalSubscriptions: 0,
        complexity: item.complexity
      })
      const state = map.get(item.errorText)
      state.totalSubscriptions++
      if (!item.isComplete) state.activeSubscriptions++
    }
    return Array.from(map.values());
  }
}
