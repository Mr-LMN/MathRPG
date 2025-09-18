const baseSteps = [
  {
    type: 'narrative',
    text: 'Rain rattles the steel gantry above the reservoir as you fasten the <strong>Pencoedtre crest</strong> to your dive suit. Below, a numeracy beacon sputters in the Flooded Ruins.',
    meta: 'Press Continue to descend the hatch.'
  },
  {
    type: 'narrative',
    text: 'You drop into the Drowned Observatory. Luminous vine guardians slither awake, tasting the charge of your calculator glove.',
    meta: 'Solve fast to strike before they constrict.'
  },
  {
    type: 'q-mcq',
    variants: {
      ks3: {
        question: 'A vine hurls 18 glowing thorns. You deflect 7 with your shield. How many thorns still flicker?',
        meta: 'Subtract to sap its strength.',
        choices: [
          { label: '9', correct: false, feedback: 'Nine would mean the vine only launched 16 thorns.' },
          { label: '10', correct: false, feedback: 'Check the subtraction carefully.' },
          { label: '11', correct: true, feedback: 'Direct hit! Eleven thorns remain.' },
          { label: '12', correct: false, feedback: 'Too many—keep counting.' }
        ]
      },
      ks4: {
        question: 'The guardian splits its energy into 3 coils of 4 sparks each and unleashes 5 spare sparks. How many sparks surge altogether?',
        meta: 'Use multiplication, then add the strays.',
        choices: [
          { label: '12', correct: false, feedback: 'That is only the energy from the coils.' },
          { label: '15', correct: false, feedback: 'Remember the spare sparks as well.' },
          { label: '17', correct: true, feedback: 'All sparks counted—your strike lands!' },
          { label: '19', correct: false, feedback: 'Too many sparks—double-check the totals.' }
        ]
      }
    }
  },
  {
    type: 'narrative',
    text: 'The vines recoil and the crest on your chest glows warm. Sirens pulse as flood gauges spike red along the corridor.',
    meta: 'Stabilise the valves before the tunnels drown.'
  },
  {
    type: 'puzzle',
    id: 'quickfire'
  },
  {
    type: 'narrative',
    text: 'With the pumps steady, a brass bulkhead seals the passage. Its keypad shines with tidal runes awaiting the correct code.',
    meta: 'Read the pattern and enter the digits.'
  },
  {
    type: 'q-mcq',
    variants: {
      ks3: {
        question: 'The keypad shows 4 crates with 6 glowrods each and 8 loose rods beside them. What code unlocks the door?',
        meta: 'Multiply, then add the extras.',
        choices: [
          { label: '24', correct: false, feedback: 'That is only the rods in the crates.' },
          { label: '28', correct: false, feedback: 'Add the loose rods too.' },
          { label: '32', correct: true, feedback: 'Door slides open with a hiss.' },
          { label: '38', correct: false, feedback: 'Too high—count again.' }
        ]
      },
      ks4: {
        question: 'A schematic glows with 2 × (3x + 4) when x = 5. Enter the code that balances the circuits.',
        meta: 'Evaluate inside the brackets before multiplying.',
        choices: [
          { label: '22', correct: false, feedback: 'Try substituting x = 5 again.' },
          { label: '34', correct: false, feedback: 'Double-check your multiplication.' },
          { label: '38', correct: true, feedback: 'Runes align—the bulkhead unlocks.' },
          { label: '44', correct: false, feedback: 'Slightly too high—check the order of operations.' }
        ]
      }
    }
  },
  {
    type: 'narrative',
    text: 'Beyond the bulkhead rests a tide-scarred chest ringed in bioluminescent barnacles. Your crest senses an artefact reward within.',
    meta: 'Match the glyphs to win the Tidecloak badge.'
  },
  {
    type: 'puzzle',
    id: 'treasure-chest'
  },
  {
    type: 'narrative',
    text: 'The chamber drains into a narrow tunnel that burbles with black water. A battered oxygen tank floats beside the entrance.',
    meta: 'Plan your swim before the gauge runs dry.'
  },
  {
    type: 'puzzle',
    id: 'oxygen'
  },
  {
    type: 'narrative',
    text: 'You surface in a lantern-lit cavern, crest gleaming. The numeracy beacon hums back to life ahead, inviting the next stage of the quest.',
    meta: 'Chapter 1 complete—log your score and brief your team.'
  }
];

function resolveStep(step, stage){
  if(step.variants){
    const variant = step.variants[stage] || step.variants.ks3;
    const { variants, ...rest } = step;
    return Object.freeze({ ...rest, ...variant });
  }
  return Object.freeze({ ...step });
}

export function buildChapter1({ stage = 'ks3' } = {}){
  const keyStage = stage === 'ks4' ? 'ks4' : 'ks3';
  const steps = baseSteps.map(step => resolveStep(step, keyStage));
  return Object.freeze({
    id: 'chapter1',
    title: 'Into the Flooded Ruins',
    stage: keyStage,
    steps: Object.freeze(steps)
  });
}

export default Object.freeze({
  id: 'chapter1',
  title: 'Into the Flooded Ruins',
  build: buildChapter1
});
