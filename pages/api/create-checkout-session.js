import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end('Method not allowed')
  const { courseId, price, email, coupon } = req.body
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: email || undefined,
      line_items: [{ price_data: { currency: 'usd', product_data: { name: `Course: ${courseId}` }, unit_amount: Math.round(price * 100) }, quantity: 1 }],
      success_url: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/?success=1`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/?canceled=1`,
    })
    res.json({ url: session.url })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'stripe error' })
  }
}
