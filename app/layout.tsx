import './globals.css'
import {Instrument_Serif,Inter} from 'next/font/google'
const serif=Instrument_Serif({weight:'400',subsets:['latin'],variable:'--font-serif'})
const sans=Inter({subsets:['latin'],variable:'--font-sans'})
export const metadata={title:'Portfolio',description:'Design engineer portfolio'}
export default function L({children}:{children:React.ReactNode}){
 return <html lang="en" className={`${serif.variable} ${sans.variable}`}><body>{children}</body></html>}
