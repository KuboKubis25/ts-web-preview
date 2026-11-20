import { readFile } from 'node:fs/promises';
// These source headings already live in the hero/ending, or were expressly cut.
// Keeping them twice would violate DESIGN's one-of-each/no-repeat contract.
export const representedHeadings = {
  'aviation.md': {3:'Owner-approved repeated opening removed',35:'Partners ending'},
  'aviation-2.md': {3:'Owner-approved repeated opening removed',25:'Partners ending'},
  'aviation-testing-service.md': {11:'Empty heading; content moved to hero',17:'Hero lead'},
  'aviation-testing-service-2.md': {3:'Hero h1',17:'Order form moved to downloads; empty heading',25:'Empty heading'},
  'aviation-technical-maintenance.md': {16:'Footer contact action'},
  'references-en.md': {3:'Brand',5:'Hero lead (owner copy unchanged)',9:'Hero h1'},
  'references-zho.md': {3:'Brand',5:'Hero lead',9:'Hero h1'},
};
export const normalizeHeading = (text) => text.toLowerCase().replace(/[^\p{L}\p{N}]/gu,'');
export async function sourceHeadings(source) {
  if(!source.endsWith('.md')) return [];
  const name=source.split('/').at(-1);
  return (await readFile(source,'utf8')).split('\n').flatMap((line,index)=>{
    const match=line.match(/^(#{1,6})\s+(.+?)\s*$/);
    if(!match)return [];
    const text=match[2], sourceLine=index+1;
    // Abbreviations and a terminal stop do not count as sentence boundaries.
    const sentences=text.replace(/\b(?:hod|s\.r\.o|č)\./g,'').replace(/[.!?]$/,'').split(/[.!?]\s+(?=\p{Lu})/u);
    if(text.length>110 || sentences.length>1 || representedHeadings[name]?.[sourceLine])return [];
    const representation = name === 'aviation-testing-service.md' && sourceLine === 3 ? 'body'
      : /[€%]|\d+\s*(?:hod\.|h\b|V\b|m\b)/.test(text) ? 'key-line'
      : name === 'aviation-testing-service-2.md' && [31,41].includes(sourceLine) ? 'list' : 'heading';
    return [{text,sourceLine,representation,label: /^(Potrebujeme|Majte prichystané|we need):$/i.test(text)}];
  });
}
