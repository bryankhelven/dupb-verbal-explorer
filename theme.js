(()=>{
const key='dupb-theme';const saved=localStorage.getItem(key);const system=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';
document.documentElement.dataset.theme=saved||system;
window.DUPB_THEME={toggle(){const n=document.documentElement.dataset.theme==='dark'?'light':'dark';document.documentElement.dataset.theme=n;localStorage.setItem(key,n);this.paint()},
paint(){document.querySelectorAll('[data-theme-toggle]').forEach(b=>{const d=document.documentElement.dataset.theme==='dark';b.textContent=d?'☀':'☾';b.setAttribute('aria-label',d?'Usar tema claro':'Usar tema escuro');b.title=d?'Usar tema claro':'Usar tema escuro'})}};
})();