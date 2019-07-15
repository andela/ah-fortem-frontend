/**
 * an array of months
 */
const months = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC"
];
/**
 * this function formats a date to a much pleasant format
 * @param {Date} date - date to be parsed
 */
export const dateFormatter = date => {
  let current_datetime = new Date(date);
  return (
    current_datetime.getFullYear() +
    "-" +
    months[current_datetime.getMonth()] +
    "-" +
    current_datetime.getDate() +
    " " +
    current_datetime.getHours() +
    ":" +
    current_datetime.getMinutes() +
    ":" +
    current_datetime.getSeconds()
  );
};
