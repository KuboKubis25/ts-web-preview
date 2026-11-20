import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { downloads } from '../src/data/downloads.ts';
import { typography, typographyCopy } from './rehype-typography.mjs';
import { listStyleIssues } from './qa-review7.mjs';

export async function review8ContentChecks() {
  for (const [input, lang, expected] of [
    ['Bendix King series S20/S200 and Slick 4300/6300', 'en', 'Bendix\u00a0King series\u00a0S20/S200 and Slick\u00a04300/6300'],
    ['Bendix King serie S20/S200 a Slick série 4300/6300', 'sk', 'Bendix\u00a0King serie\u00a0S20/S200 a\u00a0Slick série\u00a04300/6300'],
    ['Bendix King a Slick (4600/6300)', 'sk', 'Bendix\u00a0King a\u00a0Slick\u00a0(4600/6300)'],
    ['Bendix King and Slick', 'en', 'Bendix\u00a0King and Slick'],
    ['testing & qualifications', 'en', 'testing &\u00a0qualifications'],
    ['a mimoriadnedlhéoznačenietechnológie', 'sk', 'a mimoriadnedlhéoznačenietechnológie'],
    ['Bendix King series S20/S200/EXTRALONG', 'en', 'Bendix\u00a0King series S20/S200/EXTRALONG'],
  ]) {
    assert.equal(typography(input, lang, true), expected);
    assert.equal(typography(expected, lang, true), expected, 'Idempotent bound-run guard');
  }
  for (const key of ['title', 'description', 'packageLead'])
    assert.equal(typographyCopy({ [key]: 'third-party' }, 'en')[key], 'third‑party');
  assert.equal(typography('third-party', 'en'), 'third-party', 'Prose hyphens stay');
  assert.equal(typography('third-party', 'zh', true), 'third‑party', 'Compounds also bind on ZH surfaces');
  assert.equal(typography('series ABCDEFGHIJKLMNOPQ', 'en'), 'series\u00a0ABCDEFGHIJKLMNOPQ', '24 characters bind');
  assert.equal(typography('series ABCDEFGHIJKLMNOPQR', 'en'), 'series ABCDEFGHIJKLMNOPQR', '25 characters do not bind');
  const home = JSON.parse(await readFile('src/data/home.json', 'utf8'));
  for (const lang of ['sk', 'en']) {
    const maintenance = await readFile(`src/content/pages/${lang}/maintenance.md`, 'utf8');
    for (const input of [...home[lang].capabilities, ...maintenance.split('\n').filter(line => line.startsWith('- '))]) {
      const result = typography(input, lang, true);
      assert.equal(typography(result, lang, true), result);
      for (const run of result.split(/[^\S\u00a0]+/u).filter(run => run.includes('\u00a0')))
        assert.ok(run.length <= 24, `${lang}: ${run}`);
      assert.ok(!/King\u00a0(?:series|serie|série)/.test(result));
    }
  }
  assert.equal(listStyleIssues('Lead without colon\n\n- item').length, 1);
  assert.equal(listStyleIssues('Lead:\n\n- Capital.\n- lowercase.').length, 2);
  assert.equal(listStyleIssues('Lead – First – Second – Third').length, 1);
  assert.deepEqual(listStyleIssues('Lead:\n\n- first\n- second\n- ATEX 137'), []);
  const paperwork = {};
  for (const lang of ['sk', 'en', 'zh']) for (const file of await readdir(`src/content/pages/${lang}`)) {
    const source = await readFile(`src/content/pages/${lang}/${file}`, 'utf8');
    const key = source.match(/^key: "([^"]+)"/m)?.[1];
    const path = source.match(/^path: "([^"]*)"/m)?.[1];
    paperwork[path ? path + '/' : ''] = downloads.filter(f => f.page === key && /\.(pdf|xlsx)$/i.test(f.file)).map(f => f.file);
  }
  return paperwork;
}

