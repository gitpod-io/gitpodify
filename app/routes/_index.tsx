import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { ReactNode } from "react";
import useClipboard from "react-use-clipboard";
type LoaderData = {
  url: string | null;
};

export const loader: LoaderFunction = async ({ request }) => {
  const urlParam = new URL(request.url).searchParams.get("url");
  const normalizeUrl = await import("normalize-url");

  const url = urlParam
    ? normalizeUrl.default(urlParam, {
        forceHttps: true,
      })
    : null;

  return json<LoaderData>({
    url: url,
  });
};

const suggestions = [
  {
    name: "jacobparis/new",
    url: "https://github.com/jacobparis/new",
  },
  {
    name: "remix-run/indie-stack",
    url: "https://github.com/remix-run/indie-stack",
  },
];

export default function Index() {
  const { url } = useLoaderData<LoaderData>();
  const gitpodifiedUrl = `https://gitpod.io/#${url}`;

  return (
    <main className="px-2">
      <div className="flex flex-col items-center">
        <div className="py-4 lg:py-12" />
        <img src="/gitpod.svg" width="100" height="100" alt="Gitpod Logo" />

        <h1 className="text-7xl font-bold text-gray-900">Gitpodify</h1>
      </div>

      <form>
        <div className="grid grid-rows-1 place-items-center">
          <div className="space-y-4 py-4">
            <label htmlFor="url" className="block">
              Enter the URL to any GitHub, GitLab or Bitbucket repository,
              branch, or pull/merge request.
            </label>
            <ul className="mx-auto flex max-w-3xl flex-wrap space-x-4 text-sm lg:max-w-4xl">
              {suggestions.map((suggestion) => (
                <li key={suggestion.name}>
                  <a
                    href={`?url=${suggestion.url}`}
                    className="text-sky-600 underline hover:text-sky-500"
                  >
                    {suggestion.name}
                  </a>
                </li>
              ))}
            </ul>
            <input
              id="url"
              type="text"
              name="url"
              defaultValue={url || ""}
              className="w-full rounded-full border px-4 py-2 text-xl"
            />
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              className="rounded-xl bg-gray-200 px-4 py-2 hover:bg-gray-100"
            >
              Get Gitpodified Links
            </button>
          </div>
        </div>
      </form>

      {url ? (
        <div className="pb-32">
          <h2 className="mx-auto mt-8 mb-4 max-w-3xl text-4xl font-bold text-gray-800 lg:max-w-4xl">
            Links
          </h2>

          <div className="mx-auto mb-4 max-w-3xl lg:max-w-4xl">
            <a
              href={gitpodifiedUrl}
              target="_blank"
              rel="noreferrer nofollow"
              className=" text-sky-600 underline hover:text-sky-500"
            >
              {gitpodifiedUrl}
            </a>
          </div>

          <CodeDetails
            summary="HTML"
            code={`<a href="${gitpodifiedUrl}" target="_blank" rel="noreferrer nofollow">\n  Open in Gitpod\n</a>`}
          />

          <CodeDetails
            summary="Markdown"
            code={`[Open in Gitpod](${gitpodifiedUrl})`}
          />

          <h2 className="mx-auto mt-8 mb-4 max-w-3xl text-4xl font-bold text-gray-800 lg:max-w-4xl">
            Buttons
          </h2>

          <div className="mx-auto mb-4 max-w-3xl lg:max-w-4xl">
            <a
              href={gitpodifiedUrl}
              target="_blank"
              rel="noreferrer nofollow"
              // Rounded so the focus outline matches the image border
              className="rounded-2xl"
            >
              <img
                alt="Open in Gitpod"
                width="200"
                height="56"
                src="/open-in-gitpod.svg"
              />
            </a>
          </div>

          <CodeDetails
            summary="HTML"
            code={`<a href="${gitpodifiedUrl}" target="_blank" rel="noreferrer nofollow"> \n  <img\n    alt="Open in Gitpod"\n    width="200"\n    height="56"\n    src="https://gitpod.io/button/open-in-gitpod.svg"\n  />\n</a>`}
          />

          <CodeDetails
            summary="Markdown"
            code={`[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](${gitpodifiedUrl})`}
          />

          <h2 className="mx-auto mt-8 mb-4 max-w-3xl text-4xl font-bold text-gray-800 lg:max-w-4xl">
            Badges
          </h2>

          <div className="mx-auto mb-4 max-w-3xl lg:max-w-4xl">
            <a
              href={gitpodifiedUrl}
              target="_blank"
              rel="noreferrer nofollow"
              // Rounded so the focus outline matches the image border
              className="rounded"
            >
              <img
                alt="Contribute with Gitpod"
                width="200"
                height="56"
                src="/contribute-with-gitpod.svg"
              />
            </a>
          </div>

          <CodeDetails
            summary="HTML"
            code={`<a href="${gitpodifiedUrl}" target="_blank" rel="noreferrer nofollow"> \n  <img\n    alt="Contribute with Gitpod"\n    width="200"\n    height="56"\n    src="https://img.shields.io/badge/Contribute%20with-Gitpod-908a85?logo=gitpod"\n  />\n</a>`}
          />

          <CodeDetails
            summary="Markdown"
            code={`[![Contribute with Gitpod](https://img.shields.io/badge/Contribute%20with-Gitpod-908a85?logo=gitpod)](${gitpodifiedUrl})`}
          />

          <h2 className="mx-auto mt-8 mb-4 max-w-3xl text-4xl font-bold text-gray-800 lg:max-w-4xl">
            Configuration files
          </h2>

          <CodeDetails
            summary=".gitpod.yml"
            code={`
# Commands to start on workspace startup
tasks:
  - init: yarn install
    command: yarn build
# Ports to expose on workspace startup
ports:
  - port: 8000
    onOpen: open-preview
`}
          >
            <a
              className="text-sky-600 underline hover:text-sky-500"
              href="https://www.gitpod.io/docs/references/gitpod-yml"
            >
              Reference docs
            </a>
          </CodeDetails>
        </div>
      ) : (
        <div className="py-32" />
      )}
      <footer className="py-4 text-center">
        Made with ❤️ by{" "}
        <a
          href="https://twitter.com/intent/follow?screen_name=gitpod"
          target="_blank"
          rel="noreferrer nofollow"
          className=" text-sky-600 underline hover:text-sky-500"
        >
          Gitpod
        </a>
      </footer>
    </main>
  );
}

