import Image from 'next/image'
import {PortableText} from 'next-sanity'
import {getData,img} from '@/lib/sanity'
import {Stagger,Item} from '@/components/Motion'
import TechGrid from '@/components/TechGrid'
export const revalidate=60
const S=({title,extra,children}:any)=><section className="rule"><div className="pad flex items-baseline justify-between"><h2>{title}</h2>{extra}</div>{children}</section>
export default async function Home(){
 const {profile:p,projects,tech,highlights}=await getData()
 return <main className="col">
  <nav className="pad flex items-center justify-between text-sm"><span className="font-serif text-2xl">{p?.name?.split(' ')[0]??'Home'}</span>
   <div className="flex gap-5 text-[var(--mute)]"><a className="text-white" href="/">Home</a><a href="#projects">Projects</a><a href="#tech">Stack</a></div></nav>
  {p?.banner&&<Image src={img(p.banner).width(1360).height(340).url()} alt="" width={680} height={170} priority className="w-full"/>}
  <Stagger className="pad flex items-center gap-5">
   {p?.avatar&&<Item><Image src={img(p.avatar).width(200).height(200).url()} alt={p.name} width={100} height={100} className="rounded-2xl"/></Item>}
   <div><Item><h1 className="font-serif text-4xl">{p?.name??'Your name'}</h1></Item><Item><p className="text-[var(--mute)]">{p?.role??'Add your profile in /studio'}</p></Item>
   <Item><p className="text-xs text-[var(--mute)]">{p?.location}</p></Item></div></Stagger>
  {p?.about&&<S title="About"><div className="pad prose-invert space-y-3 text-[15px] leading-relaxed"><PortableText value={p.about}/></div></S>}
  {p?.socials?.length>0&&<S title="Contact"><div className="pad flex flex-wrap gap-2">{p.socials.map((s:any)=><a key={s.label} href={s.url} target="_blank" className="press rounded-lg border border-[var(--line)] px-3 py-1.5 text-sm hover:bg-white/5">{s.label} ↗</a>)}</div></S>}
  <div id="projects"><S title="Projects"><Stagger className="grid gap-px sm:grid-cols-2">
   {projects.map((x:any)=><Item key={x._id}><article className="group p-4">
    <div className="relative overflow-hidden rounded-lg">{x.cover&&<Image src={img(x.cover).width(640).height(440).url()} alt={x.title} width={320} height={220} className="w-full transition-transform duration-500 ease-[cubic-bezier(.23,1,.32,1)] group-hover:scale-[1.03]"/>}
     {x.badge&&<span className="absolute right-2 top-2 rounded bg-lime-300 px-2 py-0.5 text-xs font-medium text-black">{x.badge}</span>}</div>
    <div className="mt-3 flex items-baseline justify-between"><h3 className="font-medium">{x.title}</h3><span className="text-xs text-emerald-400">{x.status}</span></div>
    <p className="text-xs text-[var(--mute)]">{x.tagline}</p><p className="mt-2 text-sm text-[var(--mute)]">{x.description}</p>
    <div className="mt-3 flex flex-wrap items-center gap-1.5">{x.tech?.map((t:string)=><span key={t} className="rounded bg-white/5 px-2 py-0.5 text-xs">{t}</span>)}
     <span className="ml-auto flex gap-3 text-sm">{x.liveUrl&&<a href={x.liveUrl} target="_blank">Live</a>}{x.repoUrl&&<a href={x.repoUrl} target="_blank">Code</a>}</span></div></article></Item>)}
  </Stagger></S></div>
  {tech.length>0&&<div id="tech"><S title="Tech Stack"><TechGrid tech={tech}/></S></div>}
  {highlights.length>0&&<S title="Highlights"><div className="pad grid gap-3">{highlights.map((h:any)=><a key={h._id} href={h.url} target="_blank" className="press rounded-lg border border-[var(--line)] p-3 text-sm hover:bg-white/5"><b>{h.author}</b> <span className="text-[var(--mute)]">{h.handle}</span><p className="mt-1">{h.quote}</p></a>)}</div></S>}
  <S title={p?.ctaText??'Get in touch'}><div className="pad text-center">{p?.quote&&<p className="font-serif text-xl">“{p.quote}”<br/><span className="text-sm text-[var(--mute)]">{p.quoteAuthor}</span></p>}</div></S>
  <footer className="rule pad text-center text-xs text-[var(--mute)]">© {new Date().getFullYear()} {p?.name}</footer>
 </main>}
