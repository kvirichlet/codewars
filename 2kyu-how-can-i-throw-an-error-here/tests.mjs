import { describe, it } from 'node:test';
import { throws } from 'node:assert';

import { bang } from './solution.mjs';

describe('[2kyu] How can I throw an error here?', () => {
  it('Function throws an error', () => {
    throws(() => bang());
  });

  it('The error thrown is an instance of "Error" class', () => {
    throws(() => bang(), Error);
  });

  it('The error thrown has the correct message text', () => {
    throws(() => bang(), /^Error: Just throw like this!$/);
  });
});
