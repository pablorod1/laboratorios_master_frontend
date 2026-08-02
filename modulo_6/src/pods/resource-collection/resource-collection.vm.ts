export type ResourceType = 'locations' | 'episodes';

export interface ResourceFactVm {
  label: string;
  value: string;
}

export interface ResourceItemVm {
  id: string;
  name: string;
  overline: string;
  facts: ResourceFactVm[];
}
