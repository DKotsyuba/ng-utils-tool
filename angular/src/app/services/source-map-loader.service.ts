import {Injectable} from "@angular/core";
import {DataService} from "./data.service";

@Injectable()
export class SourceMapLoaderService {
  // private storage = new Map<string, SourceMapConsumer>()
  // private storageLoading = new Map<string, Observable<SourceMapConsumer>>()

  constructor(private data: DataService) {
  }

  getPosition(path: string, line: number) {
    // return this.data.send(loadSourceMap([path, line])).pipe(
    //   tap(re => { debugger })
    // )
    // return this.load(path).pipe(
    //   map(consumer => consumer.originalPositionFor({ line, column: 0 }))
    // )
  }

}
