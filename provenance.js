(()=>{
'use strict';
const records=window.DUPB_PUBLIC_PROVENANCE||[];
const C=window.DUPB_COMMON;
const q=id=>document.getElementById(id);
const esc=v=>C.esc(String(v??''));
const fmt=n=>new Intl.NumberFormat('pt-BR').format(n);
const fold=x=>String(x??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
const missing='Não documentado nesta projeção';
let selected=[],shown=0;
const sources=[...new Set(records.map(x=>x.source||''))].sort((a,b)=>a.localeCompare(b,'pt-BR'));
const rels=[...new Set(records.map(x=>x.relation||''))].sort((a,b)=>a.localeCompare(b,'pt-BR'));
function options(id,vals){const sel=q(id);for(const v of vals){const o=document.createElement('option');o.value=v||'__missing__';o.textContent=v||missing;sel.appendChild(o);}}
function buildStats(){let known=0,relation=0,roles=0;for(const a of records){if(a.source)known++;if(a.relation&&a.relation!=='Relação não documentada')relation++;roles+=(a.arguments||[]).length;}
q('provenanceStats').innerHTML=[[records.length,'acepções predicadoras'],[known,'com fonte documentada'],[relation,'com relação documentada'],[roles,'papéis semânticos exibidos']].map(([n,label])=>`<div class="info-card"><b>${fmt(n)}</b><span>${label}</span></div>`).join('');}
function card(x){const rs=(x.arguments||[]).map(r=>`<li><strong>${esc(r.arg)}</strong> — ${esc(r.role)}</li>`).join('');
const id=x.sense===null||x.sense===undefined?'sem número':x.sense;
const src=x.source||missing;
const status=x.source&&x.relation!=='Relação não documentada';
return `<article class="prov-record"><div class="prov-head"><div><h3>${esc(x.lemma)} · acepção ${esc(id)}</h3><small>Entrada lexicográfica ${esc(x.entry)}</small></div></div><p class="prov-desc">${esc(x.description)}</p><div class="prov-chips"><span class="prov-chip">${esc(x.valency)}</span><span class="prov-chip ${x.source?'':'missing'}">${esc(src)}</span><span class="prov-chip ${status?'':'missing'}">${esc(x.relation)}</span></div><div class="prov-frame"><strong>Fonte de referência:</strong> ${esc(src)}${x.frame?`<div><strong>Frame correspondente:</strong> ${esc(x.frame)}</div>`:''}<div><strong>Relação com a fonte:</strong> ${esc(x.relation)}</div></div><h4>Papéis semânticos registrados</h4>${rs?`<ul class="prov-args">${rs}</ul>`:'<p class="prov-note">Não há argumentos nucleares registrados nesta acepção.</p>'}${status?'':'<p class="prov-note prov-warning">Registro documental incompleto. Informação não inferida.</p>'}</article>`;}
function more(){const end=Math.min(selected.length,shown+25);if(end>shown)q('provResults').insertAdjacentHTML('beforeend',selected.slice(shown,end).map(card).join(''));shown=end;q('provMore').hidden=shown>=selected.length;}
function filter(){const t=fold(q('provQuery').value.trim()),source=q('provSource').value,rel=q('provRelation').value,val=q('provValency').value,state=q('provState').value;
selected=records.filter(x=>{if(t&&!fold([x.lemma,x.sense,x.description,x.source,x.relation,x.frame,...(x.arguments||[]).flatMap(r=>[r.arg,r.role])].join(' ')).includes(t))return false;
if(source!=='all'&&(source==='__missing__'?!!x.source:x.source!==source))return false;
if(rel!=='all'&&(rel==='__missing__'?!!x.relation:x.relation!==rel))return false;
if(val!=='all'&&x.valency!==val)return false;
if(state==='complete'&&!(x.source&&x.relation!=='Relação não documentada'))return false;
if(state==='missing-source'&&x.source)return false;
if(state==='missing-relation'&&x.relation!=='Relação não documentada')return false;
return true;});
if(t)selected.sort((a,b)=>{const rank=x=>fold(x.lemma)===t?0:fold(x.lemma).startsWith(t)?1:2;return rank(a)-rank(b)});
shown=0;q('provResults').innerHTML='';q('provCount').textContent=`${fmt(selected.length)} acepções encontradas`;more();}
options('provSource',sources);options('provRelation',rels);buildStats();
for(const id of ['provSource','provRelation','provValency','provState'])q(id).addEventListener('change',filter);
let debounce;q('provQuery').addEventListener('input',()=>{clearTimeout(debounce);debounce=setTimeout(filter,120)});
q('provMore').addEventListener('click',more);filter();
window.DUPB_VERBAL_PROVENANCE_QA={total:records.length,sourceMissing:records.filter(x=>!x.source).length};
})();
