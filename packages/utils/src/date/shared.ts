/**
 * A list of shared functions across date, datetime and time
 */

import {
  isValidTime,
  isValidDate,
  DateTimeSegment,
  TimeSegment,
  DateSegment,
  toDateTimeSegment,
  toTimeSegment,
  toDateSegment,
  TimeFormat,
  DateTimeFormat,
  DateFormat
} from './';

import {
  format as formatTime,
  utcFormat as utcFormatTime,
  utcParse as utcParseTime,
  parse as parseTime,
  InputFormat as InputTimeFormat,
  getFormat as getTimeFormat
} from './time';

import {
  format as formatDate,
  utcFormat as utcFormatDate,
  InputFormat as InputDateFormat,
  getFormat as getDateFormat,
  parse as parseDate,
  utcParse as utcParseDate
} from './date';

import {
  format as formatDateTime,
  utcFormat as utcFormatDateTime,
  parse as parseDateTime,
  utcParse as utcParseDateTime,
  InputFormat as InputDateTimeFormat,
  getFormat as getDateTimeFormat
} from './datetime';

import {
  HOURS_OF_NOON
} from './timestamps';

import {
  addOffset as addTimeOffset
} from './time';

type Format = InputTimeFormat | InputDateFormat | InputDateTimeFormat;

type Segment = DateTimeSegment | (TimeSegment & {
  year?: number;
  month?: number;
  day?: number;
}) | (DateSegment & {
  hours?: number,
  minutes?: number;
  seconds?: number;
  milliseconds?: number;
});

const isTime = (value: string | Segment): boolean => {
  return typeof value === 'string' ? isValidTime(value) : value.year === undefined;
};

const isDate = (value: string | Segment): boolean => {
  return typeof value === 'string' ? isValidDate(value) : value.hours === undefined;
};

const toSegment = (value: string | Date, isUTC = false): Segment => {
  if (value instanceof Date) {
    return toDateTimeSegment(value, isUTC);
  }

  if (isTime(value)) {
    return toTimeSegment(value, isUTC);
  }

  if (isDate(value)) {
    return toDateSegment(value, isUTC);
  }

  return toDateTimeSegment(value, isUTC);
};

/**
 * @private
 * @param value A valid Date or Segment
 * @param format Date format
 * @param isUTC Local or UTC
 * @returns A formatted date
 */
const formatAll = (value: Segment | Date, format: Format, isUTC: boolean): string => {
  if (value instanceof Date) {
    value = toSegment(value, isUTC);
  }

  const {
    year = 0,
    month = 0,
    day = 0,
    hours = 0,
    minutes = 0,
    seconds = 0,
    milliseconds = 0
  } = value;

  const dateTimeSegment = { year, month, day, hours, minutes, seconds, milliseconds };

  switch (format) {
    case DateTimeFormat.yyyMMddTHHmm:
    case DateTimeFormat.yyyMMddTHHmmss:
    case DateTimeFormat.yyyMMddTHHmmssSSS:
      return isUTC ? utcFormatDateTime(dateTimeSegment, format) : formatDateTime(dateTimeSegment, format);
    case TimeFormat.HHmm:
    case TimeFormat.HHmmss:
    case TimeFormat.HHmmssSSS:
      const timeSegment = { hours, minutes, seconds, milliseconds };
      return isUTC ? utcFormatTime(timeSegment, format) : formatTime(timeSegment, format);
    case DateFormat.yyyyMMdd:
    case DateFormat.yyyyMM:
    case DateFormat.yyyy:
      const dateSegment = { year, month, day };
      return isUTC ? utcFormatDate(dateSegment, format) : formatDate(dateSegment, format);
    default:
      return isUTC ? utcFormatDateTime(dateTimeSegment, DateTimeFormat.yyyMMddTHHmm) : formatDateTime(dateTimeSegment, DateTimeFormat.yyyMMddTHHmm);
  }
};

/**
 * Format Date or Segment to Local formatted string.
 * @param value A valid Date or Segment
 * @param [format='yyyy-MM-dd'T'HH:mm'] format
 * @returns A formatted string
 */
