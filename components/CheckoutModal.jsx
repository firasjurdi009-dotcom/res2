import React, { useState } from 'react'

export default function CheckoutModal({ course, onClose }) {
  const [email, setEmail] = useState('')
  const [coupon, setCoupon] = useState('')
  const [applied, setApplied] = useState(null)
  const [loading, setLoading] = useState(false)

  function applyCoupon() {
    const code = coupon.trim().toUpperCase();
    if (!code) return setApplied({ ok: false, msg: 'Enter code' })
    if (code === 'SAVE20') return setApplied({ ok: true, discount: 20, code })
    if (code === 'STUDENT50' && course.price >= 200) return setApplied({ ok: true, discount: 50, code })
    return setApplied({ ok: false, msg: 'Invalid coupon' })
  }

  function finalPrice() {
    if (!applied || !applied.ok) return course.price
    return Math.round(course.price * (100 - applied.discount) / 100)
  }

  async function handlePurchase() {
    setLoading(true)
    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ courseId: course.id, email, price: finalPrice(), coupon: applied?.code }),
      })
      const j = await res.json()
      if (j.url) {
        window.location = j.url
      } else {
        alert('Demo: purchase complete (mock)')
        onClose()
      }
    } catch (e) {
      console.error(e)
      alert('Error creating checkout session')
    } finally { setLoading(false) }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Checkout — {course.title}</h3>
          <button onClick={onClose} className="text-gray-500">Close</button>
        </div>

        <div className="mt-4">
          <label className="text-sm">Email (receipt)</label>
          <input value={email} onChange={(e)=>setEmail(e.target.value)} className="mt-1 w-full border rounded px-3 py-2" placeholder="you@company.com" />
        </div>

        <div className="mt-4 flex gap-2">
          <input value={coupon} onChange={(e)=>setCoupon(e.target.value)} className="flex-1 border rounded px-3 py-2" placeholder="Coupon code" />
          <button onClick={applyCoupon} className="px-4 py-2 rounded bg-indigo-600 text-white">Apply</button>
        </div>
        {applied && (
          <div className="mt-2 text-sm">
            {applied.ok ? <span className="text-green-600">Applied: {applied.code} — {applied.discount}% off</span> : <span className="text-red-600">{applied.msg}</span>}
          </div>
        )}

        <div className="mt-6 flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-500">Total</div>
            <div className="text-2xl font-bold">${finalPrice()}</div>
          </div>
          <div>
            <button onClick={handlePurchase} disabled={loading} className="px-5 py-2 rounded bg-indigo-600 text-white">{loading ? 'Processing...' : 'Continue'}</button>
          </div>
        </div>
      </div>
    </div>
  )
}
