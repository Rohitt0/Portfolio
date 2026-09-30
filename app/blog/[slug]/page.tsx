import { getData, getPost } from '@/lib/cms'
import { AnimatedThemeToggler } from '@/components/ui/animated-theme-toggler'
import { notFound } from 'next/navigation'
export const revalidate = 60
export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { profile: p } = await getData()
  const post = await getPost(slug)
  if (!post) notFound()
  return <main className="col">
    <nav className="pad rule flex items-center justify-between text-sm"><a href="/" className="font-serif text-2xl">{p?.name?.split(' ')[0] ?? 'Home'}</a>
      <div className="flex items-center gap-5 text-[var(--mute)]"><a href="/">Home</a><a href="/projects">Craft</a><a className="text-[var(--fg)]" href="/blog">Blog</a><AnimatedThemeToggler className="hover:bg-[var(--hover)]" /></div></nav>
    <div className="pad rule2 pb-4"><h1 className="font-serif text-3xl">{post.title}</h1>{post.date && <p className="mt-1 text-xs text-[var(--mute)]">{post.date}</p>}</div>
    <div className="pad whitespace-pre-wrap text-[15px] leading-relaxed">{post.body}</div>
    <footer className="rule pad text-center text-xs text-[var(--mute)]">© {new Date().getFullYear()} {p?.name}</footer>
  </main>
}