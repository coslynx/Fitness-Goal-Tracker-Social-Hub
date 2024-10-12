import { formatDate } from './date/formatDate';
import { capitalize } from './string/capitalize';
import { apiClient } from './api/apiClient';
import { errorCodes } from './constants/errorCodes';
import { httpStatusCodes } from './constants/httpStatusCodes';
import { User, Goal, Post } from './types';

// Export all shared utilities for use across the application
export { formatDate, capitalize, apiClient, errorCodes, httpStatusCodes, User, Goal, Post };