const format = (value: Segment | Date, format: Format = DateTimeFormat.yyyMMddTHHmm): string => formatAll(value, format, false);

/**
 * Format Date or Segment to UTC formatted string.
 * @param value A valid Date or Segment
 * @param [format='yyyy-MM-dd'T'HH:mm'] format
 * @returns A formatted string
 */
const utcFormat = (value: Segment | Date, format: Format = DateTimeFormat.yyyMMddTHHmm): string => formatAll(value, format, true);

/**
 * @private
 * @param value A Date string or Segment
 * @param isUTC Local or UTC
 * @returns A Date
 */
const parseAll = (value: string | Segment, isUTC: boolean): Date => {
  if (typeof value === 'string') {
    value = toSegment(value);
  }

  const {
    year = 0,
    month = 0,
    day = 0,
    hours = 0,
    minutes = 0,
    seconds = 0,
    milliseconds = 0
  } = value;

  if (isTime(value)) {
    const timeSegment = { hours, minutes, seconds, milliseconds };
    return isUTC ? utcParseTime(timeSegment) : parseTime(timeSegment);
  }

  if (isDate(value)) {
    const dateSegment = { year, month, day };
    return isUTC ? utcParseDate(dateSegment) : parseDate(dateSegment);
  }

  const dateTimeSegment = { year, month, day, hours, minutes, seconds, milliseconds };
  return isUTC ? utcParseDateTime(dateTimeSegment) : parseDateTime(dateTimeSegment);
};

/**
 * Get Local Date object from value string or Segment.
 * @param value Value to parse or Segment
 * @returns parsed Date or Invalid Date
 */
const parse = (value: string | Segment): Date => parseAll(value, false);

/**
 * Get UTC Date object from value string or Segment.
 * @param value Value to parse or Segment
 * @returns parsed Date or Invalid Date
 */
const utcParse = (value: string | Segment): Date => parseAll(value, true);

/**
 * Try to guess value format
 * @param value Value to test
 * @returns format Format or 'yyyy-MM-dd'T'HH:mm'
 */
const getFormat = function (value: string): Format {
  if (isValidTime(value)) {
    return getTimeFormat(value);
  }
  if (isValidDate(value)) {
    return getDateFormat(value);
  }

  return getDateTimeFormat(value);
};

/**
 * Is the first date after the second one?
 * @param value the date that should be after the other one to return true
 * @param compare the date to compare with
 * @returns the first date is after the second date
 */
const isAfter = (value: string, compare: string): boolean => {
  const date = utcParse(value);
  const compareDate = utcParse(compare);
  return date.getTime() > compareDate.getTime();
};

/**
 * Is the first date before the second one?
 * @param value the date that should be before the other one to return true
 * @param compare the date to compare with
 * @returns the first date is before the second date
 */
const isBefore = (value: string, compare: string): boolean => {
  const date = utcParse(value);
  const compareDate = utcParse(compare);
  return date.getTime() < compareDate.getTime();
};

/**
 * Are the given dates in the same day?
 * @param value the first date to check
 * @param compare the second date to check
 * @returns the dates are in the same day
 */
const isSameDay = (value: string, compare: string): boolean => {
  const valueSegment = toSegment(value);
  const compareSegment = toSegment(compare);
  return valueSegment.year === compareSegment.year && valueSegment.month === compareSegment.month && valueSegment.day === compareSegment.day;
};

/**
 * Are the given dates in the same month?
 * @param value the first date to check
 * @param compare the second date to check
 * @returns the dates are in the same month
 */
const isSameMonth = (value: string, compare: string): boolean => {
  const valueSegment = toSegment(value);
  const compareSegment = toSegment(compare);
  return valueSegment.year === compareSegment.year && valueSegment.month === compareSegment.month;
};

/**
 * Are the given dates in the same year?
 * @param value the first date to check
 * @param compare the second date to check
 * @returns the dates are in the same year
 */
