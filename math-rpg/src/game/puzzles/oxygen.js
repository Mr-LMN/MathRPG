import { speak, narrationEnabled } from '../../tts.js';

export function oxygenPuzzle({container, onSolved}){
  container.innerHTML = `
    <p class="prompt" role="heading" aria-level="2">To reach the next area you must swim through a tunnel using an oxygen tank.</p>
    <p class="meta">The tank is full. It drains at <span class="code">1% per second</span>. Crossing will use <span class="code">25%</span> of the tank.</p>
    <p id="oxygen-instructions" class="sr-only">Type the number of seconds, then press the check button or Enter.</p>
    <label>
      How many seconds will it take?
      <input id="ans" type="number" inputmode="numeric" class="answer" aria-label="Enter seconds" aria-describedby="oxygen-instructions">
    </label>
    <div class="controls" style="margin-top:10px">
      <button id="check" class="primary">Check</button>
    </div>
    <div id="feedback" class="feedback" aria-live="polite"></div>
  `;
  const input = container.querySelector('#ans');
  const check = container.querySelector('#check');
  const feedback = container.querySelector('#feedback');

  function evaluate(){
    const val = Number(input.value);
    if(Number.isNaN(val)){ return; }
    if(val === 25){
      feedback.textContent = 'Correct: 25 seconds.';
      feedback.className = 'feedback good';
      if(narrationEnabled()) speak('Correct. Twenty five seconds.');
      setTimeout(()=> onSolved(true), 600);
    }else{
      feedback.textContent = 'Not quite. Think: 1 percent per second, 25 percent total.';
      feedback.className = 'feedback bad';
      if(narrationEnabled()) speak('Not quite. Try again.');
    }
  }

  check.addEventListener('click', evaluate);
  input.addEventListener('keydown', (e)=>{
    if(e.key==='Enter'){ evaluate(); }
  });
  setTimeout(()=> input?.focus(), 50);
}
