export default function (time: number | undefined) {
  if (!time)
    return {
      hour: 0,
      minute: 0,
    };
  const theTime = time.toString();
  let hour;
  let minute;
  if (theTime.includes(".")) {
    hour = Number(theTime.slice(0, time.toString().indexOf(".")));
    minute = Number(theTime.slice(time.toString().indexOf(".") + 1));
    if (minute === 5) {
      minute = 30;
    } else if (minute === 25) {
      minute = 15;
    } else if (minute === 75) {
      minute = 45;
    }
  } else {
    hour = Number(theTime);
    minute = 0;
  }

  return {
    hour: hour,
    minute: minute,
  };
}
