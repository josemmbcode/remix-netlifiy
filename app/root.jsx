const {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} = require("@remix-run/react");

import { Link, useCatch, useMatches } from "@remix-run/react";
import Error from "./components/util/Error";
import styles from "~/styles/shared.css";
export const meta = () => ({
  charset: "utf-8",
  title: "RemixExpenses",
  viewport: "width=device-width,initial-scale=1",
});

function Document({ title, children }) {
  const matches = useMatches();
  const disableJS = matches.some((match) => match.handle?.disableJS);

  return (
    <html lang="en">
      <head>
        {title && <title>{title}</title>}
        <Meta />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        {!disableJS && <Scripts />}
        <LiveReload />
      </body>
    </html>
  );
}
export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  );
}

export function CatchBoundary() {
  const caughtResponse = useCatch();

  return (
    <Document title={caughtResponse.statusText}>
      <main>
        <Error title={caughtResponse.statusText}>
          <p>
            {caughtResponse.data?.message ||
              "Something wnet wrong, please try again."}
          </p>
          <p>
            Back to <Link to="/">Safety</Link>
          </p>
        </Error>
      </main>
    </Document>
  );
}

export function ErrorBoundary({ error }) {
  return (
    <Document title="An error occurred">
      <main>
        <Error title="An error occurred">
          <p>{error.message || "Something wnet wrong, please try again."}</p>
          <p>
            Back to <Link to="/">Safety</Link>
          </p>
        </Error>
      </main>
    </Document>
  );
}
export function links() {
  return [{ rel: "stylesheet", href: styles }];
}
