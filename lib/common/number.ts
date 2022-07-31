export function niceMoney(amount: number) {
  if (!amount && amount !== 0) {
    return amount;
  }
  return (
    "€ " +
    amount.toLocaleString("en-DE", {
      currency: "EUR",
      // currencySign: ''
    })
  );
}

export function isNumeric(str) {
  if (typeof str != "string") {
    return false;
  } // we only process strings!
  return !isNaN(parseFloat(str)); // ...and ensure strings of whitespace fail
}

export function isNumericOrNumber(str) {
  return typeof str === "number" || isNumeric(str);
}

export function getIncrease(oldPrice, newPrice) {
  if (!oldPrice || !newPrice) {
    return null;
  }
  oldPrice = Number(oldPrice);
  newPrice = Number(newPrice);
  const diff = (newPrice - oldPrice) / newPrice;
  return (100 * diff).toFixed(2) + "%";
}

export function clamp(min, val, max) {
  return Math.max(Math.min(val, max), min);
}

export function roundMoney(val) {
  return Math.round(val * 100) / 100;
}

export function extractNumber(text) {
  return Number(text.match(/(\d+)/)[1]);
}
