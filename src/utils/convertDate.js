import { compareAsc, subMonths, subWeeks } from 'date-fns';
import { EXPORT_MENU_CHARTS, EXPORT_MENU_CHARTS_FILTERED } from './constants';

export function isoStringToUtC2(isoString) {
  const date = new Date(isoString);
  date.setHours(date.getHours() + 2);
  const formattedDate = date.toISOString();
  return formattedDate;
}

export function timeStampTotimeStampPlus2(timeStamp) {
  let date = new Date(timeStamp);
  date.setHours(date.getHours() + 2);

  return date.getTime();
}

export function formatDateToApi(date) {
  return isoStringToUtC2(date.toISOString()).substring(0, 10);
}

export function isRangeLongerThanTwoWeeks(startDate, endDate) {
  const twoWeeksAgo = subWeeks(endDate, 2);

  // If startDateDate is before twoWeeksAgo  we don't allow exporting PNG/JEPG/PDF or SVG
  // Otherwise, multer won't succeed because there is two much data
  if (compareAsc(startDate, twoWeeksAgo) == -1) {
    return EXPORT_MENU_CHARTS_FILTERED;
  }
  return EXPORT_MENU_CHARTS;
}
export function isRangeLongerThanSixMonths(startDate, endDate) {
  const sixMonthAgo = subMonths(endDate, 6);

  // If startDate before sixMonthAgo we don't allow call api
  // Otherwise, RENDER(server)  won't succeed because there is two much data
  if (compareAsc(startDate, sixMonthAgo) == -1) {
    return true;
  }
  return false;
}
