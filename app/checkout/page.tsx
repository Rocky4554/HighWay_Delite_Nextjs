// app/checkout/page.tsx
'use client';

import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import BillingSummary from '@/components/BillingSummary';

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // ---- Booking data from URL ----
  const id = searchParams.get('id');
  const title = decodeURIComponent(searchParams.get('title') ?? '-');
  const price = Number(searchParams.get('price') || 0);
  const date = searchParams.get('date') ?? '';
  const time = decodeURIComponent(searchParams.get('time') ?? '');
  const quantity = Number(searchParams.get('qty') || 1);

  // Calculate amounts
  const subtotal = price * quantity;

  // ---- Form & promo state ----
  const [form, setForm] = useState({ name: '', email: '', promo: '' });
  const [promoResult, setPromoResult] = useState<any>(null);
  const [promoError, setPromoError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isPromoLoading, setIsPromoLoading] = useState(false);

  const tax = 59;
  const total = promoResult ? promoResult.newTotal : subtotal + tax;

  // ---- Apply promo ----
  const handlePromo = async (code?: string) => {
    const promoToApply = code || form.promo;
    if (!promoToApply) return;

    setPromoError(null);
    setPromoResult(null);
    setIsPromoLoading(true);

    try {
      const res = await fetch('/api/promo/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: promoToApply, subtotal }),
      });
      const data = await res.json();

      if (data.valid) {
        setPromoResult(data);
        setForm(prev => ({ ...prev, promo: promoToApply }));
      } else {
        setPromoError(data.message || 'Invalid promo code');
      }
    } catch (error) {
      setPromoError('Failed to apply promo code');
      console.error('Promo validation error:', error);
    } finally {
      setIsPromoLoading(false);
    }
  };

  // ---- Submit booking ----
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        experienceId: id,
        date,
        time,
        name: form.name,
        email: form.email,
        promoCode: promoResult ? form.promo : null,
      }),
    });

    const data = await res.json();

    if (data.success) {
      router.push(`/result?success=1&id=${data.bookingId}`);
    } else {
      router.push('/result?success=0');
    }
  };

  // ---- Guard ----
  if (!id || !date || !time) {
    return <div className="p-8 text-center text-red-600">Invalid booking data</div>;
  }

  // ---- UI ----
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* Back button */}
      <div className="max-w-4xl mx-auto px-4 mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
        >
          <ArrowLeft className="w-5 h-5" />
          Checkout
        </button>
      </div>

      <div className="max-w-4xl mx-auto px-4 grid md:grid-cols-2 gap-8">
        {/* ==== LEFT – FORM ==== */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Enter Details</h2>

          <form onSubmit={handleSubmit} className="space-y-4 text-black">
            {/* Name */}
            <input
              type="text"
              placeholder="Full name"
              required
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />

            {/* Email */}
            <input
              type="email"
              placeholder="Email"
              required
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />

            {/* Promo Code Input */}
            <div className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter promo code"
                  value={form.promo}
                  onChange={e => {
                    setForm({ ...form, promo: e.target.value });
                    setPromoResult(null);
                    setPromoError(null);
                  }}
                  className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                <button
                  type="button"
                  onClick={() => handlePromo()}
                  disabled={isPromoLoading || !form.promo.trim()}
                  className="px-5 bg-black text-white rounded-lg hover:bg-gray-800 transition disabled:opacity-50"
                >
                  {isPromoLoading ? 'Applying...' : 'Apply'}
                </button>
              </div>
              
              {promoError && <p className="text-red-600 text-sm">{promoError}</p>}
              {promoResult && (
                <div className="text-green-600 text-sm">
                  <p>{promoResult.message || 'Promo applied successfully!'}</p>
                  <p className="font-medium">You saved: ₹{promoResult.discount.toFixed(2)}</p>
                </div>
              )}
            </div>

            {/* Terms */}
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input type="checkbox" required className="w-4 h-4" />
              I agree to the terms and safety policy
            </label>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-400 text-black py-3 rounded-full font-medium hover:bg-yellow-500 disabled:opacity-50 transition"
            >
              {loading ? 'Processing…' : 'Pay and Confirm'}
            </button>
          </form>
        </section>

        {/* ==== RIGHT – BILLING SUMMARY ==== */}
        <BillingSummary
          title={title}
          date={date}
          time={time}
          quantity={quantity}
          price={price}
          tax={tax}
          promoCode={promoResult ? form.promo : undefined}
          discount={promoResult?.discount || 0}
          total={total}
          onApplyPromo={(code) => {
            setForm(prev => ({ ...prev, promo: code }));
            // Auto-apply the selected promo code
            setTimeout(() => handlePromo(code), 0);
          }}
        />
      </div>
    </div>
  );
}