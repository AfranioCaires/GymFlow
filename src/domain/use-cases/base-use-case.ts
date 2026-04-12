export abstract class BaseUseCase<Input, Output> {
  abstract execute(data: Input): Promise<Output>
}
