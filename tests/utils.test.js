import { describe, it, expect } from 'vitest';
import { formatCurrency, extendedCustomRound, getDeliveryOption, calculateDeliveryDate, validDeliveryOption } from '../src/utils';
import dayjs from 'dayjs';

function calculateExpectedDeliveryDate(daysToAdd) {
  let deliveryDate = dayjs();
  let remainingDays = daysToAdd;

  while (remainingDays > 0) {
    deliveryDate = deliveryDate.add(1, 'days');
    const dayOfWeek = deliveryDate.day(); // 0 is Sunday, 6 is Saturday

    if (dayOfWeek !== 0 && dayOfWeek !== 6) { // Skip Saturday (6) and Sunday (0)
      remainingDays--;
    }
  }

  return deliveryDate;
}

describe('formatCurrency', () => {
  it('correctly formats cents to currency', () => {
    expect(formatCurrency(100)).toBe('1.00');
    expect(formatCurrency(999)).toBe('9.99');
    expect(formatCurrency(1234)).toBe('12.34');
  });
});

describe('extendedCustomRound', () => {
  it('rounds fractional numbers correctly', () => {
    expect(extendedCustomRound(4.24)).toBe(4);
    expect(extendedCustomRound(4.25)).toBe(4.5);
    expect(extendedCustomRound(4.75)).toBe(5);
    expect(extendedCustomRound(4.5)).toBe(4.5);
  });
});

describe('getDeliveryOption', () => {
  it('returns correct delivery option by ID', () => {
    expect(getDeliveryOption('1')).toEqual({ id: '1', deliveryDays: 7, priceCents: 0 });
    expect(getDeliveryOption('2')).toEqual({ id: '2', deliveryDays: 3, priceCents: 499 });
    expect(getDeliveryOption('3')).toEqual({ id: '3', deliveryDays: 1, priceCents: 999 });
  });

  it('returns the first delivery option if ID not found', () => {
    expect(getDeliveryOption('non-existent-id')).toEqual({ id: '1', deliveryDays: 7, priceCents: 0 });
  });
});

describe('calculateDeliveryDate', () => {
  it('calculates the delivery date excluding weekends', () => {
    const deliveryOption = { id: '1', deliveryDays: 3, priceCents: 0 };
    const deliveryDate = calculateDeliveryDate(deliveryOption);

    const expectedDate = calculateExpectedDeliveryDate(3);
    expect(deliveryDate).toBe(expectedDate.format('dddd, MMMM D'));
  });
});

describe('validDeliveryOption', () => {
  it('returns true for valid delivery option ID', () => {
    expect(validDeliveryOption('1')).toBe(true);
    expect(validDeliveryOption('2')).toBe(true);
    expect(validDeliveryOption('3')).toBe(true);
  });

  it('returns false for invalid delivery option ID', () => {
    expect(validDeliveryOption('non-existent-id')).toBe(false);
  });
});
