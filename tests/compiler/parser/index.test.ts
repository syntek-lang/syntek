import { loadTestsInDir, getDirsInDir } from '../../TestUtils';

describe('parser', () => {
  describe('expressions', () => {
    getDirsInDir(__dirname, './expressions')
      .forEach(dir => loadTestsInDir(__dirname, dir));
  });
});
