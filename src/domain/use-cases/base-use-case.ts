export abstract class BaseUseCase<Request, Response> {
  abstract execute(data: Request): Promise<Response>
}
