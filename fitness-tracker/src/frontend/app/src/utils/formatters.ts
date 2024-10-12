import { format } from 'date-fns'; // Use date-fns for date manipulation (version 2.29.1 or later)

/**
 * Formats a date string into a user-friendly format.
 *
 * @param {string} dateString - The date string to format.
 * @param {string} formatString - The desired date format string.
 * @returns {string} The formatted date string.
 */
export const formatDate = (dateString: string, formatString: string): string => {
  try {
    const date = new Date(dateString);
    return format(date, formatString);
  } catch (error) {
    console.error('Error formatting date:', error);
    return ''; // Return an empty string on error
  }
};

/**
 * Formats a number into a currency string.
 *
 * @param {number} number - The number to format.
 * @param {string} currencyCode - The currency code (e.g., 'USD', 'EUR').
 * @returns {string} The formatted currency string.
 */
export const formatCurrency = (number: number, currencyCode: string): string => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
  });
  return formatter.format(number);
};

/**
 * Formats a number into a percentage string.
 *
 * @param {number} number - The number to format.
 * @returns {string} The formatted percentage string.
 */
export const formatPercentage = (number: number): string => {
  return `${(number * 100).toFixed(2)}%`;
};

/**
 * Formats a number into a string with thousands separators.
 *
 * @param {number} number - The number to format.
 * @returns {string} The formatted number string.
 */
export const formatNumberWithThousandsSeparator = (number: number): string => {
  const formatter = new Intl.NumberFormat('en-US');
  return formatter.format(number);
};