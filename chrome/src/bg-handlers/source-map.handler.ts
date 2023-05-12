import {RawSourceMap, SourceMapConsumer} from "source-map";
(SourceMapConsumer as any).initialize({
  "lib/mappings.wasm": "/assets/mappings.wasm"
});

interface SourceMapStoreItem {
  loader: Promise<RawSourceMap>;
  isLoaded: boolean;
  rawSourceMap: RawSourceMap | null;
}

const sourceMapStorage = new Map<string, SourceMapStoreItem>();

export async function sourceMapHandler([path, line]: [string, number]) {
  const rawSourceMap = await load(path);
  if (rawSourceMap === null) return null;
  const consumer = await new SourceMapConsumer(rawSourceMap);
  return consumer.originalPositionFor({ line, column: 0 });
}

async function load(path: string): Promise<RawSourceMap> {
  if (sourceMapStorage.has(path)) {
    const item = sourceMapStorage.get(path);
    if (item.isLoaded) {
      return item.rawSourceMap;
    } else {
      return await item.loader;
    }
  }
  const loader: Promise<RawSourceMap> = fetch(path)
    .then(res => res.text())
    .then(file => getSourceMapPath(path, file))
    .then(sourceMapPath => fetch(sourceMapPath))
    .then(res => res.json())
    .then(sourceMap => {
      const item = sourceMapStorage.get(path) ?? {} as SourceMapStoreItem;
      item.isLoaded = true;
      item.rawSourceMap = sourceMap;
      sourceMapStorage.set(path, item);
      return sourceMap;
    })
    .catch((e) => {
      console.error(e);
      sourceMapStorage.delete(path)
      return null;
    })

  sourceMapStorage.set(path, {
    loader,
    isLoaded: false,
    rawSourceMap: null,
  })
}

function getSourceMapPath(path: string, data: string) {
  const r = /(sourceMappingURL\=)([^\/]+)(?=\.(js.map)$)/
  const url = new URL(path)
  const res = data.match(r)
  const fileName = [res[2], res[3]].join('.')
  return [url.origin, fileName].join('/')
}
