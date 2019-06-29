import { Node } from '../../..';
import { ExpressionMatcher } from '../ExpressionMatcher';

export * from './op3';
export * from './op4';
export * from './op5';
export * from './op6';
export * from './op7';
export * from './op8';
export * from './op9';
export * from './op10';
export * from './op11';
export * from './op12';

export type OpFunction = (this: ExpressionMatcher) => Node;
