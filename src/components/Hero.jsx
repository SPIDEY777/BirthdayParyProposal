import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import config from '../config'

const parsedPartyDate = Date.parse(config.partyDate)
const validDate = Number.isFinite(parsedPartyDate)
function Countdown(){
 const [left,setLeft]=useState(null)
 useEffect(()=>{ if(!validDate) return; const tick=()=>setLeft(Math.max(0,parsedPartyDate-Date.now())); tick(); const i=setInterval(tick,1000); return()=>clearInterval(i) },[])
 if(!validDate) return <div className="mt-5 grid grid-cols-4 gap-2 text-center">{['Days','Hours','Mins','Secs'].map(label=><div key={label} className="rounded-lg bg-[#1B2A49] px-1 py-3 text-[#FBF6EC]"><b className="block text-xl sm:text-2xl">--</b><span className="text-[10px] uppercase tracking-wider">{label}</span></div>)}</div>
 if(left===0) return <p className="mt-5 text-center font-semibold text-[#B3261E]">The celebration is in progress. Late approvals still accepted.</p>
 const parts=[['Days',Math.floor(left/86400000)],['Hours',Math.floor(left/3600000)%24],['Mins',Math.floor(left/60000)%60],['Secs',Math.floor(left/1000)%60]]
 return <div className="mt-5 grid grid-cols-4 gap-2 text-center">{parts.map(([label,num])=><div key={label} className="rounded-lg bg-[#1B2A49] px-1 py-3 text-[#FBF6EC]"><b className="block text-xl sm:text-2xl">{String(num).padStart(2,'0')}</b><span className="text-[10px] uppercase tracking-wider">{label}</span></div>)}</div>
}
export default function Hero(){ const today=new Intl.DateTimeFormat('en-IN',{dateStyle:'long'}).format(new Date()); return <section className="mx-auto flex min-h-dvh max-w-3xl flex-col justify-center px-4 py-12 sm:px-6">
 <motion.div initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} className="paper-card relative overflow-hidden rounded-2xl p-5 pt-14 text-center sm:p-9 sm:pt-10">
  <div className="mx-auto mb-3 grid h-16 w-16 place-items-center rounded-full border-2 border-[#C9A227] bg-[#FBF6EC] text-3xl shadow-sm">🎂</div>
  <p className="font-serif text-sm font-bold tracking-[.12em] text-[#1B2A49]">MINISTRY OF BIRTHDAY AFFAIRS</p><p className="mt-1 text-xs text-slate-600">Department of Cake, Snacks & Highly Important Activities</p>
  <div className="mt-5 flex flex-wrap justify-between gap-2 border-y border-[#C9A227]/40 py-2 text-[10px] font-semibold uppercase tracking-wide sm:text-xs"><span>File No. BDAY/2026/00042</span><span>{today}</span></div>
  <h1 className="mt-7 font-serif text-3xl font-extrabold leading-tight text-[#1B2A49] sm:text-5xl">Official Proposal for<br/>Birthday Party Funding</h1>
  <p className="mx-auto mt-5 max-w-max text-sm font-medium sm:text-base"><span className="typewriter">Addressed to: </span><span className="font-serif text-2xl font-extrabold text-[#C9A227] sm:text-3xl">{config.recipientName}</span></p>
  <motion.div initial={{opacity:0,scale:2,rotate:-13}} whileInView={{opacity:.85,scale:1,rotate:-5}} viewport={{once:true}} transition={{type:'spring',stiffness:220,damping:13}} className="pointer-events-none absolute right-2 top-3 sm:right-6 sm:top-5"><span className="stamp text-xs sm:text-sm">PENDING YOUR APPROVAL</span></motion.div>
  <p className="mt-6 text-xs font-medium uppercase tracking-wider text-slate-500">Time remaining until the celebration<br className="sm:hidden"/> (and your window to approve)</p><Countdown/>
 </motion.div><a href="#decision" className="mx-auto mt-6 grid h-11 w-11 place-items-center rounded-full border border-[#C9A227] text-xl text-[#1B2A49]" aria-label="Scroll to proposal details">↓</a>
 </section> }
