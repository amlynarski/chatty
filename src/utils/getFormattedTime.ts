// normally I would import some time library, but for this simple case it doesn't make sense :)
export default function getFormattedTime(time: number) {
  const date = new Date(time);
  return `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
}