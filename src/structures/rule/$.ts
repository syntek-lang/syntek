import Rule from './Rule';
import { TokenMatcher, TokenClass } from '../token';

import TokenMatcherRule from './rules/TokenMatcherRules';
import ManyRule from './rules/ManyRule';
import ManySepRule from './rules/ManySepRule';
import WrappedRule from './rules/WrappedRule';
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

// eslint-disable-next-line @typescript-eslint/class-name-casing
export default class $ {
  /**
   * Match zero or more tokens
   *
   * @param tokenable - The tokenable to match
   */
  static MANY(tokenable: Tokenable): Rule {
    return new ManyRule(tokenableToRule(tokenable));
  }

  /**
   * Match zero or more tokens, seperated by a delimiter
   *
   * @param tokenable - The tokenable to match
   * @param separator - The seperating tokenable
   */
  static MANY_SEP(tokenabe: Tokenable, separator: Tokenable): Rule {
    return new ManySepRule(tokenableToRule(tokenabe), tokenableToRule(separator));
  }

  /**
   * Match tokens until an even amount of start and end tokens have been found.
   * Then parse the content recursively. This allows for higher precedence.
   *
   * @param start - The start tokenable
   * @param expected - The expected tokenable
   * @param end - The end tokenable
   */
  static WRAPPED(start: Tokenable, expected: Tokenable, end: Tokenable): Rule {
    return new WrappedRule(
      tokenableToRule(start),
      tokenableToRule(expected),
      tokenableToRule(end),
    );
  }

  /**
   * Match a sequence of tokens
   *
   * @param tokenables - The tokenables to match
   */
  static SEQ(...tokenables: Tokenable[]): Rule {
    return new SeqRule(tokenables.map(tokenableToRule));
  }

  /**
   * Match zero or one tokens
   *
   * @param tokenable - The tokenable to match
   */
  static OPT(tokenable: Tokenable): Rule {
    return new OptRule(tokenableToRule(tokenable));
  }

  /**
   * Match any of the provided tokens
   *
   * @param tokenables - The tokenables to match
   */
  static OR(...tokenables: Tokenable[]): Rule {
    return new OrRule(tokenables.map(tokenableToRule));
  }
}
