import { speak, narrationEnabled } from '../../tts.js';

export function treasureChestPuzzle({ container, onSolved }) {
  container.innerHTML = `
    <p class="prompt">The chest hums with tidal glyphs. Three brass dials labelled Tide, Current, and Anchor glow with faint numbers.</p>
    <p class="meta">Etched beside them: "Anchor equals the number of seasons in a year. Tide is three times Anchor. Current is Tide minus Anchor. Enter the four-digit code as Anchor, Tide, then Current."</p>
    <label>
      Enter the code:
      <input id="chest-code" type="number" inputmode="numeric" class="answer" aria-label="Enter the treasure code">
    </label>
    <div class="controls" style="margin-top:10px">
      <button id="chest-check" class="primary">Open Chest</button>
    </div>
    <div id="feedback" class="feedback" aria-live="polite"></div>
  `;

  const input = container.querySelector('#chest-code');
  const check = container.querySelector('#chest-check');
  const feedback = container.querySelector('#feedback');
  let resolved = false;

  function lockControls() {
    resolved = true;
    input.disabled = true;
    check.disabled = true;
  }

  function evaluate() {
    if (resolved) return;
    const value = Number(input.value);
    if (Number.isNaN(value)) {
      feedback.textContent = 'Type the full code before trying the chest.';
      feedback.className = 'feedback bad';
      if (narrationEnabled()) speak('Type the full code.');
      return;
    }

    lockControls();

    if (value === 4128) {
      feedback.textContent = 'The chest clicks open! A glowing Tidecloak badge shimmers into your inventory.';
      feedback.className = 'feedback good';
      if (narrationEnabled()) speak('Chest open. Tidecloak badge unlocked.');
      setTimeout(() => onSolved(true), 1000);
    } else {
      feedback.textContent = 'The glyphs flare angry red. The chest bursts in a splash of foam and vanishes—you duck and press on!';
      feedback.className = 'feedback bad';
      if (narrationEnabled()) speak('The chest explodes. You move on.');
      setTimeout(() => onSolved(false), 1200);
    }
  }

  check.addEventListener('click', evaluate);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') evaluate();
  });

  setTimeout(() => input?.focus(), 50);
}
