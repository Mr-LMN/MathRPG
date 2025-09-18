import { speak, narrationEnabled } from '../../tts.js';

export function quickfirePuzzle({ container, onSolved }) {
  const tasks = [
    {
      prompt: 'Gauge 3B spikes to 28 litres of water per minute. You drop a valve that bleeds away 9 litres instantly. What flow remains?',
      answer: 19,
      hint: 'Subtract 9 from 28.'
    },
    {
      prompt: 'Two backup pumps blast 6 litres each per minute. The control screen insists you need 27 litres to hold the corridor. How many litres must the main pump add?',
      answer: 15,
      hint: 'Add the two pumps together, then find the difference to 27.'
    },
    {
      prompt: 'A jammed sluice divides the tunnel into 3 equal channels. Each must carry 12 litres of water to keep the flood steady. What total flow should roar through the gate?',
      answer: 36,
      hint: 'Multiply 12 by 3.'
    }
  ];

  let index = 0;

  container.innerHTML = `
    <p class="prompt">Emergency sirens echo. You have seconds to stabilise the waterworks.</p>
    <p class="meta">Quickfire round: answer each calculation to seal the valves. There are ${tasks.length} tasks.</p>
    <p id="q-status" class="meta" aria-live="polite"></p>
    <label class="quickfire-question">
      <span id="q-text"></span>
      <input id="q-input" type="number" inputmode="numeric" class="answer" aria-label="Enter your answer">
    </label>
    <div class="controls" style="margin-top:10px">
      <button id="q-submit" class="primary">Lock In</button>
    </div>
    <div id="feedback" class="feedback" aria-live="polite"></div>
  `;

  const status = container.querySelector('#q-status');
  const question = container.querySelector('#q-text');
  const input = container.querySelector('#q-input');
  const submit = container.querySelector('#q-submit');
  const feedback = container.querySelector('#feedback');

  function updateView() {
    const current = tasks[index];
    status.textContent = `Task ${index + 1} of ${tasks.length}`;
    question.textContent = current.prompt;
    input.value = '';
    if (narrationEnabled()) speak(current.prompt);
    input.focus();
  }

  function handleSuccess() {
    feedback.textContent = 'Valves stabilised! You outrun the surge.';
    feedback.className = 'feedback good';
    if (narrationEnabled()) speak('Valves stabilised.');
    submit.disabled = true;
    input.disabled = true;
    setTimeout(() => onSolved(true), 900);
  }

  function handleCheck() {
    const current = tasks[index];
    const val = Number(input.value);
    if (Number.isNaN(val)) {
      feedback.textContent = 'Enter a number before locking in.';
      feedback.className = 'feedback bad';
      if (narrationEnabled()) speak('Enter a number.');
      return;
    }

    if (val === current.answer) {
      feedback.textContent = 'Quick thinking!';
      feedback.className = 'feedback good';
      if (narrationEnabled()) speak('Correct.');
      index += 1;
      if (index >= tasks.length) {
        handleSuccess();
      } else {
        setTimeout(() => {
          feedback.textContent = '';
          feedback.className = 'feedback';
          updateView();
        }, 500);
      }
    } else {
      feedback.textContent = `${current.hint}`;
      feedback.className = 'feedback bad';
      if (narrationEnabled()) speak('Not quite. Try again.');
    }
  }

  submit.addEventListener('click', handleCheck);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleCheck();
  });

  updateView();
}
