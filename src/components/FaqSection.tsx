import React, { useState } from 'react';
import { ChevronDown, Shield, CreditCard, Heart, HelpCircle } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: 'What is SGSS and why are all your works completely free?',
    answer:
      'SGSS is an independent creative and educational collective dedicated to producing games, literary editions, audiobooks, and software utilities accessible to everyone without financial barriers. We reject microtransactions, intrusive advertising, and data harvesting. All projects are released under free and open culture licenses.',
  },
  {
    question: 'How does Paystack process my donation in USD?',
    answer:
      'We use Paystack as our secure payments gateway (configured with our public key pk_live_40927e91c9c5f15bdd837752f55c3b0695db2737). Paystack supports international payments across Visa, Mastercard, American Express, and local payment methods, settling funds directly into our organization account.',
  },
  {
    question: 'Can I donate from outside Africa or the United States?',
    answer:
      'Yes! Donors from over 190 countries can contribute in USD. Your local bank or card issuer will automatically convert your local currency to the designated USD donation at standard bank exchange rates with zero penalty.',
  },
  {
    question: 'Can I choose which specific project my donation supports?',
    answer:
      'Absolutely. On the donation form, you can allocate your gift toward Interactive Games, Books & Audiobooks, Open Web Tools, or the General Fund (Greatest Need). We honor donor intent in our public quarterly financial ledger.',
  },
  {
    question: 'Is my payment secure?',
    answer:
      'Completely. Paystack is a PCI-DSS Level 1 certified gateway — the highest global standard for transaction security. We never store, process, or have access to your credit card number or CVV.',
  },
  {
    question: 'Can I make an anonymous donation?',
    answer:
      'Yes. Check the "Keep my name private" box on the donation form. Your contribution will appear as "Anonymous Supporter" on our public gratitude wall while you still receive a private receipt by email.',
  },
];

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-16 bg-white border-t border-stone-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <div className="text-xs uppercase tracking-widest text-stone-500 font-sans font-semibold">
            Common Questions
          </div>
          <h2 className="font-serif text-3xl font-bold text-stone-900 mt-1">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-stone-600 mt-2">
            Everything you need to know about donating to SGSS through the Paystack gateway.
          </p>
        </div>

        <div className="mt-10 space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="border border-stone-200 rounded-xl overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 bg-stone-50 hover:bg-stone-100/80 transition-colors cursor-pointer"
                >
                  <span className="font-serif font-semibold text-stone-900 text-base">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-stone-500 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-amber-800' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="p-5 bg-white text-stone-700 text-sm leading-relaxed border-t border-stone-100">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
