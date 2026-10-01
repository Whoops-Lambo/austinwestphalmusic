const $ = id => document.getElementById(id);
$('year').textContent = new Date().getFullYear();
const menu = document.querySelector('.menu-button');
const nav = $('navigation');
function closeMenu(){nav.classList.remove('open');menu.setAttribute('aria-expanded','false');}
menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeMenu();}});
function safeURL(value,local=false){try{const u=new URL(value,location.href);if(!value)return null;if(local&&u.origin===location.origin)return u.href;return u.protocol==='https:'?u.href:null;}catch{return null;}}
function link(label,url){const a=document.createElement('a');a.textContent=label;a.href=url;a.target='_blank';a.rel='noopener noreferrer';return a;}
function titleLines(id,text){if(typeof text!=='string')return;const el=$(id);el.replaceChildren();text.split('\n').forEach((s,i)=>{if(i)el.append(document.createElement('br'));const n=document.createElement(i?'em':'span');n.textContent=s;el.append(n);});}
fetch('site-config.json',{cache:'no-store'}).then(r=>{if(!r.ok)throw Error();return r.json();}).then(c=>{
 titleLines('hero-title',c.heroTitle);titleLines('about-title',c.aboutTitle);
 for(const [id,key] of [['hero-description','heroDescription'],['about-text','aboutText'],['about-second','aboutSecondParagraph']])if(typeof c[key]==='string')$(id).textContent=c[key];
 for(const [key,id] of [['streamingLinks','streaming-links'],['socialLinks','social-links']])for(const [name,value] of Object.entries(c[key]||{})){const url=safeURL(value);if(url)$(id).append(link(name,url));}
 if(typeof c.email==='string'&&/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c.email)&&!/[?&#]/.test(c.email)){$('email-link').href='mailto:'+c.email+'?subject='+encodeURIComponent('Austin Westphal Music inquiry');$('email-link').hidden=false;$('email-empty').hidden=true;}
 const songs=Array.isArray(c.songs)?c.songs:[];
 const valid=songs.filter(s=>safeURL(s.audioFile,true)||safeURL(s.listenUrl));
 if(valid.length){document.querySelector('.music-detail>h3').textContent='Songs for your journey.';$('music-intro').textContent='Listen, reflect, and carry a little hope with you.';$('music-empty').hidden=true;}
 valid.forEach(s=>{const row=document.createElement('article');row.className='song';const h=document.createElement('h4');h.textContent=s.title||'Untitled';row.append(h);if(s.description){const t=document.createElement('small');t.textContent=s.description;row.append(t);}const url=safeURL(s.audioFile,true);if(url){const audio=document.createElement('audio');audio.controls=true;audio.preload='metadata';audio.src=url;audio.setAttribute('aria-label','Listen to '+h.textContent);audio.addEventListener('play',()=>document.querySelectorAll('audio').forEach(other=>{if(other!==audio)other.pause();}));row.append(audio);}const listen=safeURL(s.listenUrl);if(listen)row.append(link('Listen on your favorite platform',listen));$('song-list').append(row);});
 const events=Array.isArray(c.events)?c.events:[];
 if(events.length)$('event-list').replaceChildren();
 events.forEach(e=>{const row=document.createElement('article');row.className='event';const date=document.createElement('span');date.className='eyebrow';date.textContent=e.date||'Date to be announced';const info=document.createElement('div');const h=document.createElement('h3');h.textContent=e.title||'Worship gathering';const p=document.createElement('p');p.textContent=e.location||'';info.append(h,p);row.append(date,info);const url=safeURL(e.ticketUrl);if(url){const a=link('Event details',url);a.className='text-link event-status';row.append(a);}$('event-list').append(row);});
}).catch(()=>{$('config-error').hidden=false;});
