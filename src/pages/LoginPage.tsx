import { FormEvent, useState } from "react";
import { CalendarDays, LogIn } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [invalidCredentials, setInvalidCredentials] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setInvalidCredentials(false);
    setIsSubmitting(true);

    try {
      const profile = await loginUser(email.trim(), password);
      navigate(profile.role === "organizer" ? "/organizer/dashboard" : "/attendee/home");
    } catch {
      setInvalidCredentials(true);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="grid min-h-screen place-items-center bg-[radial-gradient(circle_at_50%_0%,rgba(67,230,164,0.16),transparent_28rem),#070A12] px-5 py-10 text-white">
      <section className="w-full max-w-md">
        <Link to="/" className="mx-auto mb-8 flex w-fit items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-mint text-ink">
            <CalendarDays size={22} />
          </span>
          <span className="text-xl font-bold">EventSphere</span>
        </Link>

        <form className="glass space-y-5 rounded-lg p-6" onSubmit={handleSubmit}>
          <div>
            <h1 className="text-3xl font-black">Login</h1>
            <p className="mt-2 text-sm text-slate-400">Welcome back. Continue to your EventSphere space.</p>
          </div>

          <label className="block space-y-2 text-sm font-semibold text-slate-200">
            <span>Email</span>
            <input className="field" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
          </label>

          <label className="block space-y-2 text-sm font-semibold text-slate-200">
            <span>Password</span>
            <input className="field" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
          </label>

          {invalidCredentials ? <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm font-semibold text-red-300">Invalid credentials. Please try again.</p> : null}

          <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-mint px-4 py-3 font-bold text-ink hover:bg-white disabled:cursor-not-allowed disabled:opacity-60" disabled={isSubmitting}>
            <LogIn size={18} />
            {isSubmitting ? "Checking..." : "Login"}
          </button>

          <p className="text-center text-sm text-slate-400">
            New here?{" "}
            <Link className="font-bold text-mint hover:text-white" to="/signup">
              Sign Up
            </Link>
          </p>
        </form>
      </section>
    </main>
  );
}
