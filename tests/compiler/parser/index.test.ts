import { loadTestsInDir, getDirsFrom } from '../../test-utils';

describe('parser', () => {
  describe('expressions', () => {
    getDirsFrom(__dirname, './expressions')
      .forEach(dir => loadTestsInDir(__dirname, dir));
  });

  describe('statements', () => {
    getDirsFrom(__dirname, './statements')
      .forEach(dir => loadTestsInDir(__dirname, dir));
  });
});
