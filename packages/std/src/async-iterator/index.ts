// TODO: remove or deprecate once widely supported by runtimes
// Read more from this: https://caniuse.com/mdn-api_readablestream_--asynciterator
export async function* readableStreamToAsyncIterator<T>(res: ReadableStream<T>): AsyncGenerator<T, void, unknown> {
  // react js - TS2504: Type 'ReadableStream<Uint8Array>' must have a '[Symbol.asyncIterator]()' method that returns an async iterator - Stack Overflow
  // https://stackoverflow.com/questions/76700924/ts2504-type-readablestreamuint8array-must-have-a-symbol-asynciterator
  const reader = res.getReader()
  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) {
        return
      }

      yield value
    }
  }
  finally {
    reader.releaseLock()
  }
}
