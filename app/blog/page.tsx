import { getData } from '@/lib/cms'
import { AnimatedThemeToggler } from '@/components/ui/animated-theme-toggler'
export const revalidate = 60
export default async function BlogPage() {
  const { profile: p, blog } = await getData()
  return <main className="col">
    <nav className="pad rule flex items-center justify-between text-sm"><a href="/" className="font-serif text-2xl">{p?.name?.split(' ')[0] ?? 'Home'}</a>
      <div className="flex items-center gap-5 text-[var(--mute)]"><a href="/">Home</a><a href="/projects">Craft</a><a className="text-[var(--fg)]" href="/blog">Blog</a><AnimatedThemeToggler className="hover:bg-[var(--hover)]" /></div></nav>
    <div className="pad rule2 pb-4"><h1 className="font-serif text-3xl">Blog</h1></div>
    <div className="pad grid gap-3">
      {blog.map((post: any) => <a key={post._id} href={`/blog/${post.slug}`} className="press rounded-lg border border-[var(--line)] p-4 hover:bg-[var(--hover)]">
        <h3 className="font-medium">{post.title}</h3><p className="mt-1 text-sm text-[var(--mute)]">{post.excerpt}</p>
        {post.date && <p className="mt-2 text-xs text-[var(--mute)]">{post.date}</p>}</a>)}
      {blog.length === 0 && <p className="text-sm text-[var(--mute)]">No posts yet — add one in /admin.</p>}
    </div>
    <footer className="rule pad text-center text-xs text-[var(--mute)]">© {new Date().getFullYear()} {p?.name}</footer>
  </main>
}