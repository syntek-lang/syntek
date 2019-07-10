import { loadTestsInDir } from '../TestUtils';

describe('compiler', () => {
  loadTestsInDir(__dirname, './parser');
});
