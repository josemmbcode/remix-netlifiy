import styles from "~/styles/auth.css";
import AuthForm from "~/components/auth/AuthForm";
import { validateCredentials } from "~/data/validation.server";
import { login, signup } from "~/data/auth.server";
export default function AuthPage() {
  return <AuthForm />;
}

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export async function action({ request }) {
  const searchParams = new URL(request.url).searchParams;
  const authMode = searchParams.get("mode") || "login";
  const formData = await request.formData();
  const credentials = Object.fromEntries(formData);

  try {
    validateCredentials(credentials);
  } catch (error) {
    return error;
  }
  try {
    if (authMode === "login") {
      console.log("login running");
      return await login(credentials);
    } else {
      console.log("signup running");
      return await signup(credentials);
    }
  } catch (error) {
    if (error.status === 422) {
      return { credentials: error.message };
    }
  }
}

export function headers({ parentHeaders }) {
  return {
    "Cache-Control": parentHeaders.get("Cache-Control"),
  };
}