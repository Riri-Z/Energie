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
