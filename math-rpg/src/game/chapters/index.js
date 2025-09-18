import { buildChapter1 } from './chapter1.js';

const chapters = Object.freeze({
  chapter1: buildChapter1
});

export const chapterIds = Object.freeze(Object.keys(chapters));

export function getChapter(name, options={}){
  const builder = chapters[name];
  if(!builder){
    throw new Error(`Chapter "${name}" not found`);
  }
  return builder(options);
}
