/** Browser-side review-5 checks, shared by arrival and expanded-state passes. */
export function review5Contract() {
  const issues = [];
  const box = (el) => el.getBoundingClientRect();
  const visible = (el) => el.checkVisibility() && box(el).height > 0;
  const clean = (text) => text.replace(/[\u00a0\u2060]/g, ' ').replace(/\s+/g, ' ').trim().replace(/[.]$/, '').toLowerCase();
  const check = (ok, rule, detail) => { if (!ok) issues.push({ rule, detail }); };
  const packages = document.querySelector('.packages');
  if (packages) {
    const details = packages.querySelector('details');
    if (!details.dataset.qaExpanded) check(!details.open, 'packages-closed', location.pathname);
    const headings = [...document.querySelectorAll('main h1, main h2, main h3, main h4')];
    headings.forEach((h, i) => check(!i || clean(h.textContent) !== clean(headings[i - 1].textContent), 'consecutive-heading-repeat', h.textContent));
    const title = clean(packages.querySelector('h2').textContent);
    for (const row of packages.querySelectorAll('.capabilities li')) check(clean(row.textContent) !== title, 'package-row-repeat', row.textContent);
    if (innerWidth === 1440 && !details.open) check(box(packages).height <= 900, 'packages-height', box(packages).height);
    const lead = clean(packages.querySelector('.lead').textContent);
    const body = packages.querySelector('.prose');
    check(clean(body.firstElementChild.textContent) !== lead, 'package-lead-repeat', lead);
    check(!body.querySelector('h2'), 'package-heading-level', location.pathname);
    for (const p of body.querySelectorAll('p')) {
      const next = p.nextElementSibling;
      if (next?.matches('h3,h4')) check(clean(p.textContent) !== clean(next.textContent), 'package-teaser-repeat', p.textContent);
    }
    if (document.documentElement.lang === 'zh') check([...packages.querySelectorAll('.capabilities li')].map(el=>el.textContent).join('|') === [...body.querySelectorAll('h3')].map(el=>el.textContent).join('|'), 'package-names-from-headings', location.pathname);
    const rule = getComputedStyle(details);
    check(rule.borderTopWidth === '1px' && rule.marginTop === '-1px' && Math.abs(box(details).width-box(packages).width)<1, 'capabilities-closing-rule', box(details).toJSON());
  }
  for (const facts of document.querySelectorAll('.facts')) {
    const labels = [...facts.querySelectorAll('dt')].map(el=>clean(el.textContent));
    check(labels.length >= 2 && labels.length <= 4 && new Set(labels).size === labels.length, 'facts-distinct-rows', labels);
    const opening = [document.querySelector('.page-hero .lead'), ...[...document.querySelector('.article-layout .prose').children].slice(0,3)].filter(Boolean).map(el=>clean(el.textContent));
    for (const value of facts.querySelectorAll('dd')) check(!opening.some(text=>text.includes(clean(value.textContent))), 'facts-opening-repeat', value.textContent);
  }
  const contents = [...document.querySelectorAll('.contents a')];
  if (scrollY === 0) check(!contents.some(el=>el.hasAttribute('aria-current')), 'rail-idle-on-arrival', location.pathname);
  if (contents.length && innerHeight+scrollY >= document.documentElement.scrollHeight-2) check(contents.at(-1).hasAttribute('aria-current'), 'rail-last-at-bottom', location.pathname);
  if (innerWidth === 390) {
    for (const li of document.querySelectorAll('.capabilities li')) {
      const range = document.createRange();range.selectNodeContents(li);
      // Range bounds include all wrapped lines; vertical padding is 32 plus the closing rule.
      check(Math.abs(box(li).height-range.getBoundingClientRect().height-33-(parseFloat(getComputedStyle(li).lineHeight)-range.getClientRects()[0].height))<=1, 'capability-content-height', {text:li.textContent,height:box(li).height,content:range.getBoundingClientRect().height});
    }
    const tabs=document.querySelector('.section-nav');
    const active=tabs?.querySelector('[aria-current="page"]');
    if (active && active.previousElementSibling) {
      check(box(active).left>=52,'active-tab-outside-fade',box(active).left);
      const previous=box(active.previousElementSibling);
      check(previous.right>0 && previous.left<52,'previous-tab-visible',previous.toJSON());
    }
  }
  if (innerWidth < 1080 && document.querySelector('.main-navigation.is-open')) {
    for (const row of document.querySelectorAll('.mobile-services-label, .dropdown > a:not(.dropdown-intro), .main-navigation > a:not(.header-cta)')) {
      if (visible(row)) check(Math.abs(box(row).height-57)<=0.5,'mobile-menu-row-height',{text:row.textContent,height:box(row).height});
    }
  }
  for (const email of document.querySelectorAll('.email-address')) {
    const link=email.closest('a'), column=link.closest('.contact-details, .footer-action, .footer-grid > div') || link.parentElement;
    for (const part of email.children) if(part.tagName==='SPAN') {
      // The inline SVG's vertical alignment differs from the text; test text nodes separately.
      const textRange=document.createRange();textRange.selectNode(part.firstChild);
      check([...textRange.getClientRects()].filter(r=>r.width>0).length===1 && getComputedStyle(part).whiteSpace==='nowrap','email-wrap-only-at-at',part.textContent);
      check(box(part).right<=box(column).right+1,'email-column-containment',{text:part.textContent,right:box(part).right,column:box(column).right});
    }
    check(!link.querySelector('small') && email.querySelector('wbr') && email.querySelector('.email-domain .icon'),'email-anatomy',link.textContent);
  }
  const hero=document.querySelector('.page-hero');
  const start=document.querySelector('.article-layout, .contact-layout');
  if(hero && start && [390,1440].includes(innerWidth)) {
    const expected=innerWidth===390?40:64;
    const first=start.matches('.contact-layout') ? start.querySelector('.enquiry-form') : innerWidth===390 && start.querySelector('.mobile-facts') ? start.querySelector('.mobile-facts .eyebrow') : start.querySelector('.prose > :first-child');
    // References have their clients strip between the hero and article.
    const preceding=start.previousElementSibling;
    check(Math.abs(box(first).top-box(preceding).bottom-expected)<=2,'hairline-gap',{gap:box(first).top-box(preceding).bottom,expected});
  }
  // Round 6 replaces the fixed ratio with the copy-height contract in qa-review6.
  const contact=document.querySelector('.contact-details');
  if(contact){
    check(contact.querySelectorAll('h2.type-h3').length===3 && !contact.querySelector('h3'),'contact-heading-level',location.pathname);
    for(const heading of contact.querySelectorAll('h2')){
      const next=heading.nextElementSibling;
      check(Math.abs(box(next).top-box(heading).bottom-(next.matches('.link-list')?24:16))<=1,'contact-stack-gap',heading.textContent);
      const previous=heading.previousElementSibling;
      if(previous?.matches('.link-list')) check(Math.abs(box(heading).top-box(previous).bottom-48)<=1,'contact-block-gap',heading.textContent);
    }
    const privacy=document.querySelector('.enquiry-form a');
    check(box(privacy).height>=44 && privacy.querySelector('.icon-right'),'privacy-link-target',box(privacy).height);
  }
  for(const p of document.querySelectorAll('.prose li > p')) check(getComputedStyle(p).margin==='0px','loose-list-margin',p.textContent);
  return issues;
}

