import { isString } from 'lodash'; // Use lodash for type checking (version 4.17.21 or later)

/**
 * Capitalizes the first letter of a string.
 *
 * @param {string} str - The string to capitalize.
 * @returns {string} The capitalized string.
 */
export const capitalize = (str: string): string => {
  if (!isString(str)) {
    return ''; // Handle non-string inputs
  }

  if (str.length === 0) {
    return ''; // Handle empty strings
  }

  return str.charAt(0).toUpperCase() + str.slice(1); // Capitalize the first letter and concatenate the rest
};