/** Measure real glyphs, after fonts load, rather than guessing wrapping from CSS. */
export function review8Contract(expectedFiles = []) {
  const issues = [];
  const check = (ok, rule, detail) => { if (!ok) issues.push({rule, detail}); };
  const box = el => el.getBoundingClientRect();
  const visible = el => el.checkVisibility() && box(el).height > 0;
  const lines = el => {
    const rows = [];
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      const node = walker.currentNode;
      if (!visible(node.parentElement) || node.parentElement.closest('svg')) continue;
      for (let i = 0; i < node.length; i++) {
        const range = document.createRange(); range.setStart(node, i); range.setEnd(node, i + 1);
        const r = range.getBoundingClientRect(); if (!r.width || !r.height) continue;
        // Ignore clipped breadcrumb text (the ellipsis is a browser glyph).
        const current = node.parentElement.closest('.breadcrumb [aria-current]');
        if (current && r.right > box(current).right + 1) continue;
        let row = rows.find(row => Math.abs(row.top - r.top) < 3);
        if (!row) { row = {top:r.top, left:r.left, right:r.right, text:''}; rows.push(row); }
        row.text += node.textContent[i];
        if (!/\s/.test(node.textContent[i])) { row.left = Math.min(row.left,r.left); row.right = Math.max(row.right,r.right); }
      }
    }
    return rows.sort((a,b) => a.top-b.top).map(row => ({...row,text:row.text.trim()})).filter(row => row.text);
  };
  const h1 = document.querySelector('.hero-copy h1');
  if (h1 && [1024,1080,1440].includes(innerWidth)) {
    const rows = lines(h1);
    const zh = document.documentElement.lang === 'zh';
    const segmenter = new Intl.Segmenter(document.documentElement.lang, {granularity:'word'});
    check(rows.every(row => zh ? [...segmenter.segment(row.text)].filter(s => s.isWordLike).length > 1 : row.text.split(/\s+/).length > 1), 'display-no-single-word-line', rows);
    const ratio = (rows[0].right-rows[0].left) / Math.max(...rows.map(row => row.right-row.left));
    check(ratio >= .5, 'display-first-line-width', {ratio,rows});
  }
  for (const el of document.querySelectorAll('h1,h2,h3,h4,h5,h6,.lead,.breadcrumb li,.list-title,.capabilities li,.card-content p,.prose li')) {
    if (!visible(el)) continue;
    const current = el.querySelector('.breadcrumb [aria-current]');
    // A clipped current item ends with the ellipsis, not an offscreen character.
    if (current && current.scrollWidth > current.clientWidth) continue;
    for (const row of lines(el)) check(!/[-&]$/.test(row.text), 'no-dangling-hyphen-or-ampersand', row);
  }
  const trail = document.querySelector('.breadcrumb ol');
  if (trail) {
    check(Math.abs(box(trail).height-parseFloat(getComputedStyle(trail).lineHeight)) <= 1, 'breadcrumb-single-line', box(trail).height);
    const current = trail.querySelector('[aria-current]');
    if (current) check(current.title === current.textContent, 'breadcrumb-full-title', current.textContent);
  }
  // Walk text across inline elements too; include closed disclosure text so
  // hidden package content cannot bypass the bound-run contract.
  const flowText = node => {
    if (node.nodeType === Node.TEXT_NODE) return node.textContent;
    if (node.nodeType !== Node.ELEMENT_NODE || node.matches('script,style,svg')) return '';
    if (node.matches('br,wbr')) return '\n';
    const text = [...node.childNodes].map(flowText).join('');
    // Block boundaries are real break opportunities, even without DOM spaces.
    return getComputedStyle(node).display.startsWith('inline') ? text : '\n' + text + '\n';
  };
  for (const el of document.querySelectorAll('h1,h2,h3,h4,p,li,a,summary,dt,dd,button,label,.eyebrow')) {
    if (el.closest('script,style')) continue;
    // Han glyphs have natural break opportunities; a Chinese sentence without
    // spaces is not one bound run. Keep explicit joiners and their neighbours.
    const text = [...flowText(el)].map((char, i, chars) => {
      const next = chars[i + 1] || '';
      const cjkBoundary = /\p{Script=Han}/u.test(char + next) && !/[\u00a0\u202f\u2060]/u.test(char + next);
      return char + (cjkBoundary ? '\n' : '');
    }).join('');
    for (const run of text.split(/[^\S\u00a0\u202f\u2060]+/u)) {
      if (/[\u00a0\u202f\u2060\u2011]/u.test(run)) check([...run].length <= 24, 'bound-run-length', run);
    }
  }
  for (const file of expectedFiles) {
    const links = [...document.querySelectorAll('.downloads a[download]')];
    check(links.some(a => decodeURIComponent(a.pathname).endsWith('/s/' + file)), 'paperwork-completeness', file);
  }
  if (expectedFiles.length && document.querySelector('.page-hero') && !document.querySelector('.contact-layout')) {
    // Service and aviation pages advertise their complete paperwork inventory.
    if (document.querySelector('.related-block,.section-nav')) check(!!document.querySelector('.page-hero a[href="#downloads"]'), 'paperwork-hero-action', expectedFiles);
    if (document.querySelector('.contents')) check(!!document.querySelector('.contents a[href="#downloads"]'), 'paperwork-rail-entry', expectedFiles);
  }
  return issues;
}

export async function review8Probes(page, origin, ready) {
  await page.setViewportSize({width:1440,height:1000});
  await page.goto(origin + 'en/'); await ready();
  await page.evaluate(() => {
    document.querySelector('.hero-copy h1').innerHTML = 'Managing<br>Czech and Slovak legal<br>requirements of your technology';
    document.querySelector('.lead').innerHTML = 'third-<br>party assessment &<br>qualifications';
    document.querySelector('.statement').textContent = 'Bendix\u00a0King\u00a0series\u00a0S20/S200';
  });
  let rules = new Set((await page.evaluate(review8Contract)).map(i => i.rule));
  for (const rule of ['display-no-single-word-line','display-first-line-width','no-dangling-hyphen-or-ampersand','bound-run-length']) assert.ok(rules.has(rule), `Injected ${rule}`);
  await page.setViewportSize({width:390,height:844});
  await page.goto(origin + 'en/services/inspections-and-testing/'); await ready();
  await page.evaluate(() => {
    document.querySelector('.breadcrumb ol').style.height = '60px';
    document.querySelector('.breadcrumb [aria-current]').removeAttribute('title');
    document.querySelector('.downloads a').remove();
    document.querySelector('.page-hero a[href="#downloads"]').remove();
    document.querySelector('.contents a[href="#downloads"]').remove();
  });
  rules = new Set((await page.evaluate(review8Contract, ['TS-Opravnenie.pdf'])).map(i => i.rule));
  for (const rule of ['breadcrumb-single-line','breadcrumb-full-title','paperwork-completeness','paperwork-hero-action','paperwork-rail-entry']) assert.ok(rules.has(rule), `Injected ${rule}`);
}
