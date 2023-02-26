//10:00 AM, 24 December 2022
export function convertIntoDateAndTime(string) {
  if (string) {
    let date = new Date(string); // Fri Jan 27 2012 02:21:50 GMT+0530 (India Standard Time)
    date = date.toString();
    date = date.split(" ");
    let am_pm = "";
    let time = date[4].split(":"); // [02,21,50] =
    if (time[0] >= 12) {
      am_pm = "PM";
    } else {
      am_pm = "AM";
    }
    time[0] = Number(time[0]) % 12;
    return `${date[2]} ${date[1]}, ${date[3]}, ${time[0]}:${time[1]} ${am_pm}`; // 24 December 2022, 10:00 AM,
  }
}

export function consvertSecondToHrAndMinutes(value) {
  const hr = (value / 3600).toFixed(0);
  const min = ((value % 3600) / 60).toFixed(0);
  const s = (value % 3600) % 60;
  if (hr > 0) {
    if (min > 0) {
      if (s > 0) {
        return `${hr} hr, ${min} min, ${s} s`;
      } else {
        return `${hr} hr, ${min} min`;
      }
    } else {
      return `${hr} hr, ${min} min`;
    }
  } else {
    if (min > 0) {
      if (s > 0) {
        return `${min} min, ${s} s`;
      } else {
        return `${min} min`;
      }
    } else {
      if (s > 0) {
        return `${s} s`;
      } else {
        return `0 sec`;
      }
    }
  }
}
