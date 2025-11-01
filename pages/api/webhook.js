import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const config = { api: { bodyParser: false } }

import getRawBody from 'raw-body'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  const sig = req.headers['stripe-signature']
  const buf = await getRawBody(req)
  let evt
  try {
    evt = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET)
  } catch (err) {
    console.error('Webhook signature error', err.message)
    return res.status(400).send(`Webhook Error: ${err.message}`)
  }

  if (evt.type === 'checkout.session.completed') {
    const session = evt.data.object
    console.log('Checkout completed for', session.customer_email)
  }

  res.json({ received: true })
}
