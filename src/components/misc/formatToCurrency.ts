export function symbolFormatting(num: number, code?: string) {
  const decimal = num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1");
  return code != null ? "$" + decimal + " " + code : "$" + decimal;
}

export function formatToCurrency(num: number) {
  return { raw: num, formatted: num.toString(), formatted_with_code: symbolFormatting(num, "AUD"), formatted_with_symbol: symbolFormatting(num) };
}
