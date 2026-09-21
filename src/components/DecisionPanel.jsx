import { motion } from 'framer-motion'
import { useState } from 'react'
import confetti from 'canvas-confetti'
import config from '../config'
import Certificate from './Certificate'
import NegotiateSlider from './NegotiateSlider'
import RunawayButton from './RunawayButton'

export default function DecisionPanel({ setFunded }) {
  const [mode, setMode] = useState('choices')
  const [counterAmount, setCounterAmount] = useState(config.amount)
  const approve = () => {
    setFunded(config.amount)
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) confetti({ particleCount: 170, spread: 75, origin: { y: .65 }, colors: ['#C9A227', '#FF5C8A', '#1B2A49'] })
    setMode('approved')
  }
  const submitCounterOffer = amount => {
    setCounterAmount(amount)
    setFunded(amount)
    setMode('negotiated')
  }

  if (mode === 'approved' || mode === 'negotiated') return <section id="decision" className="scroll-mt-8 rounded-2xl bg-[#1B2A49] p-5 text-center sm:p-8"><Certificate amount={mode === 'approved' ? config.amount : counterAmount} onBack={() => setMode('choices')} /></section>
  if (mode === 'rejected') return <div className="fixed inset-0 z-50 grid place-items-center bg-[#1B2A49]/95 p-5" role="alertdialog" aria-modal="true" aria-labelledby="rejection-message"><div className="w-full max-w-md rounded-2xl border-2 border-[#C9A227] bg-[#FBF6EC] p-7 text-center shadow-2xl sm:p-10"><div className="text-5xl">🎂</div><p id="rejection-message" className="mt-5 break-words font-serif text-2xl font-bold leading-relaxed text-[#1B2A49]">This behaviour was not expected from your end the birhtday party committee with contact with you soon on this matter</p><button autoFocus onClick={() => setMode('choices')} className="mt-8 min-h-12 w-full rounded-xl bg-[#C9A227] px-6 font-bold text-[#1B2A49]">Okay</button></div></div>
  return <motion.section id="decision" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="scroll-mt-8 rounded-2xl bg-[#1B2A49] p-5 text-[#FBF6EC] shadow-2xl sm:p-9" aria-labelledby="decision-title"><p className="text-center text-xs font-bold tracking-[.22em] text-[#C9A227]">ACTION REQUIRED</p><h2 id="decision-title" className="mt-2 text-center font-serif text-3xl font-bold sm:text-4xl">YOUR DECISION, SIR</h2><div className="mx-auto mt-7 max-w-lg"><button onClick={approve} className="gold-glow min-h-16 w-full rounded-xl bg-[#C9A227] px-5 text-lg font-extrabold text-[#1B2A49]">✅ APPROVE ₹{config.amount.toLocaleString('en-IN')}</button><button onClick={() => setMode(mode === 'negotiate' ? 'choices' : 'negotiate')} className="mt-4 min-h-12 w-full rounded-xl bg-[#FBF6EC] px-5 font-bold text-[#1B2A49]">🤝 NEGOTIATE</button>{mode === 'negotiate' && <NegotiateSlider onSubmit={submitCounterOffer} />}<RunawayButton onReject={() => setMode('rejected')} /></div></motion.section>
}
