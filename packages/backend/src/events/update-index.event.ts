import { EntityNames } from '@self/utils';

type AnyClassConstructor = {
  new (...args: any[]): any;
};

export type TIndexName = Extract<
  EntityNames['title'],
  'tenant' | 'portfolio' | 'property'
>;

type Item = {
  id: string;
  organizationId: string;
  // portfolioId: string; // enable if search is enabled for portfolio users
} & {
  [key: string]: any;
};

export class UpdateIndexEvent {
  constructor(
    // TODO add types
    public readonly items: Item[],
    public readonly indexName: TIndexName,
    public readonly classConstructor: AnyClassConstructor,
  ) {}
}
