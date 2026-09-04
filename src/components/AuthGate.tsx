"use client";

import { ReactNode, useEffect, useState } from "react";
import { KeyRound, ShieldCheck } from "lucide-react";
import { AuthSession, captureSessionFromUrl, restoreSession, signInWithPassword } from "../lib/supabaseAuth";

export function AuthGate({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(null), [email, setEmail] = useState(""), [password, setPassword] = useState(""), [message, setMessage] = useState(""), [busy, setBusy] = useState(true);
  useEffect(() => { let active = true; const fromLink = captureSessionFromUrl(); if (fromLink) { setSession(fromLink); setBusy(false); return () => { active = false; }; } restoreSession().then(value => { if (active) setSession(value); }).finally(() => { if (active) setBusy(false); }); return () => { active = false; }; }, []);
  const send = async () => {
    try {
      if (!email.trim() || !password) return setMessage("Vui lòng nhập email và mật khẩu.");
      setBusy(true);
      setSession(await signInWithPassword(email.trim(), password));
    } catch (error: any) { setMessage(error.message); } finally { setBusy(false); }
  };
  if (busy && !session) return <div className="auth-screen"><div className="auth-card"><ShieldCheck size={28} /><p>Đang kiểm tra quyền truy cập…</p></div></div>;
  if (session) return <>{children}</>;
  return <div className="auth-screen"><section className="auth-card"><div className="auth-icon"><ShieldCheck size={28} /></div><h1>Sub-ASMS bảo mật</h1><p>Đăng nhập bằng email và mật khẩu đã được cấp để truy cập hệ thống.</p><label>Email được cấp quyền<input type="email" value={email} onChange={event => setEmail(event.target.value)} placeholder="name@company.com" /></label><label className="auth-password">Mật khẩu<input type="password" value={password} onChange={event => setPassword(event.target.value)} onKeyDown={event => { if (event.key === "Enter") send(); }} placeholder="Nhập mật khẩu" /></label><button className="button" disabled={busy} onClick={send}><KeyRound size={16} />Đăng nhập</button>{message && <div className="auth-message">{message}</div>}</section></div>;
}
