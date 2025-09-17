import { Engine } from './game/engine.js';
import { toggleNarration } from './tts.js';
import { getChapter } from './game/chapters/index.js';

function toggleHighContrast(btn){
  const on = !document.body.classList.contains('high-contrast');
  document.body.classList.toggle('high-contrast', on);
  btn.setAttribute('aria-pressed', String(on));
}

function init(){
  const screen = document.getElementById('screen');
  const nextBtn = document.getElementById('next-btn');
  const restartBtn = document.getElementById('restart-btn');
  const ttsBtn = document.getElementById('tts-toggle');
  const hcBtn = document.getElementById('hc-toggle');

  if(!screen || !nextBtn || !restartBtn || !ttsBtn || !hcBtn){
    throw new Error('Missing required UI elements.');
  }

  ttsBtn.addEventListener('click', ()=>toggleNarration(ttsBtn));
  hcBtn.addEventListener('click', ()=>toggleHighContrast(hcBtn));
  window.addEventListener('keydown',(e)=>{
    if(e.key.toLowerCase()==='t') toggleNarration(ttsBtn);
    if(e.key.toLowerCase()==='h') toggleHighContrast(hcBtn);
  });

  const chapter = getChapter('chapter1');
  new Engine({screen, nextBtn, restartBtn, chapter});
}

init();
