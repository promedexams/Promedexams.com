// utils/business-hours.ts
import { format, fromZonedTime, toZonedTime } from "date-fns-tz";

import { BusinessInfo } from "../business-info"; // Adjust the import path as needed

/**
 * Checks if the office is currently open based on its defined hours and timezone.
 *
 * @returns {boolean} Returns true if the office is currently open, otherwise false.
 */
export function isOfficeOpen(): boolean {
  const { hours, timezone } = BusinessInfo.ContactInformation.HoursOfOperation;

  // 1. Get the current date and time in the business's local timezone.
  const now = new Date();
  const zonedNow = toZonedTime(now, timezone);

  // 2. Get today's hours using the day of the week (0-6) as an index.
  const dayOfWeek = zonedNow.getDay();
  const todaysHours = hours[dayOfWeek];

  // 3. If there are no hours for today, the office is closed.
  if (!todaysHours) {
    return false;
  }

  // 4. Get today's date string and create full open/close date-time objects.
  const todayString = format(zonedNow, "yyyy-MM-dd");
  const openTime = fromZonedTime(`${todayString}T${todaysHours.open}:00`, timezone);
  const closeTime = fromZonedTime(`${todayString}T${todaysHours.close}:00`, timezone);

  // 5. Compare the current time to see if it's within the open/close range.
  return now >= openTime && now < closeTime;
}

/**
 * Formats a time string (HH:mm) into a 12-hour format with AM/PM.
 * @param time - The time string to format (e.g., "09:00").
 * @returns The formatted time string (e.g., "9:00 AM").
 */
export const formatTime = (time: string) => {
  const [hour, minute] = time.split(":").map(Number);
  const amPm = hour >= 12 ? "PM" : "AM";
  const formattedHour = hour % 12 || 12;
  return `${formattedHour}:${minute.toString().padStart(2, "0")} ${amPm}`;
};
