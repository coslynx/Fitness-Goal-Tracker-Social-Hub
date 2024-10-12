import { isEmail } from 'validator'; // Use validator library for email validation (version 13.10.0 or later)

/**
 * Validates an email address.
 * 
 * @param {string} email - The email address to validate.
 * @returns {boolean} True if the email address is valid, false otherwise.
 */
export const validateEmail = (email: string): boolean => {
  return isEmail(email, { require_tld: false }); // Allow email addresses without TLDs
};

/**
 * Validates a password.
 * 
 * @param {string} password - The password to validate.
 * @returns {boolean} True if the password is valid, false otherwise.
 */
export const validatePassword = (password: string): boolean => {
  // Implement password validation rules (e.g., minimum length, special characters)
  // Example:
  return password.length >= 8 && /\d/.test(password) && /[a-zA-Z]/.test(password) && /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
};

/**
 * Validates a username.
 * 
 * @param {string} username - The username to validate.
 * @returns {boolean} True if the username is valid, false otherwise.
 */
export const validateUsername = (username: string): boolean => {
  // Implement username validation rules (e.g., allowed characters, minimum length)
  // Example:
  return username.length >= 3 && /^[a-zA-Z0-9_.-]+$/.test(username);
};

/**
 * Validates a goal title.
 * 
 * @param {string} title - The goal title to validate.
 * @returns {boolean} True if the goal title is valid, false otherwise.
 */
export const validateGoalTitle = (title: string): boolean => {
  // Implement goal title validation rules (e.g., minimum length, allowed characters)
  // Example:
  return title.length >= 5 && /^[a-zA-Z0-9\s]+$/.test(title);
};

/**
 * Validates a goal target.
 * 
 * @param {string} target - The goal target to validate.
 * @returns {boolean} True if the goal target is valid, false otherwise.
 */
export const validateGoalTarget = (target: string): boolean => {
  // Implement goal target validation rules (e.g., numeric, positive value)
  // Example:
  return !isNaN(parseFloat(target)) && isFinite(parseFloat(target)) && parseFloat(target) > 0;
};

/**
 * Validates a goal deadline.
 * 
 * @param {string} deadline - The goal deadline to validate.
 * @returns {boolean} True if the goal deadline is valid, false otherwise.
 */
export const validateGoalDeadline = (deadline: string): boolean => {
  // Implement goal deadline validation rules (e.g., future date, valid date format)
  // Example:
  return new Date(deadline) > new Date() && !isNaN(new Date(deadline).getTime());
};

/**
 * Validates a post content.
 * 
 * @param {string} content - The post content to validate.
 * @returns {boolean} True if the post content is valid, false otherwise.
 */
export const validatePostContent = (content: string): boolean => {
  // Implement post content validation rules (e.g., minimum length, allowed characters)
  // Example:
  return content.length >= 10;
};