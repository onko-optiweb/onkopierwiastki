'use client';

import { useState } from 'react';
import { retryPayment } from '@/src/actions/orders';
import { IconCreditCard, IconLoader2 } from '@tabler/icons-react';

export function RetryPaymentButton({ orderId }: { orderId: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRetry = async () => {
    setLoading(true);
    setError('');
    const result = await retryPayment(orderId);
    if (result.success && result.redirectUrl) {
      window.location.href = result.redirectUrl;
    } else {
      setError(result.error || 'Błąd płatności');
      setLoading(false);
    }
  };

  return (
    <div className="mt-6 text-center">
      <button
        onClick={handleRetry}
        disabled={loading}
        className="inline-flex items-center gap-2 bg-[#5B65DC] text-white text-sm font-semibold px-6 py-3 rounded-xl hover:bg-[#4a53c7] transition-colors disabled:opacity-60"
      >
        {loading ? <IconLoader2 size={16} className="animate-spin" /> : <IconCreditCard size={16} />}
        Opłać ponownie
      </button>
      {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
    </div>
  );
}
