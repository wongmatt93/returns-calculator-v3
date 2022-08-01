const formatPercent = (number1: number, number2: number): string => {
  return `${((number1 / number2) * 100)
    .toFixed(2)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}%`;
};

const formatMoney = (money: number): string => {
  return `$${money
    .toFixed(2)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
};

export { formatPercent, formatMoney };
