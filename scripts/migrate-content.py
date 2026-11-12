"""One-time source migration. Run only to regenerate the initial editable content."""
from pathlib import Path
import json,re
root=Path(__file__).resolve().parents[1]
rows=[
('skmain','home','sk','','Testing Service','Splnenie českých a slovenských legislatívnych požiadaviek pre vaše technológie.','home','CarAssembly-min.jpg'),
('testing-service-eng','home','en','en','Testing Service','Managing Czech and Slovak legal requirements of your technology.','home','CarAssembly-min.jpg'),
('zho','home','zh','zh','Testing Service','管理您技术在捷克和斯洛伐克的法律合规要求','home','CarAssembly-min.jpg'),
('povolenia-schvalenia','permits','sk','sluzby/povolenia-a-schvalenia','Zabezpečenie povolení a schválení','Dohliadanie na potrebné povolenia a schválenia pre vaše technológie.','service','shutterstock_448000054-min.jpg'),
('permit-assurance','permits','en','en/services/permits-and-approvals','Permits & approvals','Keeping track of necessary permits and approvals needed for your technology to operate.','service','shutterstock_448000054-min.jpg'),
('consulting-services-sk','consulting','sk','sluzby/technicke-poradenstvo','Poradenské služby','Majte prehľad v miestnej technickej legislatíve a technických normách.','service','shutterstock_404036110-min.jpg'),
('consulting-services','consulting','en','en/services/technical-consulting','Technical consulting','Be on top of the local technical legislation and engineering standards.','service','shutterstock_404036110-min.jpg'),
('risk-atex-pawa-sk','risk','sk','sluzby/rizika-atex-pawa','Analýza rizík, ATEX, PAWA','Riziká, bezpečnosť, ATEX, prevencia pracovných úrazov.','service','Pipes.jpg'),
('risk-safety-atex-certification','risk','en','en/services/risk-atex-pawa','Risk, safety, ATEX, PAWA','Uncompromising, unbiased and independent third-party assessment of your safety conditions.','service','Pipes.jpg'),
('inspections-testing-qualifications-sk','inspections','sk','sluzby/inspekcie-a-skusky','Inšpekcie, skúšky a kvalifikácie','Inšpekcie, testovanie, certifikácie a odborné kvalifikácie.','service','shutterstock_551823535-min.jpg'),
('inspections-testing-revisions-qualifications','inspections','en','en/services/inspections-and-testing','Inspections, testing & qualifications','Inspections, testing, certifications and professional qualifications.','service','shutterstock_551823535-min.jpg'),
('aviation','aviation','sk','letectvo','Testing Service Aviation','Kontrola a skúšanie avionických systémov. Servis leteckých magnet.','aviation','TESTING_CENTER-10%5B187%5D.jpg'),
('aviation-2','aviation','en','en/aviation','Testing Service Aviation','Control and testing of avionics systems. Aircraft magneto servicing.','aviation','TESTING_CENTER-10%5B187%5D.jpg'),
('aviation-testing-service','instruments','sk','letectvo/skusky-avioniky','Skúšky avionických systémov','Prileťte na „STK“ avioniky vášho lietadla na letisko do Žiliny (LZZI).','aviation','TESTING_CENTER-32%5B209%5D.jpg'),
('aviation-testing-service-2','instruments','en','en/aviation/instrument-testing','Aviation instrument testing','Come for inspection of avionics to Žilina (LZZI/ILZ), or we will come to you.','aviation','TESTING_CENTER-32%5B209%5D.jpg'),
('aviation-technical-maintenance','maintenance','sk','letectvo/technicka-udrzba','Technická údržba','500 hodinové a generálne opravy leteckých magnet.','aviation','shutterstock_170715560-min.jpg'),
('aviation-technical-maintenance-1','maintenance','en','en/aviation/technical-maintenance','Technical maintenance','500 hour inspection and overhaul of aircraft magnetos.','aviation','shutterstock_170715560-min.jpg'),
('references-en','references','en','en/references','Our references','Trusted by industry leaders.','references','CarAssembly-min.jpg'),
('references-zho','references','zh','zh/references','我们的行业案例','深受行业领袖信赖','references','CarAssembly-min.jpg'),
('kontakt','contact','sk','kontaktujte-nas','Kontakt','Testing Service s.r.o. · Martin, Slovakia','contact',None),
('hire-us','contact','en','en/contact','Contact us','Reach out to us to learn more about our services and working together.','contact',None),
]
fixes={'Engish':'English','zamestanancov':'zamestnancov','kĺúč':'kľúč','Comissioning':'Commissioning','gass':'gas','potentionaly':'potentially','prizes':'prices','builT':'built','standardS':'standards','situationS':'situations','we intent':'we intend','T检测':'检测'}
for source,key,lang,path,title,description,kind,image in rows:
 text=(root/'_source/pages'/f'{source}.md').read_text().split('TESTING SERVICE, S.R.O.,')[0]
 text='\n'.join(text.splitlines()[1:]).strip()
 for a,b in fixes.items():text=text.replace(a,b)
 if kind=='service':
  text=text[text.index('## '):]
 if kind=='home':
  # Hero and service summaries are presented separately; keep all package copy.
  marker={'sk':'## Aby sme','en':'# In order','zh':'雇主 / 运营商套餐'}[lang]
  text=text[text.index(marker):]
 if kind=='references':text=text.replace('# TESTING SERVICE','').strip()
 if kind=='contact':text=''
 text=re.sub(r'^# (.+)$',r'## \1',text,flags=re.M)
 text=re.sub(r'\n[ \t]*\n(?:[ \t]*\n)+','\n\n',text)
 meta=dict(key=key,lang=lang,path=path,title=title,description=description,kind=kind,source=f'_source/pages/{source}.md')
 if image:meta['image']=image
 folder=root/'src/content/pages'/lang;folder.mkdir(parents=True,exist_ok=True)
 (folder/f'{key}.md').write_text('---\n'+'\n'.join(f'{k}: {json.dumps(v,ensure_ascii=False)}' for k,v in meta.items())+'\n---\n\n'+text+'\n')
