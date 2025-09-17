import { speak } from '../tts.js';

export function renderNarrative({container, text, meta, autoSpeak=true}){
  container.innerHTML = `
    <p class="prompt">${text}</p>
    ${meta ? `<p class="meta">${meta}</p>` : ''}
  `;
  if(autoSpeak) speak(text);
}

export function renderChoices({container, question, choices}){
  container.innerHTML = `
    <p class="prompt">${question}</p>
    <div class="choice-list" role="list">
      ${choices.map((c,i)=>`
        <button role="listitem" class="choice" data-i="${i}">
          <kbd>${i+1}</kbd>${c.label}
        </button>
      `).join('')}
    </div>
    <div id="feedback" class="feedback" aria-live="polite"></div>
  `;
}

export function setFeedback(msg, good=false){
  const f = document.getElementById('feedback');
  if(!f) return;
  f.textContent = msg;
  f.className = `feedback ${good ? 'good':'bad'}`;
}
