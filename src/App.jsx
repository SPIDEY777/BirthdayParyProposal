import { useState } from 'react'
import Hero from './components/Hero'
import Letter from './components/Letter'
import Budget from './components/Budget'
import Testimonials from './components/Testimonials'
import Terms from './components/Terms'
import DecisionPanel from './components/DecisionPanel'
import StickyBar from './components/StickyBar'
import FundingProgress from './components/FundingProgress'
import Footer from './components/Footer'
import config from './config'

export default function App(){
 const [funded,setFunded]=useState(0)
 return <div className="paper-bg min-h-dvh overflow-hidden"><StickyBar/><header><Hero/></header><main className="mx-auto max-w-3xl px-4 pb-12 sm:px-6"><FundingProgress funded={funded}/><Letter/><Budget/><Testimonials/><Terms/><DecisionPanel setFunded={setFunded}/></main><Footer committee={config.committeeName}/></div>
}
