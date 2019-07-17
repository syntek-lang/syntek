import { loadTestsInDir, getDirsFrom } from '../../test-utils';

describe('parser', () => {
  describe('declarations', () => {
    getDirsFrom(__dirname, './declarations')
      .forEach(dir => loadTestsInDir(__dirname, dir));
  });

  describe('expressions', () => {
    getDirsFrom(__dirname, './expressions')
      .forEach(dir => loadTestsInDir(__dirname, dir));
  });

  describe('statements', () => {
    getDirsFrom(__dirname, './statements')
      .forEach(dir => loadTestsInDir(__dirname, dir));
  });

  describe('literals', () => {
    getDirsFrom(__dirname, './literals')
      .forEach(dir => loadTestsInDir(__dirname, dir));
  });
});