import { Word } from './word';

export const WORDS: Word[] = [
  { id: 0, voc: 'dog' , trad: 'chien'},
  { id: 1, voc: 'cat' , trad: 'chat'},
  { id: 2, voc: 'turtle', trad: 'tortue'},
  { id: 3, voc: 'monkey' , trad: 'singe'},
  { id: 4, voc: 'horse', trad: 'cheval'},
  { id: 5, voc: 'pig' , trad: 'cochon'},
  { id: 6, voc: 'sheep' , trad: 'mouton'},
  { id: 7, voc: 'bird', trad: 'oiseau'},
  { id: 8, voc: 'rabbit' , trad: 'lapin'},
  { id: 9, voc: 'fish', trad: 'poisson'}
];

export const QUIZZ: Word[] = [
  { id: 0, voc: 'dog' , trad: ''},
  { id: 1, voc: 'cat' , trad: ''},
  { id: 2, voc: 'turtle', trad: ''},
  { id: 3, voc: 'monkey' , trad: ''},
  { id: 4, voc: 'horse', trad: ''},
  { id: 5, voc: 'pig' , trad: ''},
  { id: 6, voc: 'sheep' , trad: ''},
  { id: 7, voc: 'bird', trad: ''},
  { id: 8, voc: 'rabbit' , trad: ''},
  { id: 9, voc: 'fish', trad: ''}
];

export const QUIZZ2: Word[] = [
  { id: 0, voc: '' , trad: 'chien'},
  { id: 1, voc: '' , trad: 'chat'},
  { id: 2, voc: '', trad: 'tortue'},
  { id: 3, voc: '' , trad: 'singe'},
  { id: 4, voc: '', trad: 'cheval'},
  { id: 5, voc: '' , trad: 'cochon'},
  { id: 6, voc: '' , trad: 'mouton'},
  { id: 7, voc: '', trad: 'oiseau'},
  { id: 8, voc: '' , trad: 'lapin'},
  { id: 9, voc: '', trad: 'poisson'}
];



export function shuffleArray<T>(array: T[]): T[] {
// if it's 1 or 0 items, just return
if (array.length <= 1) return array;

// For each index in array
for (let i = 0; i < array.length; i++) {

  // choose a random not-yet-placed item to place there
  // must be an item AFTER the current item, because the stuff
  // before has all already been placed
  const randomChoiceIndex = Math.round(Math.random() * (array.length - 1));

  // place our random choice in the spot by swapping
  [array[i], array[randomChoiceIndex]] = [array[randomChoiceIndex], array[i]];
}

return array;
}
