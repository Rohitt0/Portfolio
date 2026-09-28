'use client'
import {useState} from 'react'
import {motion,AnimatePresence} from 'motion/react'
export default function TechGrid({tech}:{tech:any[]}){
 const cats=['All',...Array.from(new Set(tech.map(t=>t.category).filter(Boolean)))]
 const [c,setC]=useState('All')
 const list=tech.filter(t=>c==='All'||t.category===c)
 return <div className="pad">
  <div className="flex gap-1 mb-4 text-sm">{cats.map(x=><button key={x} onClick={()=>setC(x)} className="press relative rounded-md px-2.5 py-1 text-[var(--mute)] aria-pressed:text-white" aria-pressed={c===x}>
   {c===x&&<motion.span layoutId="tab" className="absolute inset-0 rounded-md bg-white/10" transition={{type:'spring',duration:.35,bounce:0}}/>}<span className="relative">{x}</span></button>)}</div>
  <div className="flex flex-wrap gap-2"><AnimatePresence mode="popLayout">{list.map(t=>
   <motion.a layout key={t._id} href={t.url} target="_blank" initial={{opacity:0,scale:.9}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:.9}}
    transition={{type:'spring',duration:.35,bounce:0}} className="press rounded-md border border-[var(--line)] px-2.5 py-1 text-sm hover:bg-white/5">{t.name}</motion.a>)}</AnimatePresence></div></div>}
