export function GenerateStarsRating(num: number) {
  if (num < 0) {
    return "Le nombre doit être positif.";
  }
  return '⭐'.repeat(num);
}