import { describe, it } from 'node:test';
import { strictEqual } from 'node:assert';

import { pigIt } from './solution.mjs';

const fixedTests = [{
  input: 'This is my string',
  result: 'hisTay siay ymay tringsay'
}, {
  input: 'Acta est fabula',
  result: 'ctaAay steay abulafay'
}, {
  input: 'Barba non facit philosophum',
  result: 'arbaBay onnay acitfay hilosophumpay'
}, {
  input: 'Cucullus non facit monachum',
  result: 'ucullusCay onnay acitfay onachummay'
}, {
  input: 'Dura lex sed lex',
  result: 'uraDay exlay edsay exlay'
}, {
  input: 'Errare humanum est',
  result: 'rrareEay umanumhay steay'
}, {
  input: 'Fluctuat nec mergitur',
  result: 'luctuatFay ecnay ergiturmay'
}, {
  input: 'Gutta cavat lapidem',
  result: 'uttaGay avatcay apidemlay'
}, {
  input: 'Hic et nunc',
  result: 'icHay teay uncnay'
}, {
  input: 'In vino veritas',
  result: 'nIay inovay eritasvay'
}, {
  input: 'Lux in tenebris lucet',
  result: 'uxLay niay enebristay ucetlay'
}, {
  input: 'Morituri nolumus mori',
  result: 'orituriMay olumusnay orimay'
}, {
  input: 'Nunc est bibendum',
  result: 'uncNay steay ibendumbay'
}, {
  input: 'O tempora o mores !',
  result: 'Oay emporatay oay oresmay !'
}, {
  input: 'Panem et circenses',
  result: 'anemPay teay ircensescay'
}, {
  input: 'Quis custodiet ipsos custodes ?',
  result: 'uisQay ustodietcay psosiay ustodescay ?'
}, {
  input: 'Requiescat in pace',
  result: 'equiescatRay niay acepay'
}, {
  input: 'Sic transit gloria mundi',
  result: 'icSay ransittay loriagay undimay'
}, {
  input: 'Timeo Danaos et dona ferentes',
  result: 'imeoTay anaosDay teay onaday erentesfay'
}, {
  input: 'Ultima necat',
  result: 'ltimaUay ecatnay'
}, {
  input: 'Veni vidi vici',
  result: 'eniVay idivay icivay'
}];

const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const randomTests = Array.from({ length: 10 }, () => {
  const words = Array.from(
    { length: Math.ceil(Math.random() * 10) },
    () => Array.from({ length: Math.floor(Math.random() * 10) }, () => alphabet[Math.floor(Math.random() * alphabet.length)]).join('')
  );
  const input = [];
  const result = [];

  for (const word of words) {
    const firstLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
    input.push(`${firstLetter}${word}`);
    result.push(`${word}${firstLetter}ay`);
  }

  return {
    input: input.join(' '),
    result: result.join(' ')
  };
});

describe('[5kyu] Moving Zeros To The End', () => {
  describe('Fixed tests', () => {
    for (const { input, result } of fixedTests) {
      it(`${JSON.stringify(input)} => ${JSON.stringify(result)}`, () => {
        strictEqual(pigIt(input), result);
      });
    }
  });

  describe('Random tests', () => {
    for (const { input, result } of randomTests) {
      it(`${JSON.stringify(input)} => ${JSON.stringify(result)}`, () => {
        strictEqual(pigIt(input), result);
      });
    }
  });
});
