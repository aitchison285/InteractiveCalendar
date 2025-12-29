import {
  format,
  addDays,
  addWeeks,
  addMonths,
  addYears,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  isToday,
  isSameDay,
  isSameMonth,
  parseISO,
} from 'date-fns';

export const formatDate = (date: Date, formatStr: string = 'MMM dd, yyyy'): string => {
  return format(date, formatStr);
};

export const formatTime = (date: Date, formatStr: string = 'h:mm a'): string => {
  return format(date, formatStr);
};

export const formatDateTime = (date: Date): string => {
  return format(date, 'MMM dd, yyyy h:mm a');
};

export const getWeekDays = (date: Date = new Date()): Date[] => {
  const start = startOfWeek(date);
  return Array.from({ length: 7 }, (_, i) => addDays(start, i));
};

export const getMonthDays = (date: Date = new Date()): Date[] => {
  const start = startOfMonth(date);
  const end = endOfMonth(date);
  const days: Date[] = [];
  
  let current = start;
  while (current <= end) {
    days.push(current);
    current = addDays(current, 1);
  }
  
  return days;
};

export const getNextOccurrence = (
  startDate: Date,
  frequency: 'daily' | 'weekly' | 'monthly' | 'yearly',
  interval: number = 1
): Date => {
  switch (frequency) {
    case 'daily':
      return addDays(startDate, interval);
    case 'weekly':
      return addWeeks(startDate, interval);
    case 'monthly':
      return addMonths(startDate, interval);
    case 'yearly':
      return addYears(startDate, interval);
    default:
      return startDate;
  }
};

export const isDayInPast = (date: Date): boolean => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const checkDate = new Date(date);
  checkDate.setHours(0, 0, 0, 0);
  return checkDate < today;
};

export const getDaysDifference = (date1: Date, date2: Date): number => {
  const diffTime = Math.abs(date2.getTime() - date1.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export {
  isToday,
  isSameDay,
  isSameMonth,
  parseISO,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  addDays,
  addWeeks,
  addMonths,
};
