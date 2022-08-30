import { Structure, Options } from './structure/structure';

export class ErudioClient {
  private base_url: string;

  constructor(base_url: string) {
    this.base_url = base_url;
  }

  public getStructures = async (
    namespace: string,
    options: Options,
  ): Promise<object> => {
    return new Structure(this.base_url).listNodes(namespace, options);
  };
}
