import {defineField as f, defineType as t} from 'sanity'
const order = f({name:'order',type:'number',title:'Sort order (low = first)'})
export const schemaTypes = [
 t({name:'profile',type:'document',title:'Profile',fields:[
  f({name:'name',type:'string'}),f({name:'role',type:'string'}),f({name:'location',type:'string'}),
  f({name:'avatar',type:'image'}),f({name:'banner',type:'image'}),
  f({name:'about',type:'array',of:[{type:'block'}],title:'About (bullets or paragraphs)'}),
  f({name:'socials',type:'array',of:[{type:'object',fields:[f({name:'label',type:'string'}),f({name:'url',type:'url'})]}]}),
  f({name:'ctaText',type:'string'}),f({name:'quote',type:'string'}),f({name:'quoteAuthor',type:'string'})]}),
 t({name:'project',type:'document',title:'Project',orderings:[{title:'Order',name:'o',by:[{field:'order',direction:'asc'}]}],fields:[
  f({name:'title',type:'string'}),f({name:'tagline',type:'string'}),f({name:'description',type:'text'}),
  f({name:'cover',type:'image'}),f({name:'status',type:'string',options:{list:['Live','In progress','Archived']}}),
  f({name:'badge',type:'string',title:'Ribbon (e.g. 600+ users)'}),
  f({name:'tech',type:'array',of:[{type:'string'}]}),f({name:'liveUrl',type:'url'}),f({name:'repoUrl',type:'url'}),order]}),
 t({name:'tech',type:'document',title:'Tech',fields:[f({name:'name',type:'string'}),
  f({name:'category',type:'string',options:{list:['Frontend','Backend','Design','Tools']}}),f({name:'url',type:'url'}),order]}),
 t({name:'testimonial',type:'document',title:'Highlight',fields:[f({name:'author',type:'string'}),f({name:'handle',type:'string'}),
  f({name:'quote',type:'text'}),f({name:'url',type:'url'})]}),
]
