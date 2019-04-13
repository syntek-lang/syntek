import Rule from './Rule';
import { TokenMatcher, TokenClass } from '../token';

import TokenMatcherRule from './rules/TokenMatcherRules';
import ManyRule from './rules/ManyRule';
import ManySepRule from './rules/ManySepRule';
// import WrappedRule from './WrappedRule';
import SeqRule from './rules/SeqRule';
import OptRule from './rules/OptRule';
import OrRule from './rules/OrRule';

type Tokenable = Rule | TokenMatcher | TokenClass;

function tokenableToRule(tokenable: Tokenable): Rule {
  if (tokenable instanceof Rule) {
    return tokenable;
  } if (tokenable instanceof TokenMatcher) {
    return new TokenMatcherRule(tokenable.Class);
  }

  return new TokenMatcherRule(tokenable);
}

export default class $ {
  static MANY(tokenable: Tokenable): Rule {
    return new ManyRule(tokenableToRule(tokenable));
  }

  static MANY_SEP(tokenabe: Tokenable, separator: Tokenable): Rule {
    return new ManySepRule(tokenableToRule(tokenabe), tokenableToRule(separator));
  }

  // static WRAPPED(start: Tokenable, expected: Tokenable, end: Tokenable): Rule {
  //   return new WrappedRule(
  //     tokenableToRule(start),
  //     tokenableToRule(expected),
  //     tokenableToRule(end),
  //   );
  // }

  static SEQ(...tokenables: Tokenable[]): Rule {
    return new SeqRule(tokenables.map(tokenableToRule));
  }

  static OPT(tokenable: Tokenable): Rule {
    return new OptRule(tokenableToRule(tokenable));
  }

  static OR(...tokenables: Tokenable[]): Rule {
    return new OrRule(tokenables.map(tokenableToRule));
  }
}
