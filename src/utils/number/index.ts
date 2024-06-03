import { isNumber, isString } from "../type";

export function toFa(input?: string | number | null): string {
  if (!(isNumber(input) || isString(input))) {
    return '';
  }
  return (input + '').replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[Number(d)]);
}

export function toEn(input?: string | number | null): string {
  if (!(isNumber(input) || isString(input))) return '';
  let result = String(input);
  // replace arabic digits
  if ((result).match(/[٠١٢٣٤٥٦٧٨٩]/g)) {
    result = (input + '').replace(/[٠١٢٣٤٥٦٧٨٩]/g, (d) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d)));
  }
  return (result).replace(/[۰-۹]/g, (d) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d)));
}

export function toCurrency(value: number | string, isToman = false) {
  if (value === undefined) {
    return '';
  }
  let price = Number(toEn(value?.toString()?.replace?.(/,/g, '')));

  if (isNaN(price)) {
    return '۰';
  }
  if (!isToman) {
    price = Math.floor(price / 10);
  }
  let priceText = String(price).replace(/\$|\,/g, '');
  for (let i = 0; i < Math.floor((priceText.length - (1 + i)) / 3); i++) {
    priceText =
      priceText.substring(0, priceText.length - (4 * i + 3)) +
      ',' +
      priceText.substring(priceText.length - (4 * i + 3));
  }

  return toFa(priceText);
}