import Image from 'next/image'
import { getData, img } from '@/lib/cms'
import { Stagger, Item } from '@/components/Motion'
import SocialIcon from '@/components/SocialIcon'
import { AnimatedThemeToggler } from '@/components/ui/animated-theme-toggler'
import TechGrid from '@/components/TechGrid'
export const revalidate = 60
const S = ({ title, extra, children }: any) => <section><div className="divider" /><div className="pad rule2 pb-4 flex items-baseline justify-between"><h2>{title}</h2>{extra}</div>{children}</section>
export default async function Home() {
   const { profile: p, projects, tech, highlights } = await getData()
   return <main className="col">
      <nav className="pad rule flex items-center justify-between text-sm"><span className="font-serif text-2xl">{p?.name?.split(' ')[0] ?? 'Home'}</span>

         <div className="flex items-center gap-5 text-[var(--mute)]"><a className="text-[var(--fg)]" href="/">Home</a><a href="#projects">Craft</a><a href="#tech">Stack</a><AnimatedThemeToggler className="hover:bg-[var(--hover)]" /></div></nav>
      {p?.banner && <div className="rule px-2 pb-2"><Image unoptimized src={img(p.banner)} alt="" width={680} height={170} priority className="w-full h-52 object-cover rounded-2xl" /></div>}
      <Stagger className="pad flex items-center gap-5">
         {p?.avatar && <Item><Image unoptimized src={img(p.avatar)} alt={p.name} width={100} height={100} className="rounded-2xl" /></Item>}
         <div><Item><h1 className="font-serif text-4xl">{p?.name ?? 'Your name'}</h1></Item><Item><p className="text-[var(--mute)]">{p?.role ?? 'Add your profile in /studio'}</p></Item>
            <Item><p className="text-xs text-[var(--mute)]">{p?.location}</p></Item></div></Stagger>
      {p?.about && <S title="Who I Am"><div className="pad prose-invert space-y-3 text-[15px] leading-relaxed">{p.about.split('\n').filter(Boolean).map((l: string) => <p key={l}>{l}</p>)}</div></S>}
      {p?.socials?.length > 0 && <S title="Contact"><div className="pad flex flex-wrap gap-2">{p.socials.map((s: any) => <a key={s.label} href={s.url} target="_blank" className="press inline-flex items-center gap-2.5 rounded-xl px-2 py-1.5 text-sm hover:bg-white/5"><SocialIcon name={s.label} />{s.label}<span className="text-[var(--mute)]">↗</span></a>)}</div></S>}
      <div id="projects"><S title="Projects"><Stagger className="grid gap-px sm:grid-cols-2">
         {projects.map((x: any) => <Item key={x._id}><article className="group p-4">
            <div className="relative overflow-hidden rounded-lg">{x.cover && <Image unoptimized src={img(x.cover)} alt={x.title} width={320} height={220} className="w-full transition-transform duration-500 ease-[cubic-bezier(.23,1,.32,1)] group-hover:scale-[1.03]" />}
               {x.badge && <span className="absolute right-2 top-2 rounded bg-lime-300 px-2 py-0.5 text-xs font-medium text-black">{x.badge}</span>}</div>
            <div className="mt-3 flex items-baseline justify-between"><h3 className="font-medium">{x.title}</h3><span className="text-xs text-emerald-400">{x.status}</span></div>
            <p className="text-xs text-[var(--mute)]">{x.tagline}</p><p className="mt-2 text-sm text-[var(--mute)]">{x.description}</p>
            <div className="mt-3 flex flex-wrap items-center gap-1.5">{x.tech?.map((t: string) => <span key={t} className="rounded bg-white/5 px-2 py-0.5 text-xs">{t}</span>)}
               <span className="ml-auto flex gap-3 text-sm">{x.liveUrl && <a href={x.liveUrl} target="_blank">Live</a>}{x.repoUrl && <a href={x.repoUrl} target="_blank">Code</a>}</span></div></article></Item>)}
      </Stagger></S></div>
      {tech.length > 0 && <div id="tech"><S title="Tech Stack"><TechGrid tech={tech} /></S></div>}
      {highlights.length > 0 && <S title="Highlights"><div className="pad grid gap-3">{highlights.map((h: any) => <a key={h._id} href={h.url} target="_blank" className="press rounded-lg border border-[var(--line)] p-3 text-sm hover:bg-white/5"><b>{h.author}</b> <span className="text-[var(--mute)]">{h.handle}</span><p className="mt-1">{h.quote}</p></a>)}</div></S>}
      <S title={p?.ctaText ?? 'Get in touch'}><div className="pad text-center">
         {p?.quote && <>
            <div className="font-serif text-4xl text-[var(--mute)]">&rdquo;</div>
            <p className="font-serif text-2xl italic leading-snug">"{p.quote}"</p>
            {p?.quoteAuthor && <div className="mt-4 flex items-center justify-center gap-3 text-xs uppercase tracking-widest text-[var(--mute)]">
               <span className="h-px w-8 bg-[var(--line)]" />{p.quoteAuthor}<span className="h-px w-8 bg-[var(--line)]" />
            </div>}
         </>}
      </div></S>
      <footer className="rule pad text-center text-xs text-[var(--mute)]">© {new Date().getFullYear()} {p?.name}</footer>
   </main>
}