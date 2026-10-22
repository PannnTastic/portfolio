'use client';
import { useState, type FormEvent } from 'react';
import { ArrowUpRight, ArrowDownToLine, Mail, Github, Linkedin, Instagram, GraduationCap } from 'lucide-react';
import { profile } from '@/lib/portfolio';
const socials = [
 {name:'LinkedIn',handle:'Ahmad Alfan Alfian Irfan',url:profile.linkedin,icon:<Linkedin size={22}/>},
 {name:'GitHub',handle:'@PannnTastic',url:profile.github,icon:<Github size={22}/>},
 {name:'Google Scholar',handle:'Publications & preprints',url:profile.scholar,icon:<GraduationCap size={24}/>},
 {name:'ORCID',handle:'0009-0003-1793-2592',url:profile.orcid,icon:<svg viewBox="0 0 72 72" width="24" height="24" aria-hidden="true"><circle cx="36" cy="36" r="32" fill="none" stroke="currentColor" strokeWidth="5"/><g transform="translate(18.868966, 12.910345)" fill="currentColor">
                        <polygon points="5.03734929 39.1250878 0.695429861 39.1250878 0.695429861 9.14431787 5.03734929 9.14431787 5.03734929 22.6930505 5.03734929 39.1250878"></polygon>
                        <path d="M11.409257,9.14431787 L23.1380784,9.14431787 C34.303014,9.14431787 39.2088191,17.0664074 39.2088191,24.1486995 C39.2088191,31.846843 33.1470485,39.1530811 23.1944669,39.1530811 L11.409257,39.1530811 L11.409257,9.14431787 Z M15.7511765,35.2620194 L22.6587756,35.2620194 C32.49858,35.2620194 34.7541226,27.8438084 34.7541226,24.1486995 C34.7541226,18.1301509 30.8915059,13.0353795 22.4332213,13.0353795 L15.7511765,13.0353795 L15.7511765,35.2620194 Z"></path>
                        <path d="M5.71401206,2.90182329 C5.71401206,4.441452 4.44526937,5.72914146 2.86638958,5.72914146 C1.28750978,5.72914146 0.0187670918,4.441452 0.0187670918,2.90182329 C0.0187670918,1.33420133 1.28750978,0.0745051096 2.86638958,0.0745051096 C4.44526937,0.0745051096 5.71401206,1.36219458 5.71401206,2.90182329 Z"></path>
                    </g></svg>},
 {name:'Instagram',handle:'@pannnyatiga_',url:profile.instagram,icon:<Instagram size={23}/>},
 {name:'Email',handle:profile.email,url:`mailto:${profile.email}`,icon:<Mail size={23}/>},
];
export default function Correspondence({side}:{side:'letter'|'social'}) {
 const [draft,setDraft]=useState('');
 const [copied,setCopied]=useState(false);
 const [copyError,setCopyError]=useState(false);
 function submit(e:FormEvent<HTMLFormElement>){
  e.preventDefault(); const data=new FormData(e.currentTarget);
  const body=`Hi Alfan,\n\n${data.get('message')}\n\n${data.get('name')}\n${data.get('email')}`;
  setDraft(body);setCopied(false);setCopyError(false);
  window.location.href=`mailto:${profile.email}?subject=${encodeURIComponent(`A note from ${data.get('name')}`)}&body=${encodeURIComponent(body)}`;
 }
 if(side==='social')return <div className="correspondence-social"><h2>Find me<br/>elsewhere.</h2><div className="social-directory">{socials.map(s=><a href={s.url} key={s.name} target={s.name==='Email'?undefined:'_blank'} rel="noopener noreferrer"><span className="social-icon" aria-hidden="true">{s.icon}</span><span className="social-label"><strong>{s.name}</strong><small>{s.handle}</small></span><ArrowUpRight size={16} aria-hidden="true"/></a>)}</div><div className="contact-postscript"><h3>Prefer another way?</h3><p>GitHub has my code, Scholar has the papers, and Instagram is @pannnyatiga_. Pick whichever feels right. And thanks for taking a look around.</p><a href={profile.cv} download>The formal version: my CV <ArrowDownToLine size={16}/></a></div></div>;
 return <div className="correspondence-letter"><h2>Say hello.</h2><p>Want to work on a website together? Talk about a paper? Or just say hi? You can write to me here. You don’t need a polished pitch.</p><form onSubmit={submit} className="letter-form"><label htmlFor="letter-name">Your name</label><input id="letter-name" name="name" autoComplete="name" placeholder="What should I call you?" required maxLength={100}/><label htmlFor="letter-email">Your email</label><input id="letter-email" name="email" type="email" autoComplete="email" placeholder="someone@somewhere.com" required maxLength={200}/><label htmlFor="letter-message">Your message</label><textarea id="letter-message" name="message" placeholder="What’s on your mind?" required minLength={5} maxLength={3000} rows={4}/><p className="form-note">This opens your email app with your note ready to send.</p><button className="primary-action" type="submit">Open email draft <ArrowUpRight size={17}/></button></form>{draft&&<div className="draft-status" role="status"><p>Your draft is ready. If your email app didn’t open, copy the note and email it to <a href={`mailto:${profile.email}`}>{profile.email}</a>.</p><button onClick={async()=>{try{await navigator.clipboard.writeText(draft);setCopied(true);setCopyError(false);}catch{setCopyError(true);}}}>{copied?'Note copied':'Copy note'}</button>{copyError&&<><p>Select and copy your note below.</p><textarea aria-label="Your email draft" readOnly value={draft}/></>}</div>}</div>;
}
