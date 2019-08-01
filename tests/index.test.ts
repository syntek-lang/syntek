import 'mocha';

import { loadIndexInDir } from './test-utils';

loadIndexInDir(__dirname, './compiler');
loadIndexInDir(__dirname, './walker');
