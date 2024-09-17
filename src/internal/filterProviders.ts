import { FilterProvider } from "../types";

export const EqFilterProvider: FilterProvider = (data, arg) => {
  return data == arg;
};

export const StartsWithFilterProvider: FilterProvider = (data, arg) => {
  return typeof data == "string" && data.startsWith(arg as string);
};

export const EndsWithFilterProvider: FilterProvider = (data, arg) => {
  return typeof data == "string" && data.endsWith(arg as string);
};

export const ContainsFilterProvider: FilterProvider = (data, arg) => {
  return (
    typeof data == "string" &&
    data.toLocaleLowerCase().includes((arg + "").toLocaleLowerCase())
  );
};

export const GtFilterProvider: FilterProvider = (data, arg) => {
  return data > arg;
};

export const LtFilterProvider: FilterProvider = (data, arg) => {
  return data < arg;
};

export const GteFilterProvider: FilterProvider = (data, arg) => {
  return data >= arg;
};

export const LteFilterProvider: FilterProvider = (data, arg) => {
  return data <= arg;
};

export const BetweenFilterProvider: FilterProvider = (data, arg) => {
  return arg[0] < data && data < arg[1];
};

export const BetweenInclusiveFilterProvider: FilterProvider = (data, arg) => {
  return arg[0] <= data && data <= arg[1];
};

export const HasFilterProvider: FilterProvider = (data, arg) => {
  return Array.isArray(data) && data.includes(arg);
};

export const defaultProviders = {
  eq: EqFilterProvider,
  startsWith: StartsWithFilterProvider,
  endsWith: EndsWithFilterProvider,
  contains: ContainsFilterProvider,
  gt: GtFilterProvider,
  lt: LtFilterProvider,
  gte: GteFilterProvider,
  lte: LteFilterProvider,
  between: BetweenFilterProvider,
  betweenInclusive: BetweenInclusiveFilterProvider,
  has: HasFilterProvider
};
