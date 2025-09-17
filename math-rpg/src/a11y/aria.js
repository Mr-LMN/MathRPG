export function live(text){
  const region = document.getElementById('screen');
  if(!region) return;
  // Keep the actual DOM readable (no hidden offscreen hacks)
  region.setAttribute('aria-busy', 'true');
  setTimeout(()=>{
    region.setAttribute('aria-busy','false');
  },50);
}
