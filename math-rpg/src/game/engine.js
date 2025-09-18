import { renderNarrative, renderChoices, setFeedback } from '../ui/ui.js';
import { speak, narrationEnabled } from '../tts.js';
import { oxygenPuzzle } from './puzzles/oxygen.js';
import { quickfirePuzzle } from './puzzles/quickfire.js';
import { treasureChestPuzzle } from './puzzles/treasureChest.js';

export class Engine{
  constructor({screen, nextBtn, restartBtn, chapter}){
    this.screen = screen;
    this.nextBtn = nextBtn;
    this.restartBtn = restartBtn;
    this.chapter = chapter;
    this.stepIndex = 0;
    this.score = 0;
    this.locked = false;
    this.handlers();
    this.render();
  }

  handlers(){
    this.nextBtn.addEventListener('click', ()=>this.advance());
    this.restartBtn.addEventListener('click', ()=>this.restart());

    window.addEventListener('keydown', (e)=>{
      if(e.key===' '|| e.key==='Enter'){ e.preventDefault(); this.advance(); }
      if(['1','2','3','4'].includes(e.key)){
        const btn = this.screen.querySelector(`.choice[data-i="${Number(e.key)-1}"]`);
        if(btn) btn.click();
      }
    });
  }

  current(){ return this.chapter.steps[this.stepIndex]; }

  restart(){
    this.stepIndex = 0;
    this.score = 0;
    this.locked = false;
    this.render();
  }

  advance(){
    if(this.locked) return;
    const step = this.current();
    // If awaiting answer, ignore next
    if(step && step.type && step.type.startsWith('q')) return;
    this.stepIndex++;
    if(this.stepIndex >= this.chapter.steps.length){
      this.end();
    }else{
      this.render();
    }
  }

  end(){
    const container = this.screen;
    const total = this.chapter.steps.filter(s=>s.type?.startsWith('q') || s.type==='puzzle').length;
    const msg = `Chapter complete. Score ${this.score}/${total}.`;
    renderNarrative({container, text: msg, meta: 'Press Restart to play again.'});
  }

  render(){
    const container = this.screen;
    const step = this.current();
    if(!step) return;

    if(step.type==='narrative'){
      renderNarrative({container, text: step.text, meta: step.meta});
      return;
    }

    if(step.type==='q-mcq'){
      renderChoices({
        container,
        question: step.question,
        choices: step.choices
      });
      container.querySelectorAll('.choice').forEach(btn=>{
        btn.addEventListener('click', ()=>{
          const i = Number(btn.dataset.i);
          const correct = step.choices[i]?.correct === true;
          if(correct){
            this.score++;
            setFeedback({
              container,
              message: step.choices[i].feedback || 'Correct!',
              good: true
            });
            if(narrationEnabled()) speak('Correct');
          }else{
            setFeedback({
              container,
              message: step.choices[i].feedback || 'Try again.'
            });
            if(narrationEnabled()) speak('That is not correct.');
            return; // stay on question
          }
          // after brief delay, move on
          this.locked = true;
          setTimeout(()=>{
            this.locked = false;
            this.stepIndex++; 
            if(this.stepIndex >= this.chapter.steps.length) this.end(); else this.render();
          }, 600);
        });
      });
      return;
    }

    if(step.type==='puzzle'){
      if(step.id==='oxygen'){
        oxygenPuzzle({container, onSolved:(ok)=>{
          if(ok) this.score++;
          this.stepIndex++;
          if(this.stepIndex >= this.chapter.steps.length) this.end(); else this.render();
        }});
        return;
      }

      if(step.id==='quickfire'){
        quickfirePuzzle({container, onSolved:(ok)=>{
          if(ok) this.score++;
          this.stepIndex++;
          if(this.stepIndex >= this.chapter.steps.length) this.end(); else this.render();
        }});
        return;
      }

      if(step.id==='treasure-chest'){
        treasureChestPuzzle({container, onSolved:(ok)=>{
          if(ok) this.score++;
          this.stepIndex++;
          if(this.stepIndex >= this.chapter.steps.length) this.end(); else this.render();
        }});
        return;
      }
    }
  }
}
