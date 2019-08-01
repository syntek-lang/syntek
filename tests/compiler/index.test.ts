import 'mocha';

import { loadIndexInDir } from '../test-utils';

describe('compiler', () => {
  loadIndexInDir(__dirname, './parser');
});
