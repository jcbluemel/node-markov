"use strict";
/** Textual markov chain generator. */


class MarkovMachine {

  /** Build markov machine; read in text.*/

  constructor(text) {
    // A "word" will also include any punctuation around the word, so this will
    // include things like "The", "cat", "cat.".
    this.words = text.split(/[ \r\n]+/);
    this.chains = this.getChains();
  }

  /** Get markov chain: returns Map of Markov chains.
   *
   *  For text of "The cat in the hat.", chains will be:
   *
   *  {
   *   "The": ["cat"],
   *   "cat": ["in"],
   *   "in": ["the"],
   *   "the": ["hat."],
   *   "hat.": [null],
   *  }
   *
   * */

  getChains() {

    const chains = new Map();

    for (let i = 0; i < this.words.length; i++) {

      const currWord = this.words[i];
      const nextWord = this.words[i + 1] || null;

      if (chains.has(currWord)) {
        let chain = chains.get(currWord);
        chain.push(nextWord);
      } else {
        let chain = [nextWord];
        chains.set(currWord, chain);
      }
    }

    return chains;
  }

  /** Return random text from chains, starting at the first word and continuing
   *  until it hits a null choice. */

  getText() {

    const starterWord = this.words[0];
    let currWord = starterWord;
    const outputStory = [starterWord];
    let randomWord = "";

    while (randomWord !== null) {

      const chain = this.chains.get(currWord);
      const randomIdx = Math.floor(Math.random() * chain.length);

      randomWord = chain[randomIdx];

      if (randomWord === null) {
        return outputStory.join(' ');
      } else {
        outputStory.push(randomWord);
        currWord = randomWord;
      }
    }
  }
}


module.exports = {
  MarkovMachine
}