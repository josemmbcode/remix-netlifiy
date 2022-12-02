import { Outlet } from "@remix-run/react";
import MainHeader from "~/components/navigation/MainHeader";
import { getUserFromSession } from "~/data/auth.server";
import styles from "~/styles/marketing.css";
export default function MarketingLayout() {
  return (
    <>
      <MainHeader />
      <Outlet />;
    </>
  );
}

export function loader({ request }) {
  return getUserFromSession(request);
}

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export function meta() {
  return {
    title: "Remix Expenses - The Complete App",
    description: "Manage your expenses easily",
  };
}

export function headers() {
  return {
    "Cache-Control": "max-age=3600",
  };
}
