export class ResourceNotFoundError extends Error {
  constructor(resourceName?: string) {
    super(`${resourceName ?? 'Resource'} not found`)
    this.name = 'ResourceNotFoundError'
  }
}
