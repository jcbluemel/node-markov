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

      let currWord = this.words[i];
      let nextWord = this.words[i + 1];
      if (nextWord === undefined) nextWord = null;


      if (chains.get(currWord)) {
        let chain = chains.get(currWord);
        chain.push(nextWord);
        chains.set(currWord, chain);
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
    // TODO: implement this!

    let starterWord = this.words[0];
    let currWord = starterWord;
    let ans = [starterWord];

    let randomWord = "";

    while (randomWord !== null) {

      let chain = this.chains.get(currWord);
      let randomIdx = Math.floor(Math.random() * chain.length);

      randomWord = chain[randomIdx];

      if (randomWord === null) {
        return ans.join(' ');
      } else {
        ans.push(randomWord);
        currWord = randomWord;
      }

    }

    // - start at the first word in the input text
    // - find a random word from the following-words of that
    // - repeat until reaching the terminal null
  }
}

