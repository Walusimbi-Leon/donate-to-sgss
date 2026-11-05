/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { DonationForm } from './components/DonationForm';
import { ReceiptModal } from './components/ReceiptModal';
import { DonationRecord, ProjectCategory } from './types/donation';
import { Heart, ShieldCheck } from 'lucide-react';

export default function App() {
  const [completedDonation, setCompletedDonation] = useState<DonationRecord | null>(null);

  const handleDonationSuccess = (newDonationData: {
    reference: string;
    donorName: string;
    email: string;
    amount: number;
    currency: string;
    frequency: 'once' | 'monthly';
    projectCategory: ProjectCategory;
    isAnonymous: boolean;
  }) => {
    const record: DonationRecord = {
      id: `sgss-don-${Date.now()}`,
      reference: newDonationData.reference,
      donorName: newDonationData.donorName,
      email: newDonationData.email,
      amount: newDonationData.amount,
      currency: newDonationData.currency,
      frequency: newDonationData.frequency,
      projectCategory: newDonationData.projectCategory,
      isAnonymous: newDonationData.isAnonymous,
      date: new Date().toISOString(),
      gateway: 'paystack',
      status: 'success',
    };

    setCompletedDonation(record);
  };

  return (
    <div className="min-h-screen w-full bg-stone-100 flex flex-col justify-between items-center px-3 py-4 sm:px-6 sm:py-8 overflow-y-auto text-stone-900 font-sans">
      {/* Responsive Top Brand Bar */}
      <header className="w-full max-w-xl flex items-center justify-between gap-3 pb-3 sm:pb-5 shrink-0">
        <div className="flex items-center gap-2.5 min-w-0">
          <img
            src="/assets/aistudio/sgss_logo_cd747104.jfif"
            alt="SGSS Organization Logo"
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover shadow-xs border border-stone-200 shrink-0 bg-white"
          />
          <div className="flex flex-col min-w-0">
            <span className="font-serif text-base sm:text-lg font-bold tracking-tight text-stone-900 leading-tight">
              SGSS Organization
            </span>
            <span className="text-[10px] text-stone-500 font-medium truncate">
              Free Software, Games, Book, Audiobooks, Songs, Websites and More
            </span>
          </div>
        </div>

        <div className="hidden xs:flex sm:flex items-center gap-1.5 text-[11px] text-stone-600 font-medium bg-white px-2.5 py-1 rounded-full border border-stone-200 shadow-2xs shrink-0">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Paystack Official</span>
        </div>
      </header>

      {/* Centered Main Contribution Card with Natural Responsive Scaling */}
      <main className="w-full max-w-xl my-auto py-2 sm:py-4 flex items-center justify-center shrink-0">
        <DonationForm onSuccessDonation={handleDonationSuccess} />
      </main>

      {/* Quiet Minimal Bottom Bar */}
      <footer className="w-full max-w-xl flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-stone-400 pt-4 pb-2 shrink-0 text-center sm:text-left">
        <div className="flex items-center gap-1.5">
          <span>SGSS 100% Free Public Projects</span>
        </div>
        <div className="flex items-center gap-1 text-stone-500">
          <span>Thank you for your support</span>
          <Heart className="w-3 h-3 text-amber-700 fill-amber-700" />
        </div>
      </footer>

      {/* Completed Donation Receipt Modal */}
      <ReceiptModal
        donation={completedDonation}
        onClose={() => setCompletedDonation(null)}
      />
    </div>
  );
}