redirects={r[0]:r[3]+'/' if r[3] else '' for r in rows}
redirects.update({'our-services':'en/services/permits-and-approvals/','language-eng':'en/','language-svk':'','lang-nav':'','ait-gallery':'letectvo/','foto':'letectvo/'})
(root/'src/data/redirects.json').write_text(json.dumps(redirects,ensure_ascii=False,indent=2)+'\n')
# Home copy is source-derived, including the unique language landing page services.
homes={}
for lang,slug,landing in [('sk','skmain','language-svk'),('en','testing-service-eng','language-eng'),('zh','zho',None)]:
 t=(root/'_source/pages'/f'{slug}.md').read_text()
 start=t.index('# Testing Service') if lang!='sk' else t.index('# TESTING SERVICE je') if '# TESTING SERVICE je' in t else t.index('# ',t.index('# Testing Service')+2)
 intro=t[start:t.index('# '+({'sk':'Naši klienti','en':'Our clients','zh':'我们的客户'}[lang]))].strip()
 summaries=re.findall(r'### (.*?)\n\n(.*?)(?=\n### |\n## |\n# |\n雇主 /|\Z)',t,flags=re.S)[:4]
 capabilities=[]
 if landing:
  l=(root/'_source/pages'/f'{landing}.md').read_text().split('# TESTING SERVICE')[-1]
  for a,b in fixes.items():l=l.replace(a,b)
  capabilities=[s.strip().replace('\n',' ') for s in l.split('\n\n') if s.strip()]
 homes[lang]={'intro':intro.replace('# ','').strip(),'services':[{'title':a.strip(),'text':b.strip()} for a,b in summaries],'capabilities':capabilities}
(root/'src/data/home.json').write_text(json.dumps(homes,ensure_ascii=False,indent=2)+'\n')
