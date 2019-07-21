import { Span } from '.';

export function getSpanFromString(string: string, span: Span): string {
  const lines = string.split('\n');
  const remaining = lines
    .slice(span.start[0], span.end[0] + 1)
    .join('\n');

  return remaining.slice(
    span.start[1],
    remaining.length - lines[span.end[0]].length + span.end[1],
  );
}
