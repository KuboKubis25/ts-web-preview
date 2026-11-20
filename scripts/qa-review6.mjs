import assert from 'node:assert/strict';
import { typography } from './rehype-typography.mjs';

export function typographyFixtures() {
  for (const [input, lang, expected, compounds = false] of [
    ['Kategória A vyhradených', 'sk', 'Kategória\u00a0A vyhradených'],
    ['skupiny A a skupiny B', 'sk', 'skupiny\u00a0A a\u00a0skupiny B'],
    ['sk. A a TWY A doprava', 'sk', 'sk.\u00a0A a\u00a0TWY\u00a0A doprava'],
    ['A potom. V Žiline', 'sk', 'A\u00a0potom. V\u00a0Žiline'],
    ['No 1321/2014, č. 3, Nr. 5', 'en', 'No\u00a01321/2014, č.\u00a03, Nr.\u00a05'],
    ['IFR check / VFR check', 'en', 'IFR check\u00a0/ VFR check'],
    ['výchovno-vzdelávacie', 'sk', 'výchovno‑vzdelávacie', true],
    ['third-party', 'en', 'third‑party', true],
    ['third-party', 'en', 'third-party'],
    ['https://example.org/a-b/ info.aviation@testing-service.org', 'sk', 'https://example.org/a-b/ info.aviation@testing-service.org', true],
    ['管理您技术在捷克和斯洛伐克的法律合规要求', 'zh', '管理您技术在捷克和斯洛伐克的法律合规要求'],
  ]) {
    assert.equal(typography(input, lang, compounds), expected, input);
    assert.equal(typography(expected, lang, compounds), expected, `Idempotent: ${input}`);
  }
}

