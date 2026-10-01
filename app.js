const $ = id => document.getElementById(id);
if($('year')) $('year').textContent = new Date().getFullYear();
const menu = document.querySelector('.menu-button');
const nav = $('navigation');
function closeMenu(){nav.classList.remove('open');menu.setAttribute('aria-expanded','false');}
menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeMenu();}});
function safeURL(value,local=false){try{const u=new URL(value,location.href);if(!value)return null;if(local&&u.origin===location.origin)return u.href;return u.protocol==='https:'?u.href:null;}catch{return null;}}
function link(label,url){const a=document.createElement('a');a.textContent=label;a.href=url;a.target='_blank';a.rel='noopener noreferrer';return a;}
function titleLines(id,text){const el=$(id);if(!el||typeof text!=='string')return;el.replaceChildren();text.split('\n').forEach((s,i)=>{if(i)el.append(document.createElement('br'));const n=document.createElement(i?'em':'span');n.textContent=s;el.append(n);});}
fetch('site-config.json',{cache:'no-store'}).then(r=>{if(!r.ok)throw Error();return r.json();}).then(c=>{
 titleLines('hero-title',c.heroTitle);titleLines('about-title',c.aboutTitle);
 for(const [id,key] of [['hero-description','heroDescription'],['about-text','aboutText'],['about-second','aboutSecondParagraph']])if($(id)&&typeof c[key]==='string')$(id).textContent=c[key];
 for(const [key,id] of [['streamingLinks','streaming-links'],['socialLinks','social-links']])if($(id))for(const [name,value] of Object.entries(c[key]||{})){const url=safeURL(value);if(url)$(id).append(link(name,url));}
 if($('email-link')&&typeof c.email==='string'&&/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c.email)&&!/[?&#]/.test(c.email)){$('email-link').href='mailto:'+c.email+'?subject='+encodeURIComponent('Austin Westphal Music inquiry');$('email-link').hidden=false;$('email-empty').hidden=true;}
 if($('song-list')){
 const songs=Array.isArray(c.songs)?c.songs:[];
 const valid=songs.filter(s=>safeURL(s.audioFile,true)||safeURL(s.listenUrl));
 if(valid.length){document.querySelector('.music-detail>h3').textContent='Songs for your journey.';$('music-intro').textContent='Listen, reflect, and carry a little hope with you.';$('music-empty').hidden=true;}
 valid.forEach(s=>{const row=document.createElement('article');row.className='song';const h=document.createElement('h4');h.textContent=s.title||'Untitled';row.append(h);if(s.description){const t=document.createElement('small');t.textContent=s.description;row.append(t);}const url=safeURL(s.audioFile,true);if(url){const audio=document.createElement('audio');audio.controls=true;audio.preload='metadata';audio.src=url;audio.setAttribute('aria-label','Listen to '+h.textContent);audio.addEventListener('play',()=>document.querySelectorAll('audio').forEach(other=>{if(other!==audio)other.pause();}));row.append(audio);}const listen=safeURL(s.listenUrl);if(listen)row.append(link('Listen on your favorite platform',listen));$('song-list').append(row);});
 }
 if($('event-list')){
 const events=Array.isArray(c.events)?c.events:[];
 if(events.length)$('event-list').replaceChildren();
 events.forEach(e=>{const row=document.createElement('article');row.className='event';const date=document.createElement('span');date.className='eyebrow';date.textContent=e.date||'Date to be announced';const info=document.createElement('div');const h=document.createElement('h3');h.textContent=e.title||'Worship gathering';const p=document.createElement('p');p.textContent=e.location||'';info.append(h,p);row.append(date,info);const url=safeURL(e.ticketUrl);if(url){const a=link('Event details',url);a.className='text-link event-status';row.append(a);}$('event-list').append(row);});
 }
}).catch(()=>{if($('config-error'))$('config-error').hidden=false;});
// Resource pages share the same published content as the artist pages.
if($('resource-list'))fetch('site-config.json',{cache:'no-store'}).then(r=>{if(!r.ok)throw Error();return r.json();}).then(c=>{
 const kind=$('resource-list').dataset.kind;
 const resources=(Array.isArray(c[kind])?c[kind]:[]).filter(r=>r.title&&(r.text||safeURL(r.fileUrl,true)));
 $('resource-empty').hidden=resources.length>0;
 function render(){const query=$('resource-search').value.trim().toLowerCase();const visible=resources.filter(r=>[r.title,r.artist,r.description,r.key].join(' ').toLowerCase().includes(query));$('resource-list').replaceChildren();$('resource-count').textContent=resources.length?`${visible.length} of ${resources.length} ${kind==='lyrics'?'documents':'charts'}`:'';$('resource-no-results').hidden=!resources.length||visible.length>0;
 visible.forEach(r=>{const card=document.createElement('article');card.className='resource-card';const tag=document.createElement('p');tag.className='eyebrow';tag.textContent=kind==='lyrics'?'LYRICS DOCUMENT':'CHORD CHART';const h=document.createElement('h2');h.textContent=r.title;card.append(tag,h);if(r.artist){const p=document.createElement('p');p.className='resource-meta';p.textContent=r.artist;card.append(p);}if(r.key){const p=document.createElement('p');p.className='resource-meta';p.textContent='Key: '+r.key;card.append(p);}if(r.description){const p=document.createElement('p');p.textContent=r.description;card.append(p);}const url=safeURL(r.fileUrl,true);if(url){const a=link('Open PDF ↗',url);a.className='button outline';card.append(a);}if(r.text){const d=document.createElement('details');const summary=document.createElement('summary');summary.textContent=kind==='lyrics'?'Read lyrics':'View chord chart';const pre=document.createElement('pre');pre.textContent=r.text;d.append(summary,pre);const print=document.createElement('button');print.type='button';print.className='text-button';print.textContent='Print';print.addEventListener('click',()=>{document.querySelectorAll('.resource-card').forEach(x=>x.classList.remove('print-resource'));card.classList.add('print-resource');const wasOpen=d.open;d.open=true;window.print();d.open=wasOpen;card.classList.remove('print-resource');});d.append(print);card.append(d);}$('resource-list').append(card);});}
 $('resource-search').addEventListener('input',render);render();
}).catch(()=>{$('config-error').hidden=false;});
