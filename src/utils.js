import rating0 from './images/ratings/rating-0.png';
import rating5 from './images/ratings/rating-5.png';
import rating10 from './images/ratings/rating-10.png';
import rating15 from './images/ratings/rating-15.png';
import rating20 from './images/ratings/rating-20.png';
import rating25 from './images/ratings/rating-25.png';
import rating30 from './images/ratings/rating-30.png';
import rating35 from './images/ratings/rating-35.png';
import rating40 from './images/ratings/rating-40.png';
import rating45 from './images/ratings/rating-45.png';
import rating50 from './images/ratings/rating-50.png';

const ratingImages = {
  0: rating0,
  5: rating5,
  10: rating10,
  15: rating15,
  20: rating20,
  25: rating25,
  30: rating30,
  35: rating35,
  40: rating40,
  45: rating45,
  50: rating50
};

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

export function getStarsUrl() {
  const ratingValue = extendedCustomRound(product.rating.rate) * 10;
  return ratingImages[ratingValue] || rating0; // Fallback to rating0 if not found
}


