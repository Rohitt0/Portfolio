import { getData, getPost, img } from "@/lib/cms"
import SiteNav from "@/components/SiteNav"
import { notFound } from "next/navigation"
import Image from 'next/image'


export const revalidate = 60

export default async function Post({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const { profile: p } = await getData()
  const post = await getPost(slug)

  if (!post) {
    notFound()
  }

  return (
    <main className="col">
      <SiteNav name={p?.name?.split(" ")[0] ?? "Home"} />

      <div className="pad rule2 pb-4">
        <h1 className="font-serif text-3xl">
          {post.title}
        </h1>

        {post.date && (
          <p className="mt-1 text-xs text-[var(--mute)]">
            {post.date}
          </p>
        )}
      </div>

      <div className="pad whitespace-pre-wrap text-[15px] leading-relaxed">
        {post.body}
      </div>

      <footer className="rule pad text-center text-xs text-[var(--mute)]">
        © {new Date().getFullYear()} {p?.name}
      </footer>
    </main>
  )
}