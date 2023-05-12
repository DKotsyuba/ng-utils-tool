import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {combineLatest, ReplaySubject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {map, switchMap, tap} from "rxjs/operators";
import {SourceMapLoaderService} from "../../../../services/source-map-loader.service";

export interface SourceMapData {
  url: URL
  line: number
}
@Component({
  selector: 'app-devtools-callstack-view',
  templateUrl: './devtools-callstack-view.component.html',
  styleUrls: ['./devtools-callstack-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DevtoolsCallstackViewComponent {

  readonly callStack$ = new ReplaySubject<[string, string][]>(1)

  @Input()
  set callStack(callStack: [string, string][] | string[][]) {
    if (!Array.isArray(callStack)) return;
    this.callStack$.next(callStack as any)
  }

  constructor(private sourceMap: SourceMapLoaderService) {
    this.callStack$.pipe(
      map(data => this.buildSourceMapData(data)),
      switchMap(data => combineLatest(data.map(d => this.sourceMap.getPosition(d.url.href, d.line))).pipe(
      ))
    ).subscribe()
  }

  onClick(item: [string, string]) {
    const rawUrl = item[1]
    const rawUrlSplit = rawUrl.split(':')
    const line = rawUrlSplit[rawUrlSplit.length - 2]
    const url = rawUrl.slice(0, rawUrl.indexOf(line) - 1)
    chrome.devtools.panels.openResource(url, +line, () => {})
  }

  private buildSourceMapData(rawData: [string, string][]): SourceMapData[] {
    return rawData.map(item => this.buildSourceMap(item))
  }

  private buildSourceMap(rawData: [string, string]): SourceMapData {
    const rawUrl = rawData[1]
    const rawUrlSplit = rawUrl.split(':')
    const line = rawUrlSplit[rawUrlSplit.length - 2]
    const url = new URL(rawUrl.slice(0, rawUrl.indexOf(line) - 1))
    return {
      line: +line,
      url
    }
  }
}
