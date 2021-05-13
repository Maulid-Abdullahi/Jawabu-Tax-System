import { StandardEntity } from "./base/sys$StandardEntity";
export class CurrencyExchange extends StandardEntity {
  static NAME = "miliki_CurrencyExchange";
  conversionRate?: any | null;
}
export type CurrencyExchangeViewName = "_base" | "_local" | "_minimal";
export type CurrencyExchangeView<
  V extends CurrencyExchangeViewName
> = V extends "_base"
  ? Pick<CurrencyExchange, "id" | "conversionRate">
  : V extends "_local"
  ? Pick<CurrencyExchange, "id" | "conversionRate">
  : V extends "_minimal"
  ? Pick<CurrencyExchange, "id" | "conversionRate">
  : never;
