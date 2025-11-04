import React, { useState } from 'react'
import dynamic from 'next/dynamic'
const CheckoutModal = dynamic(() => import('../components/CheckoutModal'), { ssr: false })

const COURSES = [
  { id: 'ai-fundamentals', title: 'AI Fundamentals', length: '6 weeks', price: 6.99, bullets: ['ML basics', 'Python notebooks', 'Capstone'] },
  { id: 'llm-engineering', title: 'LLM Engineering', length: '4 weeks', price: 9.99, bullets: ['Prompt engineering', 'Fine-tuning', 'Deploy'] },
  { id: 'prod-ai', title: 'Productizing AI', length: '8 weeks', price: 14.99, bullets: ['MLOps', 'Governance', 'GTM'] },
]

export default function Home() {
  const [selected, setSelected] = useState(null)

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="logo" className="w-10 h-10" />
            <div>
              <div className="font-bold">Aivana</div>
              <div className="text-xs text-gray-500">AI courses for builders</div>
            </div>
          </div>
          <nav className="flex items-center gap-4">
            <a href="#courses" className="text-sm">Courses</a>
            <a href="#pricing" className="text-sm">Pricing</a>
            <a href="#faq" className="text-sm">FAQ</a>
            <a className="px-4 py-2 rounded bg-indigo-600 text-white" href="#pricing">Get started</a>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl font-extrabold">Build real AI skills — from idea to product.</h1>
            <p className="mt-4 text-gray-600">Hands-on courses for engineers and product teams.</p>
            <div className="mt-6">
              <a href="#courses" className="px-5 py-3 rounded bg-indigo-600 text-white">Browse courses</a>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="text-2xl font-semibold">AI Foundations Bundle</h3>
            <p className="text-gray-600 mt-2">Starter pack: Python, ML, LLM mini-project.</p>
            <div className="mt-4 text-3xl font-bold">$14.99</div>
            <button onClick={()=>setSelected(COURSES[0])} className="mt-6 w-full px-4 py-3 rounded bg-indigo-600 text-white">Enroll</button>
          </div>
        </section>

        <section id="courses" className="mt-12">
          <h2 className="text-2xl font-bold">Popular courses</h2>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {COURSES.map(c => (
              <div key={c.id} className="bg-white p-6 rounded-2xl shadow">
                <div className="flex justify-between">
                  <div>
                    <h4 className="font-semibold">{c.title}</h4>
                    <div className="text-sm text-gray-500">{c.length}</div>
                  </div>
                  <div className="text-2xl font-bold">${c.price}</div>
                </div>
                <ul className="mt-4 text-sm text-gray-600">
                  {c.bullets.map((b,i)=>(<li key={i}>• {b}</li>))}
                </ul>
                <div className="mt-4 flex gap-2">
                  <button onClick={()=>setSelected(c)} className="flex-1 px-4 py-2 rounded bg-indigo-600 text-white">Enroll</button>
                  <button className="px-4 py-2 rounded border">Syllabus</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="pricing" className="mt-12">
          <h2 className="text-2xl font-bold">Pricing</h2>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow">
              <div className="font-semibold">Individual</div>
              <div className="mt-2 text-2xl font-bold">Starting $6.99</div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow">
              <div className="font-semibold">Bundle</div>
              <div className="mt-2 text-2xl font-bold">$14.99</div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow">
              <div className="font-semibold">Teams</div>
              <div className="mt-2 text-2xl font-bold">Contact us</div>
            </div>
          </div>
        </section>

      </main>

      <footer className="bg-white border-t mt-12">
        <div className="max-w-6xl mx-auto px-6 py-8 text-sm text-gray-600">© {new Date().getFullYear()} Aivana — Terms • Privacy • Refund policy</div>
      </footer>

      {selected && <CheckoutModal course={selected} onClose={()=>setSelected(null)} />}
    </div>
  )
}
