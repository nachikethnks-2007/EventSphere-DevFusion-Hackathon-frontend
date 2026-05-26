import { FormEvent, useState } from "react";
import { CalendarDays, UserPlus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { signUpAttendee } from "../services/authService";

export function AttendeeSignupPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);
    try {
      await signUpAttendee(username.trim(), email.trim(), password);
      navigate("/attendee/home");
    } catch (signupError) {
      setError(signupError instanceof Error ? signupError.message : "Sign up failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="grid min-h-screen place-items-center bg-[radial-gradient(circle_at_50%_0%,rgba(255,122,100,0.14),transparent_26rem),#070A12] px-5 py-10 text-white">
      <section className="w-full max-w-md">
        <Link to="/" className="mx-auto mb-8 flex w-fit items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-mint text-ink">
            <CalendarDays size={22} />
          </span>
          <span className="text-xl font-bold">EventSphere</span>
        </Link>

        <form className="glass space-y-5 rounded-lg p-6" onSubmit={handleSubmit}>
          <div>
            <h1 className="text-3xl font-black">Attendee Sign Up</h1>
            <p className="mt-2 text-sm text-slate-400">Create your attendee profile to start discovering events.</p>
          </div>

          <label className="block space-y-2 text-sm font-semibold text-slate-200">
            <span>Username</span>
            <input className="field" value={username} onChange={(event) => setUsername(event.target.value)} required />
          </label>

          <label className="block space-y-2 text-sm font-semibold text-slate-200">
            <span>Email</span>
            <input className="field" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
          </label>

          <label className="block space-y-2 text-sm font-semibold text-slate-200">
            <span>Password</span>
            <input className="field" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required minLength={6} />
          </label>

          <label className="block space-y-2 text-sm font-semibold text-slate-200">
            <span>Confirm Password</span>
            <input className="field" type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} required minLength={6} />
          </label>

          {error ? <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">{error}</p> : null}

          <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-mint px-4 py-3 font-bold text-ink hover:bg-white disabled:cursor-not-allowed disabled:opacity-60" disabled={isSubmitting}>
            <UserPlus size={18} />
            {isSubmitting ? "Creating account..." : "Sign Up"}
          </button>

          <p className="text-center text-sm text-slate-400">
            Already have an account?{" "}
            <Link className="font-bold text-mint hover:text-white" to="/login">
              Login
            </Link>
          </p>
        </form>
      </section>
    </main>
  );
}
