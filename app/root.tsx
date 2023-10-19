import type { LinksFunction, MetaFunction } from "@remix-run/node";
import { cssBundleHref } from "@remix-run/css-bundle";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import styles from './app.css';

export const links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: styles },
    { rel: "icon", type: "image/x-icon", href: "/favicon192.png" },
  ];
};
export const meta: MetaFunction = () => ([
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
  {
  title: "Gitpodify",
}]);

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
