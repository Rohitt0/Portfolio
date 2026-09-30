import SmoothScroll from '@/components/SmoothScroll'
import './globals.css'
import { Instrument_Serif, Inter } from 'next/font/google'
const serif = Instrument_Serif({ weight: '400', subsets: ['latin'], variable: '--font-serif' })
const sans = Inter({ subsets: ['latin'], variable: '--font-sans' })
export const metadata = { title: 'Portfolio', description: 'Design engineer portfolio' }
const init = `try{var t=localStorage.getItem('theme')||'dark';document.documentElement.classList.toggle('dark',t==='dark')}catch{}`
export default function L({ children }: { children: React.ReactNode }) {
    return <html lang="en" suppressHydrationWarning className={`${serif.variable} ${sans.variable}`}>
        <head><script dangerouslySetInnerHTML={{ __html: init }} /></head><body><SmoothScroll />{children}</body></html>
}