/** Runs in the browser against real layout, on every route and requested width. */
export function review6Contract() {
  const issues = [];
  const check = (ok, rule, detail) => { if (!ok) issues.push({ rule, detail }); };
  const box = el => el.getBoundingClientRect();
  const visible = el => el.checkVisibility() && box(el).height > 0;
  const clean = text => text.toLowerCase().replace(/[^\p{L}\p{N}]/gu, '');
  const heading = el => el?.matches('h2,h3,h4');
  const title = clean(document.querySelector('h1')?.textContent || '');
  const token = (el, size, weight, leading, name) => {
    const style = getComputedStyle(el);
    check(Math.abs(parseFloat(style.fontSize) - size) < .5 && style.fontWeight === String(weight) && Math.abs(parseFloat(style.lineHeight) / parseFloat(style.fontSize) - leading) < .005, `type-${name}`, { text: el.textContent.slice(0,80), size: style.fontSize, weight: style.fontWeight, leading: style.lineHeight });
  };
  for (const el of document.querySelectorAll('.lead, .card-content p'))
    check(!/[#*\[]/.test(el.textContent), 'no-markdown-in-descriptions', el.textContent);
  for (const prose of document.querySelectorAll('.prose')) {
    let section;
    for (const el of prose.children) {
      if (!heading(el)) continue;
      check(!title || !clean(el.textContent).startsWith(title), 'heading-does-not-repeat-h1', el.textContent);
      check(!/[€%]|\d+\s*(?:hod\.|h\b|V\b|m\b|kg\b|ks\b)/.test(el.textContent), 'no-data-heading', el.textContent);
      if (heading(el.previousElementSibling)) {
        check(!heading(el.previousElementSibling.previousElementSibling), 'at-most-two-headings', el.textContent);
        if (visible(el)) check(Math.abs(box(el).top - box(el.previousElementSibling).bottom - 16) <= 1, 'heading-stack-gap', { text: el.textContent, gap: box(el).top - box(el.previousElementSibling).bottom });
      }
      if (el.classList.contains('prose-label')) {
        check(section && +el.tagName[1] === +section.tagName[1] + 1, 'label-outline-level', el.textContent);
        token(el, 18, 500, 1.4, 'prose-label');
      } else section = el;
      if (el.tagName === 'H2') {
        const size = Math.min(28, Math.max(24, 20.8 + innerWidth * .008));
        token(el, size, 500, 1.25, 'prose-h2');
      }
    }
  }
  const article = document.querySelector('.article-layout');
  const prose = article?.querySelector('.prose');
  const rail = article?.querySelector('.rail');
  if (prose && rail) {
    check(rail.classList.contains('rail--heading-first') === heading(prose.firstElementChild), 'rail-opening-class', prose.firstElementChild.tagName);
    if (innerWidth >= 1080) {
      // A zero-size inline marker exposes the actual font baseline, not the box top.
      const baseline = el => {
        const marker = document.createElement('span');
        marker.style.cssText = 'display:inline-block;width:0;height:0;padding:0;margin:0;vertical-align:baseline';
        el.prepend(marker);
        const y = box(marker).top;
        marker.remove();
        return y;
      };
      const diff = baseline(rail.querySelector('.eyebrow')) - baseline(prose.firstElementChild);
      check(Math.abs(diff) <= 2, 'rail-baseline', { diff, first: prose.firstElementChild.tagName });
    }
  }
  for (const text of document.querySelectorAll('.rail-text')) {
    if (!visible(text)) continue;
    const style = getComputedStyle(text);
    check(box(text).height <= 2 * 14 * 1.55 + .5 && style.webkitLineClamp === '2' && style.overflow === 'hidden' && style.padding === '0px', 'rail-two-line-clamp', { text: text.textContent, height: box(text).height, scrollHeight: text.scrollHeight });
  }
  if (/\/(?:skusky-avioniky|instrument-testing)\/$/.test(location.pathname)) {
    check(document.querySelector('#downloads a')?.getAttribute('href')?.endsWith('/TS-AObjednavkaFinal_2024.xlsx'), 'order-form-first', location.pathname);
    check(document.querySelectorAll('.contents a').length === (document.documentElement.lang === 'sk' ? 2 : 4), 'instruments-rail-count', location.pathname);
  }
  for (const key of document.querySelectorAll('.prose .key-line')) {
    token(key, 17, 500, 1.4, 'key-line');
    const note = key.nextElementSibling;
    token(note, 14, 400, 1.55, 'key-note');
    check(parseFloat(getComputedStyle(key).marginTop) === 24 && Math.abs(box(note).top - box(key).bottom - 4) <= 1 && Math.abs(box(note.nextElementSibling).top - box(note).bottom - 16) <= 1, 'key-line-rhythm', key.textContent);
  }
  for (const link of document.querySelectorAll('.text-link')) {
    if (!visible(link)) continue;
    const icon = link.querySelector('.icon'), binding = icon?.closest('.nowrap');
    check(!!binding && binding.contains(icon) && getComputedStyle(binding).whiteSpace === 'nowrap', 'text-link-binding', link.textContent);
    check(box(link).height >= 44, 'text-link-hit-height', { text: link.textContent, height: box(link).height });
    if (icon && binding && [390,640].includes(innerWidth)) {
      // Measure the last painted text or language badge before the icon.
      const range = document.createRange();
      range.setStart(binding, 0); range.setEndBefore(icon);
      const rects = [...range.getClientRects()].filter(r => r.width > 0);
      const right = Math.max(...rects.map(r => r.right));
      const gap = box(icon).left - right;
      check(Math.abs(gap - 8) <= 1, 'text-link-icon-gap', { text: link.textContent, gap });
      check(Math.abs(box(icon).top - rects.at(-1).top) < 12, 'text-link-icon-same-line', link.textContent);
    }
  }
  for (const photo of document.querySelectorAll('.page-hero > img')) {
    if (innerWidth !== 1440) continue;
    const copy = photo.previousElementSibling;
    const expected = Math.min(300, Math.max(240, box(copy).height));
    check(Math.abs(box(photo).height - expected) <= 1, 'hero-photo-copy-height', { height: box(photo).height, copy: box(copy).height, expected });
    check(box(photo).bottom - box(copy).bottom <= Math.max(0, 240 - box(copy).height) + 1, 'hero-empty-space', box(photo).bottom - box(copy).bottom);
  }
  for (const label of document.querySelectorAll('.enquiry-form label')) token(label, 14, 500, 1.55, 'field-label');
  if (innerWidth < 1080) {
    for (const link of document.querySelectorAll('.breadcrumb a')) {
      check(box(link).width >= 44 && box(link).height >= 44, 'breadcrumb-hit-area', { text: link.textContent, width: box(link).width, height: box(link).height });
    }
    for (const item of document.querySelectorAll('.breadcrumb li + li')) {
      const separator = getComputedStyle(item, '::before');
      check(separator.marginLeft === '8px' && separator.marginRight === '8px', 'breadcrumb-separator-gap', item.textContent);
    }
  }
  for (const list of document.querySelectorAll('.footer-grid ul')) {
    const links = [...list.querySelectorAll('a')];
    check(getComputedStyle(list).rowGap === '8px', 'footer-row-gap', list.textContent);
    if (innerWidth >= 1080) links.forEach((link, i) => {
      check(getComputedStyle(link).display === 'inline-block' && box(link).height >= 24, 'footer-link-box', link.textContent);
      if (i) check(Math.abs(box(link).top - box(links[i-1]).bottom - 8) <= 1, 'footer-link-gap', { text: link.textContent, gap: box(link).top - box(links[i-1]).bottom });
    });
  }
  const featured = [...document.querySelectorAll('.gallery > .wrap > .gallery-grid img')];
  if (featured.length) {
    check(featured.length === 8 && featured.every(img => /^TESTING_CENTER-/.test(img.dataset.photoName)), 'gallery-real-unannotated-set', featured.map(img => img.dataset.photoName));
    const photos = [...document.querySelectorAll('main img[data-photo-name]')].filter(visible).map(img => img.dataset.photoName);
    check(new Set(photos).size === photos.length, 'no-repeated-photo', photos);
  }
  if (document.documentElement.lang === 'zh') {
    for (const span of document.querySelectorAll('.hero-copy h1 span')) check(!/^[的了和]/.test(span.textContent.trim()), 'zh-hero-phrase-start', span.textContent);
    for (const col of [...document.querySelectorAll('.footer-grid > div')].slice(1)) {
      check(col.querySelectorAll('h3 .lang-tag').length === 1 && !col.querySelector('a .lang-tag'), 'zh-footer-column-language', col.querySelector('h3').textContent);
    }
    const supplier = [...document.querySelectorAll('.packages .prose h3')].find(h => h.textContent === '供应商套餐');
    if (supplier) check(supplier.nextElementSibling?.textContent === '本服务专为向斯洛伐克或捷克共和国出口产品的供应商量身打造。', 'zh-supplier-sentence-placement', supplier.nextElementSibling?.textContent);
  }
  return issues;
}
