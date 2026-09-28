// Reads Decap-managed JSON files from /content at build time.
import fs from 'fs'
import path from 'path'
const dir = path.join(process.cwd(), 'content')
const read = (f: string) => { try { return JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')) } catch { return null } }
const byOrder = (a: any, b: any) => (a.order ?? 999) - (b.order ?? 999)
export const img = (s: any): string => (typeof s === 'string' ? s : '')
export async function getData() {
  const profile = read('profile.json')
  let projects: any[] = []
  try {
    projects = fs.readdirSync(path.join(dir, 'projects')).filter(f => f.endsWith('.json'))
      .map(f => ({ ...read('projects/' + f), _id: f })).sort(byOrder)
  } catch {}
  const tech = (read('tech.json')?.items ?? []).map((t: any, i: number) => ({ ...t, _id: 't' + i })).sort(byOrder)
  const highlights = (read('highlights.json')?.items ?? []).map((h: any, i: number) => ({ ...h, _id: 'h' + i }))
  return { profile, projects, tech, highlights }
}
