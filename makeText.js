"use strict";

/** Command-line tool to generate Markov text. */
const { MarkovMachine } = require("./markov");
const fsP = require("fs/promises");
const filePath = process.argv[2];


async function readText(path) {

  let content;
  try {
    content = await fsP.readFile(path, "utf8");
    return content;
  } catch (err) {
    console.error(`Error reading ${path}:`);
    console.error(err);
    process.exit(1);
  }
}


async function markovGenerator() {

  const rawText = await readText(filePath);

  const machine = new MarkovMachine(rawText);
  console.log(machine.getText());
}

markovGenerator();



