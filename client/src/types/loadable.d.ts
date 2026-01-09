export type LoadableStatus<T> =
  | { status: 'isLoading'; data: null }
  | { status: 'loaded'; data: T | null };
