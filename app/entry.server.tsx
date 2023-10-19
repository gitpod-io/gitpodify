
import { createReadableStreamFromReadable } from "@remix-run/node";
import { renderToPipeableStream } from "react-dom/server";
import type { EntryContext } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import { PassThrough } from "node:stream";

const ABORT_DELAY = 5_000;

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      <RemixServer
        context={remixContext}
        url={request.url}
        abortDelay={ABORT_DELAY}
      />,
      {
        onShellReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);

          responseHeaders.set("Content-Type", "text/html");

          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode,
            })
          );

          pipe(body);
        },
        onShellError(error: unknown) {
          reject(error);
        },
        onError(error: unknown) {
          responseStatusCode = 500;
          // Log streaming rendering errors from inside the shell.  Don't log
          // errors encountered during initial shell rendering since they'll
          // reject and get logged in handleDocumentRequest.
          if (shellRendered) {
            console.error(error);
          }
        },
      }
    );

    setTimeout(abort, ABORT_DELAY);
  });
}


// export default function handleRequest(
//   request: Request,
//   responseStatusCode: number,
//   responseHeaders: Headers,
//   remixContext: EntryContext
// ) {
//   const markup = renderToString(
//     <RemixServer context={remixContext} url={request.url} />
//   );

//   responseHeaders.set("Content-Type", "text/html");

//   return new Response("<!DOCTYPE html>" + markup, {
//     status: responseStatusCode,
//     headers: responseHeaders,
//   });
// }
