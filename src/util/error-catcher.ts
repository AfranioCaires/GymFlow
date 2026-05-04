/**
 * Wraps a promise and catches errors, returning a result that supports both
 * array and object destructuring with discriminated narrowing.
 *
 * When `error` is present, TypeScript narrows `data` to `never`, forcing
 * error handling before accessing the resolved value.
 *
 * If no `errorsToCatch` is provided, catches all errors.
 * If `errorsToCatch` is provided, only catches instances of those error
 * classes — re-throws others.
 *
 * @example
 * // Array destructuring — catch any error
 * const [error, data] = await catchError(fetchUser(id));
 * if (error) return;
 * console.log(data.name);
 *
 * @example
 * // Object destructuring — catch any error
 * const { error, data } = await catchError(fetchUser(id));
 * if (error) return;
 * console.log(data.name);
 *
 * @example
 * // Catch only specific errors
 * const { error, data } = await catchError(
 *   fetchUser(id),
 *   [NotFoundError, ValidationError],
 * );
 * if (error) {
 *   // error: NotFoundError | ValidationError
 * }
 */

/** Result when the promise resolves successfully. */
type ResultSuccess<T> = readonly [error: undefined, data: T] & {
  error: undefined
  data: T
}

/**
 * Result when the promise rejects.
 * `data` is `never` to prevent access without error handling.
 */
type ResultFailure<E extends Error> = readonly [error: E, data?: never] & {
  error: E
  data: never
}

/** Discriminated union narrowed by the presence of `error`. */
type Result<T, E extends Error = Error> = ResultSuccess<T> | ResultFailure<E>

/**
 * Creates a `Result` tuple that also exposes named properties `error` and
 * `data`. Properties are non-enumerable to avoid interfering with spread
 * and `JSON.stringify`.
 */
function makeResult(error: undefined, data: unknown): ResultSuccess<unknown>
function makeResult(error: Error, data?: never): ResultFailure<Error>
function makeResult<T, E extends Error>(error: E | undefined, data?: T): Result<T, E> {
  const tuple = (error !== undefined ? [error] : [undefined, data]) as unknown as Result<T, E>

  Object.defineProperty(tuple, 'error', { value: error, enumerable: false })
  Object.defineProperty(tuple, 'data', { value: data, enumerable: false })

  return tuple
}

export function catchError<T>(promise: Promise<T>): Promise<Result<T, Error>>

export function catchError<T, E extends new (...args: never[]) => Error>(
  promise: Promise<T>,
  errorsToCatch: E[],
): Promise<Result<T, InstanceType<E>>>

export function catchError<T, E extends new (...args: never[]) => Error>(
  promise: Promise<T>,
  errorsToCatch?: E[],
): Promise<Result<T, Error>> {
  return promise
    .then((data) => makeResult(undefined, data) as ResultSuccess<T>)
    .catch((error: Error) => {
      if (!errorsToCatch || errorsToCatch.length === 0) {
        return makeResult(error) as ResultFailure<Error>
      }
      if (errorsToCatch.some((cls) => error instanceof cls)) {
        return makeResult(error) as ResultFailure<Error>
      }
      throw error
    })
}
