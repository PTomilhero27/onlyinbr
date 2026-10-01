"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Edit3, HelpCircle, Plus, Save, Search, Trash2, X } from "lucide-react";
import { type FaqItem } from "@/data/faq";

type FaqSectionProps = {
  faq: FaqItem[];
  faqSearch: string;
  setFaqSearch: (value: string) => void;
  isAddingFaq: boolean;
  setIsAddingFaq: (value: boolean) => void;
  editingFaq: FaqItem | null;
  setEditingFaq: (value: FaqItem | null) => void;
  newFaqQuestion: string;
  setNewFaqQuestion: (value: string) => void;
  newFaqAnswer: string;
  setNewFaqAnswer: (value: string) => void;
  addFaqItem: (payload: { question: string; answer: string }) => void;
  updateFaqItem: (id: string, payload: Partial<FaqItem>) => void;
  deleteFaqItem: (id: string) => void;
  closeFaqModal: () => void;
  showToast: (message: string) => void;
};

export function FaqSection({
  faq,
  faqSearch,
  setFaqSearch,
  isAddingFaq,
  setIsAddingFaq,
  editingFaq,
  setEditingFaq,
  newFaqQuestion,
  setNewFaqQuestion,
  newFaqAnswer,
  setNewFaqAnswer,
  addFaqItem,
  updateFaqItem,
  deleteFaqItem,
  closeFaqModal,
  showToast,
}: FaqSectionProps) {
  return (
    <div className="h-full flex flex-col min-h-0 space-y-3">
      <div className="flex items-center justify-between gap-3 flex-shrink-0 rounded-[26px] border border-white/10 bg-[#0b2b1c]/80 px-3 py-2 shadow-[0_18px_40px_-24px_rgba(0,0,0,0.8)] backdrop-blur-xl">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div className="w-8 h-8 rounded-xl bg-brand-yellow/10 border border-brand-yellow/20 flex items-center justify-center text-brand-yellow flex-shrink-0">
            <HelpCircle className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-yellow/80">FAQ</p>
            <h3 className="text-sm font-heading font-bold text-white truncate">Perguntas frequentes</h3>
          </div>
        </div>

        <div className="relative max-w-sm flex-1 hidden sm:block">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400" />
          <input
            type="text"
            value={faqSearch}
            onChange={(e) => setFaqSearch(e.target.value)}
            placeholder="Buscar perguntas..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-white/[0.06] border border-white/15 text-white text-xs focus:border-brand-yellow focus:outline-none"
          />
        </div>

        <button
          onClick={() => {
            setNewFaqQuestion("");
            setNewFaqAnswer("");
            setIsAddingFaq(true);
          }}
          className="px-3.5 py-1.5 rounded-xl bg-brand-yellow text-neutral-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer font-heading shadow-[0_10px_25px_-14px_rgba(245,189,44,0.8)]"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Nova Pergunta</span>
        </button>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto pr-1 space-y-3 scrollbar-thin">
        {faq
          .filter(
            (item) =>
              !faqSearch ||
              item.question.toLowerCase().includes(faqSearch.toLowerCase()) ||
              item.answer.toLowerCase().includes(faqSearch.toLowerCase())
          )
          .map((item, idx) => (
            <div
              key={item.id}
              className="rounded-[24px] border border-white/10 bg-[#0f2d1f]/80 p-4 backdrop-blur-xl flex items-start justify-between gap-3 hover:border-white/20 transition-all shadow-[0_18px_35px_-25px_rgba(0,0,0,0.85)]"
            >
              <div className="space-y-2 flex-1 min-w-0">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="inline-flex items-center justify-center min-w-[34px] rounded-lg border border-brand-yellow/30 bg-brand-yellow/10 px-2 py-0.5 text-[10px] font-bold text-brand-yellow font-heading">
                    #{idx + 1}
                  </span>
                  <h4 className="text-sm font-heading font-bold text-white truncate">{item.question}</h4>
                </div>
                <p className="text-xs text-neutral-200 leading-relaxed pl-1">{item.answer}</p>
              </div>

              <div className="flex items-center gap-1.5 flex-shrink-0">
                <button
                  onClick={() => setEditingFaq(item)}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs cursor-pointer transition-colors"
                  title="Editar"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => {
                    if (confirm(`Remover pergunta?`)) {
                      deleteFaqItem(item.id);
                      showToast("Pergunta removida.");
                    }
                  }}
                  className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-300 cursor-pointer transition-colors"
                  title="Excluir"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
      </div>

      <AnimatePresence>
        {(isAddingFaq || editingFaq) && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl"
            onClick={closeFaqModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 18 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md overflow-hidden rounded-[30px] border border-white/15 shadow-[0_32px_80px_rgba(0,0,0,0.42)] liquid-glass-opaque"
            >
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-yellow/80">FAQ</p>
                  <h3 className="text-lg font-heading font-bold text-white mt-1">
                    {editingFaq ? "Editar Pergunta" : "Nova Pergunta"}
                  </h3>
                </div>
                <button
                  onClick={() => {
                    setIsAddingFaq(false);
                    setEditingFaq(null);
                  }}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/15 text-white flex items-center justify-center cursor-pointer transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3 p-5">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-[0.14em] text-neutral-300 mb-2">
                    Pergunta
                  </label>
                  <input
                    type="text"
                    value={editingFaq ? editingFaq.question : newFaqQuestion}
                    onChange={(e) => {
                      if (editingFaq) {
                        setEditingFaq({ ...editingFaq, question: e.target.value });
                      } else {
                        setNewFaqQuestion(e.target.value);
                      }
                    }}
                    placeholder="Ex: Qual o prazo de montagem?"
                    className="w-full px-3 py-2.5 rounded-xl bg-[#0b2b1c]/80 border border-white/10 text-white text-sm placeholder:text-neutral-500 focus:border-brand-yellow/60 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-[0.14em] text-neutral-300 mb-2">
                    Resposta
                  </label>
                  <textarea
                    rows={4}
                    value={editingFaq ? editingFaq.answer : newFaqAnswer}
                    onChange={(e) => {
                      if (editingFaq) {
                        setEditingFaq({ ...editingFaq, answer: e.target.value });
                      } else {
                        setNewFaqAnswer(e.target.value);
                      }
                    }}
                    placeholder="Resposta objetiva..."
                    className="w-full px-3 py-2.5 rounded-xl bg-[#0b2b1c]/80 border border-white/10 text-white text-sm placeholder:text-neutral-500 focus:border-brand-yellow/60 focus:outline-none resize-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 border-t border-white/10 px-5 py-4">
                <button
                  onClick={() => {
                    setIsAddingFaq(false);
                    setEditingFaq(null);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-white/10 text-white text-xs font-semibold cursor-pointer hover:bg-white/15 transition-colors"
                >
                  Cancelar
                </button>

                <button
                  onClick={() => {
                    if (editingFaq) {
                      if (!editingFaq.question.trim()) return;
                      updateFaqItem(editingFaq.id, editingFaq);
                      setEditingFaq(null);
                      showToast("Pergunta atualizada!");
                    } else {
                      if (!newFaqQuestion.trim()) return;
                      addFaqItem({
                        question: newFaqQuestion.trim(),
                        answer: newFaqAnswer.trim(),
                      });
                      setNewFaqQuestion("");
                      setNewFaqAnswer("");
                      setIsAddingFaq(false);
                      showToast("Pergunta adicionada!");
                    }
                  }}
                  className="px-4 py-2.5 rounded-xl bg-brand-yellow text-neutral-950 font-bold text-xs flex items-center gap-2 cursor-pointer font-heading shadow-[0_16px_32px_-16px_rgba(245,189,44,0.95)]"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Salvar</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
