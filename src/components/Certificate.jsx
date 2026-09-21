import { motion } from 'framer-motion'
import { useState } from 'react'
import config from '../config'

export default function Certificate({ onBack, amount = config.amount }) {
  const [copied, setCopied] = useState(false)
  const cert = `BDAY-${new Date().getFullYear()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`
  const upi = `upi://pay?pa=${encodeURIComponent(config.upiId)}&pn=${encodeURIComponent(config.senderName)}&am=${amount}&cu=INR&tn=${encodeURIComponent('Birthday Funding')}`
  const msg = `Sir ${config.recipientName} has APPROVED ₹${amount}. Proof: certificate #${cert} 🎉`
  const copy = async () => {
    await navigator.clipboard?.writeText(config.upiId)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return <div className="py-2">
    <article className="relative border-[6px] border-double border-[#C9A227] bg-[#fffdf6] p-6 text-center shadow-lg sm:p-10">
      <p className="text-xs font-bold uppercase tracking-[.2em] text-[#C9A227]">Approval Certificate</p>
      <div className="my-4 text-4xl">🎂</div>
      <h3 className="font-serif text-3xl font-bold">Legendary Funding Confirmed</h3>
      <p className="mx-auto mt-5 max-w-md break-words leading-7 text-slate-700">This certifies that Sir <b>{config.recipientName}</b> has generously approved <b>₹{amount.toLocaleString('en-IN')}</b> for the birthday celebration of <b>{config.senderName}</b>. Legendary status granted.</p>
      <span className="stamp stamp-green mt-6">APPROVED</span>
      <p className="mt-5 font-mono text-xs text-slate-500">Certificate No. {cert}</p>
    </article>

    <section className="mt-6 rounded-xl bg-[#FBF6EC] p-5 text-[#1B2A49]" aria-label="Disbursement instructions">
      <h3 className="font-typewriter text-sm font-bold">Disbursement Instructions</h3>
      <p className="mt-2 text-3xl font-extrabold">Amount: ₹{amount.toLocaleString('en-IN')}</p>
      <p className="mt-1 text-sm text-slate-600">Enter this amount after scanning.</p>

      <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-center">
        <div className="order-2 flex-1 rounded-xl bg-[#1B2A49] p-5 text-[#FBF6EC] sm:order-2">
          <p className="font-bold">Pay via UPI</p>
          <a href={upi} className="mt-4 flex min-h-12 items-center justify-center rounded-lg bg-[#C9A227] px-4 text-sm font-bold text-[#1B2A49]">Open UPI App</a>
          <p className="mt-3 text-center text-xs text-white/70 sm:hidden">Or scan from another device / save and scan from gallery</p>
        </div>
        <div className="order-3 text-center sm:order-1 sm:flex-1">
          <motion.div initial={{ opacity: 0, scale: .94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .35 }} className="mx-auto w-fit max-w-full rounded-xl border border-[#C9A227] bg-white p-3 shadow-lg">
            <img src="/upi-qr.png" className="h-auto w-56 max-w-full sm:w-64" alt={`UPI payment QR code for ${config.senderName}`} loading="lazy" />
          </motion.div>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm"><span className="break-all">UPI ID: {config.upiId}</span><button onClick={copy} className="min-h-11 rounded-lg border border-[#C9A227] bg-white px-4 font-bold">{copied ? 'Copied!' : 'Copy'}</button></div>
          <a href="/upi-qr.png" download="upi-qr.png" className="mt-3 inline-flex min-h-11 items-center justify-center rounded-lg border border-[#C9A227] bg-white px-4 text-sm font-bold">Save QR</a>
        </div>
      </div>
    </section>

    <a href={`https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(msg)}`} target="_blank" rel="noreferrer" className="mt-5 flex min-h-12 items-center justify-center rounded-xl bg-[#25D366] px-4 text-center text-sm font-bold text-[#092d18]">Notify the Committee on WhatsApp</a>
    <button onClick={onBack} className="mt-5 text-sm font-bold underline">← Back to choices</button>
  </div>
}
