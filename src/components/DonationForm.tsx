import React, { useState } from 'react';
import { ShieldCheck, Lock, ArrowRight, Info, Check } from 'lucide-react';
import { ProjectCategory } from '../types/donation';
import { processPaystackDonation } from '../services/paystack';

interface DonationFormProps {
  onSuccessDonation: (donation: {
    reference: string;
    donorName: string;
    email: string;
    amount: number;
    currency: string;
    frequency: 'once' | 'monthly';
    projectCategory: ProjectCategory;
    isAnonymous: boolean;
  }) => void;
}

const PRESET_AMOUNTS = [1, 2, 5, 10, 20, 50, 100] as const;

export const DonationForm: React.FC<DonationFormProps> = ({ onSuccessDonation }) => {
  // Default amount value selected should be 10 USD
  const [selectedPreset, setSelectedPreset] = useState<number | 'custom'>(10);
  const [customAmount, setCustomAmount] = useState<string>('25');
  const [frequency, setFrequency] = useState<'once' | 'monthly'>('once');
  const [email, setEmail] = useState<string>('');
  const [donorName, setDonorName] = useState<string>('');
  // Donate anonymously should be main and clicked by default
  const [isAnonymous, setIsAnonymous] = useState<boolean>(true);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Compute final effective amount in USD
  const currentAmount =
    selectedPreset === 'custom'
      ? parseFloat(customAmount) || 0
      : selectedPreset;

  const handlePresetClick = (amount: number) => {
    setSelectedPreset(amount);
    setErrorMessage(null);
  };

  const handleCustomClick = () => {
    setSelectedPreset('custom');
    setErrorMessage(null);
  };

  // If user types into email, automatically uncheck anonymous
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setEmail(val);
    if (val.trim().length > 0) {
      setIsAnonymous(false);
    }
  };

  // If user types into name, automatically uncheck anonymous
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setDonorName(val);
    if (val.trim().length > 0) {
      setIsAnonymous(false);
    }
  };

  const handleAnonymousToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsAnonymous(e.target.checked);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Email is optional, but if entered, should have basic valid format
    if (email.trim() && !email.includes('@')) {
      setErrorMessage('Please enter a valid email address, or leave it blank.');
      return;
    }

    if (currentAmount < 1) {
      setErrorMessage('Minimum donation is $1.00 USD.');
      return;
    }

    setIsProcessing(true);

    const displayName = isAnonymous ? 'Anonymous Supporter' : (donorName.trim() || 'Supporter');
    // Paystack inline SDK requires an email parameter. If donor opted out, we provide a clean default
    const effectiveEmail = email.trim() ? email.trim() : 'supporter@sgss.org';

    // Launch official Paystack Popup with public key pk_live_40927e91c9c5f15bdd837752f55c3b0695db2737
    await processPaystackDonation({
      email: effectiveEmail,
      amountUsd: currentAmount,
      donorName: displayName,
      projectCategory: 'all',
      frequency,
      onSuccess: (reference) => {
        setIsProcessing(false);
        onSuccessDonation({
          reference,
          donorName: displayName,
          email: email.trim() || 'Anonymous (No email provided)',
          amount: currentAmount,
          currency: 'USD',
          frequency,
          projectCategory: 'all',
          isAnonymous,
        });
      },
      onClose: () => {
        setIsProcessing(false);
      },
      onError: (err) => {
        setIsProcessing(false);
        setErrorMessage(err || 'Failed to process transaction. Please try again.');
      },
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-stone-200 shadow-xl p-4 sm:p-7 max-w-xl w-full mx-auto">
      {/* Card Header */}
      <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between pb-4 border-b border-stone-100 gap-3">
        <div>
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
            Donate to SGSS
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Support free software, games, books, audiobooks, songs, and websites.
          </p>
        </div>

        {/* Frequency Segmented Control */}
        <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-lg shrink-0 self-end xs:self-auto">
          <button
            type="button"
            onClick={() => setFrequency('once')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap cursor-pointer touch-manipulation ${
              frequency === 'once'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            One-time
          </button>
          <button
            type="button"
            onClick={() => {
              setFrequency('monthly');
              if (selectedPreset === 'custom') {
                setSelectedPreset(10);
              }
            }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap cursor-pointer touch-manipulation ${
              frequency === 'monthly'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Monthly
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        {/* Presets: 1, 2, 5, 10 (default), 20, 50, 100, custom (only in One-time) */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-stone-600">
              Select Amount (USD)
            </label>
            <span className="text-[11px] text-stone-400 font-mono">
              Paystack Gateway
            </span>
          </div>

          <div
            className={`grid gap-1.5 sm:gap-2 ${
              frequency === 'monthly'
                ? 'grid-cols-4 sm:grid-cols-7'
                : 'grid-cols-4 sm:grid-cols-4 lg:grid-cols-8'
            }`}
          >
            {PRESET_AMOUNTS.map((amt) => {
              const isSelected = selectedPreset === amt;
              return (
                <button
                  key={amt}
                  type="button"
                  onClick={() => handlePresetClick(amt)}
                  className={`min-h-[44px] py-2 px-1 rounded-lg text-xs font-semibold transition-all border cursor-pointer touch-manipulation flex flex-col items-center justify-center active:scale-95 ${
                    isSelected
                      ? 'bg-amber-700 text-white border-amber-700 shadow-xs'
                      : 'bg-stone-50 text-stone-800 border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  <span className="font-mono tabular-nums text-sm sm:text-base font-bold">${amt}</span>
                  <span className={`text-[9px] mt-0.5 ${isSelected ? 'text-amber-100' : 'text-stone-500'}`}>
                    USD
                  </span>
                </button>
              );
            })}

            {/* Custom option: only rendered when frequency is 'once' */}
            {frequency === 'once' && (
              <button
                type="button"
                onClick={handleCustomClick}
                className={`min-h-[44px] py-2 px-1 rounded-lg text-xs font-semibold transition-all border cursor-pointer touch-manipulation flex flex-col items-center justify-center active:scale-95 ${
                  selectedPreset === 'custom'
                    ? 'bg-amber-700 text-white border-amber-700 shadow-xs'
                    : 'bg-stone-50 text-stone-800 border-stone-200 hover:bg-stone-100'
                }`}
              >
                <span className="font-bold text-xs sm:text-sm">Custom</span>
                <span
                  className={`text-[9px] mt-0.5 ${
                    selectedPreset === 'custom' ? 'text-amber-100' : 'text-stone-500'
                  }`}
                >
                  Amount
                </span>
              </button>
            )}
          </div>

          {/* Custom Input when selected in One-time mode */}
          {frequency === 'once' && selectedPreset === 'custom' && (
            <div className="mt-2.5 p-3 bg-stone-50 border border-stone-200 rounded-lg">
              <label
                htmlFor="custom-amount-field"
                className="block text-[11px] font-medium text-stone-600 mb-1"
              >
                Type any custom amount in USD:
              </label>
              <div className="relative rounded-md max-w-xs">
                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-stone-500 font-mono text-sm font-bold">
                  $
                </span>
                <input
                  id="custom-amount-field"
                  type="number"
                  min="1"
                  step="any"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  placeholder="25"
                  autoFocus
                  className="block w-full rounded-md border border-stone-300 bg-white py-1.5 pl-7 pr-12 text-stone-900 font-mono text-base font-semibold focus:border-amber-600 focus:outline-none focus:ring-1 focus:ring-amber-600"
                />
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-stone-400 text-xs font-semibold">
                  USD
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Main Anonymity Option (Default Checked) */}
        <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl flex items-center gap-2.5">
          <input
            id="anon-main-check"
            type="checkbox"
            checked={isAnonymous}
            onChange={handleAnonymousToggle}
            className="w-4 h-4 rounded border-stone-300 text-amber-700 focus:ring-amber-600 cursor-pointer"
          />
          <label
            htmlFor="anon-main-check"
            className="text-xs font-semibold text-stone-800 cursor-pointer select-none"
          >
            Donate anonymously
          </label>
        </div>

        {/* Email and Name Row (Both Optional, unchecks anonymous when typed) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <div className="flex items-center justify-between mb-1">
              <label
                htmlFor="donor-email-input"
                className="block text-[11px] font-semibold text-stone-700"
              >
                Email Address
              </label>
              <span className="text-[10px] text-stone-400">Optional</span>
            </div>
            <input
              id="donor-email-input"
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="So we can send a thank you note"
              className="w-full px-3 py-2.5 text-sm bg-white border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label
                htmlFor="donor-name-input"
                className="block text-[11px] font-semibold text-stone-700"
              >
                Your Name
              </label>
              <span className="text-[10px] text-stone-400">Optional</span>
            </div>
            <input
              id="donor-name-input"
              type="text"
              value={donorName}
              onChange={handleNameChange}
              placeholder="e.g. Alex"
              className="w-full px-3 py-2.5 text-sm bg-white border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600"
            />
          </div>
        </div>

        {/* Error message */}
        {errorMessage && (
          <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-lg text-rose-800 text-xs flex items-center gap-2">
            <Info className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Primary Pay Button */}
        <div>
          <button
            type="submit"
            disabled={isProcessing}
            className="w-full min-h-[48px] py-3.5 px-5 rounded-lg bg-amber-700 hover:bg-amber-800 text-white font-semibold text-sm sm:text-base shadow-sm transition-all transform active:scale-98 flex items-center justify-center gap-2 cursor-pointer touch-manipulation disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isProcessing ? (
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Processing...</span>
              </div>
            ) : (
              <>
                <span>
                  Pay ${currentAmount.toLocaleString()} USD
                </span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

        {/* Footer Security Badges */}
        <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500 gap-2">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1">
              <Lock className="w-3 h-3 text-stone-400" />
              <span>256-bit SSL</span>
            </span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              <span>Paystack Secured</span>
            </span>
          </div>
          <span className="text-[11px] text-stone-400">
            Encrypted & Protected
          </span>
        </div>
      </form>
    </div>
  );
};
