import chapter1 from './chapter1.js';

const chapters = Object.freeze({
  [chapter1.id]: chapter1
});

export const chapterIds = Object.freeze(Object.keys(chapters));

export function getChapter(name){
  const chapter = chapters[name];
  if(!chapter){
    throw new Error(`Chapter "${name}" not found`);
  }
  return chapter;
}
