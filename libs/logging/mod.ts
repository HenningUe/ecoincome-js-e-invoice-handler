import { ConsoleTransport, LogLayer } from "loglayer"
import { LogFileRotationTransport } from "@loglayer/transport-log-file-rotation"
import { serializeError } from "serialize-error"

const log = new LogLayer({
  errorSerializer: serializeError,
  transport: [
    new LogFileRotationTransport({
      filename: "./logs/app.log",
    }),
    new ConsoleTransport({}),
  ],
})

export default log

/*
// Basic logging
log.info('Hello world!')

// Logging with metadata
log.withMetadata({ user: 'john' }).info('User logged in')

// Logging with context (persists across log calls)
log.withContext({ requestId: '123' })
log.info('Processing request') // Will include requestId

// Logging errors
log.withError(new Error('Something went wrong')).error('Failed to process request')
*/
