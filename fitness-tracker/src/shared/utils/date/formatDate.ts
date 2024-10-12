import { format, parseISO } from 'date-fns'; // Use date-fns for date manipulation (version 2.29.1 or later)

// Define the interface for the formatted date object
interface FormattedDate {
  date: string;
  time: string;
}

// Define a function to format a date string into a user-friendly format
export const formatDate = (dateString: string): FormattedDate => {
  try {
    // Parse the date string into a Date object
    const date = parseISO(dateString);

    // Format the date and time
    const formattedDate = format(date, 'MMMM do, yyyy');
    const formattedTime = format(date, 'hh:mm a');

    // Return the formatted date and time
    return { date: formattedDate, time: formattedTime };
  } catch (error) {
    // Handle errors during date parsing
    console.error('Error formatting date:', error);
    return { date: '', time: '' }; // Return empty strings on error
  }
};