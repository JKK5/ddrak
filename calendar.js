const today = new Date();
const year = today.getFullYear();
const month = today.getMonth();
const date = today.getDate();
const day = today.getDay();
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
console.log(year, month + 1, date, daysOfWeek[day]);

function getDateGrid(year, month) {
  let dates = [];
  const firstDay = new Date(year, month).getDay();
  const totalDaysThisMonth = new Date(year, month + 1, 0).getDate();
  const totalDaysPrevMonth = new Date(year, month, 0).getDate();
}

const header = document.querySelector(".header");
header.innerHTML = `${months[month]} ${year}`;
