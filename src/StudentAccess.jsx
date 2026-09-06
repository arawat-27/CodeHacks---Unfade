import { useEffect, useState } from "react";
import { supabase, supabaseConfigurationError } from "./supabase";
import "./StudentAccess.css";

function StudentAccess({ children }) {
  const [access, setAccess] = useState("loading");
  const [email, setEmail] = useState("");
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const refreshAccess = async () => {
    if (supabaseConfigurationError) return setAccess("configuration-error");
    const {
      data: { session },
    } = await supabase.auth.getSession();
    setAccess(session ? "allowed" : "email");
  };

  useEffect(() => {
    refreshAccess();
    const {
      data: { subscription },
    } = supabase?.auth.onAuthStateChange(() => refreshAccess()) || { data: {} };
    return () => subscription?.unsubscribe();
  }, []);

  const sendCode = async (event) => {
    event.preventDefault();
    setError("");
    setNotice("");
    if (!email.toLowerCase().endsWith(".edu"))
      return setError("Use an email address ending in .edu.");
    setBusy(true);
    const { error: otpError } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: true,
        emailRedirectTo: `${window.location.origin}/AddWork`,
      },
    });
    setBusy(false);
    if (otpError) return setError(otpError.message);
    setNotice(
      `We sent a secure sign-in link to ${email}. Open that email and click the link to continue.`
    );
    setAccess("link-sent");
  };

  if (access === "allowed") return children;
  if (access === "loading")
    return (
      <main className="student-access-page">
        <p>Checking your student access…</p>
      </main>
    );
  if (access === "configuration-error")
    return (
      <main className="student-access-page">
        <p>{supabaseConfigurationError}</p>
      </main>
    );

  return (
    <main className="student-access-page">
      <section className="student-access-card">
        <p className="student-access-eyebrow">Students only</p>
        {access === "email" && (
          <>
            <h1>Sign in with your school email</h1>
            <p>
              Enter an email ending in <strong>.edu</strong>. We’ll send a
              secure sign-in link—no password required.
            </p>
            <form onSubmit={sendCode}>
              <label>
                School email
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@school.edu"
                  required
                />
              </label>
              <button disabled={busy}>
                {busy ? "Sending…" : "Email me a sign-in link"}
              </button>
            </form>
          </>
        )}
        {access === "link-sent" && (
          <>
            <h1>Check your school email</h1>
            <p>{notice}</p>
            <button
              className="text-button"
              type="button"
              onClick={() => {
                setAccess("email");
                setNotice("");
              }}
            >
              Use a different email
            </button>
          </>
        )}
        {error && <p className="access-error">{error}</p>}
      </section>
    </main>
  );
}

export default StudentAccess;
