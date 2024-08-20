import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'

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

export const deliveryOptions = [{
  id: '1',
  deliveryDays: 7,
  priceCents: 0,
}, {
  id: '2',
  deliveryDays: 3,
  priceCents: 499,
}, {
  id: '3',
  deliveryDays: 1,
  priceCents: 999,
}];

export function getDeliveryOption(deliveryOptionId) {
  let deliveryOption;

  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      deliveryOption = option;
    }
  })

  return deliveryOption || deliveryOptions[0];
}

export function calculateDeliveryDate(deliveryOption) {
  let remainingDays = deliveryOption.deliveryDays;
  let deliveryDate = dayjs();

  while (remainingDays > 0) {
    deliveryDate = deliveryDate.add(1, 'days');

    if (!isWeekend(deliveryDate)) {
      remainingDays--;
    } 
  }

  const dateString = deliveryDate.format('dddd, MMMM D');
  return dateString;
}

function isWeekend(date) {
  const dayofWeek = date.format('dddd');
  return dayofWeek === 'Saturday' || dayofWeek === 'Sunday';
}

export function validDeliveryOption(deliveryOptionId) {
  let found = false;

  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      found = true;
    }
  });

  return found;
}