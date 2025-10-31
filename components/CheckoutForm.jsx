'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

function Checkbox({ id, checked, onChange }) {
  return (
    <input
      id={id}
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="w-4 h-4 accent-black rounded border-gray-300"
    />
  )
}

export default function CheckoutForm({
  onPromoApply,
  promoResult,
  promoError,
  isPromoLoading,
  userData,
  setUserData,
  formError,
}) {
  const [promoCode, setPromoCode] = useState('')
  const [showPromoList, setShowPromoList] = useState(false)

  const handlePromoClick = () => onPromoApply(promoCode)

  const promoCodes = [
    { code: 'SAVE10', desc: 'Get ₹20 off your booking' },
    { code: 'FLAT500', desc: '10% off for new users' },
    { code: 'BIG20', desc: '₹200 off for weekday bookings' },
  ]

  return (
    <div className="bg-gray-100 rounded-xl p-4 md:p-6">
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-1">Full name</label>
          <Input
            placeholder="John Doe"
            value={userData.fullName}
            onChange={(e) => setUserData({ ...userData, fullName: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <Input
            placeholder="test@test.com"
            type="email"
            value={userData.email}
            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
          />
        </div>
      </div>

      <div className="flex gap-2 mb-2">
        <Input
          placeholder="Promo code"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
        />
        <Button
          onClick={handlePromoClick}
          disabled={isPromoLoading}
          className="bg-black text-white hover:bg-gray-800"
        >
          {isPromoLoading ? 'Applying...' : 'Apply'}
        </Button>
      </div>

      <div className="mt-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setShowPromoList(!showPromoList)}
          className="border-gray-400 text-gray-700 hover:bg-gray-200"
        >
          {showPromoList ? 'Hide Promo Codes' : 'Show Promo Codes'}
        </Button>
      </div>

      {showPromoList && (
        <div className="mt-3 bg-white rounded-md border p-3 space-y-2">
          {promoCodes.map((p) => (
            <div
              key={p.code}
              className="flex justify-between items-center border-b last:border-none pb-2 last:pb-0"
            >
              <div>
                <p className="font-medium text-sm text-black">{p.code}</p>
                <p className="text-xs text-gray-500">{p.desc}</p>
              </div>
              <Button
                size="sm"
                className="bg-yellow-400 text-black hover:bg-yellow-500"
                onClick={() => {
                  setPromoCode(p.code)
                  setShowPromoList(false)
                }}
              >
                Use
              </Button>
            </div>
          ))}
        </div>
      )}

      {promoError && <p className="text-red-500 text-sm mt-2">{promoError}</p>}
      {promoResult && (
        <p className="text-green-600 text-sm mt-2">
          Promo applied! You saved ₹{promoResult.discount}
        </p>
      )}

      <div className="flex items-center gap-2 mt-4">
        <Checkbox
          id="agree"
          checked={userData.agree}
          onChange={() => setUserData({ ...userData, agree: !userData.agree })}
        />
        <label htmlFor="agree" className="text-xs text-gray-700">
          I agree to the terms and safety policy
        </label>
      </div>

      {formError && <p className="text-red-500 text-sm mt-2">{formError}</p>}
    </div>
  )
}
