export function formatCurrency(priceCents) {
  return (Math.round(priceCents) / 100).toFixed(2);
}

export function extendedCustomRound(number) {

  const integerPart = Math.floor(number);
  const fractionalPart = number - integerPart;

  function roundFractional(frac) {
    if (frac < 0.25) return 0;
    if (frac < 0.75) return 0.5;
    return 1;
  }

  const roundedFractional = roundFractional(fractionalPart);
  return integerPart + roundedFractional;
}