"use client";

const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
const storageKey = "sub-asms-auth-session";

export type AuthSession = { access_token: string; refresh_token?: string; expires_at?: number; user?: { email?: string } };

export function currentSession(): AuthSession | null {
  if (typeof window === "undefined") return null;
  try { return JSON.parse(window.localStorage.getItem(storageKey) || "null"); } catch { return null; }
}
export function saveSession(session: AuthSession) { window.localStorage.setItem(storageKey, JSON.stringify(session)); }
export function clearSession() { window.localStorage.removeItem(storageKey); }
const hasExpired = (session: AuthSession) => Boolean(session.expires_at && session.expires_at <= Math.floor(Date.now() / 1000) + 15);
export async function restoreSession(): Promise<AuthSession | null> {
  const session = currentSession();
  if (!session) return null;
  if (!hasExpired(session)) return session;
  if (!session.refresh_token || !base || !key) { clearSession(); return null; }
  try {
    const response = await fetch(base + "/auth/v1/token?grant_type=refresh_token", { method: "POST", headers: { apikey: key, "Content-Type": "application/json" }, body: JSON.stringify({ refresh_token: session.refresh_token }) });
    const body = await response.json().catch(() => ({}));
    if (!response.ok || !body.access_token) { clearSession(); return null; }
    const refreshed: AuthSession = { access_token: body.access_token, refresh_token: body.refresh_token || session.refresh_token, expires_at: body.expires_at, user: { email: body.user?.email || session.user?.email } };
    saveSession(refreshed); return refreshed;
  } catch { clearSession(); return null; }
}
export function captureSessionFromUrl() {
  if (typeof window === "undefined") return null;
  const values = new URLSearchParams(window.location.hash.replace(/^#/, ""));
  const token = values.get("access_token");
  if (!token) return null;
  const session: AuthSession = { access_token: token, refresh_token: values.get("refresh_token") || undefined, expires_at: Number(values.get("expires_at") || 0) || undefined, user: { email: values.get("email") || undefined } };
  saveSession(session); window.history.replaceState({}, "", window.location.pathname + window.location.search); return session;
}
export async function requestMagicLink(email: string, redirectTo: string) {
  if (!base || !key) throw new Error("Chưa cấu hình Supabase Auth.");
  const response = await fetch(base + "/auth/v1/otp", { method: "POST", headers: { apikey: key, "Content-Type": "application/json" }, body: JSON.stringify({ email, create_user: true, email_redirect_to: redirectTo }) });
  const body = await response.json().catch(() => ({})); if (!response.ok) throw new Error(body?.msg || body?.message || "Không thể gửi link đăng nhập.");
}

export async function signInWithPassword(email: string, password: string): Promise<AuthSession> {
  if (!base || !key) throw new Error("Chưa cấu hình Supabase Auth.");
  const response = await fetch(base + "/auth/v1/token?grant_type=password", {
    method: "POST",
    headers: { apikey: key, "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(body?.error_description || body?.msg || "Email hoặc mật khẩu không đúng.");
  const session: AuthSession = {
    access_token: body.access_token,
    refresh_token: body.refresh_token,
    expires_at: body.expires_at,
    user: { email: body.user?.email }
  };
  saveSession(session);
  return session;
}
