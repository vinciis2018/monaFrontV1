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
    return `${time[0]}:${time[1]} ${am_pm}, ${date[2]} ${date[1]} ${date[3]}`; //10:00 AM, 24 December 2022
  }
}
