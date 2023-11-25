export default (item: number): any => {
  let hour = item.toString();
  if (hour.includes(".")) {
    const minuteInHundrenBase = hour.slice(hour.indexOf(".") + 1);
    const hourSection = hour.slice(0, hour.indexOf("."));

    if (minuteInHundrenBase === "25") return hourSection + " : 15";
    if (minuteInHundrenBase === "5") return hourSection + " : 30";
    if (minuteInHundrenBase === "75") return hourSection + " : 45";
  } else {
    return hour + " : 00";
  }
};
