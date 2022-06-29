"use strict";
const { MarkovMachine } = require("./markov");



describe("returns the correct chains", function () {
    const markov = new MarkovMachine("do or do not there is no try")
    test("check for individual chains", function () {
        const chains = markov.getChains();
        expect(chains.get("no")).toEqual(["try"]);
        expect(chains.get("do")).toEqual(["or", "not"]);
        expect(chains.get("try")).toEqual([null]);
    });
});

describe("returns new text", function(){
    const markov = new MarkovMachine("The cat in the hat.")
    test("returns new markov chain inspire text", function (){
        expect(markov.getText()).toEqual("The cat in the hat.");
    });
});