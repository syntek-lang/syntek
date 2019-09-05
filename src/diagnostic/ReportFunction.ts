import { Diagnostic } from '.';
import { Span } from '../position';

export type ErrorHandler = (error: Diagnostic) => void;

export type ReportFunction = (
  msg: string,
  span: Span,
  errorHandler?: ErrorHandler,
) => void;
