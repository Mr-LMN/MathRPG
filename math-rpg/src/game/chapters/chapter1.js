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
      text: 'The beast withers. A rusted door stands ahead with a number pad.',
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
      text: 'Beyond the door, a submerged tunnel gurgles. You find an oxygen tank from an earlier skirmish.',
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