const isSameYear = (value: string, compare: string): boolean => {
  const valueSegment = toSegment(value);
  const compareSegment = toSegment(compare);
  return valueSegment.year === compareSegment.year;
};

/**
 * Is the given date today?
 * @param value the date to check
 * @returns the date is today
 */
const isToday = (value: string): boolean => {
  const today = format(new Date()); // must be local time
  return isSameDay(value, today);
};

/**
 * Is the given date this month?
 * @param value the date to check
 * @returns the date is this month
 */
const isThisMonth = (value: string): boolean => {
  const today = format(new Date()); // must be local time
  return isSameMonth(value, today);
};

/**
 * Is the given date this year?
 * @param value the date to check
 * @returns the date is this year
 */
const isThisYear = (value: string): boolean => {
  const today = format(new Date()); // must be local time
  return isSameYear(value, today);
};

/**
 * Does the given date fall on a weekend?
 * @param value the date to check
 * @returns the date falls on a weekend
 */
const isWeekend = (value: string): boolean => {
  const date = utcParse(value);
  const day = date.getUTCDay();
  return day === 0 || day === 6;
};

/**
 * Add the specified number of months to the given date
 * @param value the date to be changed
 * @param amount the amount of months to be added
 * @returns the new date with the months added
 */
const addMonths = (value: string, amount: number): string => {
  if (!amount) {
    return value;
  }

  const date = utcParse(value);
  const dayOfMonth = date.getUTCDate();
  const endOfDesiredMonth = new Date(date.getTime());
  endOfDesiredMonth.setUTCMonth(date.getUTCMonth() + amount + 1, 0);
  const daysInMonth = endOfDesiredMonth.getUTCDate();
  const format = getFormat(value);

  if (dayOfMonth >= daysInMonth) {
    return utcFormat(endOfDesiredMonth, format);
  }
  else {
    date.setUTCFullYear(endOfDesiredMonth.getUTCFullYear(), endOfDesiredMonth.getUTCMonth(), dayOfMonth);
    return utcFormat(date, format);
  }
};

/**
 * Subtract the specified number of months to the given date
 * @param value the date to be changed
 * @param amount the amount of months to be subtracted
 * @returns the new date with the months subtracted
 */
const subMonths = (value: string, amount: number): string => {
  return addMonths(value, -amount);
};

/**
 * Returns `true` or `false` depending on whether the hours are before, or, after noon
 * @param value the time to check
 * @returns Result
 */
const isAM = (value: string): boolean => {
  const segment = toSegment(value);
  return (segment.hours || 0) < HOURS_OF_NOON;
};

/**
 * Returns opposite of isAM
 * @param value the time to check
 * @returns Result
 */
const isPM = (value: string): boolean => {
  return !isAM(value);
};

/**
 * Add offset in milliseconds to the value
 * @param value the time
 * @param amount number of milliseconds to add
 * @returns new value
 */
const addDateTimeOffset = (value: string, amount: number): string => {
  if (!amount) {
    return value;
  }
  const date = utcParse(value);
  const offsetDate = new Date(date.getTime() + amount);

  return utcFormat(offsetDate, getFormat(value));
};

/**
 * Add offset in milliseconds to the value
 * @param value the time
 * @param amount number of milliseconds to add
 * @returns new value
 */
const addOffset = (value: string, amount: number): string => isTime(value) ? addTimeOffset(value, amount) : addDateTimeOffset(value, amount);

/**
 * Subtract offset in milliseconds from the value
 * @param value the time
 * @param amount number of milliseconds to subtract
 * @returns new value
 */
const subOffset = (value: string, amount: number): string => addOffset(value, -amount);

export {
  isAfter,
  isBefore,
  isAM,
  isPM,
  addOffset,
  subOffset,
  format,
  utcFormat,
  parse,
  utcParse,
  getFormat,
  isSameDay,
  isSameMonth,
  isSameYear,
  isToday,
  isThisMonth,
  isThisYear,
  addMonths,
  subMonths,
  isWeekend
};
