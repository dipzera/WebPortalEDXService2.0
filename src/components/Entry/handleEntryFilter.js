import convertDateMilliseconds from "../../util/convertDateMilliseconds";
import { getCurrentWeek } from "../../util/getCurrentWeek";
import getCurrentMonth from "../../util/getCurrentMonth";
import getCurrentMonthMilliseconds from "../../util/getCurrentMonthMilliseconds"

const currentWeek = getCurrentWeek();
const currentMonth = getCurrentMonthMilliseconds()

let current = new Date();
let tomorrow = new Date(current);

let tomorrowMS = current.getTime();
let currentMS = tomorrow.getTime();


const filterEntryByDay = (item, state) => {
  if (state == 50) {
    return (
      convertDateMilliseconds(item.Date) <= tomorrowMS &&
      convertDateMilliseconds(item.Date) >= currentMS
    );
  } else {
    return (
      convertDateMilliseconds(item.Date) <= tomorrowMS &&
      convertDateMilliseconds(item.Date) >= currentMS &&
      (item.InvoicState == state || item.OrderState == state)
    );
  }
};

const filterEntryByWeek = (item, state) => {
  if (state == 50) {
    return (
      convertDateMilliseconds(item.Date) >= currentWeek[0] &&
      convertDateMilliseconds(item.Date) <= currentWeek[1]
    );
  } else {
    return (
      convertDateMilliseconds(item.Date) >= currentWeek[0] &&
      convertDateMilliseconds(item.Date) <= currentWeek[1] &&
      (item.InvoicState == state || item.OrderState == state)
    );
  }
};

const filterEntryByMonth = (item, state) => {
  if (state == 50) {
    return (
      convertDateMilliseconds(item.Date) >= currentMonth[0] &&
      convertDateMilliseconds(item.Date) <= currentMonth[1]
    );
  } else {
    return (
      convertDateMilliseconds(item.Date) >= currentMonth[0] &&
      convertDateMilliseconds(item.Date) <= currentMonth[1] &&
      (item.InvoicState == state || item.OrderState == state)
    );
  }
};



export { filterEntryByDay, filterEntryByMonth, filterEntryByWeek };
