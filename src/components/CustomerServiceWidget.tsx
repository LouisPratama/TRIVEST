import React, { useState } from 'react';
import { Headphones, MessageCircle, Send, X } from 'lucide-react';

export const CustomerServiceWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState<string[]>([
    'Halo! Ada yang bisa kami bantu tentang desain, pesanan, atau pembayaran?',
  ]);

  const sendMessage = (event: React.FormEvent) => {
    event.preventDefault();
    const message = question.trim();
    if (!message) return;
    setMessages((previous) => [...previous, message]);
    setQuestion('');
  };

  return (
    <div className="fixed bottom-5 right-5 z-40">
      {isOpen && (
        <section className="mb-3 flex h-[min(420px,70vh)] w-[min(350px,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-2xl">
          <header className="flex items-center justify-between bg-emerald-800 px-4 py-3 text-white">
            <div className="flex items-center gap-2">
              <Headphones className="h-5 w-5" />
              <div>
                <h2 className="text-sm font-bold">Customer Service</h2>
                <p className="text-[10px] text-emerald-100">Bantuan Trivest</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} aria-label="Tutup customer service" className="rounded-lg p-1 hover:bg-white/10">
              <X className="h-4 w-4" />
            </button>
          </header>
          <div className="flex-1 space-y-2 overflow-y-auto p-3">
            {messages.map((message, index) => (
              <p key={`${index}-${message}`} className={`max-w-[85%] rounded-xl px-3 py-2 text-xs leading-5 ${
                index === 0 ? 'bg-stone-100 text-stone-700' : 'ml-auto bg-emerald-100 text-emerald-950'
              }`}>
                {message}
              </p>
            ))}
          </div>
          <form onSubmit={sendMessage} className="border-t border-stone-200 p-3">
            <div className="flex gap-2">
              <input
                value={question}
                onChange={(event) => setQuestion(event.target.value)}
                placeholder="Tulis pertanyaan..."
                className="min-w-0 flex-1 rounded-lg border border-stone-300 px-3 py-2 text-xs outline-none focus:border-emerald-700"
              />
              <button aria-label="Kirim pesan" className="rounded-lg bg-emerald-700 p-2 text-white hover:bg-emerald-800">
                <Send className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-2 text-[10px] text-stone-400">Demo chat lokal; pesan belum terkirim ke petugas.</p>
          </form>
        </section>
      )}
      <button
        onClick={() => setIsOpen((open) => !open)}
        aria-label={isOpen ? 'Tutup customer service' : 'Hubungi customer service'}
        className="ml-auto flex items-center gap-2 rounded-full bg-emerald-800 px-4 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-emerald-900"
      >
        {isOpen ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
        <span>Customer Service</span>
      </button>
    </div>
  );
};
