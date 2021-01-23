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

let state = {
  year: new Date().getFullYear(),
  month: new Date().getMonth(),
};

function getDateGrid(year, month) {
  let dates = [];
  const firstDay = new Date(year, month).getDay();
  const totalDaysThisMonth = new Date(year, month + 1, 0).getDate();
  const totalDaysPrevMonth = new Date(year, month, 0).getDate();

  for (let i = 1; i <= firstDay; i++) {
    let prevMonthDate = totalDaysPrevMonth - firstDay + i;
    let key = new Date(year, month - 1, prevMonthDate);
    dates.push({ key: key, date: prevMonthDate, monthClass: "prev" });
  }
  for (let i = 1; i <= totalDaysThisMonth; i++) {
    let key = new Date(year, month, i);
    dates.push({ key: key, date: i, monthClass: "current" });
  }
  let gridsLeft = 42 - dates.length;
  for (let i = 1; i <= gridsLeft; i++) {
    let key = new Date(year, month, i);
    dates.push({ key: key, date: i, monthClass: "next" });
  }
  return dates;
}

function render() {
  const calendar = document.querySelector(".calendar");
  calendar.innerHTML = `
    <div class="calendar-nav">
      <button id="prevMonth">Prev</button>
      <h2>${months[state.month]} ${state.year}</h2>
      <button id="nextMonth">Next</button>
    </div>
    <div class="calendar-day-grid">
      ${daysOfWeek.map((day) => `<div>${day}</div>`).join("")}
    </div>
    <div class="calendar-date-grid">
      ${getDateGrid(state.year, state.month)
        .map((date) => `<div class="${date.monthClass}">${date.date}</div>`)
        .join("")}
    </div>
  `;
}

function showCalendar(prevNextInd) {
  const date = new Date(state.year, state.month + prevNextInd);
  state.month = date.getMonth();
  state.year = date.getFullYear();
  render();
}

showCalendar(0);

document.addEventListener("click", function (event) {
  if (event.target.id === "prevMonth") {
    showCalendar(-1);
  } else if (event.target.id === "nextMonth") {
    showCalendar(1);
  }
});
