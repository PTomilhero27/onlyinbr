"use client";

import { Database, Download, KeyRound, RotateCcw, Save } from "lucide-react";

type SecuritySectionProps = {
  newPassword: string;
  setNewPassword: (value: string) => void;
  confirmPassword: string;
  setConfirmPassword: (value: string) => void;
  changePassword: (password: string) => Promise<void>;
  exportDataJson: () => string;
  resetToDefaults: () => void;
  showToast: (message: string) => void;
};

export function SecuritySection({
  newPassword,
  setNewPassword,
  confirmPassword,
  setConfirmPassword,
  changePassword,
  exportDataJson,
  resetToDefaults,
  showToast,
}: SecuritySectionProps) {
  return (
    <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
      <div className="rounded-[30px] border border-white/15 bg-[rgba(10,40,24,0.46)] p-6 backdrop-blur-xl shadow-[0_18px_45px_-28px_rgba(0,0,0,0.9)] space-y-3.5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-brand-yellow/10 border border-brand-yellow/20 flex items-center justify-center text-brand-yellow">
            <KeyRound className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-yellow/80">Segurança</p>
            <h3 className="text-lg font-heading font-bold text-white">Alterar senha do painel</h3>
          </div>
        </div>

        <div className="space-y-2.5">
          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1">Nova senha</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Mínimo 8 caracteres..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b2b1c]/80 border border-white/10 text-white text-xs focus:border-brand-yellow/60 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1">Confirmar senha</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Repita a senha..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b2b1c]/80 border border-white/10 text-white text-xs focus:border-brand-yellow/60 focus:outline-none"
            />
          </div>
        </div>

        <button
          onClick={async () => {
            if (!newPassword || newPassword.length < 8) {
              alert("A senha precisa ter pelo menos 8 caracteres.");
              return;
            }
            if (newPassword !== confirmPassword) {
              alert("As senhas não coincidem.");
              return;
            }
            try {
              await changePassword(newPassword);
              setNewPassword("");
              setConfirmPassword("");
              showToast("Senha atualizada no Supabase Auth!");
            } catch (error) {
              showToast(error instanceof Error ? error.message : "Não foi possível atualizar a senha.");
            }
          }}
          className="w-full py-2.5 rounded-xl bg-brand-yellow text-neutral-950 font-bold text-xs hover:scale-[1.01] transition-all cursor-pointer flex items-center justify-center gap-1 font-heading shadow-[0_16px_32px_-16px_rgba(245,189,44,0.95)]"
        >
          <Save className="w-3.5 h-3.5" />
          <span>Atualizar Senha</span>
        </button>
      </div>

      <div className="rounded-[30px] border border-white/15 bg-[rgba(10,40,24,0.42)] p-6 backdrop-blur-xl shadow-[0_18px_45px_-28px_rgba(0,0,0,0.9)] space-y-3.5 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-400/25 flex items-center justify-center text-emerald-400">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-400/80">Backup</p>
              <h3 className="text-lg font-heading font-bold text-white">Dados completos</h3>
            </div>
          </div>

          <p className="text-xs text-neutral-300 leading-relaxed">
            Baixe um arquivo JSON com todas as suas edições, fotos, FAQ e configurações para guardar em segurança.
          </p>
        </div>

        <div className="pt-3 flex gap-2">
          <button
            onClick={() => {
              const json = exportDataJson();
              const blob = new Blob([json], { type: "application/json" });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = `onlyinbr_backup_${new Date().toISOString().split("T")[0]}.json`;
              a.click();
              showToast("Backup baixado!");
            }}
            className="flex-1 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer font-heading"
          >
            <Download className="w-4 h-4" />
            <span>Baixar Backup JSON</span>
          </button>

          <button
            onClick={() => {
              if (confirm("Deseja restaurar para os dados originais?")) {
                resetToDefaults();
                showToast("Dados restaurados.");
              }
            }}
            className="py-3 px-3.5 rounded-2xl bg-red-500/10 hover:bg-red-500/20 text-red-300 border border-red-500/20 font-bold text-xs transition-colors flex items-center justify-center cursor-pointer"
            title="Restaurar Padrões"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
