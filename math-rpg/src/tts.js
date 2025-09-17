let enabled = true;
export function narrationEnabled(){ return enabled; }

export function toggleNarration(btn){
  enabled = !enabled;
  btn.setAttribute('aria-pressed', String(enabled));
  btn.textContent = enabled ? '🔊 Narration' : '🔇 Narration';
}

export function speak(text){
  if(!enabled) return;
  try{
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 1.05;
    u.pitch = 1.0;
    u.lang = navigator.language || 'en-GB';
    speechSynthesis.cancel();
    speechSynthesis.speak(u);
  }catch(e){ /* no-op */ }
}
