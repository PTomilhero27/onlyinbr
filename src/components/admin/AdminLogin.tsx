"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { AlertCircle, ArrowLeft, Eye, EyeOff, KeyRound, Lock } from "lucide-react";

type AdminLoginProps = {
  passwordInput: string;
  setPasswordInput: (value: string) => void;
  showPassword: boolean;
  setShowPassword: (value: boolean) => void;
  loginError: boolean;
  handleLoginSubmit: (event: React.FormEvent) => void;
};

export function AdminLogin({
  passwordInput,
  setPasswordInput,
  showPassword,
  setShowPassword,
  loginError,
  handleLoginSubmit,
}: AdminLoginProps) {
  return (
    <div
      className="h-screen w-screen overflow-hidden text-white flex items-center justify-center p-4 relative font-body select-none"
      style={{
        backgroundColor: "#072312",
        backgroundImage: `
          radial-gradient(circle at 10% 20%, rgba(245, 189, 44, 0.18) 0%, transparent 45%),
          radial-gradient(circle at 90% 40%, rgba(25, 97, 50, 0.35) 0%, transparent 55%),
          radial-gradient(circle at 50% 85%, rgba(1, 0, 119, 0.30) 0%, transparent 60%),
          radial-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px),
          linear-gradient(160deg, #072312 0%, #0d381c 30%, #061f12 60%, #020c22 100%)
        `,
        backgroundSize: "auto, auto, auto, 24px 24px, auto",
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-sm p-8 rounded-3xl border border-white/20 shadow-2xl backdrop-blur-2xl"
        style={{
          background: "rgba(10, 38, 22, 0.88)",
          boxShadow: "0 25px 50px -10px rgba(0, 0, 0, 0.8), 0 0 35px rgba(245, 189, 44, 0.12)",
        }}
      >
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-brand-yellow/10 border border-brand-yellow/30 flex items-center justify-center text-brand-yellow mb-3 shadow-inner">
            <Lock className="w-6 h-6" />
          </div>

          <span className="text-[11px] font-bold tracking-widest uppercase text-brand-yellow mb-1 font-sans">
            Área Restrita
          </span>
          <h1 className="text-xl font-heading font-bold text-white tracking-tight">
            Painel Only in BR
          </h1>
        </div>

        <form onSubmit={handleLoginSubmit} className="space-y-3.5">
          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1">
              Senha Administrativa
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Digite sua senha..."
                className="w-full px-4 py-3 pr-10 rounded-2xl bg-white/[0.08] border border-white/20 text-white placeholder-neutral-400 focus:outline-none focus:border-brand-yellow text-xs transition-all"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {loginError && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-2.5 rounded-xl bg-red-500/20 border border-red-500/30 text-red-200 text-xs flex items-center gap-1.5"
            >
              <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 text-red-400" />
              <span>Senha incorreta.</span>
            </motion.div>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-2xl bg-brand-yellow hover:bg-brand-yellow-dark text-neutral-950 font-bold text-xs transition-all shadow-md shadow-brand-yellow/20 flex items-center justify-center gap-2 cursor-pointer font-heading mt-1"
          >
            <KeyRound className="w-4 h-4" />
            <span>Entrar no Painel</span>
          </button>
        </form>

        <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-neutral-400">
          <Link href="/" className="hover:text-white flex items-center gap-1 transition-colors">
            <ArrowLeft className="w-3 h-3" />
            <span>Voltar ao Site</span>
          </Link>
          <span className="text-[10px] text-neutral-500 font-mono">onlyinbr2025</span>
        </div>
      </motion.div>
    </div>
  );
}