function CodeDetails({
  summary,
  code,
  children,
}: {
  summary: string;
  code: string;
  children?: ReactNode;
}) {
  return (
    <details>
      <summary className="mx-auto mb-1 max-w-3xl text-gray-800 lg:max-w-4xl">
        {summary}
      </summary>

      <div className="mx-auto flex max-w-3xl items-baseline gap-x-2 lg:max-w-4xl">
        {/* Including as a default for all of them */}
        <CopyToClipboard code={code} />

        {/* Any other items we want to show  */}
        {children}
      </div>

      <div className="mb-4 py-2" style={{ backgroundColor: "#f9f9f9" }}>
        <pre className="mx-auto max-w-3xl overflow-x-scroll pb-4 lg:max-w-4xl">
          {code}
        </pre>
      </div>
    </details>
  );
}

function CopyToClipboard({ code }: { code: string }) {
  const [isCopied, setCopied] = useClipboard(code, { successDuration: 1000 });

  return (
    <button
      onClick={setCopied}
      aria-label="Copy code to clipboard"
      className="p-1 transition-all duration-100 ease-in-out "
    >
      {/* A little extra padding on the button for a bigger-than-visual hit area  */}
      <div className="rounded-xl border px-3 py-2 hover:bg-gray-100">
        {isCopied ? (
          // prettier-ignore
          <span className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><g fill="none"><path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></g></svg>
          <span className="px-2">
          Copied to clipboard
            </span>
          </span>
        ) : (
          <span className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="12"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                fill="none"
                stroke="currentColor"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </g>
            </svg>
            <span className="px-2">Copy to clipboard</span>
          </span>
        )}
      </div>
    </button>
  );
}
