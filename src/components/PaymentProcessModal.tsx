import React, { useState } from 'react';
import { CheckCircle2, CreditCard, Landmark, QrCode, Wallet, X } from 'lucide-react';
import { PaymentMethod } from '../types';

interface PaymentProcessModalProps {
  title: string;
  amount: number;
  method: PaymentMethod;
  onConfirm: () => void;
  onClose: () => void;
}

const getDemoVirtualAccount = (bank: string) => {
  const bankPrefix: Record<string, string> = {
    BCA: '8808',
    Mandiri: '8877',
    BNI: '8810',
    BRI: '8820',
  };
  return `${bankPrefix[bank]} 1234 5678 9012`;
};

const DemoQrCode: React.FC = () => {
  const size = 29;
  const modules = Array.from({ length: size * size }, (_, index) => {
    const x = index % size;
    const y = Math.floor(index / size);
    const inFinder = (left: number, top: number) =>
      x >= left && x < left + 7 && y >= top && y < top + 7;
    const finder = (left: number, top: number) => {
      const localX = x - left;
      const localY = y - top;
      return (
        (localX === 0 || localX === 6 || localY === 0 || localY === 6) ||
        (localX >= 2 && localX <= 4 && localY >= 2 && localY <= 4)
      );
    };

    if (inFinder(0, 0)) return finder(0, 0);
    if (inFinder(size - 7, 0)) return finder(size - 7, 0);
    if (inFinder(0, size - 7)) return finder(0, size - 7);
    return (x * 13 + y * 7 + x * y * 3) % 11 < 5;
  });

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      role="img"
      aria-label="Pratinjau QRIS simulasi, tidak dapat dipindai"
      className="h-48 w-48 rounded-lg bg-white p-2"
      shapeRendering="crispEdges"
    >
      <rect width={size} height={size} fill="white" />
      {modules.map((isDark, index) =>
        isDark ? (
          <rect key={index} x={index % size} y={Math.floor(index / size)} width="1" height="1" fill="#10251d" />
        ) : null
      )}
    </svg>
  );
};

