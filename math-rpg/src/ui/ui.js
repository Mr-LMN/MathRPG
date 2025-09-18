import { speak } from '../tts.js';

export function renderNarrative({container, text, meta, autoSpeak=true}){
  container.innerHTML = `
    <p class="prompt" role="heading" aria-level="2">${text}</p>
    ${meta ? `<p class="meta">${meta}</p>` : ''}
  `;
  if(autoSpeak) speak(text);
}

export function renderChoices({container, question, choices, helpText}){
  const instructionsId = 'choice-instructions';
  container.innerHTML = `
    <p class="prompt" role="heading" aria-level="2">${question}</p>
    ${helpText ? `<p class="meta">${helpText}</p>` : ''}
    <p id="${instructionsId}" class="sr-only">Select an answer with the buttons or press number keys 1 to ${choices.length}.</p>
    <div class="choice-list" role="list" aria-describedby="${instructionsId}">
      ${choices.map((c,i)=>`
        <button role="listitem" class="choice" data-i="${i}">
          <span class="choice-key"><kbd>${i+1}</kbd></span>
          <span class="choice-text">${c.label}</span>
        </button>
      `).join('')}
    </div>
    <div id="feedback" class="feedback" aria-live="polite"></div>
  `;
  speak(question);
}

export function setFeedback({container, message, good=false}){
  const region = container?.querySelector('#feedback');
  if(!region) return;
  region.textContent = message;
  region.className = `feedback ${good ? 'good':'bad'}`;
}
