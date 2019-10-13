import 'mocha';

import { loadTestsInDir } from '../test-utils';

describe('linter', () => {
  describe('parser', () => {
    loadTestsInDir(__dirname, './parser');
  });

  describe('declarations', () => {
    loadTestsInDir(__dirname, './declarations');
  });
});
