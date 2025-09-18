import { Engine } from './game/engine.js';
import { toggleNarration, narrationEnabled, speak } from './tts.js';
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
  const stageSelect = document.getElementById('stage-select');
  const modeBadge = document.getElementById('mode-badge');
  const progressBadge = document.getElementById('progress-badge');
  const scoreBadge = document.getElementById('score-badge');

  if(!screen || !nextBtn || !restartBtn || !ttsBtn || !hcBtn || !stageSelect || !modeBadge || !progressBadge || !scoreBadge){
    throw new Error('Missing required UI elements.');
  }

  ttsBtn.addEventListener('click', ()=>toggleNarration(ttsBtn));
  hcBtn.addEventListener('click', ()=>toggleHighContrast(hcBtn));
  window.addEventListener('keydown',(e)=>{
    if(e.key.toLowerCase()==='t') toggleNarration(ttsBtn);
    if(e.key.toLowerCase()==='h') toggleHighContrast(hcBtn);
  });

  const stageLabels = {
    ks3: 'Key Stage 3 Explorer',
    ks4: 'Key Stage 4 Vanguard'
  };

  let currentStage = (stageSelect?.value || 'ks3').toLowerCase() === 'ks4' ? 'ks4' : 'ks3';
  const chapter = getChapter('chapter1', { stage: currentStage });

  const engine = new Engine({
    screen,
    nextBtn,
    restartBtn,
    chapter,
    scoreEl: scoreBadge,
    progressEl: progressBadge
  });

  function updateModeBadge(){
    const label = stageLabels[currentStage] || stageLabels.ks3;
    modeBadge.textContent = label;
    modeBadge.setAttribute('aria-label', `Current mode: ${label}`);
    modeBadge.dataset.stage = currentStage;
  }

  updateModeBadge();

  function loadStage(stage, {announce=true}={}){
    currentStage = stageLabels[stage] ? stage : 'ks3';
    const nextChapter = getChapter('chapter1', { stage: currentStage });
    engine.setChapter(nextChapter);
    updateModeBadge();
    if(announce && narrationEnabled()){
      speak(`${stageLabels[currentStage]} mode ready.`);
    }
  }

  if(stageSelect){
    stageSelect.value = currentStage;
    stageSelect.addEventListener('change', (event)=>{
      const value = (event.target.value || '').toLowerCase();
      loadStage(value === 'ks4' ? 'ks4' : 'ks3');
      nextBtn.focus();
    });
  }
}

init();
