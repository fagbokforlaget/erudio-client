import { Structure, Options } from './structure/structure';

export class ErudioClient {
  public getStructures = async (
    namespace: string,
    options: Options,
  ): Promise<object> => {
    return new Structure().getData(namespace, options);
  };
}