/** Group character Range rectangles by line, including text split across inline tags. */
export function typographyLines() {
  if(document.documentElement.lang !== 'sk') return [];
  const failures=[];
  const blocks=document.querySelectorAll('.prose p, .prose li, .prose h2, .prose h3, .prose h4, .statement, .capabilities li, .lead, .list-title, .card-content p, .card-content h3');
  for(const block of blocks){
    if(!block.checkVisibility() || block.getBoundingClientRect().height===0)continue;
    const lines=new Map();
    const walker=document.createTreeWalker(block,NodeFilter.SHOW_TEXT);
    while(walker.nextNode()){
      const node=walker.currentNode;
      if(node.parentElement.closest('code,pre,svg') || node.parentElement.closest('p,li,h2,h3,h4,.statement,.lead,.list-title')!==block)continue;
      for(let i=0;i<node.length;i++){
        const range=document.createRange();range.setStart(node,i);range.setEnd(node,i+1);
        const r=range.getBoundingClientRect();if(!r.width||!r.height)continue;
        const key=Math.round(r.top);lines.set(key,(lines.get(key)||'')+node.textContent[i]);
      }
    }
    const text=[...lines.entries()].sort((a,b)=>a[0]-b[0]).map(([,line])=>line.trim());
    text.forEach((line,i)=>{
      if((/(?:^|\s)Slick$/.test(line) && /^\(?\d/.test(text[i+1] || '')) || (i<text.length-1 && /(?:^|\s)(?:Bendix|série|skupiny)$/.test(line)) || (i<text.length-1 && /(?:^|\s)[aikosuvz]$/.test(line) || /(?:^|[.!?:] )[AIKOSUVZ]$/.test(line)) || /^[–/%]/.test(line) || (i < text.length-1 && /(?:^|\s)(?:No|č\.|Nr\.)$/.test(line)) || (/(?:Kategória|skupiny|sk\.|TWY)$/.test(line) && /^[AIKOSUVZ](?:\s|$)/.test(text[i+1] || ''))) failures.push({line,block:block.textContent.slice(0,100)});
    });
  }
  return failures;
}
