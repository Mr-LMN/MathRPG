export const chapter1 = {
  id: 'chapter1',
  title: 'Into the Flooded Ruins',
  steps: [
    {
      type: 'narrative',
      text: 'You choose your adventurer and step into the flooded ruins. Your torch flickers as water drips from the ceiling.',
      meta: 'Press Continue.'
    },
    {
      type: 'narrative',
      text: 'A shambling vine-beast blocks your path. It lunges! Solve fast to strike first.',
      meta: 'Quick duel math.'
    },
    {
      type: 'q-mcq',
      question: '12 + 7 = ?',
      choices: [
        { label: '18', correct: false, feedback: 'Too low.' },
        { label: '19', correct: true, feedback: 'Nice hit!' },
        { label: '20', correct: false, feedback: 'Close, but no.' },
        { label: '21', correct: false, feedback: 'Too high.' }
      ]
    },
    {
      type: 'narrative',
      text: 'The beast withers. Water sirens flash as the tunnel starts flooding faster around you.',
      meta: 'Stabilise the valves before the corridor fills.'
    },
    {
      type: 'puzzle',
      id: 'quickfire'
    },
    {
      type: 'narrative',
      text: 'With the pressure settled, a rusted door stands ahead with a number pad.',
      meta: 'Crack the lock.'
    },
    {
      type: 'q-mcq',
      question: 'The code equals 3 × (6 + 4). Enter the result:',
      choices: [
        { label: '30', correct: true, feedback: 'Door clicks open.' },
        { label: '24', correct: false, feedback: 'Remember the brackets first.' },
        { label: '34', correct: false, feedback: 'Order of operations!' },
        { label: '46', correct: false, feedback: 'Way off.' }
      ]
    },
    {
      type: 'narrative',
      text: 'Inside the chamber a barnacled treasure chest pulses with blue light.',
      meta: 'The glyphs promise a cosmetic badge for the right code.'
    },
    {
      type: 'puzzle',
      id: 'treasure-chest'
    },
    {
      type: 'narrative',
      text: 'Whether the chest rewards you or explodes in spray, you press deeper into the ruins. A submerged tunnel gurgles nearby and an oxygen tank lies within reach.',
      meta: 'Time your swim.'
    },
    {
      type: 'puzzle',
      id: 'oxygen'
    },
    {
      type: 'narrative',
      text: 'You surface safe on the far side, water streaming off your gear. A faint glow beckons deeper within…',
      meta: 'Chapter 1 complete.'
    }
  ]
};

export default Object.freeze(chapter1);
