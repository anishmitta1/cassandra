const marketHolidays: any = {
  "26-01-2024": "Republic Day",
  "08-03-2024": "Maha Shivaratri",
  "25-03-2024": "Holi",
  "29-03-2024": "Good Friday",
  "11-04-2024": "Eid-Ul-Fitr (Ramzan Eid)",
  "17-04-2024": "Ram Navami",
  "01-05-2024": "Maharashtra Day",
  "17-06-2024": "Bakri Eid",
  "17-07-2024": "Moharram",
  "15-08-2024": "Independence Day",
  "02-10-2024": "Mahatma Gandhi Jayanti",
  "01-11-2024": "Diwali-Laxmi Pujan*",
  "15-11-2024": "Gurunanak Jayanti",
  "25-12-2024": "Christmas",
};

const checkIsMarketOpen = (): boolean => {
  const now = new Date();
  const currentTime = new Date(now.getTime());

  const currentDate = currentTime
    .toLocaleDateString("en-IN", {
      timeZone: "Asia/Kolkata",
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    })
    .split("/")
    .join("-");

  const isMarketHoliday = Object.keys(marketHolidays).includes(currentDate);

  if (isMarketHoliday) {
    console.log(`Marked is closed due to ${marketHolidays[currentDate]}`);
    return false;
  }

  const offset = currentTime.getTimezoneOffset() * 60 * 1000;

  const currentIstTime = new Date(currentTime.getTime() - offset);

  const utcDay = currentIstTime.getUTCDay();

  const isWeekend = utcDay === 0 || utcDay === 6;

  if (isWeekend) {
    console.log("Marked is closed on weekends");
    return false;
  }

  const hours = currentIstTime.getUTCHours();
  const minutes = currentIstTime.getUTCMinutes();

  if (hours * 60 + minutes < 9 * 60 + 15) {
    console.log("Marked not yet open");
    return false;
  }

  if (hours * 60 + minutes > 15 * 60 + 30) {
    console.log("Marked closed");
    return false;
  }

  return true;
};

const getDateAfterCandles = (candleCount = 30) => {
  const date = new Date();
  let candlesElapsed = 0;
  while (candlesElapsed < candleCount) {
    date.setDate(date.getDate() + 1);
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    const formattedDate = date
      .toISOString()
      .slice(0, 10)
      .split("-")
      .reverse()
      .join("-");
    const isMarketHoliday = !!marketHolidays[formattedDate];

    if (isWeekend || isMarketHoliday) {
      continue;
    }
    candlesElapsed += 1;
  }

  return date.toISOString().slice(0, 10).split("-").reverse().join("-");
};

export { checkIsMarketOpen, getDateAfterCandles };
