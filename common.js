(()=>{
const CFG=window.DUPB_CONFIG||{},R=window.DUPB_RELEASE_INFO||{};
const fold=s=>(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const format=n=>Number(n).toLocaleString('pt-BR');
const baseUrl=()=>{const u=new URL(location.href);u.search='';u.hash='';u.pathname=u.pathname.replace(/(?:index|about|stats|download|404)\.html$/,'');return u.toString()};
const entryUrl=lemma=>{const u=new URL(baseUrl());u.searchParams.set('lemma',lemma);return u.toString()};
const citation=lemma=>{const target=lemma?`: entrada “${lemma}”`:'';return `KHELVEN, Bryan. ${CFG.title}${target}. ${R.label||'Prévia 1'}, 2026. Disponível em: ${lemma?entryUrl(lemma):baseUrl()}`};
const bibtex=lemma=>{const key=(CFG.slug||'dupb')+(lemma?'-'+fold(lemma).replace(/[^a-z0-9]+/g,'-'):'');const title=lemma?`${CFG.title}: entrada ${lemma}`:CFG.title;return `@misc{${key},\n  author = {Bryan Khelven},\n  title = {${title}},\n  year = {2026},\n  note = {${R.label||'Prévia 1'}},\n  url = {${lemma?entryUrl(lemma):baseUrl()}}\n}`};
async function copy(text,b){try{await navigator.clipboard.writeText(text);if(b){const old=b.textContent;b.textContent='Copiado';setTimeout(()=>b.textContent=old,1000)}}catch{window.prompt('Copie o texto:',text)}}
document.addEventListener('DOMContentLoaded',()=>{document.querySelectorAll('[data-theme-toggle]').forEach(b=>b.onclick=()=>window.DUPB_THEME.toggle());window.DUPB_THEME.paint();document.querySelectorAll('[data-dataset-sha]').forEach(x=>x.textContent=R.dataset_sha256||'')});
window.DUPB_COMMON={CFG,R,fold,esc,format,baseUrl,entryUrl,citation,bibtex,copy};
})();