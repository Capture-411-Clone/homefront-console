export type FilterValueInt = {
  op?: string;
  value?: number;
};

export type FilterValueString = {
  op?: string;
  value?: string;
};

export enum FilterOperatorsEnum {
  EQUALS = 'equals',
  CONTAINS = 'contains',
  STARTS_WITH = 'startsWith',
  ENDS_WITH = 'endsWith',
  IS_EMPTY = 'isEmpty',
  IS_NOT_EMPTY = 'isNotEmpty',
  IS_ANY_OF = 'isAnyOf',
  _ = '=',
  IS = 'is',
  IS_NOT = 'isNot',
}
