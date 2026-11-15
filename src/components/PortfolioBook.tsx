"use client";
import Image from 'next/image';
import Correspondence from './Correspondence';
import OrganizationLogo from './OrganizationLogo';
import { useCallback, useEffect, useLayoutEffect, useRef, useState, type ReactNode, type RefObject, type PointerEvent as ReactPointerEvent } from 'react';
import { ArrowDownToLine, ArrowLeft, ArrowRight, ArrowUpRight, BookOpen, List, X } from 'lucide-react';
import { papers, profile, websites } from '@/lib/portfolio';
const chapters = ['Introduction', 'Selected work', 'Research', 'Background', 'Contact'];
const slugs = ['introduction', 'work', 'research', 'background', 'contact'];
const external = { target: '_blank', rel: 'noopener noreferrer' };
const CURL_SEGMENTS = 18;
type TurnController = { seek: (progress: number) => void; settle: (complete: boolean) => void };
type PageDrag = { id: number; x: number; lastX: number; time: number; velocity: number; progress: number; forward: boolean; travel: number };
function TurningLeaf({ front, back, direction, manual, controllerRef, onFinish }: { front: string; back: string; direction: string; manual: boolean; controllerRef: RefObject<TurnController | null>; onFinish: () => void }) {
 const leafRef = useRef<HTMLDivElement>(null);
 useLayoutEffect(() => {
  const leaf = leafRef.current;
  if (!leaf) return;
  const width = leaf.offsetWidth;
  const forward = direction === 'forward';
  leaf.style.setProperty('--leaf-width', `${width}px`);
  const timing: KeyframeAnimationOptions = { duration: 1050, easing: 'linear', fill: 'both' };
  const turn = leaf.animate([
   { transform: 'rotateY(0deg)' },
   { transform: `rotateY(${forward ? -180 : 180}deg)` },
  ], timing);
  const bends = [...leaf.querySelectorAll<HTMLElement>('.curl-strip')].map((strip, index) => {
   const frames = Array.from({ length: 25 }, (_, step) => {
    const progress = step / 24;
    const bend = 1.15 * Math.sin(Math.PI * progress);
    const distance = forward ? index / CURL_SEGMENTS : 1 - index / CURL_SEGMENTS;
    const angle = bend * distance;
    const along = bend < .0001 ? width * distance : width * Math.sin(angle) / bend;
    const depth = bend < .0001 ? 0 : width * (1 - Math.cos(angle)) / bend;
    const x = forward ? along : width - along;
    const tangent = bend * (distance + (forward ? .5 : -.5) / CURL_SEGMENTS);
    return { transform: `translate3d(${x}px,0,${depth}px) rotateY(${(forward ? -1 : 1) * tangent}rad)` };
   });
   return strip.animate(frames, timing);
  });
  const animations = [turn, ...bends];
  animations.forEach(animation => animation.pause());
  let progress = 0;
  let frame = 0;
  const seek = (value: number) => {
   progress = Math.max(0, Math.min(1, value));
   animations.forEach(animation => { animation.currentTime = progress * 1050; });
  };
  const settle = (complete: boolean) => {
   cancelAnimationFrame(frame);
   const start = progress, end = complete ? 1 : 0;
   const duration = manual ? Math.max(180, Math.abs(end - start) * 650) : 1050;
   const started = performance.now();
   const tick = (now: number) => {
    const time = Math.min(1, (now - started) / duration);
    const eased = manual ? 1 - Math.pow(1 - time, 3) : time * time * (3 - 2 * time);
    seek(start + (end - start) * eased);
    if (time < 1) frame = requestAnimationFrame(tick);
    else onFinish();
   };
   frame = requestAnimationFrame(tick);
  };
  controllerRef.current = { seek, settle };
  seek(0);
  if (!manual) settle(true);
  return () => { cancelAnimationFrame(frame); animations.forEach(animation => animation.cancel()); controllerRef.current = null; };
 }, [direction, manual, controllerRef, onFinish]);
 return <div ref={leafRef} className={`curl-leaf ${direction}`}>
  {Array.from({ length: CURL_SEGMENTS }, (_, index) => <div className="curl-strip" key={index} style={{ left: `${index * 100 / CURL_SEGMENTS}%`, width: `${100 / CURL_SEGMENTS}%` }}>
   <div className="curl-face curl-front"><div className="curl-page" style={{ left: `calc(var(--leaf-width) * ${-index / CURL_SEGMENTS})` }} dangerouslySetInnerHTML={{ __html: front }}/></div>
   <div className="curl-face curl-back"><div className="curl-page" style={{ left: `calc(var(--leaf-width) * ${-(CURL_SEGMENTS - 1 - index) / CURL_SEGMENTS})` }} dangerouslySetInnerHTML={{ __html: back }}/></div>
  </div>)}
 </div>;
}
function Authors({ names }: { names: string }) {
 return <>{names.split(/(Ahmad Alfan Alfian Irfan|Alfan Alfian Irfan)/g).map((name, index) =>
  name === 'Ahmad Alfan Alfian Irfan' || name === 'Alfan Alfian Irfan'
   ? <strong key={index}>{name}</strong> : name
 )}</>;
}
function Paper({ children, title, note, page, className = '' }: { children: ReactNode; title: string; note: string; page: number; className?: string }) {
 const contentRef = useRef<HTMLDivElement>(null);
 const [scrollable, setScrollable] = useState(false);
 const [atBottom, setAtBottom] = useState(false);
 useEffect(() => {
  const node = contentRef.current;
  if (!node) return;
  const measure = () => {
   setScrollable(node.scrollHeight > node.clientHeight + 4);
   setAtBottom(node.scrollTop + node.clientHeight >= node.scrollHeight - 4);
  };
  const observer = new ResizeObserver(measure);
  observer.observe(node);
  if (node.firstElementChild) observer.observe(node.firstElementChild);
  node.addEventListener('scroll', measure, { passive: true });
  return () => { observer.disconnect(); node.removeEventListener('scroll', measure); };
 }, []);
 return <section className={`paper ${page % 2 ? 'left-paper' : 'right-paper'} ${className}`}><div className="running-head"><span>{title}</span><span>{note}</span></div><div ref={contentRef} className="paper-content" tabIndex={0} aria-label={`${title} content`}><div className="paper-inner">{children}</div></div><div className="page-bottom"><span className="page-footer-label">{scrollable ? <span className="scroll-note">{atBottom ? 'Scroll up to read again ↑' : 'Scroll inside this page ↓'}</span> : 'Ahmad Alfan Alfian Irfan'}</span><span>{page}</span></div></section>;
}
export default function PortfolioBook() {
 const [chapter, setChapter] = useState(0);
 const [flip, setFlip] = useState<{front:string;back:string;under:string;direction:string;mode:'leaf'|'fade';manual:boolean;single:boolean}|null>(null);
 const flipping = useRef(false);
 const controllerRef = useRef<TurnController | null>(null);
 const drag = useRef<PageDrag | null>(null);
 const pendingTurn = useRef<{ from: number; to: number; commit: boolean } | null>(null);
 const bookRef = useRef<HTMLDivElement>(null);
 const [reading, setReading] = useState(false);
 const [contents, setContents] = useState(false);

 const finishFlip = useCallback(() => {
  const pending = pendingTurn.current;
  if (pending) {
   const destination = pending.commit ? pending.to : pending.from;
   setChapter(destination);
   if (pending.commit) window.location.hash = slugs[destination];
  }
  pendingTurn.current = null;
  drag.current = null;
  setFlip(null);
  flipping.current = false;
 }, []);
 useEffect(() => {
  if (!flip || flip.manual) return;
  const timer = window.setTimeout(finishFlip, flip.mode === 'leaf' ? 1500 : 500);
  return () => window.clearTimeout(timer);
 }, [flip, finishFlip]);

 const navigate = useCallback((next:number, manual = false) => {
  if(next < 0 || next >= chapters.length || next === chapter || flipping.current) return;
  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(!reading && !reduce) {
   const current=bookRef.current?.querySelectorAll('.chapter')[chapter];
   const incoming=bookRef.current?.querySelectorAll('.chapter')[next];
   const forward=next>chapter;
   const snapshot=(root:Element|undefined,selector:string)=>{
    const source=root?.querySelector(selector); if(!source)return '';
    const clone=source.cloneNode(true) as HTMLElement;
    clone.querySelectorAll('[id]').forEach(el=>el.removeAttribute('id'));
    const sourceContents = source.querySelectorAll('.paper-content');
    clone.querySelectorAll('.paper-content').forEach((content, index) => {
     const scroll = sourceContents[index]?.scrollTop || 0;
     if (scroll) content.innerHTML = `<div style="transform:translateY(-${scroll}px)">${content.innerHTML}</div>`;
    });
    const fields = source.querySelectorAll('input, textarea');
    clone.querySelectorAll('input, textarea').forEach((field, index) => {
     const value = (fields[index] as HTMLInputElement | HTMLTextAreaElement).value;
     if (field instanceof HTMLTextAreaElement) field.textContent = value;
     else field.setAttribute('value', value);
    });
    return clone.outerHTML;
   };
   const single = manual && window.innerWidth <= 760;
   const mode = manual || window.innerWidth > 760 ? 'leaf' : 'fade';
   pendingTurn.current = { from: chapter, to: next, commit: !manual };
   setFlip({
    mode, manual, single,
    front: snapshot(current, mode === 'leaf' && !single ? (forward ? '.right-paper' : '.left-paper') : '.spread'),
    back: mode === 'leaf' ? snapshot(incoming, single ? '.spread' : (forward ? '.left-paper' : '.right-paper')) : '',
    under: mode === 'leaf' && !single ? snapshot(current, forward ? '.left-paper' : '.right-paper') : '',
    direction: forward ? 'forward' : 'backward',
   });
   flipping.current=true;
  }
  setChapter(next); setContents(false);
  if (!manual) window.location.hash = slugs[next];
  if(reading) document.getElementById(`chapter-${slugs[next]}`)?.scrollIntoView({behavior:'smooth'});
 },[chapter,reading]);
 const releasePage = useCallback((cancel = false) => {
  const gesture = drag.current;
  if (!gesture) return;
  const commit = !cancel && (gesture.progress >= .45 || (gesture.progress > .12 && gesture.velocity > .55 && performance.now() - gesture.time < 120));
  if (pendingTurn.current) pendingTurn.current.commit = commit;
  drag.current = null;
  if (controllerRef.current) controllerRef.current.settle(commit);
  else finishFlip();
 }, [finishFlip]);
 const grabPage = (event: ReactPointerEvent<HTMLDivElement>) => {
  if (reading || flipping.current || !event.isPrimary || event.button !== 0) return;
  const edge = (event.target as HTMLElement).closest<HTMLElement>('[data-page-edge]');
  if (!edge) return;
  const forward = edge.dataset.pageEdge === 'next';
  const next = chapter + (forward ? 1 : -1);
  if (next < 0 || next >= chapters.length) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { navigate(next); return; }
  event.preventDefault();
  event.currentTarget.setPointerCapture(event.pointerId);
  drag.current = { id: event.pointerId, x: event.clientX, lastX: event.clientX, time: performance.now(), velocity: 0, progress: 0, forward, travel: event.currentTarget.clientWidth * .9 };
  navigate(next, true);
 };
 const pullPage = (event: ReactPointerEvent<HTMLDivElement>) => {
  const gesture = drag.current;
  if (!gesture || gesture.id !== event.pointerId) return;
  const now = performance.now();
  const sign = gesture.forward ? -1 : 1;
  gesture.velocity = sign * (event.clientX - gesture.lastX) / Math.max(1, now - gesture.time);
  gesture.lastX = event.clientX; gesture.time = now;
  gesture.progress = Math.max(0, Math.min(1, sign * (event.clientX - gesture.x) / gesture.travel));
  controllerRef.current?.seek(gesture.progress);
 };
 useEffect(() => {
  const cancel = () => releasePage(true);
  window.addEventListener('blur', cancel);
  window.addEventListener('resize', cancel);
  return () => { window.removeEventListener('blur', cancel); window.removeEventListener('resize', cancel); };
 }, [releasePage]);
 useEffect(()=>{const sync=()=>{const i=slugs.indexOf(window.location.hash.slice(1));if(i>=0)setChapter(i);};sync();window.addEventListener('hashchange',sync);return()=>window.removeEventListener('hashchange',sync);},[]);
 useEffect(()=>{const handle=(e:KeyboardEvent)=>{if(e.key==='Escape'){setContents(false);releasePage(true);}if(e.target instanceof HTMLElement && e.target.closest('input, textarea, select, a, button, [contenteditable]'))return;if(reading)return;if(e.key==='ArrowRight'){e.preventDefault();navigate(chapter+1);}if(e.key==='ArrowLeft'){e.preventDefault();navigate(chapter-1);}};window.addEventListener('keydown',handle);return()=>window.removeEventListener('keydown',handle);},[chapter,navigate,reading,releasePage]);
 const spreads = [
 <div className="spread introduction" key="intro">
  <Paper title="A personal portfolio" note="Yogyakarta, ID" page={1}><div className="intro-main"><h1 className="sr-only">Hi, I’m Alfan.</h1><p className="opening-paragraph">Hi, I’m <strong>Alfan</strong>. You can call me <strong>Pannn</strong>. Whatever brought you here, I hope you leave feeling <span className="nickname-accent">Pannn</span>Tastic. I write code, study Information Technology, and do a bit of AI research.</p><p className="intro-description">The nickname probably gave that one away. Anyway, here are some websites I’ve made, papers I’ve worked on, and a little about me.</p><button className="primary-action" onClick={()=>navigate(1)}>See what I’ve made <ArrowRight size={18}/></button></div></Paper>
  <Paper title="The person behind the pages" note="2026 edition" page={2} className="portrait-page"><figure className="portrait"><Image src="/images/alfan.png" alt="Alfan smiling in glasses and his blue KMTI university jacket" width={1254} height={1254} priority sizes="(max-width: 760px) 85vw, 40vw"/><figcaption>Alfan, or Pannn.</figcaption></figure><div className="portrait-bio"><h2>A little about me.</h2><p>I’m studying Information Technology at Universitas Muhammadiyah Yogyakarta. I’ve been here since 2023. Most of my development work is on the web, from a coffee shop’s online store to a learning platform.</p><p>I also spend time on research. At AI V&amp;V Lab, I work on evaluating AI systems. At OISL, the focus is healthcare, particularly AI for orthopaedic care. Knee-xRAI is one of the papers I’ve contributed to.</p><p>Before that, I interned at PLN Batam and built a substation management system. There’s a more formal account in my CV. This version has a little more room to breathe.</p></div></Paper>
 </div>,
 <div className="spread" key="work">
  <Paper title="Selected work" note="Web & systems" page={3}><h2>A few things<br/>I’ve made.</h2><p>A coffee shop needed an online store. A tutoring service needed a place to manage learning. These are some of the websites I’ve worked on, each with a different job to do.</p><div className="featured-project"><span>Healthcare research</span><h3 className="organization-title"><OrganizationLogo organization="oisl"/><span>OISL</span></h3><p>I built the website for Orthohealth Intelligence System Lab, where I’m also a research intern. The lab works on AI for orthopaedic care. The site introduces the team and brings its projects and publications together.</p><a href="https://oisl-website.pages.dev/" {...external}>Visit the website <ArrowUpRight size={17}/></a></div><a className="text-link more-work" href={profile.github} {...external}>More on GitHub <ArrowUpRight size={16}/></a></Paper>
  <Paper title="The websites" note="Five projects" page={4}><div className="project-list">{websites.map(site=><a className="project-entry" key={site.name} href={site.url} {...external}><div><span className="entry-meta">{site.kind}</span><h3>{site.name}</h3><p>{site.description}</p></div><ArrowUpRight size={20}/></a>)}</div></Paper>
 </div>,
 <div className="spread research-spread" key="research">
  <Paper title="Research notebook" note="2026" page={5}><h2>What I’m<br/>looking into.</h2><p>Some of my research is about driving: what changes when a policy is compressed, or when another driver’s intentions aren’t clear? Some is about healthcare: how can a model explain what it sees in a knee X-ray?</p><article className="featured-paper"><span className="entry-meta">Conference paper · IES 2026</span><h3>HiddenCourtesyMerge-Sim</h3><p>A POMDP Benchmark for Bayesian Hidden-Courtesy Inference in Closed-Loop Merge Negotiation</p><p className="paper-aside">This one looks at merging when you don’t know whether the other driver will give way. Written with Slamet Riyadi for IES 2026.</p><p className="authors"><Authors names="Ahmad Alfan Alfian Irfan & Slamet Riyadi"/></p><a href="https://www.alphaxiv.org/@ahmad-alfan-alfian-irfan" {...external}>View publication profile <ArrowUpRight size={16}/></a></article><div className="research-affiliations"><h3 className="organization-title"><OrganizationLogo organization="vnv"/><span>AI V&amp;V Lab</span></h3><p>As a research intern here, I’ve worked on papers about compressed driving policies, navigation under uncertainty, and connecting software requirements to tests.</p><h3 className="organization-title"><OrganizationLogo organization="oisl"/><span>OISL</span></h3><p>Orthohealth Intelligence System Lab is the healthcare part of my research. I’m an intern here and a co-author of Knee-xRAI, which looks at explainable grading of knee osteoarthritis from X-rays.</p></div></Paper>
  <Paper title="The papers so far" note="arXiv preprints" page={6}><div className="paper-list">{papers.map(p=><article key={p.url}><span className="entry-meta">Preprint · {p.date}</span><h3><a href={p.url} {...external}>{p.title} <ArrowUpRight size={15}/></a></h3><p>{p.description}</p><details><summary>Authors</summary><p className="authors"><Authors names={p.authors}/></p></details></article>)}</div></Paper>
 </div>,
 <div className="spread" key="background">
  <Paper title="Background" note="Learning by doing" page={7}><h2>How I got<br/>here.</h2><p>I’m still at university, so this is a fairly short list. Alongside classes, I’ve had the chance to build systems during an internship and contribute to research with people from different backgrounds.</p><div className="experience"><article><span className="entry-meta">Research</span><h3 className="organization-title"><OrganizationLogo organization="vnv"/><span>AI V&amp;V Lab</span></h3><p>Research intern. My work here includes AI evaluation, driving policies, and verification. The papers are in the research chapter.</p></article><article><span className="entry-meta">Research</span><h3 className="organization-title"><OrganizationLogo organization="oisl"/><span>OISL</span></h3><p>Research intern in healthcare AI, with work on explainable knee X-ray assessment through Knee-xRAI. I also built the lab’s website.</p></article><article><span className="entry-meta">August – September 2025</span><h3 className="organization-title"><OrganizationLogo organization="pln"/><span>PLN Batam</span></h3><p>I built a substation management system during my internship, working with the internal team on what they needed to monitor.</p></article><article><span className="entry-meta">2023 – present</span><h3 className="organization-title"><OrganizationLogo organization="umy"/><span>Universitas Muhammadiyah Yogyakarta</span></h3><p>Studying Information Technology. This is where the coursework, student projects, and KMTI work fit into the story.</p></article></div></Paper>
  <Paper title="Tools and a few other things" note="Always learning" page={8}><h3 className="small-heading">What I work with</h3><dl className="tool-list"><div><dt>Web & backend</dt><dd>JavaScript, TypeScript, React, Next.js, Node.js, Laravel, PHP, Go, REST APIs</dd></div><div><dt>Data & infrastructure</dt><dd>Python, MySQL, PostgreSQL, Docker, Git, automation, machine learning</dd></div><div><dt>Mobile</dt><dd>Flutter, Kotlin</dd></div></dl><h3 className="small-heading">A few other projects</h3><p>Not everything I’ve worked on has a website in the previous chapter. Binakata is about learning and early detection for children with dyslexia. MedSync handles referrals and patient queues. OceanCare brings marine conservation, learning, and participation together.</p><div className="recognition"><p>1st place, UI/UX Competition FAST UTM, 2024.</p><p>3rd place, National Hackathon APTIKOM, 2025.</p></div><a className="text-link" href={profile.cv} {...external}>Read my full CV <ArrowUpRight size={16}/></a></Paper>
 </div>,
 <div className="spread contact-spread" key="contact">
  <Paper title="Correspondence" note="Let’s talk" page={9}><Correspondence side="letter"/></Paper>
  <Paper title="Find me elsewhere" note="Stay in touch" page={10}><Correspondence side="social"/></Paper>
 </div>
 ];
 return <div className={`portfolio ${reading?'reading-mode':''}`}><a href="#book" className="skip-link">Skip to portfolio</a><header className="site-header"><a className="wordmark" href="#introduction" onClick={()=>navigate(0)}>alfan<span>.</span></a><span className="header-note">Alfan, on the web</span><div className="cv-actions"><a className="cv-link" href={profile.cv} {...external}>View CV <ArrowUpRight size={16}/></a><a className="cv-download" href={profile.cv} download aria-label="Download CV PDF" title="Download CV"><ArrowDownToLine size={16}/></a></div></header>
 <main id="book" tabIndex={-1}><div className="book-toolbar"><button className="contents-toggle" onClick={()=>setContents(!contents)} aria-expanded={contents} aria-controls="chapter-navigation">{contents?<X size={17}/>:<List size={17}/>} Contents</button><nav id="chapter-navigation" aria-label="Chapters" className={`chapter-nav ${contents?'is-open':''}`}>{chapters.map((name,i)=><button key={name} onClick={()=>navigate(i)} aria-current={!reading&&chapter===i?'page':undefined}>{name}</button>)}</nav><button className="reading-toggle" onClick={()=>{finishFlip();setReading(!reading);setContents(false);}}>{reading?<BookOpen size={16}/>:<List size={16}/>} {reading?'Book view':'Read as a page'}</button></div>
 <div className="book-stage"><div className={`book ${flip?.manual ? 'is-dragging' : ''}`} ref={bookRef} onPointerDown={grabPage} onPointerMove={pullPage} onPointerUp={event=>{releasePage();if(event.currentTarget.hasPointerCapture(event.pointerId))event.currentTarget.releasePointerCapture(event.pointerId);}} onPointerCancel={()=>releasePage(true)} onLostPointerCapture={()=>releasePage(true)}>{spreads.map((spread,i)=><div className="chapter" key={slugs[i]} id={`chapter-${slugs[i]}`} hidden={!reading&&chapter!==i}>{spread}</div>)}{flip&&!reading&&<div className={`flip-layer ${flip.direction} flip-mode-${flip.mode} ${flip.single ? 'single-leaf' : ''}`} aria-hidden="true" inert>{flip.mode === 'fade' ? <div className="flip-mobile" onAnimationEnd={finishFlip} dangerouslySetInnerHTML={{__html:flip.front}}/> : <><div className="flip-under" dangerouslySetInnerHTML={{__html:flip.under}}/><TurningLeaf manual={flip.manual} controllerRef={controllerRef} front={flip.front} back={flip.back} direction={flip.direction} onFinish={finishFlip}/></>}</div>}{!reading&&<><div className="page-grab page-grab-left" data-page-edge="previous" aria-hidden="true" hidden={chapter===0}/><div className="page-grab page-grab-right" data-page-edge="next" aria-hidden="true" hidden={chapter===chapters.length-1}/></>}</div></div>
 {!reading&&<div className="book-controls"><button onClick={()=>navigate(chapter-1)} disabled={chapter===0} aria-label="Previous chapter"><ArrowLeft size={19}/><span>Previous</span></button><div aria-live="polite"><span>{chapters[chapter]}</span><span className="page-count">{chapter*2+1} — {chapter*2+2} / 10</span></div><button onClick={()=>navigate(chapter+1)} disabled={chapter===4} aria-label="Next chapter"><span>Next chapter</span><ArrowRight size={19}/></button></div>}{!reading&&<p className="page-drag-hint">Hold and drag an outer edge to turn the page.</p>}</main>
 <footer className="site-footer"><span>© {new Date().getFullYear()} Ahmad Alfan Alfian Irfan</span><span className="navigation-hint">Thanks for reading this far.</span><a href={`mailto:${profile.email}`}>Say hello <ArrowUpRight size={14}/></a></footer></div>;
}

