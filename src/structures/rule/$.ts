import Rule from './Rule';
import TokenMatcher, { TokenClass } from '../TokenMatcher';

import TokenMatcherRule from './TokenMatcherRules';
import ManyRule from './ManyRule';
import ManySepRule from './ManySepRule';
// import WrappedRule from './WrappedRule';
import SeqRule from './SeqRule';
import OptRule from './OptRule';
import OrRule from './OrRule';

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
