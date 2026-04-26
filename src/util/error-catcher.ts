/**
 * Wraps a promise and catches errors, returning a tuple of [error, data].
 * If no errorsToCatch is provided, catches all errors.
 * If errorsToCatch is provided, only catches instances of those error classes — re-throws others.
 *
 * @example
 * // Catch any error
 * const [err, data] = await catchError(fetchUser(id));
 *
 * @example
 * // Catch only specific errors
 * const [err, data] = await catchError(fetchUser(id), [NotFoundError, ValidationError]);
 * if (err) { ... }
 */
export function catchError<T>(promise: Promise<T>): Promise<[undefined, T] | [Error]>

export function catchError<T, E extends new (message?: string) => Error>(
  promise: Promise<T>,
  errorsToCatch: E[],
): Promise<[undefined, T] | [InstanceType<E>]>

export function catchError<T, E extends new (message?: string) => Error>(
  promise: Promise<T>,
  errorsToCatch?: E[],
): Promise<[undefined, T] | [InstanceType<E>] | [Error]> {
  return promise
    .then((data) => {
      return [undefined, data] as [undefined, T]
    })
    .catch((error) => {
      if (!errorsToCatch || errorsToCatch.length === 0) {
        return [error]
      }

      if (errorsToCatch.some((errorClass) => error instanceof errorClass)) {
        return [error]
      }

      throw error
    })
}
