import 'mocha';

import { loadIndexInDir } from './test-utils';

loadIndexInDir(__dirname, './linter');
loadIndexInDir(__dirname, './parser');
loadIndexInDir(__dirname, './walker');
