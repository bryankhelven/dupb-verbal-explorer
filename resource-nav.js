(()=>{
const PROD={
 nominal:'https://bryankhelven.github.io/dupb-nominal-explorer/',
 verbal:'https://bryankhelven.github.io/dupb-verbal-explorer/',
 multi:'https://bryankhelven.github.io/dupb-multiclass-explorer/'
};
const local=location.hostname==='127.0.0.1'||location.hostname==='localhost';
const kind=(window.DUPB_CONFIG||{}).kind||'';
function localRoot(){
  return location.pathname.replace(/\/(?:dupb-nominal-explorer|dupb-verbal-explorer|dupb-multiclass-explorer)\/.*$/,'/');
}
function href(which){
  if(!local)return PROD[which];
  const root=localRoot();
  if(which==='nominal')return root+'dupb-nominal-explorer/';
  if(which==='verbal')return root+'dupb-verbal-explorer/';
  return root+'dupb-multiclass-explorer/';
}
document.addEventListener('DOMContentLoaded',()=>{
  const host=document.querySelector('.resource-switch');
  if(!host)return;
  const active=kind==='verb'?'verbal':kind==='nonnv'?'multi':'nominal';
  host.innerHTML=[
    ['nominal','Nomes'],
    ['verbal','Verbos'],
    ['multi','Multiclasses']
  ].map(([k,label])=>`<a href="${href(k)}" class="${k===active?'active':''}">${label}</a>`).join('');
});
window.DUPB_RESOURCE_URLS=PROD;
})();