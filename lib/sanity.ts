import {createClient} from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
const cfg={projectId:process.env.NEXT_PUBLIC_SANITY_PROJECT_ID||'x',dataset:process.env.NEXT_PUBLIC_SANITY_DATASET||'production',apiVersion:'2025-01-01',useCdn:true}
export const client=createClient(cfg)
const b=imageUrlBuilder(cfg)
export const img=(s:any)=>b.image(s).auto('format')
export async function getData(){
 const q=`{"profile":*[_type=="profile"][0],"projects":*[_type=="project"]|order(order asc),"tech":*[_type=="tech"]|order(order asc),"highlights":*[_type=="testimonial"]}`
 try{return await client.fetch(q,{}, {next:{revalidate:60}})}catch{return {profile:null,projects:[],tech:[],highlights:[]}}
}
