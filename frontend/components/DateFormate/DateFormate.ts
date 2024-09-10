

export function DateFormate(dateString: string) {
  const [year, month, day] = dateString.split('-');
  const date = new Date(`${year}-${month}-${day}`);
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const monthName = monthNames[date.getMonth()];

  return `${day} ${monthName}, ${year}`;
}