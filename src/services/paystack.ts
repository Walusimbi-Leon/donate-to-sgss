/**
 * Paystack Integration Service for SGSS Donations
 * Configured with SGSS Paystack Public Key and Monthly Subscription Plans
 */

import { PAYSTACK_MONTHLY_PLANS } from '../config/plans';

export const PAYSTACK_PUBLIC_KEY = 'pk_live_40927e91c9c5f15bdd837752f55c3b0695db2737';

declare global {
  interface Window {
    PaystackPop?: {
      setup: (options: {
        key: string;
        email: string;
        amount: number; // in subunits (cents for USD)
        currency?: string;
        plan?: string;  // Paystack Subscription Plan code for recurring monthly charges
        ref?: string;
        metadata?: {
          custom_fields: Array<{
            display_name: string;
            variable_name: string;
            value: string;
          }>;
        };
        callback: (response: { reference: string; status?: string; trans?: string; message?: string }) => void;
        onClose: () => void;
      }) => {
        openIframe: () => void;
      };
    };
  }
}

export interface PaymentParams {
  email: string;
  amountUsd: number;
  donorName: string;
  projectCategory: string;
  message?: string;
  frequency: 'once' | 'monthly';
  onSuccess: (reference: string) => void;
  onClose?: () => void;
  onError?: (error: string) => void;
}

export function loadPaystackScript(): Promise<boolean> {
  if (typeof window === 'undefined') return Promise.resolve(false);
  if (window.PaystackPop) return Promise.resolve(true);

  return new Promise((resolve) => {
    const existingScript = document.querySelector('script[src*="paystack"]');
    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(true));
      existingScript.addEventListener('error', () => resolve(false));
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.head.appendChild(script);
  });
}

export async function processPaystackDonation(params: PaymentParams): Promise<void> {
  const isScriptLoaded = await loadPaystackScript();

  if (!isScriptLoaded || !window.PaystackPop) {
    if (params.onError) {
      params.onError('Paystack inline SDK could not be loaded. Please check your network connection.');
    }
    return;
  }

  // Paystack takes amount in cents for USD ($1 = 100 cents)
  const amountInCents = Math.round(params.amountUsd * 100);
  const ref = `SGSS-${Date.now()}-${Math.floor(Math.random() * 100000)}`;

  // Determine if a recurring subscription plan code is configured for this amount
  const planCode =
    params.frequency === 'monthly' && PAYSTACK_MONTHLY_PLANS[params.amountUsd]
      ? PAYSTACK_MONTHLY_PLANS[params.amountUsd]
      : undefined;

  try {
    const setupOptions: Parameters<NonNullable<Window['PaystackPop']>['setup']>[0] = {
      key: PAYSTACK_PUBLIC_KEY,
      email: params.email,
      amount: amountInCents,
      currency: 'USD',
      ref: ref,
      metadata: {
        custom_fields: [
          {
            display_name: 'Donor Name',
            variable_name: 'donor_name',
            value: params.donorName || 'Anonymous Supporter',
          },
          {
            display_name: 'Target Project',
            variable_name: 'target_project',
            value: 'SGSS Organization (All Works)',
          },
          {
            display_name: 'Donation Frequency',
            variable_name: 'donation_frequency',
            value: params.frequency === 'monthly' ? 'Monthly Sustainer' : 'One-time Gift',
          },
        ],
      },
      callback: (response) => {
        params.onSuccess(response.reference || ref);
      },
      onClose: () => {
        if (params.onClose) {
          params.onClose();
        }
      },
    };

    // If a monthly plan code is configured, attach it to trigger automatic recurring billing
    if (planCode) {
      setupOptions.plan = planCode;
    }

    const handler = window.PaystackPop.setup(setupOptions);
    handler.openIframe();
  } catch (err: unknown) {
    console.error('Paystack initialization error:', err);
    if (params.onError) {
      const message = err instanceof Error ? err.message : 'Failed to launch Paystack checkout';
      params.onError(message);
    }
  }
}
