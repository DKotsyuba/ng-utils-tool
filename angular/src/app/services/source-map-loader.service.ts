import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
// import {RawSourceMap, SourceMapConsumer} from 'source-map'
import {from, Observable, of} from "rxjs";
import {map, shareReplay, switchMap, tap} from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class SourceMapLoaderService {
  // private storage = new Map<string, SourceMapConsumer>()
  // private storageLoading = new Map<string, Observable<SourceMapConsumer>>()

  constructor(private http: HttpClient) {
  }

  // load(path: string): Observable<SourceMapConsumer> {
  //   // if (this.storage.has(path)) return of(this.storage.get(path))
  //   // if (this.storageLoading.has(path)) return this.storageLoading.get(path)
  //   // const loader = this.http.get<string>(path, {responseType: 'text' as any}).pipe(
  //   //   map((data: string) => this.getSourceMapPath(path, data)),
  //   //   switchMap(file => this.http.get<RawSourceMap>(file)),
  //   //   switchMap(data => from(new SourceMapConsumer(data, null))),
  //   //   tap({
  //   //     next: (data: any) => {
  //   //       this.storage.set(path, data)
  //   //       this.storageLoading.delete(path)
  //   //     },
  //   //     error: () => this.storageLoading.delete(path)
  //   //   }),
  //   //   shareReplay({refCount: true, bufferSize: 1})
  //   // ) as any;
  //   // this.storageLoading.set(path, loader)
  //   // return loader;
  // }

  getPosition(path: string, line: number) {
    // return this.load(path).pipe(
    //   map(consumer => consumer.originalPositionFor({ line, column: 0 }))
    // )
  }

  private getSourceMapPath(path: string, data: string) {
    const r = /(sourceMappingURL\=)([^\/]+)(?=\.(js.map)$)/
    const url = new URL(path)
    const res = data.match(r)
    const fileName = [res[2], res[3]].join('.')
    return [url.origin, fileName].join('/')
  }

}