export const PaymentProcessModal: React.FC<PaymentProcessModalProps> = ({
  title,
  amount,
  method,
  onConfirm,
  onClose,
}) => {
  const [step, setStep] = useState<'details' | 'confirm'>('details');
  const [walletProvider, setWalletProvider] = useState('GoPay');
  const [walletNumber, setWalletNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [bank, setBank] = useState('BCA');
  const [acknowledgedDemoQr, setAcknowledgedDemoQr] = useState(false);
  const [error, setError] = useState('');

  const handleContinue = (event: React.FormEvent) => {
    event.preventDefault();
    setError('');

    if (method === 'E-Wallet' && !/^(?:\+?62|0)8\d{8,11}$/.test(walletNumber.replace(/[\s-]/g, ''))) {
      setError('Masukkan nomor ponsel e-wallet yang valid.');
      return;
    }
    if (method === 'Kartu Debit/Kredit' && cardNumber.replace(/\D/g, '').length < 16) {
      setError('Nomor kartu harus terdiri dari minimal 16 digit.');
      return;
    }
    if (method === 'Kartu Debit/Kredit' && (!cardName.trim() || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(cardExpiry))) {
      setError('Lengkapi nama pemegang kartu dan masa berlaku MM/YY.');
      return;
    }
    if (method === 'QRIS' && !acknowledgedDemoQr) {
      setError('Centang keterangan QRIS demo untuk melanjutkan simulasi.');
      return;
    }

    setStep('confirm');
  };

  const selectedMethodIcon =
    method === 'QRIS' ? QrCode :
    method === 'E-Wallet' ? Wallet :
    method === 'Kartu Debit/Kredit' ? CreditCard : Landmark;
  const MethodIcon = selectedMethodIcon;
  const virtualAccount = getDemoVirtualAccount(bank);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4">
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="payment-title"
        className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl border border-stone-200 bg-white shadow-2xl"
      >
        <header className="sticky top-0 flex items-start justify-between border-b border-stone-200 bg-white px-5 py-4">
          <div>
            <h2 id="payment-title" className="font-bold text-stone-900">Proses Pembayaran</h2>
            <p className="mt-1 text-xs text-stone-500">{title}</p>
          </div>
          <button onClick={onClose} aria-label="Tutup pembayaran" className="rounded-lg p-1 text-stone-500 hover:bg-stone-100">
            <X className="h-5 w-5" />
          </button>
        </header>

        <form onSubmit={handleContinue} className="space-y-4 p-5">
          <div className="flex items-center justify-between rounded-xl bg-emerald-50 p-4">
            <span className="text-sm text-stone-600">Total pembayaran</span>
            <strong className="font-mono text-lg text-emerald-900">Rp {amount.toLocaleString('id-ID')}</strong>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-stone-200 p-3">
            <MethodIcon className="h-5 w-5 text-emerald-800" />
            <span className="text-sm font-bold text-stone-900">{method}</span>
            <span className="ml-auto text-xs text-stone-500">
              {step === 'details' ? '1. Detail pembayaran' : '2. Konfirmasi'}
            </span>
          </div>

          {step === 'details' ? (
            <div className="space-y-4">
              {method === 'QRIS' && (
                <div className="space-y-3 text-center">
                  <p className="text-sm font-semibold text-stone-800">Pindai QRIS untuk membayar</p>
                  <div className="mx-auto w-fit rounded-xl border border-stone-200 bg-white p-2">
                    <DemoQrCode />
                  </div>
                  <p className="text-xs font-bold text-amber-800">QRIS pratinjau — tidak dapat dipindai</p>
                  <label className="flex items-start gap-2 rounded-lg bg-amber-50 p-3 text-left text-xs leading-5 text-amber-900">
                    <input
                      type="checkbox"
                      checked={acknowledgedDemoQr}
                      onChange={(event) => setAcknowledgedDemoQr(event.target.checked)}
                      className="mt-1"
                    />
                    Saya paham QR ini hanya tampilan simulasi, bukan kode pembayaran.
                  </label>
                </div>
              )}

              {method === 'E-Wallet' && (
                <>
                  <label className="block space-y-1 text-xs font-semibold text-stone-700">
                    Pilih e-wallet
                    <select
                      value={walletProvider}
                      onChange={(event) => setWalletProvider(event.target.value)}
                      className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm font-normal"
                    >
                      <option>GoPay</option>
                      <option>OVO</option>
                      <option>DANA</option>
                      <option>LinkAja</option>
                    </select>
                  </label>
                  <label className="block space-y-1 text-xs font-semibold text-stone-700">
                    Nomor ponsel terdaftar
                    <input
                      type="tel"
                      inputMode="tel"
                      autoComplete="off"
                      value={walletNumber}
                      onChange={(event) => setWalletNumber(event.target.value)}
                      placeholder="08xxxxxxxxxx"
                      className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm font-normal"
                      required
                    />
                  </label>
                  <p className="text-[11px] text-stone-500">Nomor hanya dipakai pada simulasi ini dan tidak disimpan.</p>
                </>
              )}

              {method === 'Kartu Debit/Kredit' && (
                <>
                  <label className="block space-y-1 text-xs font-semibold text-stone-700">
                    Nama pemegang kartu
                    <input
                      value={cardName}
                      onChange={(event) => setCardName(event.target.value)}
                      autoComplete="off"
                      placeholder="Nama pada kartu"
                      className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm font-normal"
                      required
                    />
                  </label>
                  <label className="block space-y-1 text-xs font-semibold text-stone-700">
                    Nomor kartu
                    <input
                      inputMode="numeric"
                      autoComplete="off"
                      value={cardNumber}
                      onChange={(event) => setCardNumber(event.target.value.replace(/\D/g, '').slice(0, 19))}
                      placeholder="16-19 digit"
                      className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm font-normal"
                      required
                    />
                  </label>
                  <label className="block max-w-40 space-y-1 text-xs font-semibold text-stone-700">
                    Masa berlaku
                    <input
                      inputMode="numeric"
                      autoComplete="off"
                      value={cardExpiry}
                      onChange={(event) => {
                        const digits = event.target.value.replace(/\D/g, '').slice(0, 4);
                        setCardExpiry(digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits);
                      }}
                      placeholder="MM/YY"
                      className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm font-normal"
                      required
                    />
                  </label>
                  <p className="text-[11px] text-amber-800">Simulasi saja. Jangan masukkan data kartu sungguhan; nomor dan masa berlaku tidak disimpan.</p>
                </>
              )}

              {method === 'Transfer Bank' && (
                <>
                  <label className="block space-y-1 text-xs font-semibold text-stone-700">
                    Pilih bank
                    <select
                      value={bank}
                      onChange={(event) => setBank(event.target.value)}
                      className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm font-normal"
                    >
                      <option>BCA</option>
                      <option>Mandiri</option>
                      <option>BNI</option>
                      <option>BRI</option>
                    </select>
                  </label>
                  <div className="rounded-xl border border-dashed border-stone-300 bg-stone-50 p-4">
                    <p className="text-xs text-stone-500">Nomor virtual account demo</p>
                    <p className="mt-1 font-mono text-lg font-bold tracking-wide text-stone-900">{virtualAccount}</p>
                  </div>
                  <p className="text-[11px] text-amber-800">Nomor ini hanya contoh dan tidak menerima transfer.</p>
                </>
              )}

              {error && <p role="alert" className="text-xs font-semibold text-red-700">{error}</p>}
              <button
                type="submit"
                className="w-full rounded-xl bg-emerald-700 px-4 py-3 text-sm font-bold text-white transition hover:bg-emerald-800"
              >
                Lanjut ke konfirmasi
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="rounded-xl border border-stone-200 p-4 text-sm">
                <p className="text-xs text-stone-500">Metode</p>
                <p className="font-semibold text-stone-900">{method}</p>
                {method === 'E-Wallet' && <p className="mt-2 text-xs text-stone-600">{walletProvider} · {walletNumber}</p>}
                {method === 'Kartu Debit/Kredit' && (
                  <p className="mt-2 text-xs text-stone-600">{cardName} · berakhiran {cardNumber.slice(-4)} · {cardExpiry}</p>
                )}
                {method === 'Transfer Bank' && <p className="mt-2 text-xs text-stone-600">{bank} · {virtualAccount}</p>}
                {method === 'QRIS' && <p className="mt-2 text-xs text-stone-600">QRIS simulasi</p>}
              </div>
              <p className="rounded-lg bg-amber-50 p-3 text-xs leading-5 text-amber-900">
                Ini simulasi karena gateway pembayaran belum terhubung. Tidak ada uang yang ditransfer.
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setStep('details')}
                  className="flex-1 rounded-xl border border-stone-300 px-4 py-3 text-sm font-bold text-stone-700 hover:bg-stone-50"
                >
                  Kembali
                </button>
                <button
                  type="button"
                  onClick={onConfirm}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 py-3 text-sm font-bold text-white transition hover:bg-emerald-800"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  Konfirmasi simulasi
                </button>
              </div>
            </div>
          )}
        </form>
      </section>
    </div>
  );
};
