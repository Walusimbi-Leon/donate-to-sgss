import React, { useEffect } from 'react';
import { X, Printer, ShieldCheck, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { DonationRecord } from '../types/donation';

interface ReceiptModalProps {
  donation: DonationRecord | null;
  onClose: () => void;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({ donation, onClose }) => {
  useEffect(() => {
    if (donation) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#b45309', '#d97706', '#78350f', '#f59e0b', '#1c1917'],
        });
      } catch {
        // ignore if canvas confetti is not supported
      }
    }
  }, [donation]);

  if (!donation) return null;

  const handlePrint = () => {
    window.print();
  };

  const displayEmail =
    donation.isAnonymous || !donation.email || donation.email.includes('sgss.org')
      ? 'Anonymous (Not provided)'
      : donation.email;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-4">
        {/* Header Ribbon */}
        <div className="bg-amber-800 text-amber-50 px-6 py-5 text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-amber-900/60 text-amber-200 hover:text-white transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-2 text-amber-200">
            <Heart className="w-5 h-5 fill-amber-200" />
          </div>

          <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white">
            Thank You For Supporting SGSS
          </h3>
          <p className="text-xs text-amber-100/90 mt-1 max-w-sm mx-auto">
            Your contribution directly keeps our games, literature, audiobooks, and software free for everyone.
          </p>
        </div>

        {/* Printable Official Receipt Body */}
        <div id="printable-receipt" className="p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-stone-200 pb-3">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-stone-400 font-mono block">
                Official Donation Receipt
              </span>
              <span className="font-serif text-base font-bold text-stone-900">
                SGSS Organization
              </span>
            </div>
            <div className="text-right">
              <span className="font-mono text-2xl font-bold text-stone-900 tabular-nums">
                ${donation.amount.toLocaleString()}.00
              </span>
              <span className="text-[10px] uppercase tracking-wider text-stone-500 block font-mono">
                USD · {donation.frequency === 'monthly' ? 'Monthly' : 'One-time'}
              </span>
            </div>
          </div>

          {/* Details Table */}
          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between py-1 border-b border-stone-100">
              <span className="text-stone-500">Transaction Reference</span>
              <span className="font-mono text-stone-900 font-medium text-[11px]">
                {donation.reference}
              </span>
            </div>

            <div className="flex justify-between py-1 border-b border-stone-100">
              <span className="text-stone-500">Payment Gateway</span>
              <span className="flex items-center gap-1 text-stone-900 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Paystack Verified
              </span>
            </div>

            <div className="flex justify-between py-1 border-b border-stone-100">
              <span className="text-stone-500">Donor Name</span>
              <span className="text-stone-900 font-medium">
                {donation.isAnonymous ? 'Anonymous Supporter' : donation.donorName}
              </span>
            </div>

            <div className="flex justify-between py-1 border-b border-stone-100">
              <span className="text-stone-500">Donor Email</span>
              <span className="text-stone-900 font-medium">
                {displayEmail}
              </span>
            </div>

            <div className="flex justify-between py-1 border-b border-stone-100">
              <span className="text-stone-500">Date</span>
              <span className="text-stone-900 font-medium">
                {new Date(donation.date).toLocaleString()}
              </span>
            </div>
          </div>

          <div className="p-3 bg-stone-50 rounded-lg border border-stone-200 text-[11px] text-stone-600 leading-relaxed">
            <p className="font-semibold text-stone-800 mb-0.5">
              100% Free Public Projects Guarantee:
            </p>
            Your gift directly powers server hosting and open development for SGSS games, audiobooks, and websites. Zero advertising or paywalls.
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="bg-stone-50 px-5 py-3.5 border-t border-stone-200 flex items-center justify-between gap-3">
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-stone-700 bg-white border border-stone-300 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Receipt</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-1.5 text-xs font-semibold text-white bg-stone-900 rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
