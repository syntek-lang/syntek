import { loadTestsInDir } from '../test-utils';

describe('compiler', () => {
  loadTestsInDir(__dirname, './parser');
});
