'use client'

import { Suspense, useState, useMemo } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import BillingSummary from '@/components/BillingSummarySimple'
import CheckoutForm from '@/components/CheckoutForm'

function CheckoutContent() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const id = searchParams.get('id')
  const title = useMemo(() => decodeURIComponent(searchParams.get('title') ?? '-'), [searchParams])
  const price = Number(searchParams.get('price') || 0)
  const date = searchParams.get('date') ?? ''
  const time = useMemo(() => decodeURIComponent(searchParams.get('time') ?? ''), [searchParams])
  const quantity = Number(searchParams.get('qty') || 1)

  const subtotal = price * quantity
  const tax = 59
  const computedTotal = subtotal + tax

  const [promoResult, setPromoResult] = useState<{ newTotal: number } | null>(null)
  const [promoError, setPromoError] = useState<string | null>(null)
  const [isPromoLoading, setIsPromoLoading] = useState(false)
  const [loading, setLoading] = useState(false)
  const [userData, setUserData] = useState({
    fullName: '',
    email: '',
    agree: false,
  })
  const [formError, setFormError] = useState('')

  const total = promoResult ? promoResult.newTotal : computedTotal

  const handlePromo = async (code: string) => {
    if (!code) return
    setPromoError(null)
    setPromoResult(null)
    setIsPromoLoading(true)
    try {
      const res = await fetch('/api/promo/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, subtotal }),
      })
      const data = await res.json()
      if (data.valid) {
        setPromoResult(data)
      } else {
        setPromoError(data.message || 'Invalid promo code')
      }
    } catch {
      setPromoError('Failed to apply promo code')
    } finally {
      setIsPromoLoading(false)
    }
  }

  const handleSubmit = async () => {
    if (!userData.fullName.trim()) return setFormError('Please enter your name.')
    if (!userData.email.trim()) return setFormError('Please enter your email.')
    if (!userData.agree) return setFormError('You must agree to the terms.')
    setFormError('')
    setLoading(true)
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ experienceId: id, date, time }),
      })
      const data = await res.json()
      if (data.success) {
        router.push(`/result?success=1&id=${data.bookingId}`)
      } else {
        router.push('/result?success=0')
      }
    } catch {
      router.push('/result?success=0')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-base font-medium">Checkout</span>
        </button>
      </div>

      <div className="max-w-4xl mx-auto px-4 grid md:grid-cols-2 gap-8">
        <CheckoutForm
          onPromoApply={handlePromo}
          promoResult={promoResult}
          promoError={promoError}
          isPromoLoading={isPromoLoading}
          userData={userData}
          setUserData={setUserData}
          formError={formError}
        />

        <BillingSummary
          title={title}
          date={date}
          time={time}
          quantity={quantity}
          price={price}
          subtotal={subtotal}
          taxes={tax}
          total={total}
          onConfirm={handleSubmit}
        />
      </div>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="p-6 text-center">Loading checkout...</div>}>
      <CheckoutContent />
    </Suspense>
  )
}
