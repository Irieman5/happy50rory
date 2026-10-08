const reply=(body,status=200)=>Response.json(body,{status,headers:{'Cache-Control':'no-store'}});
export async function onRequestPost({request,env}) {
 if(request.headers.get('Origin')!==new URL(request.url).origin)return reply({error:'Please register through this website.'},403);
 if(Number(request.headers.get('Content-Length')||0)>8192)return reply({error:'Request too large.'},413);
 let b;try{b=await request.json()}catch{return reply({error:'Invalid registration.'},400)}
 const name=String(b.name||'').trim(),email=String(b.email||'').trim().toLowerCase(),guests=Number(b.guests);
 if(b.website||name.length<2||name.length>100||email.length>254||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||!Number.isInteger(guests)||guests<1||guests>10)return reply({error:'Please check your name, email and guest count.'},400);
 try{if(!env.DB)throw Error('Missing DB');const id=crypto.randomUUID();await env.DB.prepare('INSERT INTO reservations (id,name,email,guests,created_at) VALUES (?,?,?,?,?)').bind(id,name,email,guests,new Date().toISOString()).run();return reply({id},201)}catch{return reply({error:'Your RSVP could not be saved. Please try again later.'},503)}
}
