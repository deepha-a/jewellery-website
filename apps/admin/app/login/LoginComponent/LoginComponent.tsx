import LoginPanel from "./LoginPanel";
import LoginForm from "./LoginForm";

export default function LoginComponent() {
  return (
    <div className="flex min-h-screen">
      <LoginPanel />
      <LoginForm />
    </div>
  );
}