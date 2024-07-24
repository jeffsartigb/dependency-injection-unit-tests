export interface IUseCase<D, R> {
  execute(data?: D): R;
}
