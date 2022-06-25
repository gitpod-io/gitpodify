import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

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

          <p className="mx-auto mb-1 max-w-3xl text-sm text-gray-700 lg:max-w-4xl">
            HTML
          </p>
          <div className="mb-4 py-2" style={{ backgroundColor: "#f9f9f9" }}>
            <pre className="mx-auto max-w-3xl overflow-x-scroll pb-4 lg:max-w-4xl">
              {`<a href="${gitpodifiedUrl}" target="_blank" rel="noreferrer nofollow">\n  Open in Gitpod\n</a>`}
            </pre>
          </div>

          <p className="mx-auto mb-1 max-w-3xl text-sm  text-gray-700 lg:max-w-4xl">
            Markdown
          </p>
          <div className="mb-4  py-2" style={{ backgroundColor: "#f9f9f9" }}>
            <pre className="mx-auto max-w-3xl overflow-x-scroll  pb-4  lg:max-w-4xl">
              {`[Open in Gitpod](${gitpodifiedUrl})`}
            </pre>
          </div>

          <h2 className="mx-auto mt-8 mb-4 max-w-3xl text-4xl font-bold text-gray-800 lg:max-w-4xl">
            Buttons
          </h2>

          <div className="mx-auto mb-4 max-w-3xl lg:max-w-4xl">
            <a
              href={gitpodifiedUrl}
              target="_blank"
              rel="noreferrer nofollow"
              className="rounded-2xl"
            >
              <img
                alt="Open in Gitpod"
                width="200"
                height="56"
                src="https://gitpod.io/button/open-in-gitpod.svg"
              />
            </a>
          </div>

          <p className="mx-auto mb-1 max-w-3xl text-sm text-gray-700 lg:max-w-4xl">
            HTML
          </p>
          <div className="mb-4 py-2" style={{ backgroundColor: "#f9f9f9" }}>
            <pre className="mx-auto max-w-3xl overflow-x-scroll  pb-4  lg:max-w-4xl">
              {`<a href="${gitpodifiedUrl}" target="_blank" rel="noreferrer nofollow"> \n  <img\n    alt="Open in Gitpod"\n    width="200"\n    height="56"\n    src="https://gitpod.io/button/open-in-gitpod.svg"\n  />\n</a>`}
            </pre>
          </div>

          <p className="mx-auto mb-1 max-w-3xl  text-sm text-gray-700 lg:max-w-4xl">
            Markdown
          </p>
          <div className="mb-4  py-2" style={{ backgroundColor: "#f9f9f9" }}>
            <pre className="mx-auto max-w-3xl overflow-x-scroll  pb-4  lg:max-w-4xl">
              {`[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](${gitpodifiedUrl})`}
            </pre>
          </div>
        </div>
      ) : (
        <div className="py-32" />
      )}
      <footer className="py-4 text-center">
        Made with ❤️ by{" "}
        <a
          href="https://twitter.com/intent/follow?screen_name=jacobmparis"
          target="_blank"
          rel="noreferrer nofollow"
          className=" text-sky-600 underline hover:text-sky-500"
        >
          Jacob Paris
        </a>
      </footer>
    </main>
  );
}
