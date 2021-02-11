/**
 * Generate unique ID
 */
export const getUniqId = (): string => Math.random().toString(36).substr(2, 16);

/**
 * Generate a random value in the range 0 to maxValue
 *
 * @param maxValue
 */
export const getRandomValue = (maxValue: number): number => Math.floor(Math.random() * maxValue);
