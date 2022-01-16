import wordData from "../public/words.json";

type Noun = {
  singular: string;
  plural: string;
};

type Verb = {
  present: string;
  past: string;
  past_participle: string;
  third: string; // Third person
  participle: string;
};

type Words = {
  nouns: Noun[];
  verbs: Verb[];
  adjectives: string[];
  necessities: string[];
};

export const words = wordData as Words;

const allWords: Set<string> = new Set();
words.nouns.forEach((noun) => {
  allWords.add(noun.singular);
  allWords.add(noun.plural);
});
words.verbs.forEach((verb) => {
  allWords.add(verb.present);
  allWords.add(verb.past);
  allWords.add(verb.participle);
  allWords.add(verb.third);
  allWords.add(verb.past_participle);
});
words.adjectives.forEach((adjective) => allWords.add(adjective));
words.necessities.forEach((nec) => allWords.add(nec));
export const wordSet: Set<string> = allWords;
